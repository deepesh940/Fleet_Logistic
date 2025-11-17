import { Button } from './ui/button';
import { Card } from './ui/card';
import { CheckCircle } from 'lucide-react';
import { ProofOfDelivery } from './ProofOfDelivery';
import { toast } from 'sonner';

interface WorkflowProofOfDeliveryProps {
  orderData?: any;
  workflowData?: any;
  onComplete?: (data: any) => void;
  isWorkflowMode?: boolean;
}

export function WorkflowProofOfDelivery({ 
  orderData, 
  workflowData, 
  onComplete, 
  isWorkflowMode = false 
}: WorkflowProofOfDeliveryProps) {
  const handleComplete = () => {
    toast.success('Delivery completed! Workflow finished.');
    if (onComplete) {
      onComplete({
        podSubmitted: true,
        signatureCollected: true,
        photosUploaded: true,
        completionTime: new Date().toISOString(),
        workflowCompleted: true
      });
    }
  };

  return (
    <div className="h-full">
      <ProofOfDelivery />
      {isWorkflowMode && onComplete && (
        <Card className="m-6 p-6 bg-green-50 border-green-200">
          <p className="text-center mb-4 text-green-800">
            This is the final step of the workflow. Complete this to finish the order processing.
          </p>
          <Button 
            className="w-full bg-green-600 hover:bg-green-700"
            onClick={handleComplete}
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            Complete Delivery & Finish Workflow
          </Button>
        </Card>
      )}
    </div>
  );
}
