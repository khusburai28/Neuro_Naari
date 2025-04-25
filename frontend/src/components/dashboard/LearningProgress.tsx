import React from 'react';
import { BookOpen, Award, Brain } from 'lucide-react';
import ProgressCard from './ProgressCard';

interface Course {
  id: string;
  title: string;
  progress: number;
  totalModules: number;
  completedModules: number;
  nextModule: string;
}

interface LearningProgressProps {
  courses: Course[];
}

const LearningProgress: React.FC<LearningProgressProps> = ({ courses }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {courses.map(course => (
        <ProgressCard
          key={course.id}
          title={course.title}
          progress={course.progress}
          icon={course.title.includes('Leadership') ? Award : course.title.includes('Data') ? Brain : BookOpen}
          color="bg-primary-600"
          total={course.totalModules}
          completed={course.completedModules}
          nextItem={course.nextModule}
        />
      ))}
    </div>
  );
};

export default LearningProgress;