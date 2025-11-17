import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  ArrowLeft, 
  MapPin, 
  Package, 
  Truck, 
  Clock,
  CheckCircle,
  FileText,
  User,
  Calendar,
  AlertCircle,
  Edit
} from 'lucide-react';

interface OrderDetailProps {
  orderId: string | null;
  onBack: () => void;
}

export function OrderDetail({ orderId, onBack }: OrderDetailProps) {
  const [activeTab, setActiveTab] = useState('workflow');

  // Mock order data
  const order = {
    id: orderId || 'ORD-2025-001',
    vin: 'VIN123456789',
    model: 'Sedan XL 2025',
    status: 'In Transit',
    progress: 75,
    origin: {
      name: 'Plant A - Mexico City',
      address: 'Av. Industrial 123, CDMX',
      departureTime: '2025-10-21 06:00',
    },
    destination: {
      name: 'Dealer Central',
      address: 'Av. Reforma 456, CDMX',
      estimatedArrival: '2025-10-21 14:00',
    },
    driver: {
      name: 'Juan Rodriguez',
      phone: '+52 555 1234567',
      license: 'DRV-12345',
    },
    fleet: {
      id: 'TRK-789',
      type: 'Carrier Truck',
      capacity: '8 vehicles',
      currentLoad: '6 vehicles',
    },
    timeline: [
      { stage: 'Order Initiated', status: 'completed', timestamp: '2025-10-20 10:00', details: 'Order created with VIN details' },
      { stage: 'Order Confirmed', status: 'completed', timestamp: '2025-10-20 10:30', details: 'Confirmed by logistics team' },
      { stage: 'Availability Checked', status: 'completed', timestamp: '2025-10-20 11:00', details: 'Driver and fleet assigned' },
      { stage: 'Route Planning', status: 'completed', timestamp: '2025-10-20 12:00', details: 'Optimal route calculated' },
      { stage: 'Load Planning', status: 'completed', timestamp: '2025-10-20 14:00', details: 'Vehicle assigned to carrier position 3' },
      { stage: 'Pre-Inspection', status: 'completed', timestamp: '2025-10-21 05:00', details: 'All safety checks passed' },
      { stage: 'Loading Complete', status: 'completed', timestamp: '2025-10-21 05:45', details: 'Vehicle loaded and secured' },
      { stage: 'In Transit', status: 'active', timestamp: '2025-10-21 06:00', details: 'Currently on route - 75% complete' },
      { stage: 'Delivery', status: 'pending', timestamp: 'Expected: 2025-10-21 14:00', details: 'Awaiting delivery' },
      { stage: 'POD Generated', status: 'pending', timestamp: 'Pending', details: 'Proof of delivery' },
    ],
    documents: [
      { name: 'Bill of Lading', type: 'PDF', uploadDate: '2025-10-20' },
      { name: 'Vehicle Inspection Report', type: 'PDF', uploadDate: '2025-10-21' },
      { name: 'Insurance Certificate', type: 'PDF', uploadDate: '2025-10-20' },
    ],
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'active': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-400 bg-gray-100';
    }
  };

  return (
    <div className="h-full">
      {/* Header */}
      <div className="p-6 border-b bg-white">
        <Button variant="ghost" onClick={onBack} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Orders
        </Button>
        
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl">{order.id}</h1>
              <Badge className="bg-blue-500">In Transit</Badge>
            </div>
            <p className="text-gray-600">VIN: {order.vin} • Model: {order.model}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Edit className="w-4 h-4 mr-2" />
              Edit Order
            </Button>
            <Button variant="outline">
              <FileText className="w-4 h-4 mr-2" />
              Print Documents
            </Button>
          </div>
        </div>
      </div>

      {/* Progress Overview */}
      <Card className="p-6 m-6 mb-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl">Delivery Progress</h2>
          <span className="text-2xl">{order.progress}%</span>
        </div>
        <Progress value={order.progress} className="h-3 mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-start gap-3">
            <div className="bg-green-100 p-2 rounded-lg">
              <MapPin className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Origin</p>
              <p className="font-medium">{order.origin.name}</p>
              <p className="text-sm text-gray-500">{order.origin.departureTime}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Truck className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Fleet</p>
              <p className="font-medium">{order.fleet.id} - {order.fleet.type}</p>
              <p className="text-sm text-gray-500">{order.fleet.currentLoad} / {order.fleet.capacity}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="bg-orange-100 p-2 rounded-lg">
              <MapPin className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Destination</p>
              <p className="font-medium">{order.destination.name}</p>
              <p className="text-sm text-gray-500">ETA: {order.destination.estimatedArrival}</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Detailed Information Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="workflow">Workflow Timeline</TabsTrigger>
          <TabsTrigger value="details">Order Details</TabsTrigger>
          <TabsTrigger value="tracking">Live Tracking</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="workflow">
          <Card className="p-6">
            <h2 className="text-xl mb-6">Workflow Progress</h2>
            <div className="space-y-4">
              {order.timeline.map((item, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getStatusColor(item.status)}`}>
                      {item.status === 'completed' ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : item.status === 'active' ? (
                        <Clock className="w-5 h-5" />
                      ) : (
                        <div className="w-2 h-2 bg-current rounded-full" />
                      )}
                    </div>
                    {index < order.timeline.length - 1 && (
                      <div className={`w-0.5 h-12 ${item.status === 'completed' ? 'bg-green-300' : 'bg-gray-200'}`} />
                    )}
                  </div>
                  <div className="flex-1 pb-8">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-medium">{item.stage}</h3>
                      <span className="text-sm text-gray-500">{item.timestamp}</span>
                    </div>
                    <p className="text-sm text-gray-600">{item.details}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="details">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <h2 className="text-xl mb-4">Vehicle Information</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Package className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">VIN</p>
                    <p className="font-medium">{order.vin}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Package className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Model</p>
                    <p className="font-medium">{order.model}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Order Created</p>
                    <p className="font-medium">2025-10-20 10:00</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl mb-4">Driver Information</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Name</p>
                    <p className="font-medium">{order.driver.name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">License</p>
                    <p className="font-medium">{order.driver.license}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Contact</p>
                    <p className="font-medium">{order.driver.phone}</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl mb-4">Route Information</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Origin</p>
                    <p className="font-medium">{order.origin.name}</p>
                    <p className="text-sm text-gray-500">{order.origin.address}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Destination</p>
                    <p className="font-medium">{order.destination.name}</p>
                    <p className="text-sm text-gray-500">{order.destination.address}</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl mb-4">Fleet Details</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Truck className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Fleet ID</p>
                    <p className="font-medium">{order.fleet.id}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Package className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Type</p>
                    <p className="font-medium">{order.fleet.type}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Current Load</p>
                    <p className="font-medium">{order.fleet.currentLoad} / {order.fleet.capacity}</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tracking">
          <Card className="p-6">
            <h2 className="text-xl mb-4">Live GPS Tracking</h2>
            <div className="bg-gray-100 rounded-lg h-96 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Map view would be integrated here</p>
                <p className="text-sm text-gray-500">GPS tracking with real-time location updates</p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Current Location</p>
                <p className="font-medium">Highway MEX-57, KM 45</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Distance Covered</p>
                <p className="font-medium">225 km / 300 km</p>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Time Remaining</p>
                <p className="font-medium">2 hours 15 minutes</p>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="documents">
          <Card className="p-6">
            <h2 className="text-xl mb-6">Order Documents</h2>
            <div className="space-y-3">
              {order.documents.map((doc, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="bg-red-100 p-2 rounded">
                      <FileText className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <p className="font-medium">{doc.name}</p>
                      <p className="text-sm text-gray-500">Uploaded: {doc.uploadDate}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">View</Button>
                    <Button variant="outline" size="sm">Download</Button>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              <FileText className="w-4 h-4 mr-2" />
              Upload New Document
            </Button>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
