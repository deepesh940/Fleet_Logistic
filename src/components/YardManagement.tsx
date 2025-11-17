import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  MapPin, 
  Package,
  Clock,
  TrendingUp,
  Calendar
} from 'lucide-react';
import { Progress } from './ui/progress';

export function YardManagement() {
  const yardStats = [
    { yard: 'Yard A - CDMX', total: 450, waiting: 124, ready: 89, utilization: 75 },
    { yard: 'Yard B - Monterrey', total: 380, waiting: 98, ready: 56, utilization: 62 },
    { yard: 'Yard C - Puebla', total: 290, waiting: 67, ready: 34, utilization: 58 },
  ];

  const loadingOperations = [
    { id: 'LOAD-001', truck: 'TRK-002', vehicles: 6, ramp: 'Ramp A1', operator: 'Juan Rodriguez', status: 'In Progress', progress: 75 },
    { id: 'LOAD-002', truck: 'TRK-005', vehicles: 8, ramp: 'Ramp B2', operator: 'Maria Garcia', status: 'In Progress', progress: 45 },
    { id: 'LOAD-003', truck: 'TRK-001', vehicles: 2, ramp: 'Ramp A2', operator: 'Carlos Martinez', status: 'Scheduled', progress: 0 },
  ];

  return (
    <div className="h-full">
      <div className="p-6 border-b bg-white">
        <h1 className="text-3xl mb-2">Yard & Consolidation Management</h1>
        <p className="text-gray-600">Real-time yard operations and loading management</p>
      </div>

      {/* Yard Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {yardStats.map((yard) => (
          <Card key={yard.yard} className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium">{yard.yard}</h3>
              <MapPin className="w-5 h-5 text-gray-400" />
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-600">Total Capacity</p>
                <p className="text-2xl">{yard.total}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Utilization</p>
                <p className="text-2xl text-blue-600">{yard.utilization}%</p>
              </div>
            </div>
            <Progress value={yard.utilization} className="h-2 mb-4" />
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-yellow-50 p-2 rounded">
                <p className="text-xs text-gray-600">Waiting</p>
                <p className="font-medium">{yard.waiting}</p>
              </div>
              <div className="bg-green-50 p-2 rounded">
                <p className="text-xs text-gray-600">Ready</p>
                <p className="font-medium">{yard.ready}</p>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4" size="sm">
              View Yard Map
            </Button>
          </Card>
        ))}
      </div>

      {/* Yard Map Preview */}
      <Card className="p-6 mb-6">
        <h2 className="text-xl mb-4">Yard Overview Map</h2>
        <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg h-96 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <p className="text-gray-700 font-medium">Interactive Yard Map</p>
            <p className="text-sm text-gray-500">Real-time vehicle positions and slot assignments</p>
          </div>
        </div>
      </Card>

      {/* Loading Operations */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl">Active Loading Operations</h2>
          <Button className="bg-red-600 hover:bg-red-700">
            <Calendar className="w-4 h-4 mr-2" />
            Schedule Loading
          </Button>
        </div>
        <div className="space-y-4">
          {loadingOperations.map((op) => (
            <div key={op.id} className="p-4 bg-gray-50 rounded-lg border">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium">{op.id}</p>
                    <Badge variant={op.status === 'In Progress' ? 'default' : 'secondary'} className={op.status === 'In Progress' ? 'bg-blue-500' : ''}>
                      {op.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">Truck: {op.truck} • {op.vehicles} vehicles • {op.ramp}</p>
                </div>
                <p className="text-sm text-gray-600">{op.progress}%</p>
              </div>
              <Progress value={op.progress} className="h-2 mb-2" />
              <p className="text-sm text-gray-600">Operator: {op.operator}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
