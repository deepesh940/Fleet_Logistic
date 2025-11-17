import { Button } from './ui/button';
import { Card } from './ui/card';
import { CheckCircle } from 'lucide-react';
import { DispatchPreparation } from './DispatchPreparation';
import { toast } from 'sonner';

interface WorkflowDispatchPreparationProps {
  orderData?: any;
  workflowData?: any;
  onComplete?: (data: any) => void;
  isWorkflowMode?: boolean;
}

export function WorkflowDispatchPreparation({ 
  orderData, 
  workflowData, 
  onComplete, 
  isWorkflowMode = false 
}: WorkflowDispatchPreparationProps) {
  const handleComplete = () => {
    toast.success('Dispatch preparation completed!');
    if (onComplete) {
      onComplete({
        dispatchReady: true,
        vehiclesInspected: true,
        documentsReady: true,
        readyToLoad: true
      });
    }
  };

  return (
    <div className="h-full">
      <DispatchPreparation />
      {isWorkflowMode && onComplete && (
        <Card className="m-6 p-6">
          <Button 
            className="w-full bg-[#E30613] hover:bg-red-700"
            onClick={handleComplete}
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            Complete Dispatch Preparation
          </Button>
        </Card>
      )}
    </div>
  );
}
