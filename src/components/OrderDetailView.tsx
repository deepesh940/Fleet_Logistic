import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
  ArrowLeft,
  Building2,
  Calendar,
  MapPin,
  Package,
  Truck,
  User,
  FileText,
  CheckCircle2,
  Clock,
  AlertTriangle
} from 'lucide-react';
import { WorkflowStepper } from './WorkflowStepper';
import { Progress } from './ui/progress';

interface OrderDetailViewProps {
  orderId: string;
  onBack: () => void;
}

export function OrderDetailView({ orderId, onBack }: OrderDetailViewProps) {
  // Sample order data - in real app this would be fetched based on orderId
  const order = {
    id: 'ORD-2025-001',
    customerName: 'Customer Central Guadalajara',
    customerCode: 'GDL-001',
    customerContact: 'Juan Rodriguez',
    customerPhone: '+52 33 1234 5678',
    customerEmail: 'juan@customercentral.com',
    vins: ['VIN123456789', 'VIN987654321'],
    vehicleType: 'Sedan XL 2025',
    source: 'Sales Stock',
    yard: 'Yard A - CDMX',
    destination: 'Av. López Mateos 2500, Guadalajara, Jalisco',
    consolidationDeadline: '2025-10-24',
    deliverySLA: '2025-10-28',
    status: 'In Transit',
    workflowStage: 'dispatched',
    createdDate: '2025-10-20',
    estimatedDelivery: '2025-10-28',
    currentDriver: 'Roberto Martinez',
    currentVehicle: 'TRK-456',
    progress: 65,
  };

  // Workflow steps based on the requirements
  const workflowSteps = [
    { id: '1', label: 'Order Initiated', status: 'completed' as const },
    { id: '2', label: 'Confirmed', status: 'completed' as const },
    { id: '3', label: 'Route Planned', status: 'completed' as const },
    { id: '4', label: 'Fleet Assigned', status: 'completed' as const },
    { id: '5', label: 'In Preparation', status: 'completed' as const },
    { id: '6', label: 'Dispatched', status: 'active' as const },
    { id: '7', label: 'In Transit', status: 'upcoming' as const },
    { id: '8', label: 'Delivered', status: 'upcoming' as const },
    { id: '9', label: 'Completed', status: 'upcoming' as const },
  ];

  return (
    <div className="h-full">
      {/* Back Button and Header */}
      <div className="p-6 border-b bg-white">
        <Button variant="ghost" onClick={onBack} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Orders
        </Button>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl mb-2">Order Details: {order.id}</h1>
            <p className="text-gray-600">Complete order tracking and workflow status</p>
          </div>
          <Badge className="bg-blue-600">{order.status}</Badge>
        </div>
      </div>

      {/* Workflow Stepper */}
      <Card className="p-6 mb-6">
        <h2 className="text-xl mb-2">Order Workflow Status</h2>
        <p className="text-sm text-gray-600 mb-4">
          Track the complete lifecycle of your order from initiation to completion
        </p>
        <WorkflowStepper steps={workflowSteps} />
      </Card>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Customer Information */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Building2 className="w-5 h-5 text-red-600" />
            <h3 className="font-medium">Customer Information</h3>
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-600">Customer Name</p>
              <p className="font-medium">{order.customerName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Customer Code</p>
              <p className="font-medium">{order.customerCode}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Contact Person</p>
              <p className="font-medium">{order.customerContact}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Contact Details</p>
              <p className="text-sm">{order.customerPhone}</p>
              <p className="text-sm">{order.customerEmail}</p>
            </div>
          </div>
        </Card>

        {/* Vehicle Information */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Package className="w-5 h-5 text-red-600" />
            <h3 className="font-medium">Vehicle Information</h3>
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-600">Vehicle Type</p>
              <p className="font-medium">{order.vehicleType}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Vehicle Count</p>
              <Badge variant="secondary">{order.vins.length} vehicles</Badge>
            </div>
            <div>
              <p className="text-sm text-gray-600">VIN Numbers</p>
              <div className="space-y-1 mt-2">
                {order.vins.map((vin) => (
                  <div key={vin} className="text-sm font-mono bg-gray-50 p-2 rounded">
                    {vin}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600">Source</p>
              <p className="font-medium">{order.source}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Source Yard</p>
              <p className="font-medium">{order.yard}</p>
            </div>
          </div>
        </Card>

        {/* Delivery Information */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-5 h-5 text-red-600" />
            <h3 className="font-medium">Delivery Information</h3>
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-600">Destination</p>
              <p className="font-medium">{order.destination}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Order Created</p>
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3 text-gray-400" />
                <p className="text-sm">{order.createdDate}</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600">Estimated Delivery</p>
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3 text-gray-400" />
                <p className="text-sm">{order.estimatedDelivery}</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600">Delivery SLA</p>
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-gray-400" />
                <p className="text-sm">{order.deliverySLA}</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Current Trip Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Trip Progress */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Truck className="w-5 h-5 text-red-600" />
            <h3 className="font-medium">Current Trip Status</h3>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-600">Delivery Progress</span>
                <span className="text-sm font-medium">{order.progress}%</span>
              </div>
              <Progress value={order.progress} className="h-2" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Driver</p>
                <p className="font-medium">{order.currentDriver}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Vehicle</p>
                <p className="font-medium">{order.currentVehicle}</p>
              </div>
            </div>
            <div className="pt-4 border-t">
              <Button className="w-full bg-red-600 hover:bg-red-700">
                <MapPin className="w-4 h-4 mr-2" />
                View Live Tracking
              </Button>
            </div>
          </div>
        </Card>

        {/* Timeline */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-5 h-5 text-red-600" />
            <h3 className="font-medium">Order Timeline</h3>
          </div>
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="flex flex-col items-center">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <div className="w-0.5 h-full bg-green-500 mt-1" />
              </div>
              <div className="flex-1 pb-4">
                <p className="text-sm font-medium">Order Created</p>
                <p className="text-xs text-gray-500">Oct 20, 2025 - 10:30 AM</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex flex-col items-center">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <div className="w-0.5 h-full bg-green-500 mt-1" />
              </div>
              <div className="flex-1 pb-4">
                <p className="text-sm font-medium">Confirmed & Route Planned</p>
                <p className="text-xs text-gray-500">Oct 20, 2025 - 2:15 PM</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex flex-col items-center">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <div className="w-0.5 h-full bg-green-500 mt-1" />
              </div>
              <div className="flex-1 pb-4">
                <p className="text-sm font-medium">Fleet Assigned</p>
                <p className="text-xs text-gray-500">Oct 21, 2025 - 9:00 AM</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex flex-col items-center">
                <Clock className="w-5 h-5 text-blue-500" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">In Transit</p>
                <p className="text-xs text-gray-500">Oct 22, 2025 - 8:00 AM</p>
                <Badge className="bg-blue-500 mt-1">Current Status</Badge>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
