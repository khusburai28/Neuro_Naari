import asyncio
import json
import os
from typing import List, Dict, Any, Optional, Tuple
from datetime import date
from langchain.schema import Document
from dataclasses import dataclass
from langchain_google_genai import ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings
from langchain_chroma import Chroma
from langchain.text_splitter import RecursiveCharacterTextSplitter
from pydantic import BaseModel, Field
import warnings
from flask import Flask, request, jsonify, session, make_response
# Import CORS
from flask_cors import CORS
import nest_asyncio
import traceback # For detailed error logging

nest_asyncio.apply()

# --- Suppress Warnings ---
warnings.filterwarnings("ignore", category=UserWarning)
warnings.filterwarnings("ignore", category=DeprecationWarning)

GOOGLE_API_KEY = "AIzaSyDUR3T3yrSxTtUuTK2TqmZjtTz4OlpA8QI"
JOB_FILES_PATH = "linkedin_jobs.json" # Example using relative path
COMMUNITY_FILES_PATH = "scraped_data.json" # Example using relative path

# --- Pydantic Models (JobOpportunity, CommunityEvent) ---
class JobOpportunity(BaseModel):
    title: str = Field(..., description="Job title")
    organization: Optional[str] = Field(..., description="Company name")
    details: Optional[str] = Field(None, description="Brief job description")
    url: Optional[str] = Field(None, description="URL of the job listing")
    location: Optional[str] = Field(None, description="location of the job listing")

class CommunityEvent(BaseModel):
    title: str = Field(..., description="Name of the event")
    date: Optional[str] = Field(None, description="Date of the event")
    location: Optional[str] = Field(None, description="location of the event")
    description: Optional[str] = Field(None, description="Event description")
    url: Optional[str] = Field(None, description="URL of the job listing")


# --- Agent Classes (IntentClassifierAgent, JobSearchAgent, CommunityEventSearchAgent) ---
class IntentClassifierAgent:
    """Agent to classify user intent using Gemini."""
    def __init__(self, model: ChatGoogleGenerativeAI):
        self.model = model

    async def run(self, query: str) -> str:
        response = await self.model.ainvoke(f"""You are an expert at understanding the intent behind user queries related to resources for women. Your task is to analyze the given query and classify it into one of the following categories: 1. Job Opportunities, 2. Mentorship Programs, 3. Community Events. If the user asks for any resources, guidance, or preparation materials, classify it as 'Mentorship Programs'. Based on the user's query, output only the category that best matches their intent: {query}""")
        return response.content.strip()


class JobSearchAgent:
    """Agent to find and summarize job opportunities using Gemini."""
    def __init__(self, model: ChatGoogleGenerativeAI):
        self.model = model

    async def run(self, query: str, context: str) -> List[JobOpportunity]:
        response = await self.model.ainvoke(f"""Based on the following job listings:\n\n{context}\n\nIdentify and summarize any specific job opportunities mentioned. Pay close attention to the location and requirements specified for each job. Output the result as a JSON array of JobOpportunity objects with the following keys: "title", "organization", "details", "url", and "location".""")
        content = response.content.strip()
        print("CONTENT:", content)  # Debugging line to check the content
        try:
            # Try to load directly first
            return [JobOpportunity(**item) for item in json.loads(content)]
        except json.JSONDecodeError:
            # If direct loading fails, try to extract JSON from a code block
            import re
            json_match = re.search(r"```json\n(.*?)\n```", content, re.DOTALL)
            if json_match:
                json_str = json_match.group(1).strip()
                try:
                    return [JobOpportunity(**item) for item in json.loads(json_str)]
                except json.JSONDecodeError as e:
                    print(f"JSONDecodeError (extracted): {e}, Content: {json_str}")
                    return []
                except Exception as e:
                    print(f"Error parsing JobOpportunity (extracted): {e}, Content: {json_str}")
                    return []
            else:
                print(f"Could not find JSON in response: {content}")
                return []
        except Exception as e:
            print(f"Error parsing JobOpportunity (initial): {e}, Content: {content}")
            return []


class CommunityEventSearchAgent:
    """Agent to find and summarize community events using Gemini."""
    def __init__(self, model: ChatGoogleGenerativeAI):
        self.model = model

    async def run(self, query: str, context: str) -> List[CommunityEvent]:
        response = await self.model.ainvoke(f"""Based on the following community event listings:\n\n{context}\n\nIdentify and summarize any specific community events mentioned. Output the result as a JSON array of CommunityEvent objects having title, date, location, description, and url.""")
        content = response.content.strip()

        try:
            # Try to load directly first
            return [CommunityEvent(**item) for item in json.loads(content)]
        except json.JSONDecodeError:
            # If direct loading fails, try to extract JSON from a code block
            import re
            json_match = re.search(r"```json\n(.*?)\n```", content, re.DOTALL)
            if json_match:
                json_str = json_match.group(1).strip()
                try:
                    return [CommunityEvent(**item) for item in json.loads(json_str)]
                except json.JSONDecodeError as e:
                    print(f"JSONDecodeError (extracted): {e}, Content: {json_str}")
                    return []
                except Exception as e:
                    print(f"Error parsing CommunityEvent (extracted): {e}, Content: {json_str}")
                    return []
            else:
                print(f"Could not find JSON in response: {content}")
                return []
        except Exception as e:
            print(f"Error parsing CommunityEvent (initial): {e}, Content: {content}")
            return []


# --- DataLoader and VectorDatabase Classes ---
class DataLoader:
    """Component to load documents from various sources."""
    def __init__(self, job_files: List[str], community_files: List[str]):
        self.job_files = job_files
        self.community_files = community_files

    def load_documents_from_json(self, file_paths: List[str]) -> List[Document]:
        documents = []
        for json_file in file_paths:
            if os.path.exists(json_file):
                try:
                    with open(json_file, "r", encoding="utf-8") as f:
                        json_data = json.load(f)
                    if isinstance(json_data, list):
                        for item in json_data:
                            documents.append(Document(page_content=json.dumps(item), metadata={"source": json_file}))
                    elif isinstance(json_data, dict):
                        documents.append(Document(page_content=json.dumps(json_data), metadata={"source": json_file}))
                    print(f"Loaded {len(json_data) if isinstance(json_data, list) else 1} items from {json_file}")
                except Exception as e:
                    print(f"Error loading JSON {json_file}: {e}")
        return documents

    def load_job_documents(self) -> List[Document]:
        return self.load_documents_from_json(self.job_files)

    def load_community_documents(self) -> List[Document]:
        return self.load_documents_from_json(self.community_files)

class VectorDatabase:
    """Component to manage the vector database."""
    def __init__(self, embeddings, persist_directory="db/chroma_db_gemini"):
        self.embeddings = embeddings
        self.persist_directory = persist_directory
        # os.makedirs(self.persist_directory, exist_ok=True)
        self.db = self._load_or_create_db()

    def _load_or_create_db(self):
        if os.path.exists(self.persist_directory) and os.path.isdir(self.persist_directory) and len(os.listdir(self.persist_directory)) > 0:
            try:
                print("Loading existing vector database...")
                db = Chroma(
                    persist_directory=self.persist_directory,
                    embedding_function=self.embeddings
                )
                print(f"Vector database loaded successfully with {db._collection.count()} documents")
                return db
            except Exception as e:
                print(f"Error loading existing database: {e}")
                print("Will create a new vector database")
                return None
        else:
            return Chroma(
                embedding_function=self.embeddings,
                persist_directory=self.persist_directory
            )

    def create_db_from_documents(self, documents: List[Document]):
        if not documents:
            raise ValueError("No documents provided to create the vector database")
        print("Creating new vector database...")
        text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=100)
        split_documents = text_splitter.split_documents(documents)
        self.db = Chroma.from_documents(
            split_documents,
            self.embeddings,
            persist_directory=self.persist_directory
        )
        # self.db.persist() <--- REMOVE THIS LINE
        print("New vector database created successfully")

    def get_retriever(self, search_kwargs: Dict[str, Any] = None):
        if self.db:
            return self.db.as_retriever()
        return None

# --- Chatbot Class (Stateless History Managed by Flask Session) ---
class Chatbot:
    """
    A conversational chatbot where chat history is managed by Flask session.
    Loads resources once per instance.
    """
    def __init__(self, google_api_key: str, job_files: List[str], community_files: List[str]):
        self.google_api_key = google_api_key
        self.llm = ChatGoogleGenerativeAI(model="gemini-2.0-flash", google_api_key=self.google_api_key)
        self.embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001", google_api_key=self.google_api_key)
        self.job_db = self._setup_vector_db(job_files, "db/job_chatbot_gemini")
        self.community_db = self._setup_vector_db(community_files, "db/community_chatbot_gemini")

    def _setup_vector_db(self, file_paths: List[str], persist_directory: str) -> Optional[Chroma]:
        data_loader = DataLoader(job_files=[], community_files=[])  # Initialize with empty lists
        documents = data_loader.load_documents_from_json(file_paths)
        if not documents:
            print(f"No documents loaded for {persist_directory}")
            return None

        vector_db = VectorDatabase(self.embeddings, persist_directory=persist_directory)
        if vector_db.db is None or vector_db.db._collection.count() == 0:
            vector_db.create_db_from_documents(documents)
        return vector_db.db

    async def _retrieve_relevant_documents(self, db: Chroma, query: str) -> str:
        if db:
            retriever = db.as_retriever()
            results = await retriever.aget_relevant_documents(query)
            return "\n".join([doc.page_content for doc in results])
        return ""

    async def handle_jobs_query(self, query: str) -> List[JobOpportunity]:
        context = await self._retrieve_relevant_documents(self.job_db, query)
        job_search_agent = JobSearchAgent(model=self.llm)
        return await job_search_agent.run(query, context)

    async def handle_community_events_query(self, query: str) -> List[CommunityEvent]:
        context = await self._retrieve_relevant_documents(self.community_db, query)
        community_event_search_agent = CommunityEventSearchAgent(model=self.llm)
        return await community_event_search_agent.run(query, context)

    async def handle_mentorship_query(self, query: str) -> str:
        response = await self.llm.ainvoke(f"""You are a helpful mentor for women. Provide a specific, concise and actionable answer in 600 characters to the following query: {query}""")
        return response.content.strip()

    async def process_message(self, user_input: str, chat_history: List[str]) -> Tuple[str, List[str]]:
        """Processes the user message and returns the bot's response and updated history."""
        updated_history = list(chat_history)
        updated_history.append(f"User: {user_input}")

        # Detect intent
        intent_classifier = IntentClassifierAgent(model=self.llm)
        intent = await intent_classifier.run(user_input)
        print(f"Intent Detected: {intent}")

        # Build context from recent chat history
        context = "\n".join(updated_history[-5:]) if updated_history else ""

        # Handle different types of user intent
        if "job" in intent.lower():
            relevant_context = await self._retrieve_relevant_documents(self.job_db, user_input)
            job_search_agent = JobSearchAgent(model=self.llm)
            jobs = await job_search_agent.run(user_input, f"{relevant_context}\nPrevious Chat History:\n{context}")

            if jobs:
                response = "Here are some job opportunities I found:\n" + "\n".join([
                    f"- {job.title} at {job.organization}: {job.details or 'No details provided'} "
                    f"({job.url or 'No URL provided'}, Location: {job.location or 'Not specified'})"
                    for job in jobs
                ])
            else:
                response = "I couldn't find any matching job opportunities at the moment."

        elif "community" in intent.lower() or "event" in intent.lower():
            relevant_context = await self._retrieve_relevant_documents(self.community_db, user_input)
            event_agent = CommunityEventSearchAgent(model=self.llm)
            events = await event_agent.run(user_input, f"{relevant_context}\nPrevious Chat History:\n{context}")

            if events:
                response = "Here are some upcoming community events:\n" + "\n".join([
                    f"- {event.title} on {event.date} at {event.location or 'Not specified'}: "
                    f"{event.description or 'No description provided'} ({event.url or 'No URL provided'})"
                    for event in events
                ])
            else:
                response = "No community events found at this time."

        elif "mentorship" in intent.lower():
            response_obj = await self.llm.ainvoke(
                f"Previous Chat History:\n{context}\nYou are a helpful mentor for women. "
                f"Provide a specific, concise, and actionable answer to the following query: {user_input}"
            )
            response = response_obj.content.strip()  # Extract the content string

        else:
            response = "Sorry, I'm not sure how to help with that."

        updated_history.append(f"Bot: {response}")
        return response, updated_history


# --- Flask App Setup ---
app = Flask(__name__)
app.secret_key = 'manya'
CORS(app, supports_credentials=True) # Allows cookies (needed for sessions) from any origin

# --- Initialize Chatbot within the Request Context ---
def get_chatbot_instance():
    """Initializes the Chatbot instance."""
    global GOOGLE_API_KEY, JOB_FILES_PATH, COMMUNITY_FILES_PATH
    if not GOOGLE_API_KEY or GOOGLE_API_KEY == "YOUR_FALLBACK_API_KEY_HERE":
        print("FATAL ERROR: GOOGLE_API_KEY environment variable not set or invalid.")
        return None

    print("Initializing Chatbot Instance...")
    job_files_list = [f.strip() for f in JOB_FILES_PATH.split(',') if f.strip()]
    community_files_list = [f.strip() for f in COMMUNITY_FILES_PATH.split(',') if f.strip()]

    chatbot = Chatbot(
        google_api_key=GOOGLE_API_KEY,
        job_files=job_files_list,
        community_files=community_files_list
    )
    print("Chatbot Instance Initialized.")
    return chatbot

# --- API Endpoint ---
@app.route('/api/chat', methods=['POST', 'OPTIONS']) # Keep OPTIONS
async def chat_endpoint():
    """Handles incoming chat messages."""
    if request.method == 'OPTIONS':
        return _build_cors_preflight_response()
    elif request.method == 'POST':
        chatbot = get_chatbot_instance()
        if not chatbot:
            print("Error: Chatbot failed to initialize.")
            return jsonify({"error": "Chatbot service is not available."}), 503

        if not request.is_json:
            return jsonify({"error": "Request must be JSON"}), 400

        data = request.get_json()
        user_message = data.get('message')

        if not user_message:
            return jsonify({"error": "Missing 'message' in request body"}), 400

        # Retrieve chat history from session, initialize if empty
        chat_history = session.get('chat_history', [])

        try:
            # Process message using the chatbot instance and current history
            bot_response, updated_history = await chatbot.process_message(user_message, chat_history)

            # Store the updated history back in the session
            session['chat_history'] = updated_history

            return jsonify({"response": bot_response})

        except Exception as e:
            print(f"Error in /chat endpoint processing POST request: {e}")
            traceback.print_exc()
            return jsonify({"error": "An internal server error occurred processing your message."}), 500
    else:
        return jsonify({"error": "Method not allowed"}), 405

# Helper function for CORS preflight response (needed for POST with JSON)
def _build_cors_preflight_response():
    response = make_response()
    response.headers.add("Access-Control-Allow-Origin", "*") # Or specific origin
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization') # Allow Content-Type
    response.headers.add('Access-Control-Allow-Methods', 'POST,OPTIONS') # Allow POST and OPTIONS
    response.headers.add('Access-Control-Allow-Credentials', 'true') # Allow credentials
    return response

# --- Run Flask App ---
if __name__ == '__main__':
    app.run(debug=True,port=5000)