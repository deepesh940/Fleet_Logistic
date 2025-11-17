import { ReactNode } from 'react';
import { Card } from './ui/card';

interface WorkflowStageProps {
  title: string;
  icon: ReactNode;
  status: 'completed' | 'active' | 'pending' | 'warning';
  isActive: boolean;
  onClick: () => void;
}

export function WorkflowStage({ title, icon, status, isActive, onClick }: WorkflowStageProps) {
  const getStatusStyles = () => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 border-green-400 text-green-800';
      case 'active':
        return 'bg-blue-100 border-blue-400 text-blue-800 shadow-lg';
      case 'warning':
        return 'bg-yellow-100 border-yellow-400 text-yellow-800';
      default:
        return 'bg-gray-100 border-gray-300 text-gray-600';
    }
  };

  return (
    <Card
      className={`p-4 border-2 cursor-pointer transition-all hover:shadow-md ${getStatusStyles()} ${
        isActive ? 'ring-2 ring-offset-2 ring-blue-500' : ''
      }`}
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0">{icon}</div>
        <div className="flex-1 min-w-0">
          <p className="text-sm truncate">{title}</p>
        </div>
      </div>
    </Card>
  );
}
