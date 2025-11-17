import { Check } from 'lucide-react';

interface Step {
  id: string;
  label: string;
  status: 'completed' | 'active' | 'upcoming';
}

interface WorkflowStepperProps {
  steps: Step[];
}

export function WorkflowStepper({ steps }: WorkflowStepperProps) {
  return (
    <div className="w-full py-6">
      <div className="flex items-center justify-between relative">
        {steps.map((step, index) => {
          const isLast = index === steps.length - 1;
          const isCompleted = step.status === 'completed';
          const isActive = step.status === 'active';
          const isUpcoming = step.status === 'upcoming';

          return (
            <div key={step.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center relative z-10">
                {/* Step Circle */}
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                    isCompleted
                      ? 'bg-green-500 border-green-500 text-white'
                      : isActive
                      ? 'bg-red-600 border-red-600 text-white shadow-lg scale-110'
                      : 'bg-white border-gray-300 text-gray-400'
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <span className="text-sm">{index + 1}</span>
                  )}
                </div>

                {/* Step Label */}
                <p
                  className={`text-sm mt-2 text-center max-w-[120px] ${
                    isActive
                      ? 'text-gray-900'
                      : isCompleted
                      ? 'text-gray-700'
                      : 'text-gray-400'
                  }`}
                >
                  {step.label}
                </p>
              </div>

              {/* Connecting Line */}
              {!isLast && (
                <div className="flex-1 h-0.5 mx-2 relative" style={{ top: '-28px' }}>
                  <div
                    className={`h-full ${
                      isCompleted || (isActive && index < steps.findIndex(s => s.status === 'active'))
                        ? 'bg-green-500'
                        : 'bg-gray-300'
                    } ${isUpcoming ? 'border-t-2 border-dashed border-gray-300 bg-transparent' : ''}`}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
