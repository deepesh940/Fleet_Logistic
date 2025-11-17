import { Button } from './ui/button';
import { Card } from './ui/card';
import { CheckCircle } from 'lucide-react';
import { DeliveryExecution } from './DeliveryExecution';
import { toast } from 'sonner';

interface WorkflowDeliveryExecutionProps {
  orderData?: any;
  workflowData?: any;
  onComplete?: (data: any) => void;
  isWorkflowMode?: boolean;
}

export function WorkflowDeliveryExecution({ 
  orderData, 
  workflowData, 
  onComplete, 
  isWorkflowMode = false 
}: WorkflowDeliveryExecutionProps) {
  const handleComplete = () => {
    toast.success('In transit tracking completed!');
    if (onComplete) {
      onComplete({
        deliveryInProgress: false,
        arrivedAtDestination: true,
        readyForUnloading: true,
        deliveryTime: new Date().toISOString()
      });
    }
  };

  return (
    <div className="h-full">
      <DeliveryExecution />
      {isWorkflowMode && onComplete && (
        <Card className="m-6 p-6">
          <Button 
            className="w-full bg-[#E30613] hover:bg-red-700"
            onClick={handleComplete}
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            Complete In Transit
          </Button>
        </Card>
      )}
    </div>
  );
}
