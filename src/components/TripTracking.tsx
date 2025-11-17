import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  MapPin, 
  Filter,
  Truck,
  Clock,
  AlertTriangle,
  Navigation
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Progress } from './ui/progress';

export function TripTracking() {
  const [statusFilter, setStatusFilter] = useState('all');

  const trips = [
    {
      id: 'TRP-001',
      truckId: 'TRK-002',
      route: 'Mexico City → Guadalajara',
      type: 'Direct',
      driver: 'Juan Rodriguez',
      vehicles: 8,
      currentLocation: 'Highway MEX-15, KM 245',
      progress: 82,
      eta: '1 hour 15 min',
      status: 'On Time',
      delay: 0
    },
    {
      id: 'TRP-002',
      truckId: 'TRK-005',
      route: 'Monterrey → Tijuana → Mexicali',
      type: 'Milk Run',
      driver: 'Maria Garcia',
      vehicles: 6,
      currentLocation: 'Highway MEX-40, KM 892',
      progress: 45,
      eta: '8 hours 30 min',
      status: 'On Time',
      delay: 0
    },
    {
      id: 'TRP-003',
      truckId: 'TRK-001',
      route: 'Puebla → Veracruz',
      type: 'Direct',
      driver: 'Carlos Martinez',
      vehicles: 2,
      currentLocation: 'Highway MEX-150, KM 67',
      progress: 65,
      eta: '2 hours 45 min',
      status: 'Delayed',
      delay: 45
    },
  ];

  const getStatusBadge = (status: string) => {
    if (status === 'On Time') return <Badge className="bg-green-500">On Time</Badge>;
    if (status === 'Delayed') return <Badge variant="destructive">Delayed</Badge>;
    return <Badge variant="secondary">Unknown</Badge>;
  };

  const filteredTrips = trips.filter(trip => 
    statusFilter === 'all' || 
    (statusFilter === 'ontime' && trip.status === 'On Time') ||
    (statusFilter === 'delayed' && trip.status === 'Delayed')
  );

  return (
    <div className="h-full">
      <div className="p-6 border-b bg-white">
        <h1 className="text-3xl mb-2">Live Trip Tracking</h1>
        <p className="text-gray-600">Real-time fleet monitoring and GPS tracking</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Truck className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl">{trips.length}</p>
              <p className="text-sm text-gray-600">Active Trips</p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="bg-green-100 p-3 rounded-lg">
              <Clock className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl">{trips.filter(t => t.status === 'On Time').length}</p>
              <p className="text-sm text-gray-600">On Time</p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="bg-red-100 p-3 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-2xl">{trips.filter(t => t.status === 'Delayed').length}</p>
              <p className="text-sm text-gray-600">Delayed</p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="bg-purple-100 p-3 rounded-lg">
              <Navigation className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl">89</p>
              <p className="text-sm text-gray-600">Vehicles in Transit</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Live Map */}
      <Card className="p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl">Live GPS Tracking Map</h2>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-48">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filter status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Trips</SelectItem>
              <SelectItem value="ontime">On Time</SelectItem>
              <SelectItem value="delayed">Delayed</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-lg h-96 flex items-center justify-center relative">
          <div className="text-center z-10">
            <MapPin className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <p className="text-gray-700 font-medium">Google Maps Integration</p>
            <p className="text-sm text-gray-500">Real-time truck locations with route overlay</p>
          </div>
          {/* Simulated truck markers */}
          <div className="absolute top-10 left-10 bg-green-500 rounded-full w-4 h-4 animate-pulse" />
          <div className="absolute top-20 right-20 bg-green-500 rounded-full w-4 h-4 animate-pulse" />
          <div className="absolute bottom-20 left-1/3 bg-yellow-500 rounded-full w-4 h-4 animate-pulse" />
        </div>
      </Card>

      {/* Trip List */}
      <Card className="p-6">
        <h2 className="text-xl mb-4">Active Trips</h2>
        <div className="space-y-4">
          {filteredTrips.map((trip) => (
            <div key={trip.id} className="p-4 bg-gray-50 rounded-lg border">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium">{trip.id}</p>
                    <Badge variant="outline">{trip.type}</Badge>
                    {getStatusBadge(trip.status)}
                    {trip.delay > 0 && (
                      <Badge variant="destructive" className="text-xs">+{trip.delay} min</Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{trip.route}</p>
                </div>
                <Button variant="outline" size="sm">
                  <MapPin className="w-4 h-4 mr-2" />
                  Track
                </Button>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                <div>
                  <p className="text-xs text-gray-600">Truck</p>
                  <p className="text-sm font-medium">{trip.truckId}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Driver</p>
                  <p className="text-sm font-medium">{trip.driver}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Vehicles</p>
                  <p className="text-sm font-medium">{trip.vehicles}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">ETA</p>
                  <p className="text-sm font-medium">{trip.eta}</p>
                </div>
              </div>

              <div className="mb-2">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-gray-600">Current: {trip.currentLocation}</span>
                  <span className="font-medium">{trip.progress}%</span>
                </div>
                <Progress value={trip.progress} className="h-2" />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
