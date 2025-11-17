import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { OrderManagement } from './components/OrderManagement';
import { StockManagement } from './components/StockManagement';
import { VehicleMaster } from './components/VehicleMaster';
import { FleetMaster } from './components/FleetMaster';
import { CustomerMaster } from './components/CustomerMaster';
import { AILoadPlanner } from './components/AILoadPlanner';
import { FleetAssignment } from './components/FleetAssignment';
import { RouteOptimization } from './components/RouteOptimization';
import { YardManagement } from './components/YardManagement';
import { PreDispatchYard } from './components/PreDispatchYard';
import { DispatchPreparation } from './components/DispatchPreparation';
import { LoadingConfirmation } from './components/LoadingConfirmation';
import { DeliveryExecution } from './components/DeliveryExecution';
import { ProofOfDelivery } from './components/ProofOfDelivery';
import { TripTracking } from './components/TripTracking';
import { InspectionMaintenance } from './components/InspectionMaintenance';
import { BillingPayments } from './components/BillingPayments';
import { Analytics } from './components/Analytics';
import { Settings } from './components/Settings';
import { AIAssistant } from './components/AIAssistant';
import { WorkflowManager } from './components/WorkflowManager';
import { Toaster } from './components/ui/sonner';
import { RealtimeNotifications } from './components/RealtimeNotifications';

export default function App() {
  const [currentView, setCurrentView] = useState<string>('dashboard');
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [selectedOrderForPlanning, setSelectedOrderForPlanning] = useState<any>(null);
  const [showWorkflow, setShowWorkflow] = useState(false);

  const handleAIPlanningFromOrder = (order: any) => {
    setSelectedOrderForPlanning(order);
    setShowWorkflow(true);
  };

  const handleBackFromWorkflow = () => {
    setShowWorkflow(false);
    setSelectedOrderForPlanning(null);
  };

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard onNavigate={setCurrentView} />;
      case 'orders':
        return <OrderManagement onNavigate={setCurrentView} onAIPlanning={handleAIPlanningFromOrder} />;
      case 'stock':
        return <StockManagement />;
      case 'customer-master':
        return <CustomerMaster />;
      case 'vehicle-master':
        return <VehicleMaster />;
      case 'fleet-master':
        return <FleetMaster />;
      case 'ai-planner':
        return <AILoadPlanner orderData={selectedOrderForPlanning} onClearOrder={() => setSelectedOrderForPlanning(null)} />;
      case 'fleet-assignment':
        return <FleetAssignment />;
      case 'routes':
        return <RouteOptimization />;
      case 'yard':
        return <YardManagement />;
      case 'pre-dispatch':
        return <PreDispatchYard />;
      case 'dispatch-prep':
        return <DispatchPreparation />;
      case 'loading-confirm':
        return <LoadingConfirmation />;
      case 'delivery-execution':
        return <DeliveryExecution />;
      case 'proof-delivery':
        return <ProofOfDelivery />;
      case 'tracking':
        return <TripTracking />;
      case 'inspection':
        return <InspectionMaintenance />;
      case 'billing':
        return <BillingPayments />;
      case 'analytics':
        return <Analytics />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar currentView={currentView} onNavigate={setCurrentView} />
      <main className="flex-1 overflow-auto">
        {showWorkflow ? (
          <WorkflowManager
            orderData={selectedOrderForPlanning}
            onBack={handleBackFromWorkflow}
          />
        ) : (
          renderView()
        )}
      </main>
      
      {/* AI Assistant Floating Button */}
      <button
        onClick={() => setShowAIAssistant(!showAIAssistant)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-red-600 to-red-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center group"
        style={{ zIndex: 1000 }}
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      </button>

      {/* AI Assistant Panel */}
      {showAIAssistant && (
        <AIAssistant onClose={() => setShowAIAssistant(false)} />
      )}
      
      <Toaster />
      <RealtimeNotifications />
    </div>
  );
}