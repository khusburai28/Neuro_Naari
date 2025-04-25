import React from 'react';
import { ArrowRight } from 'lucide-react';

interface Recommendation {
  id: string;
  title: string;
  type: 'job' | 'course' | 'event';
  description: string;
  imageUrl?: string;
  link: string;
}

interface RecommendationCardProps {
  recommendations: Recommendation[];
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({ recommendations }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-secondary-100 p-6">
      <h3 className="font-semibold text-lg mb-4">Recommended for You</h3>
      
      <div className="space-y-4">
        {recommendations.map(rec => (
          <div 
            key={rec.id}
            className="flex items-start space-x-4 p-4 rounded-lg hover:bg-secondary-50 transition-colors"
          >
            {rec.imageUrl && (
              <img
                src={rec.imageUrl}
                alt={rec.title}
                className="w-12 h-12 rounded-lg object-cover"
              />
            )}
            <div className="flex-1">
              <h4 className="font-medium text-secondary-900 mb-1">{rec.title}</h4>
              <p className="text-sm text-secondary-600 mb-2">{rec.description}</p>
              <a
                href={rec.link}
                className="text-sm text-primary-600 hover:text-primary-700 font-medium inline-flex items-center"
              >
                Learn more
                <ArrowRight size={16} className="ml-1" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendationCard;