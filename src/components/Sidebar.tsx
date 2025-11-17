import { 
  LayoutDashboard, 
  Package, 
  Truck, 
  Car,
  Map, 
  BarChart3,
  Settings as SettingsIcon,
  LogOut,
  Warehouse,
  Boxes,
  Zap,
  MapPin,
  ClipboardCheck,
  DollarSign,
  Activity,
  Building2
} from 'lucide-react';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';

interface SidebarProps {
  currentView: string;
  onNavigate: (view: string) => void;
}

export function Sidebar({ currentView, onNavigate }: SidebarProps) {
  const menuSections = [
    {
      title: 'Overview',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'tracking', label: 'Live Tracking', icon: Activity },
      ]
    },
    {
      title: 'Operations',
      items: [
        { id: 'orders', label: 'Orders', icon: Package },
        { id: 'stock', label: 'Stock Management', icon: Boxes },
        { id: 'yard', label: 'Yard Management', icon: Warehouse },
        { id: 'pre-dispatch', label: 'Pre-Dispatch Yard', icon: ClipboardCheck },
        { id: 'inspection', label: 'Inspection', icon: ClipboardCheck },
      ]
    },
    {
      title: 'Planning & Dispatch',
      items: [
        { id: 'ai-planner', label: 'AI Load Planner', icon: Zap },
        { id: 'fleet-assignment', label: 'Fleet Assignment', icon: Truck },
        { id: 'routes', label: 'Route Optimization', icon: Map },
        { id: 'dispatch-prep', label: 'Dispatch Preparation', icon: Package },
        { id: 'loading-confirm', label: 'Loading Confirmation', icon: Package },
      ]
    },
    {
      title: 'Delivery',
      items: [
        { id: 'delivery-execution', label: 'In Transit', icon: Package },
        { id: 'proof-delivery', label: 'Delivery', icon: ClipboardCheck },
      ]
    },
    {
      title: 'Masters',
      items: [
        { id: 'customer-master', label: 'Customer Master', icon: Building2 },
        { id: 'vehicle-master', label: 'Vehicle Master', icon: Car },
        { id: 'fleet-master', label: 'Fleet & Trailers', icon: Truck },
      ]
    },
    {
      title: 'Finance & Reports',
      items: [
        { id: 'billing', label: 'Billing & Payments', icon: DollarSign },
        { id: 'analytics', label: 'Analytics', icon: BarChart3 },
      ]
    },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
            <Truck className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg" style={{ color: '#E30613' }}>Fleet Logistics</h1>
            <p className="text-xs text-gray-500">Grupo TYT</p>
          </div>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <nav className="p-4 space-y-6">
          {menuSections.map((section) => (
            <div key={section.title}>
              <p className="text-xs uppercase text-gray-500 mb-2 px-3">{section.title}</p>
              <div className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentView === item.id;
                  
                  return (
                    <Button
                      key={item.id}
                      variant={isActive ? 'secondary' : 'ghost'}
                      className={`w-full justify-start gap-3 ${
                        isActive ? 'bg-red-50 text-red-600' : 'text-gray-700'
                      }`}
                      onClick={() => onNavigate(item.id)}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-sm">{item.label}</span>
                    </Button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </ScrollArea>

      <div className="p-4 border-t border-gray-200 space-y-1">
        <Button 
          variant="ghost" 
          className={`w-full justify-start gap-3 text-gray-700 ${
            currentView === 'settings' ? 'bg-red-50 text-red-600' : ''
          }`}
          onClick={() => onNavigate('settings')}
        >
          <SettingsIcon className="w-5 h-5" />
          <span className="text-sm">Settings</span>
        </Button>
        <Button variant="ghost" className="w-full justify-start gap-3 text-gray-700">
          <LogOut className="w-5 h-5" />
          <span className="text-sm">Logout</span>
        </Button>
      </div>
    </aside>
  );
}