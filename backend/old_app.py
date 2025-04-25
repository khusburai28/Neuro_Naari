from flask import Flask, request, jsonify
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.chains import LLMChain
from langchain.prompts import PromptTemplate
from typing import Optional
import warnings
import os

try:
    import pypdf
except ImportError:
    pypdf = None
    warnings.warn("pypdf not installed. Install it with 'pip install pypdf' to process PDF files.", ImportWarning)
try:
    import docx
except ImportError:
    docx = None
    warnings.warn("python-docx not installed. Install it with 'pip install python-docx' to process DOCX files.", ImportWarning)

GOOGLE_API_KEY = "AIzaSyDUR3T3yrSxTtUuTK2TqmZjtTz4OlpA8QI"
try:
    llm = ChatGoogleGenerativeAI(model="gemini-2.0-flash", temperature=0.3, google_api_key=GOOGLE_API_KEY)
except ImportError:
    print("Error: Please install the langchain-google-genai package.")
    print("You can install it using: pip install langchain-google-genai")
    exit()
except Exception as e:
    print(f"Error initializing Gemini: {e}")
    exit()

# Define the prompt template for ATS checking (scoring only)
ats_prompt_template = PromptTemplate(
    input_variables=["resume_text"],
    template="""You are an expert Resume ATS (Applicant Tracking System) analyst.
Analyze the following resume and give a score out of 100 for each of the following aspects:

Resume Text:
{resume_text}

1. ATS Compatibility Score: This score reflects how well the resume is likely to be parsed and understood by an Applicant Tracking System. Consider factors like formatting, use of standard headings, and avoidance of complex elements.
2. Content Score: This score reflects the quality and relevance of the information presented in the resume. Consider clarity, conciseness, impact of achievements, and alignment with typical resume expectations.
3. Keyword Score: This score reflects the presence and effective use of relevant keywords that are likely to be searched for by recruiters and ATS. Consider the inclusion of industry-specific terms, skills, and job titles.
4. Formatting Score: This score reflects the overall visual presentation and organization of the resume. Consider readability, consistency, professional appearance, and logical flow."""
)

# Create the LLMChain for ATS checking (scoring only)
ats_chain = LLMChain(llm=llm, prompt=ats_prompt_template)

# Define the prompt template for detailed analysis
analysis_prompt_template = PromptTemplate(
    input_variables=["resume_text"],
    template="""You are an expert Resume ATS (Applicant Tracking System) analyst.
Analyze the following resume and give a detailed analysis including an overall ATS score, strengths, weaknesses, and improvement suggestions and tips.:

Resume Text:
{resume_text}

1. Overall ATS Compatibility Score (out of 100): This score reflects the overall likelihood of the resume being parsed and favored by an Applicant Tracking System. Consider all aspects of the resume in this overall assessment.
2. Strengths: Highlight the strengths of the resume, such as relevant skills, experiences, and achievements that stand out.
3. Weaknesses: Identify any weaknesses or areas for improvement in the resume, such as lack of relevant experience, poor formatting, or missing key information.
4. Improvement Suggestions: Provide specific suggestions for improving the resume, such as rephrasing certain sections, adding relevant keywords, or changing the format.
5. Tips: Offer general tips for creating a strong resume that is ATS-friendly and appealing to recruiters."""
)

# Create the LLMChain for detailed analysis
analysis_chain = LLMChain(llm=llm, prompt=analysis_prompt_template)

app = Flask(__name__)

def extract_text_from_pdf(pdf_path: str) -> Optional[str]:
    """Extracts text from a PDF file."""
    if pypdf is None:
        return None
    try:
        with open(pdf_path, 'rb') as file:
            reader = pypdf.PdfReader(file)
            text = ""
            for page in reader.pages:
                text += page.extract_text() or ""
        return text
    except Exception as e:
        print(f"Error reading PDF file '{pdf_path}': {e}")
        return None

def extract_text_from_docx(docx_path: str) -> Optional[str]:
    """Extracts text from a DOCX file."""
    if docx is None:
        return None
    try:
        doc = docx.Document(docx_path)
        text = ""
        for paragraph in doc.paragraphs:
            text += paragraph.text + "\n"
        return text
    except Exception as e:
        print(f"Error reading DOCX file '{docx_path}': {e}")
        return None

def check_ats(resume_text: str) -> str:
    """Performs a basic ATS check and returns the scoring."""
    try:
        response = ats_chain.run(resume_text=resume_text)
        return response
    except Exception as e:
        return f"An error occurred during ATS check: {e}"

def analyze_resume(resume_text: str) -> str:
    """Performs a detailed analysis of the resume."""
    try:
        response = analysis_chain.run(resume_text=resume_text)
        return response
    except Exception as e:
        return f"An error occurred during detailed analysis: {e}"

@app.route('/ats_report', methods=['POST'])
def get_ats_report():
    print(f"Request files: {request.files}")  # ADD THIS LINE
    if 'resume_file' not in request.files:
        return jsonify({'error': 'No resume file provided'}), 400
    file = request.files['resume_file']
    print(f"File object: {file}") # ADD THIS LINE
    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400

    if file:
        file_extension = file.filename.lower().rsplit('.', 1)[-1]
        resume_text = None
        if file_extension == 'pdf':
            # Save the file temporarily to process it
            temp_path = f"temp_resume.{file_extension}"
            file.save(temp_path)
            print(f"Saved to: {temp_path}") # ADD THIS LINE
            resume_text = extract_text_from_pdf(temp_path)
            os.remove(temp_path)
        elif file_extension == 'docx':
            # Save the file temporarily to process it
            temp_path = f"temp_resume.{file_extension}"
            file.save(temp_path)
            print(f"Saved to: {temp_path}") # ADD THIS LINE
            resume_text = extract_text_from_docx(temp_path)
            os.remove(temp_path)
        else:
            return jsonify({'error': 'Unsupported file format. Please upload a PDF or DOCX file.'}), 400

        if resume_text:
            ats_report = check_ats(resume_text=resume_text)
            return jsonify({'ats_report': ats_report}), 200
        else:
            return jsonify({'error': 'Could not extract text from the resume file.'}), 500

    return jsonify({'error': 'An unexpected error occurred'}), 500

@app.route('/analysis', methods=['POST'])
def get_analysis_report():
    """Endpoint to get the detailed ATS analysis report."""
    if 'resume_file' not in request.files:
        return jsonify({'error': 'No resume file provided'}), 400
    file = request.files['resume_file']
    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400

    if file:
        file_extension = file.filename.lower().rsplit('.', 1)[-1]
        resume_text = None
        if file_extension == 'pdf':
            # Save the file temporarily to process it
            temp_path = f"temp_resume.{file_extension}"
            file.save(temp_path)
            print(f"Saved to: {temp_path}") # ADD THIS LINE
            resume_text = extract_text_from_pdf(temp_path)
            os.remove(temp_path)
        elif file_extension == 'docx':
            # Save the file temporarily to process it
            temp_path = f"temp_resume.{file_extension}"
            file.save(temp_path)
            print(f"Saved to: {temp_path}") # ADD THIS LINE
            resume_text = extract_text_from_docx(temp_path)
            os.remove(temp_path)
        else:
            return jsonify({'error': 'Unsupported file format. Please upload a PDF or DOCX file.'}), 400

        if resume_text:
            analysis_report = analyze_resume(resume_text=resume_text)
            return jsonify({'analysis_report': analysis_report}), 200
        else:
            return jsonify({'error': 'Could not extract text from the resume file.'}), 500

    return jsonify({'error': 'An unexpected error occurred'}), 500

if __name__ == '__main__':
    app.run(debug=True)