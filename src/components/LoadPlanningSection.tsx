import { Package, Scale, FileText, CheckCircle } from 'lucide-react';
import { WorkflowStage } from './WorkflowStage';
import { InfoPanel } from './InfoPanel';

interface LoadPlanningSectionProps {
  isActive: boolean;
  onClick: () => void;
}

export function LoadPlanningSection({ isActive, onClick }: LoadPlanningSectionProps) {
  return (
    <div className="bg-white rounded-lg border-2 border-gray-300 p-6 my-6">
      <h3 className="mb-6">Load Planning</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <WorkflowStage
          title="Select transport mode (truck/trailer)"
          icon={<Package className="w-5 h-5" />}
          status={isActive ? 'active' : 'pending'}
          isActive={isActive}
          onClick={onClick}
        />
        
        <WorkflowStage
          title="Determine vehicle size & weight (M³)"
          icon={<Scale className="w-5 h-5" />}
          status={isActive ? 'active' : 'pending'}
          isActive={isActive}
          onClick={onClick}
        />
        
        <WorkflowStage
          title="Collect dispatch info"
          icon={<FileText className="w-5 h-5" />}
          status={isActive ? 'active' : 'pending'}
          isActive={isActive}
          onClick={onClick}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <WorkflowStage
          title="Preliminary load assignment"
          icon={<Package className="w-5 h-5" />}
          status={isActive ? 'active' : 'pending'}
          isActive={isActive}
          onClick={onClick}
        />
        
        <WorkflowStage
          title="Optimize load"
          icon={<CheckCircle className="w-5 h-5" />}
          status={isActive ? 'active' : 'pending'}
          isActive={isActive}
          onClick={onClick}
        />
        
        <WorkflowStage
          title="Generate final load manifest"
          icon={<FileText className="w-5 h-5" />}
          status={isActive ? 'active' : 'pending'}
          isActive={isActive}
          onClick={onClick}
        />
      </div>

      {isActive && (
        <InfoPanel
          title="Load Optimization Objectives"
          items={[
            'Maximize trailer utilization',
            'Minimize trips',
            'Delivery sequence & time windows',
            'Mixed orders for multi-dealer delivery'
          ]}
          variant="yellow"
        />
      )}
    </div>
  );
}
