import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import {
  Truck,
  User,
  MapPin,
  Clock,
  Search,
  Filter,
  CheckCircle,
  AlertCircle,
  Calendar,
  Package
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Label } from './ui/label';
import { toast } from 'sonner';

interface FleetAssignmentProps {
  orderData?: any;
  workflowData?: any;
  onComplete?: (data: any) => void;
  isWorkflowMode?: boolean;
}

export function FleetAssignment({ orderData, workflowData, onComplete, isWorkflowMode = false }: FleetAssignmentProps) {
  const [selectedFleet, setSelectedFleet] = useState<string | null>(null);
  const [selectedDriver, setSelectedDriver] = useState<string | null>(null);
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const tripSummary = {
    orderId: 'ORD-2025-001',
    vehicleCount: 6,
    totalM3: 81.59,
    destination: 'Guadalajara, Jalisco',
    estimatedDistance: '542 km',
    estimatedDuration: '6.5 hrs'
  };

  const availableFleet = [
    {
      id: 'TRK-001',
      vehicleNumber: 'TRK-001',
      type: 'Multi Carrier (6-Unit)',
      capacity: '45 M³',
      status: 'Available',
      driver: 'Roberto Martinez',
      currentLocation: 'Yard A - CDMX',
      nextAvailable: 'Now',
      image: '🚛'
    },
    {
      id: 'TRL-002',
      vehicleNumber: 'TRL-002',
      type: 'Trailer (12-Unit)',
      capacity: '90 M³',
      status: 'Available',
      driver: 'Unassigned',
      currentLocation: 'Yard B - Monterrey',
      nextAvailable: 'Now',
      image: '🚚'
    },
    {
      id: 'TRK-003',
      vehicleNumber: 'TRK-003',
      type: 'Multi Carrier (6-Unit)',
      capacity: '45 M³',
      status: 'In Use',
      driver: 'Carlos Hernandez',
      currentLocation: 'En Route to Tijuana',
      nextAvailable: 'Oct 26, 10:00 AM',
      image: '🚛'
    },
    {
      id: 'TRL-004',
      vehicleNumber: 'TRL-004',
      type: 'Trailer (12-Unit)',
      capacity: '90 M³',
      status: 'Maintenance',
      driver: 'Unassigned',
      currentLocation: 'Service Center',
      nextAvailable: 'Oct 27, 2:00 PM',
      image: '🚚'
    },
    {
      id: 'TRK-005',
      vehicleNumber: 'TRK-005',
      type: 'Single Carrier (3-Unit)',
      capacity: '25 M³',
      status: 'Available',
      driver: 'Miguel Lopez',
      currentLocation: 'Yard C - Puebla',
      nextAvailable: 'Now',
      image: '🚐'
    },
    {
      id: 'TRK-006',
      vehicleNumber: 'TRK-006',
      type: 'Multi Carrier (6-Unit)',
      capacity: '45 M³',
      status: 'Available',
      driver: 'Unassigned',
      currentLocation: 'Yard A - CDMX',
      nextAvailable: 'Now',
      image: '🚛'
    },
  ];

  const drivers = [
    { id: '1', name: 'Roberto Martinez', status: 'Available' },
    { id: '2', name: 'Carlos Hernandez', status: 'On Trip' },
    { id: '3', name: 'Miguel Lopez', status: 'Available' },
    { id: '4', name: 'Juan Ramirez', status: 'Available' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available':
        return 'bg-green-500';
      case 'In Use':
        return 'bg-blue-500';
      case 'Maintenance':
        return 'bg-orange-500';
      default:
        return 'bg-gray-500';
    }
  };

  const handleAssignFleet = () => {
    if (!selectedFleet) {
      toast.error('Please select a fleet vehicle');
      return;
    }
    if (!selectedDriver) {
      toast.error('Please select a driver');
      return;
    }
    toast.success('Fleet assigned successfully!');
    if (onComplete) {
      onComplete({
        orderId: tripSummary.orderId,
        vehicleId: selectedFleet,
        driverId: selectedDriver,
        estimatedLoadingTime: '08:00',
        estimatedTravelTime: '6.5 hours',
        estimatedDeliveryTime: '14:30'
      });
    }
  };

  const filteredFleet = availableFleet.filter(fleet => {
    if (filterStatus !== 'all' && fleet.status !== filterStatus) return false;
    if (filterType !== 'all' && !fleet.type.toLowerCase().includes(filterType)) return false;
    return true;
  });

  return (
    <div className="h-full">
      {/* Header */}
      <div className="p-6 border-b bg-white">
        <h1 className="text-3xl mb-2">Fleet Assignment</h1>
        <p className="text-gray-600">Assign specific fleet and drivers to trips</p>
      </div>

      {/* Trip Summary Card */}
      <Card className="p-6 m-6 mb-4 bg-gradient-to-r from-red-50 to-orange-50 border-red-200">
        <h3 className="font-medium mb-4 flex items-center gap-2">
          <Package className="w-5 h-5 text-red-600" />
          Trip Summary - {tripSummary.orderId}
        </h3>
        <div className="grid grid-cols-6 gap-4">
          <div>
            <p className="text-sm text-gray-600">Vehicles</p>
            <p className="font-medium">{tripSummary.vehicleCount} units</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Total Volume</p>
            <p className="font-medium">{tripSummary.totalM3} M³</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Destination</p>
            <p className="font-medium">{tripSummary.destination}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Distance</p>
            <p className="font-medium">{tripSummary.estimatedDistance}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Est. Duration</p>
            <p className="font-medium">{tripSummary.estimatedDuration}</p>
          </div>
          <div className="flex items-center">
            <Button className="bg-red-600 hover:bg-red-700" onClick={handleAssignFleet}>
              <CheckCircle className="w-4 h-4 mr-2" />
              Assign Fleet
            </Button>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-12 gap-6 px-6 pb-6 bg-gray-50">
        {/* Main Area - Fleet Grid */}
        <div className="col-span-8">
          {/* Filters */}
          <Card className="p-4 mb-6">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input placeholder="Search by vehicle number or driver..." className="pl-10" />
              </div>
              <div className="w-48">
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Vehicle Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="multi">Multi Carrier</SelectItem>
                    <SelectItem value="trailer">Trailer</SelectItem>
                    <SelectItem value="single">Single Carrier</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-48">
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="Available">Available</SelectItem>
                    <SelectItem value="In Use">In Use</SelectItem>
                    <SelectItem value="Maintenance">Maintenance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                More Filters
              </Button>
            </div>
          </Card>

          {/* Fleet Grid */}
          <div className="grid grid-cols-2 gap-4">
            {filteredFleet.map((fleet) => (
              <Card 
                key={fleet.id}
                className={`p-6 cursor-pointer transition-all ${
                  selectedFleet === fleet.id 
                    ? 'ring-2 ring-red-600 bg-red-50' 
                    : 'hover:shadow-lg'
                }`}
                onClick={() => fleet.status === 'Available' && setSelectedFleet(fleet.id)}
              >
                {/* Vehicle Icon/Photo */}
                <div className="text-center mb-4">
                  <div className="text-6xl mb-2">{fleet.image}</div>
                  <h3 className="font-medium">{fleet.vehicleNumber}</h3>
                  <p className="text-sm text-gray-600">{fleet.type}</p>
                </div>

                {/* Details */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Capacity</span>
                    <Badge variant="outline">{fleet.capacity}</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Status</span>
                    <Badge className={getStatusColor(fleet.status)}>
                      {fleet.status}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-400" />
                    <span className="text-sm">{fleet.driver}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-sm">{fleet.currentLocation}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-sm">{fleet.nextAvailable}</span>
                  </div>
                </div>

                {/* Selection Indicator */}
                {selectedFleet === fleet.id && (
                  <div className="mt-4 pt-4 border-t">
                    <div className="flex items-center justify-center text-red-600">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      <span className="font-medium">Selected</span>
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>

        {/* Right Panel - Driver & Schedule */}
        <div className="col-span-4 space-y-6">
          <Card className="p-6">
            <h3 className="font-medium mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-red-600" />
              Driver Assignment
            </h3>

            <div className="space-y-4">
              <div>
                <Label>Select Driver</Label>
                <Select value={selectedDriver || ''} onValueChange={setSelectedDriver}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Choose driver" />
                  </SelectTrigger>
                  <SelectContent>
                    {drivers.filter(d => d.status === 'Available').map(driver => (
                      <SelectItem key={driver.id} value={driver.id}>
                        {driver.name} - {driver.status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Estimated Loading Time</Label>
                <Input type="time" defaultValue="08:00" className="mt-1" />
              </div>

              <div>
                <Label>Estimated Travel Time</Label>
                <Input value="6.5 hours" disabled className="mt-1" />
              </div>

              <div>
                <Label>Estimated Delivery Time</Label>
                <Input type="time" defaultValue="14:30" className="mt-1" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-medium mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-red-600" />
              Schedule Conflicts
            </h3>

            <div className="space-y-3">
              <div className="p-3 bg-green-50 rounded-lg flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-green-900">No Conflicts</p>
                  <p className="text-xs text-green-700">Selected vehicle and driver are available</p>
                </div>
              </div>

              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-sm font-medium mb-2">Delivery Slot</p>
                <p className="text-xs text-gray-600">Window: Oct 25, 2:00 PM - 6:00 PM</p>
                <p className="text-xs text-gray-600">Confirmed: Oct 25, 2:30 PM</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-yellow-50 border-yellow-200">
            <h3 className="font-medium mb-2 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-yellow-600" />
              Important Notes
            </h3>
            <ul className="text-sm space-y-1 text-gray-700">
              <li>• Verify driver license validity</li>
              <li>• Check vehicle maintenance status</li>
              <li>• Confirm fuel and supplies</li>
              <li>• Review route and weather conditions</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}