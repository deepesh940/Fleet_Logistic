import { Button } from './ui/button';
import { Card } from './ui/card';
import { CheckCircle } from 'lucide-react';
import { RouteOptimization } from './RouteOptimization';
import { toast } from 'sonner';

interface WorkflowRouteOptimizationProps {
  orderData?: any;
  workflowData?: any;
  onComplete?: (data: any) => void;
  isWorkflowMode?: boolean;
}

export function WorkflowRouteOptimization({ 
  orderData, 
  workflowData, 
  onComplete, 
  isWorkflowMode = false 
}: WorkflowRouteOptimizationProps) {
  const handleComplete = () => {
    toast.success('Route optimization completed!');
    if (onComplete) {
      onComplete({
        routePlan: 'optimized',
        estimatedDistance: '542 km',
        estimatedDuration: '6.5 hrs',
        waypoints: ['Guadalajara', 'Monterrey']
      });
    }
  };

  return (
    <div className="h-full">
      <RouteOptimization />
      {isWorkflowMode && onComplete && (
        <Card className="m-6 p-6">
          <Button 
            className="w-full bg-[#E30613] hover:bg-red-700"
            onClick={handleComplete}
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            Complete Route Assignment
          </Button>
        </Card>
      )}
    </div>
  );
}
