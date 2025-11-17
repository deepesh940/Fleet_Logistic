import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
  CheckCircle,
  Download,
  Mail,
  Printer,
  FileText,
  Image as ImageIcon,
  MapPin,
  Clock,
  User,
  Package,
  DollarSign
} from 'lucide-react';
import { toast } from 'sonner';

export function ProofOfDelivery() {
  const deliveryInfo = {
    orderId: 'ORD-2025-001',
    customerName: 'Customer Central Guadalajara',
    customerCode: 'GDL-001',
    deliveryDate: 'October 25, 2025',
    deliveryTime: '14:45',
    location: 'Av. López Mateos 2500, Guadalajara, Jalisco 44600',
    driver: 'Roberto Martinez',
    vehicle: 'TRK-001',
    vehicleCount: 6,
  };

  const deliveredVehicles = [
    { vin: 'VIN123456789', model: 'Sedan XL 2025', condition: 'Excellent' },
    { vin: 'VIN987654321', model: 'SUV Pro 2025', condition: 'Excellent' },
    { vin: 'VIN456789123', model: 'Truck Max 2025', condition: 'Excellent' },
    { vin: 'VIN789123456', model: 'Van Cargo 2025', condition: 'Good' },
    { vin: 'VIN321654987', model: 'Sedan XL 2025', condition: 'Excellent' },
    { vin: 'VIN654987321', model: 'SUV Pro 2025', condition: 'Excellent' },
  ];

  const deliveryPhotos = [
    { id: 1, type: 'Vehicle 1', timestamp: '14:30' },
    { id: 2, type: 'Vehicle 2', timestamp: '14:32' },
    { id: 3, type: 'Vehicle 3', timestamp: '14:35' },
    { id: 4, type: 'Vehicle 4', timestamp: '14:38' },
    { id: 5, type: 'Vehicle 5', timestamp: '14:40' },
    { id: 6, type: 'Vehicle 6', timestamp: '14:42' },
  ];

  const handleSendPOD = () => {
    toast.success('Delivery confirmation sent to customer email');
  };

  const handleDownloadPOD = () => {
    toast.success('Downloading POD certificate...');
  };

  const handleGenerateInvoice = () => {
    toast.success('Redirecting to billing system...');
  };

  const handleCompleteOrder = () => {
    toast.success('Order marked as completed!');
  };

  return (
    <div className="h-full">
      {/* Header */}
      <div className="p-6 border-b bg-white">
        <h1 className="text-3xl mb-2">Delivery & Completion</h1>
        <p className="text-gray-600">Generate delivery confirmation and complete order</p>
      </div>

      {/* Success Banner */}
      <Card className="p-6 m-6 mb-4 bg-gradient-to-r from-green-50 to-emerald-50 border-green-300">
        <div className="flex items-center gap-4">
          <div className="bg-green-500 p-4 rounded-full">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-medium text-green-900">Delivery Completed Successfully</h2>
            <p className="text-green-700">Order {deliveryInfo.orderId} delivered on {deliveryInfo.deliveryDate} at {deliveryInfo.deliveryTime}</p>
          </div>
          <Badge className="bg-green-600 text-lg px-4 py-2">DELIVERED</Badge>
        </div>
      </Card>

      <div className="grid grid-cols-12 gap-6 px-6 pb-6 bg-gray-50">
        {/* Left Panel - Delivery Summary */}
        <div className="col-span-7">
          <Card className="p-6 mb-6">
            <h3 className="font-medium mb-6 flex items-center gap-2">
              <FileText className="w-5 h-5 text-red-600" />
              Delivery Summary
            </h3>

            <div className="grid grid-cols-2 gap-6 mb-6">
              {/* Order Information */}
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Order ID</p>
                  <p className="font-medium text-lg">{deliveryInfo.orderId}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Customer</p>
                  <p className="font-medium">{deliveryInfo.customerName}</p>
                  <Badge variant="outline" className="mt-1">{deliveryInfo.customerCode}</Badge>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Vehicle Count</p>
                  <p className="font-medium">{deliveryInfo.vehicleCount} vehicles</p>
                </div>
              </div>

              {/* Delivery Details */}
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> Delivery Timestamp
                  </p>
                  <p className="font-medium">{deliveryInfo.deliveryDate}</p>
                  <p className="text-sm text-gray-600">{deliveryInfo.deliveryTime}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1 flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> Location
                  </p>
                  <p className="text-sm">{deliveryInfo.location}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1 flex items-center gap-1">
                    <User className="w-3 h-3" /> Driver
                  </p>
                  <p className="font-medium">{deliveryInfo.driver}</p>
                  <p className="text-sm text-gray-600">{deliveryInfo.vehicle}</p>
                </div>
              </div>
            </div>

            {/* Delivered Vehicles List */}
            <div className="border-t pt-4">
              <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
                <Package className="w-4 h-4" />
                Delivered Vehicles
              </h4>
              <div className="space-y-2">
                {deliveredVehicles.map((vehicle, index) => (
                  <div key={vehicle.vin} className="p-3 bg-gray-50 rounded-lg flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline">#{index + 1}</Badge>
                      <div>
                        <p className="text-sm font-medium">{vehicle.model}</p>
                        <p className="text-xs font-mono text-gray-500">{vehicle.vin}</p>
                      </div>
                    </div>
                    <Badge className={vehicle.condition === 'Excellent' ? 'bg-green-500' : 'bg-blue-500'}>
                      {vehicle.condition}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Digital Signatures */}
          <Card className="p-6">
            <h3 className="font-medium mb-4">Digital Signatures</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="border rounded-lg p-6 bg-gradient-to-br from-blue-50 to-indigo-50">
                <p className="text-sm text-gray-600 mb-3">Customer Signature</p>
                <div className="bg-white border-2 rounded p-8 mb-3 text-center">
                  <p className="font-cursive text-2xl text-gray-700">Juan Rodriguez</p>
                </div>
                <p className="text-xs text-gray-500">Signed: {deliveryInfo.deliveryDate} {deliveryInfo.deliveryTime}</p>
              </div>
              <div className="border rounded-lg p-6 bg-gradient-to-br from-green-50 to-emerald-50">
                <p className="text-sm text-gray-600 mb-3">Driver Confirmation</p>
                <div className="bg-white border-2 rounded p-8 mb-3 text-center">
                  <p className="font-cursive text-2xl text-gray-700">Roberto Martinez</p>
                </div>
                <p className="text-xs text-gray-500">Confirmed: {deliveryInfo.deliveryDate} {deliveryInfo.deliveryTime}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Panel - Photos & Actions */}
        <div className="col-span-5">
          {/* Photo Gallery */}
          <Card className="p-6 mb-6">
            <h3 className="font-medium mb-4 flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-red-600" />
              Delivery Photo Gallery
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {deliveryPhotos.map((photo) => (
                <div key={photo.id} className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="bg-gradient-to-br from-gray-200 to-gray-300 h-24 flex items-center justify-center">
                    <ImageIcon className="w-8 h-8 text-gray-500" />
                  </div>
                  <div className="p-2 bg-white">
                    <p className="text-xs font-medium">{photo.type}</p>
                    <p className="text-xs text-gray-500">{photo.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              View All Photos
            </Button>
          </Card>

          {/* Generated Documents */}
          <Card className="p-6 mb-6 bg-blue-50 border-blue-200">
            <h3 className="font-medium mb-4">Generated Documents</h3>
            <div className="space-y-2">
              <div className="p-3 bg-white rounded flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-600" />
                  <span className="text-sm">POD Certificate</span>
                </div>
                <Badge className="bg-green-500">Ready</Badge>
              </div>
              <div className="p-3 bg-white rounded flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-600" />
                  <span className="text-sm">Delivery Report</span>
                </div>
                <Badge className="bg-green-500">Ready</Badge>
              </div>
              <div className="p-3 bg-white rounded flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-blue-600" />
                  <span className="text-sm">Photo Attachments</span>
                </div>
                <Badge className="bg-green-500">{deliveryPhotos.length}</Badge>
              </div>
            </div>
          </Card>

          {/* Action Buttons */}
          <Card className="p-6">
            <h3 className="font-medium mb-4">Actions</h3>
            <div className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={handleDownloadPOD}
              >
                <Download className="w-4 h-4 mr-2" />
                Download POD Certificate
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={handleSendPOD}
              >
                <Mail className="w-4 h-4 mr-2" />
                Send POD to Customer Email
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
              >
                <Printer className="w-4 h-4 mr-2" />
                Print Documents
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start border-blue-600 text-blue-600 hover:bg-blue-50"
                onClick={handleGenerateInvoice}
              >
                <DollarSign className="w-4 h-4 mr-2" />
                Generate Invoice (Billing)
              </Button>
            </div>
          </Card>

          {/* Complete Order Button */}
          <Button 
            className="w-full h-14 text-lg bg-green-600 hover:bg-green-700 mt-6"
            onClick={handleCompleteOrder}
          >
            <CheckCircle className="w-5 h-5 mr-2" />
            Mark Order as Completed
          </Button>
        </div>
      </div>
    </div>
  );
}
