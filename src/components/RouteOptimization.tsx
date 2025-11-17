import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { 
  Map, 
  Zap, 
  TrendingDown,
  Clock,
  DollarSign,
  Route,
  MapPin,
  AlertTriangle
} from 'lucide-react';
import { Badge } from './ui/badge';

export function RouteOptimization() {
  const [isOptimizing, setIsOptimizing] = useState(false);

  const optimizationResults = {
    totalRoutes: 24,
    optimizedRoutes: 18,
    distanceSaved: '1,245 km',
    timeSaved: '32 hours',
    costSaved: '$8,450',
    co2Reduced: '2.4 tons',
  };

  const routes = [
    {
      id: 'ROUTE-001',
      name: 'Mexico City to Guadalajara',
      distance: '542 km',
      estimatedTime: '6.5 hours',
      stops: 3,
      vehicles: 5,
      status: 'Optimized',
      savings: '12%',
      priority: 'High',
    },
    {
      id: 'ROUTE-002',
      name: 'Monterrey to Tijuana',
      distance: '1,234 km',
      estimatedTime: '14 hours',
      stops: 5,
      vehicles: 3,
      status: 'Optimized',
      savings: '18%',
      priority: 'Medium',
    },
    {
      id: 'ROUTE-003',
      name: 'Puebla to Veracruz',
      distance: '285 km',
      estimatedTime: '3.5 hours',
      stops: 2,
      vehicles: 4,
      status: 'Pending',
      savings: '0%',
      priority: 'Low',
    },
    {
      id: 'ROUTE-004',
      name: 'Querétaro to León',
      distance: '198 km',
      estimatedTime: '2.5 hours',
      stops: 1,
      vehicles: 2,
      status: 'Optimized',
      savings: '8%',
      priority: 'High',
    },
  ];

  const handleOptimize = () => {
    setIsOptimizing(true);
    setTimeout(() => {
      setIsOptimizing(false);
    }, 2000);
  };

  return (
    <div className="h-full">
      <div className="flex items-center justify-between p-6 border-b bg-white">
        <div>
          <h1 className="text-3xl mb-2">Route Optimization</h1>
          <p className="text-gray-600">AI-powered route planning and optimization</p>
        </div>
        <Button onClick={handleOptimize} disabled={isOptimizing}>
          <Zap className="w-4 h-4 mr-2" />
          {isOptimizing ? 'Optimizing...' : 'Run Optimization'}
        </Button>
      </div>

      {/* Optimization Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="bg-indigo-100 p-3 rounded-lg">
              <Route className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <p className="text-2xl">{optimizationResults.totalRoutes}</p>
              <p className="text-sm text-gray-600">Total Routes</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="bg-green-100 p-3 rounded-lg">
              <Zap className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl">{optimizationResults.optimizedRoutes}</p>
              <p className="text-sm text-gray-600">Optimized Routes</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <TrendingDown className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl">{optimizationResults.distanceSaved}</p>
              <p className="text-sm text-gray-600">Distance Saved</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="bg-purple-100 p-3 rounded-lg">
              <Clock className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl">{optimizationResults.timeSaved}</p>
              <p className="text-sm text-gray-600">Time Saved</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="bg-yellow-100 p-3 rounded-lg">
              <DollarSign className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl">{optimizationResults.costSaved}</p>
              <p className="text-sm text-gray-600">Cost Saved</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="bg-green-100 p-3 rounded-lg">
              <TrendingDown className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl">{optimizationResults.co2Reduced}</p>
              <p className="text-sm text-gray-600">CO₂ Reduced</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Route Map Visualization */}
      <Card className="p-6 mb-8">
        <h2 className="text-xl mb-4">Route Map</h2>
        <div className="bg-gray-100 rounded-lg h-96 flex items-center justify-center">
          <div className="text-center">
            <Map className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Interactive route map would be displayed here</p>
            <p className="text-sm text-gray-500">Showing optimized delivery routes with multi-stop planning</p>
          </div>
        </div>
      </Card>

      {/* Routes List */}
      <Card className="p-6">
        <h2 className="text-xl mb-6">Active Routes</h2>
        <div className="space-y-4">
          {routes.map((route) => (
            <div key={route.id} className="p-4 border border-gray-200 rounded-lg hover:border-indigo-300 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-medium">{route.name}</h3>
                    <Badge variant={route.status === 'Optimized' ? 'default' : 'secondary'} className={route.status === 'Optimized' ? 'bg-green-500' : ''}>
                      {route.status}
                    </Badge>
                    <Badge variant={
                      route.priority === 'High' ? 'destructive' : 
                      route.priority === 'Medium' ? 'default' : 
                      'secondary'
                    }>
                      {route.priority} Priority
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">{route.id}</p>
                </div>
                {route.status === 'Optimized' && (
                  <div className="flex items-center gap-2 text-green-600">
                    <TrendingDown className="w-4 h-4" />
                    <span className="text-sm font-medium">{route.savings} saved</span>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Distance</p>
                  <p className="font-medium">{route.distance}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Est. Time</p>
                  <p className="font-medium">{route.estimatedTime}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Stops</p>
                  <p className="font-medium">{route.stops} locations</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Vehicles</p>
                  <p className="font-medium">{route.vehicles} assigned</p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <MapPin className="w-4 h-4 mr-2" />
                  View on Map
                </Button>
                <Button variant="outline" size="sm">
                  <Route className="w-4 h-4 mr-2" />
                  Route Details
                </Button>
                {route.status === 'Pending' && (
                  <Button size="sm">
                    <Zap className="w-4 h-4 mr-2" />
                    Optimize Route
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Optimization Factors */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <Card className="p-6">
          <h2 className="text-xl mb-4">Optimization Factors</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm">Distance Minimization</span>
              <Badge className="bg-green-500">Enabled</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm">Delivery Time Windows</span>
              <Badge className="bg-green-500">Enabled</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm">Traffic Patterns</span>
              <Badge className="bg-green-500">Enabled</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm">Weather Conditions</span>
              <Badge className="bg-green-500">Enabled</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm">Road Restrictions</span>
              <Badge className="bg-green-500">Enabled</Badge>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl mb-4">Route Alerts</h2>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium">Weather Warning</p>
                <p className="text-sm text-gray-600">Heavy rain expected on ROUTE-002 tomorrow</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium">Traffic Update</p>
                <p className="text-sm text-gray-600">Highway construction on ROUTE-001 - +30 min delay</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-red-50 border border-red-200 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium">Route Restriction</p>
                <p className="text-sm text-gray-600">Road closure affecting ROUTE-003 - reroute required</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
