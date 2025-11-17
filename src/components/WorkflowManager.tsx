import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  CheckCircle2, 
  Circle, 
  ArrowLeft,
  Package,
  Truck,
  Route,
  Send,
  PackageCheck,
  Navigation,
  FileCheck
} from 'lucide-react';
import { AILoadPlanner } from './AILoadPlanner';
import { FleetAssignment } from './FleetAssignment';
import { WorkflowRouteOptimization } from './WorkflowRouteOptimization';
import { WorkflowDispatchPreparation } from './WorkflowDispatchPreparation';
import { WorkflowLoadingConfirmation } from './WorkflowLoadingConfirmation';
import { WorkflowDeliveryExecution } from './WorkflowDeliveryExecution';
import { WorkflowProofOfDelivery } from './WorkflowProofOfDelivery';
import { toast } from 'sonner';

interface WorkflowManagerProps {
  orderData: any;
  onBack: () => void;
}

type WorkflowStage = 
  | 'load-planning'
  | 'fleet-assignment'
  | 'route-assignment'
  | 'dispatch-preparation'
  | 'loading-confirmation'
  | 'delivery-execution'
  | 'proof-of-delivery';

interface StageConfig {
  id: WorkflowStage;
  label: string;
  icon: any;
  component: React.ComponentType<any>;
}

export function WorkflowManager({ orderData, onBack }: WorkflowManagerProps) {
  const [currentStage, setCurrentStage] = useState<WorkflowStage>('load-planning');
  const [completedStages, setCompletedStages] = useState<WorkflowStage[]>([]);
  const [workflowData, setWorkflowData] = useState({
    orderId: orderData?.id || 'ORD-2025-001',
    loadPlan: null,
    fleetAssignment: null,
    routePlan: null,
    dispatchPlan: null,
    loadingConfirmation: null,
    deliveryExecution: null,
    proofOfDelivery: null,
  });

  const stages: StageConfig[] = [
    { id: 'load-planning', label: 'Load Planning', icon: Package, component: AILoadPlanner },
    { id: 'fleet-assignment', label: 'Fleet Assignment', icon: Truck, component: FleetAssignment },
    { id: 'route-assignment', label: 'Route Assignment', icon: Route, component: WorkflowRouteOptimization },
    { id: 'dispatch-preparation', label: 'Dispatch Preparation', icon: Send, component: WorkflowDispatchPreparation },
    { id: 'loading-confirmation', label: 'Loading Confirmation', icon: PackageCheck, component: WorkflowLoadingConfirmation },
    { id: 'delivery-execution', label: 'In Transit', icon: Navigation, component: WorkflowDeliveryExecution },
    { id: 'proof-of-delivery', label: 'Delivery', icon: FileCheck, component: WorkflowProofOfDelivery },
  ];

  const getCurrentStageIndex = () => stages.findIndex(s => s.id === currentStage);

  const handleStageComplete = (stageId: WorkflowStage, data?: any) => {
    // Mark stage as completed
    if (!completedStages.includes(stageId)) {
      setCompletedStages([...completedStages, stageId]);
    }

    // Save stage data
    setWorkflowData(prev => ({
      ...prev,
      [stageId.replace('-', '')]: data,
    }));

    // Check if this is the final stage
    if (stageId === 'proof-of-delivery') {
      toast.success('🎉 Order workflow completed successfully!', {
        description: `Order ${workflowData.orderId} has been processed through all stages.`,
        duration: 5000
      });
      setTimeout(() => {
        onBack();
      }, 2000);
    } else {
      // Move to next stage if not the last one
      const currentIndex = getCurrentStageIndex();
      if (currentIndex < stages.length - 1) {
        setCurrentStage(stages[currentIndex + 1].id);
      }
    }
  };

  const handleStageNavigate = (stageId: WorkflowStage) => {
    const targetIndex = stages.findIndex(s => s.id === stageId);
    const currentIndex = getCurrentStageIndex();
    
    // Only allow navigation to completed stages or next uncompleted stage
    if (targetIndex <= currentIndex || completedStages.includes(stages[targetIndex - 1]?.id)) {
      setCurrentStage(stageId);
    }
  };

  const CurrentStageComponent = stages.find(s => s.id === currentStage)?.component;

  return (
    <div className="h-full bg-gray-50">
      {/* Header */}
      <div className="p-6 border-b bg-white">
        <div className="flex items-center gap-4 mb-4">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Orders
          </Button>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl mb-2">Order Workflow - {workflowData.orderId}</h1>
            <p className="text-gray-600">Complete the workflow stages to process this order</p>
          </div>
          <Badge className="bg-blue-500">
            Stage {getCurrentStageIndex() + 1} of {stages.length}
          </Badge>
        </div>
      </div>

      {/* Workflow Progress Stepper */}
      <Card className="m-6 p-6">
        <div className="flex items-center justify-between relative">
          {/* Progress Line */}
          <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200" style={{ zIndex: 0 }}>
            <div 
              className="h-full bg-[#E30613] transition-all duration-500"
              style={{ 
                width: `${(completedStages.length / (stages.length - 1)) * 100}%` 
              }}
            />
          </div>

          {/* Stages */}
          {stages.map((stage, index) => {
            const isCompleted = completedStages.includes(stage.id);
            const isCurrent = currentStage === stage.id;
            const isAccessible = index === 0 || completedStages.includes(stages[index - 1].id);
            const Icon = stage.icon;

            return (
              <div 
                key={stage.id} 
                className="flex flex-col items-center relative z-10"
                style={{ flex: 1 }}
              >
                <button
                  onClick={() => handleStageNavigate(stage.id)}
                  disabled={!isAccessible && !isCompleted}
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all
                    ${isCompleted 
                      ? 'bg-green-500 text-white' 
                      : isCurrent 
                        ? 'bg-[#E30613] text-white ring-4 ring-red-200' 
                        : isAccessible
                          ? 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }
                  `}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    <Icon className="w-5 h-5" />
                  )}
                </button>
                <p className={`text-xs text-center max-w-24 ${isCurrent ? 'text-[#E30613]' : 'text-gray-600'}`}>
                  {stage.label}
                </p>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Current Stage Content */}
      <div className="px-6 pb-6">
        {/* Enhanced Stage Content Container */}
        <div className="relative">
          {/* Background Decoration */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white to-purple-50/50 rounded-2xl -z-10"></div>
          
          {/* Main Content Card */}
          <Card className="border-2 border-gray-200 shadow-xl rounded-2xl overflow-hidden bg-white/80 backdrop-blur-sm">
            {/* Stage Header Bar */}
            <div className="bg-gradient-to-r from-red-600 to-red-700 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-md">
                    {currentStage === 'load-planning' && <Package className="w-5 h-5 text-red-600" />}
                    {currentStage === 'fleet-assignment' && <Truck className="w-5 h-5 text-red-600" />}
                    {currentStage === 'route-optimization' && <Route className="w-5 h-5 text-red-600" />}
                    {currentStage === 'dispatch-preparation' && <Send className="w-5 h-5 text-red-600" />}
                    {currentStage === 'loading-confirmation' && <PackageCheck className="w-5 h-5 text-red-600" />}
                    {currentStage === 'delivery-execution' && <Navigation className="w-5 h-5 text-red-600" />}
                    {currentStage === 'proof-of-delivery' && <FileCheck className="w-5 h-5 text-red-600" />}
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg">
                      {stages.find(s => s.id === currentStage)?.label}
                    </h3>
                    <p className="text-red-100 text-sm">
                      Step {stages.findIndex(s => s.id === currentStage) + 1} of {stages.length}
                    </p>
                  </div>
                </div>
                <Badge className="bg-white text-red-600 hover:bg-white">
                  In Progress
                </Badge>
              </div>
            </div>

            {/* Stage Content */}
            <div className="p-6 bg-gradient-to-b from-gray-50/50 to-white">
              {CurrentStageComponent && (
                <CurrentStageComponent
                  orderData={orderData}
                  workflowData={workflowData}
                  onComplete={(data: any) => handleStageComplete(currentStage, data)}
                  onClearOrder={() => {}}
                  isWorkflowMode={true}
                />
              )}
            </div>

            {/* Progress Footer */}
            <div className="border-t-2 border-gray-100 bg-gradient-to-r from-gray-50 to-white px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span>
                    {stages.filter(s => completedStages.includes(s.id)).length} of {stages.length} stages completed
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {stages.findIndex(s => s.id === currentStage) < stages.length - 1 && (
                    <div className="text-sm text-gray-500">
                      Next: {stages[stages.findIndex(s => s.id === currentStage) + 1]?.label}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}