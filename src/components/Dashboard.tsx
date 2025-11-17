import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  Package, 
  Truck, 
  AlertTriangle,
  TrendingUp,
  MapPin,
  Zap,
  Activity,
  PieChart
} from 'lucide-react';
import { Progress } from './ui/progress';

interface DashboardProps {
  onNavigate: (view: string) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const kpis = [
    { 
      label: 'Total Orders', 
      value: '245', 
      icon: Package,
      color: 'bg-red-600'
    },
    { 
      label: 'Active Deliveries', 
      value: '89', 
      icon: Truck,
      color: 'bg-blue-600'
    },
    { 
      label: 'Fleet Utilization', 
      value: '87%', 
      icon: Activity,
      color: 'bg-green-600'
    },
    { 
      label: 'Postponed Orders', 
      value: '6', 
      icon: AlertTriangle,
      color: 'bg-orange-600'
    },
  ];

  const quickActions = [
    { label: 'Create New Order', icon: Package, view: 'orders', color: 'bg-red-600' },
    { label: 'AI Load Planner', icon: Zap, view: 'ai-planner', color: 'bg-purple-600' },
    { label: 'View Active Trips', icon: MapPin, view: 'tracking', color: 'bg-blue-600' },
    { label: 'Fleet Utilization Report', icon: TrendingUp, view: 'analytics', color: 'bg-green-600' },
  ];

  const alerts = [
    { 
      type: 'warning', 
      title: 'Route Delay',
      message: 'ORD-2025-001 delayed by 45 minutes due to traffic',
      time: '5 min ago'
    },
    { 
      type: 'info', 
      title: 'Stock Sync',
      message: 'Daily stock sync completed - 45 new vehicles added',
      time: '1 hour ago'
    },
    { 
      type: 'critical', 
      title: 'Consolidation Deadline',
      message: '12 orders approaching 3-day consolidation deadline',
      time: '2 hours ago'
    },
  ];

  const activeTrips = [
    { 
      id: 'TRP-001', 
      route: 'Mexico City → Guadalajara', 
      type: 'Direct',
      vehicles: 8,
      progress: 75,
      eta: '2 hours',
      status: 'On Time'
    },
    { 
      id: 'TRP-002', 
      route: 'Monterrey → Tijuana', 
      type: 'Milk Run',
      vehicles: 6,
      progress: 45,
      eta: '5 hours',
      status: 'On Time'
    },
    { 
      id: 'TRP-003', 
      route: 'Puebla → Veracruz', 
      type: 'Direct',
      vehicles: 4,
      progress: 30,
      eta: '3 hours',
      status: 'Delayed'
    },
  ];

  return (
    <div className="h-full">
      {/* Header */}
      <div className="p-6 border-b bg-white">
        <h1 className="text-3xl mb-2">Dashboard</h1>
        <p className="text-gray-600">Real-time overview of your logistics operations</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6 pb-4 bg-gray-50">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          
          return (
            <Card key={kpi.label} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className={`${kpi.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <p className="text-3xl mb-1">{kpi.value}</p>
              <p className="text-sm text-gray-600">{kpi.label}</p>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="px-6 pb-4 bg-gray-50">
        <h2 className="text-xl mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Button
                key={action.label}
                className={`h-auto py-6 flex-col gap-3 ${action.color} hover:opacity-90`}
                onClick={() => onNavigate(action.view)}
              >
                <Icon className="w-8 h-8" />
                <span>{action.label}</span>
              </Button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-6 pb-6 bg-gray-50">
        {/* Live Map Preview */}
        <Card className="lg:col-span-2 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl">Live Fleet Tracking</h2>
            <Button variant="outline" size="sm" onClick={() => onNavigate('tracking')}>
              <MapPin className="w-4 h-4 mr-2" />
              View Full Map
            </Button>
          </div>
          <div className="bg-gray-100 rounded-lg h-80 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50" />
            <div className="relative text-center z-10">
              <MapPin className="w-12 h-12 text-red-600 mx-auto mb-4" />
              <p className="text-gray-700 font-medium">Google Maps Integration</p>
              <p className="text-sm text-gray-500">89 vehicles tracked in real-time</p>
              <div className="flex gap-4 mt-4 justify-center">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                  <span className="text-sm">On Time (83)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                  <span className="text-sm">Delayed (6)</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Notifications */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl">Alerts & Notifications</h2>
            <Badge variant="destructive">3</Badge>
          </div>
          <div className="space-y-3">
            {alerts.map((alert, index) => {
              const bgColor = 
                alert.type === 'critical' ? 'bg-red-50 border-red-200' :
                alert.type === 'warning' ? 'bg-yellow-50 border-yellow-200' :
                'bg-blue-50 border-blue-200';
              
              return (
                <div key={index} className={`p-3 rounded-lg border ${bgColor}`}>
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium mb-1">{alert.title}</p>
                      <p className="text-sm text-gray-600 mb-1">{alert.message}</p>
                      <p className="text-xs text-gray-500">{alert.time}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <Button variant="outline" className="w-full mt-4" size="sm">
            View All Notifications
          </Button>
        </Card>
      </div>

      {/* Active Trips & Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Trips */}
        <Card className="lg:col-span-2 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl">Active Trips</h2>
            <Button variant="outline" size="sm" onClick={() => onNavigate('tracking')}>
              View All
            </Button>
          </div>
          <div className="space-y-4">
            {activeTrips.map((trip) => (
              <div key={trip.id} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium">{trip.id}</p>
                      <Badge variant="outline" className="text-xs">{trip.type}</Badge>
                      <Badge variant={trip.status === 'On Time' ? 'default' : 'destructive'} className={trip.status === 'On Time' ? 'bg-green-500' : ''}>
                        {trip.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{trip.route}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">ETA: {trip.eta}</p>
                    <p className="text-xs text-gray-500">{trip.vehicles} vehicles</p>
                  </div>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">{trip.progress}% Complete</span>
                </div>
                <Progress value={trip.progress} className="h-2" />
              </div>
            ))}
          </div>
        </Card>

        {/* Performance Widgets */}
        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="font-medium mb-4">Trip Type Distribution</h3>
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">Direct</span>
                  <span className="text-sm font-medium">62%</span>
                </div>
                <Progress value={62} className="h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">Milk Run</span>
                  <span className="text-sm font-medium">38%</span>
                </div>
                <Progress value={38} className="h-2 bg-gray-200" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-medium mb-2">Return Load Opportunities</h3>
            <div className="flex items-baseline gap-2 mb-1">
              <PieChart className="w-5 h-5 text-gray-400" />
              <span className="text-2xl">24</span>
            </div>
            <p className="text-sm text-gray-600">Available routes</p>
            <Button variant="outline" className="w-full mt-3" size="sm">
              View Opportunities
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}