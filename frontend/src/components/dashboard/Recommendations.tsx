import React from 'react';
import RecommendationCard from './RecommendationCard';

interface Recommendation {
  id: string;
  title: string;
  type: 'job' | 'course' | 'event';
  description: string;
  imageUrl?: string;
  link: string;
}

interface RecommendationsProps {
  recommendations: Recommendation[];
}

const Recommendations: React.FC<RecommendationsProps> = ({ recommendations }) => {
  return (
    <RecommendationCard recommendations={recommendations} />
  );
};

export default Recommendations;