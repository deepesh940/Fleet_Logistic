import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { CheckCircle, X } from 'lucide-react';
import { LoadingConfirmation } from './LoadingConfirmation';
import { toast } from 'sonner';

interface WorkflowLoadingConfirmationProps {
  orderData?: any;
  workflowData?: any;
  onComplete?: (data: any) => void;
  isWorkflowMode?: boolean;
}

export function WorkflowLoadingConfirmation({ 
  orderData, 
  workflowData, 
  onComplete, 
  isWorkflowMode = false 
}: WorkflowLoadingConfirmationProps) {
  const [showVideo, setShowVideo] = useState(false);

  const handleComplete = () => {
    setShowVideo(true);
    toast.success('Loading confirmation completed!');
    if (onComplete) {
      onComplete({
        loadingConfirmed: true,
        allVehiclesLoaded: true,
        securedProperly: true,
        departureTime: new Date().toISOString()
      });
    }
  };

  return (
    <div className="h-full">
      <LoadingConfirmation />
      {isWorkflowMode && onComplete && (
        <Card className="m-6 p-6">
          {/* YouTube Video Player */}
          {showVideo && (
            <Card className="mb-6 p-6 bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-lg">🎥 Loading Process Complete</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowVideo(false)}
                  className="hover:bg-red-100"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
                  src="https://www.youtube.com/embed/_3xukmURcDM?autoplay=1"
                  title="Loading Process Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </Card>
          )}

          <Button 
            className="w-full bg-[#E30613] hover:bg-red-700"
            onClick={handleComplete}
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            Complete Loading Confirmation
          </Button>
        </Card>
      )}
    </div>
  );
}
