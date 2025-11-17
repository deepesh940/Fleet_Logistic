import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import {
  User,
  MapPin,
  Phone,
  Mail,
  CheckCircle,
  Camera,
  Upload,
  AlertCircle,
  Package,
  FileText
} from 'lucide-react';
import { Progress } from './ui/progress';
import { toast } from 'sonner';

export function DeliveryExecution() {
  const [deliverySteps, setDeliverySteps] = useState({
    arrived: false,
    unloaded: false,
    inspected: false,
    signed: false,
    photographed: false,
  });

  const customerInfo = {
    name: 'Customer Central Guadalajara',
    code: 'GDL-001',
    contact: 'Juan Rodriguez',
    phone: '+52 33 1234 5678',
    email: 'juan@customercentral.com',
    address: 'Av. López Mateos 2500, Guadalajara, Jalisco 44600',
  };

  const deliveryDetails = {
    orderId: 'ORD-2025-001',
    vehicleCount: 6,
    arrivalTime: '--:--',
    expectedTime: '14:30',
  };

  const vehicleList = [
    { vin: 'VIN123456789', model: 'Sedan XL 2025', inspected: false },
    { vin: 'VIN987654321', model: 'SUV Pro 2025', inspected: false },
    { vin: 'VIN456789123', model: 'Truck Max 2025', inspected: false },
    { vin: 'VIN789123456', model: 'Van Cargo 2025', inspected: false },
    { vin: 'VIN321654987', model: 'Sedan XL 2025', inspected: false },
    { vin: 'VIN654987321', model: 'SUV Pro 2025', inspected: false },
  ];

  const checklistItems = [
    { id: 'arrived', label: 'Arrive at Destination Confirmed', time: '' },
    { id: 'unloaded', label: 'Vehicle Unloading Verified', time: '' },
    { id: 'inspected', label: 'Customer Inspection Completed', time: '' },
    { id: 'signed', label: 'Digital Signatures Captured', time: '' },
    { id: 'photographed', label: 'Photo Documentation Complete', time: '' },
  ];

  const completedSteps = Object.values(deliverySteps).filter(Boolean).length;
  const progress = (completedSteps / Object.keys(deliverySteps).length) * 100;
  const allStepsComplete = Object.values(deliverySteps).every(Boolean);

  const handleArriveAtDestination = () => {
    setDeliverySteps(prev => ({ ...prev, arrived: true }));
    toast.success('Arrival confirmed!');
  };

  const handleCompleteDelivery = () => {
    if (!allStepsComplete) {
      toast.error('Please complete all delivery steps');
      return;
    }
    toast.success('Delivery completed successfully!');
  };

  const handleReportIssue = () => {
    toast.info('Opening issue report form...');
  };

  return (
    <div className="h-full">
      {/* Header */}
      <div className="p-6 border-b bg-white">
        <h1 className="text-3xl mb-2">In Transit</h1>
        <p className="text-gray-600">Real-time tracking and delivery monitoring</p>
      </div>

      {/* Progress Bar */}
      <Card className="p-6 m-6 mb-4 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium">Delivery Progress</h3>
          <Badge variant={allStepsComplete ? 'default' : 'secondary'} 
                 className={allStepsComplete ? 'bg-green-500' : ''}>
            {completedSteps}/{Object.keys(deliverySteps).length} Steps
          </Badge>
        </div>
        <Progress value={progress} className="h-3 mb-2" />
        <p className="text-sm text-gray-600">Order: {deliveryDetails.orderId} • {deliveryDetails.vehicleCount} vehicles</p>
      </Card>

      <div className="grid grid-cols-12 gap-6 px-6 pb-6 bg-gray-50">
        {/* Left Panel - Customer Info & Checklist */}
        <div className="col-span-5">
          {/* Customer Information */}
          <Card className="p-6 mb-6">
            <h3 className="font-medium mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-red-600" />
              Customer Information
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Customer Name</p>
                <p className="font-medium">{customerInfo.name}</p>
                <Badge variant="outline" className="mt-1">{customerInfo.code}</Badge>
              </div>
              <div>
                <p className="text-sm text-gray-600">Contact Person</p>
                <p className="font-medium">{customerInfo.contact}</p>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4 text-gray-400" />
                <span>{customerInfo.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4 text-gray-400" />
                <span>{customerInfo.email}</span>
              </div>
              <div className="pt-2 border-t">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                  <p className="text-sm">{customerInfo.address}</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Delivery Checklist */}
          <Card className="p-6">
            <h3 className="font-medium mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-red-600" />
              Delivery Steps
            </h3>
            <div className="space-y-3">
              {checklistItems.map((item) => (
                <div 
                  key={item.id}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    deliverySteps[item.id as keyof typeof deliverySteps]
                      ? 'bg-green-50 border-green-300'
                      : 'bg-white border-gray-200'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id={item.id}
                      checked={deliverySteps[item.id as keyof typeof deliverySteps]}
                      onCheckedChange={(checked) =>
                        setDeliverySteps(prev => ({ ...prev, [item.id]: checked as boolean }))
                      }
                    />
                    <Label htmlFor={item.id} className="cursor-pointer flex-1">
                      {item.label}
                      {deliverySteps[item.id as keyof typeof deliverySteps] && (
                        <p className="text-xs text-gray-500 mt-1">
                          Completed at {new Date().toLocaleTimeString()}
                        </p>
                      )}
                    </Label>
                  </div>
                </div>
              ))}
            </div>

            {!deliverySteps.arrived && (
              <Button 
                className="w-full mt-4 bg-blue-600 hover:bg-blue-700"
                onClick={handleArriveAtDestination}
              >
                <MapPin className="w-4 h-4 mr-2" />
                Confirm Arrival at Destination
              </Button>
            )}
          </Card>
        </div>

        {/* Right Panel - Inspection & Documentation */}
        <div className="col-span-7">
          {/* Vehicle Inspection List */}
          <Card className="p-6 mb-6">
            <h3 className="font-medium mb-4 flex items-center gap-2">
              <Package className="w-5 h-5 text-red-600" />
              Vehicle Unloading & Inspection
            </h3>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {vehicleList.map((vehicle, index) => (
                <div key={vehicle.vin} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">#{index + 1}</Badge>
                        <span className="text-sm font-medium">{vehicle.model}</span>
                      </div>
                      <p className="text-xs font-mono text-gray-500 mt-1">{vehicle.vin}</p>
                    </div>
                    <Checkbox />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Digital Signature Capture */}
          <Card className="p-6 mb-6">
            <h3 className="font-medium mb-4">Digital Signature Capture</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="mb-2 block">Customer Signature</Label>
                <div className="border-2 border-dashed rounded-lg p-12 text-center bg-gray-50 hover:bg-gray-100 cursor-pointer">
                  <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">Tap to sign</p>
                </div>
              </div>
              <div>
                <Label className="mb-2 block">Driver Signature</Label>
                <div className="border-2 border-dashed rounded-lg p-12 text-center bg-gray-50 hover:bg-gray-100 cursor-pointer">
                  <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">Tap to sign</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Photo Documentation */}
          <Card className="p-6 mb-6">
            <h3 className="font-medium mb-4 flex items-center gap-2">
              <Camera className="w-5 h-5 text-red-600" />
              Photo Documentation
            </h3>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline">
                  <Camera className="w-4 h-4 mr-2" />
                  Take Photo
                </Button>
                <Button variant="outline">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Photo
                </Button>
              </div>
              <div className="bg-gray-100 p-8 rounded-lg border-2 border-dashed text-center">
                <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500">No photos uploaded</p>
                <p className="text-xs text-gray-400 mt-1">Take photos of delivered vehicles</p>
              </div>
            </div>
          </Card>

          {/* Special Instructions / Notes */}
          <Card className="p-6 mb-6">
            <h3 className="font-medium mb-4">Notes / Special Instructions</h3>
            <Textarea 
              placeholder="Enter any special delivery notes, customer requests, or issues encountered..."
              rows={4}
            />
          </Card>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <Button 
              variant="outline"
              className="border-orange-600 text-orange-600 hover:bg-orange-50"
              onClick={handleReportIssue}
            >
              <AlertCircle className="w-4 h-4 mr-2" />
              Report Delivery Issue
            </Button>
            <Button 
              className={`${
                allStepsComplete
                  ? 'bg-green-600 hover:bg-green-700'
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
              onClick={handleCompleteDelivery}
              disabled={!allStepsComplete}
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Mark as Delivered
            </Button>
          </div>

          {!allStepsComplete && (
            <Card className="p-4 bg-yellow-50 border-yellow-200 mt-4">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-yellow-900">Incomplete Delivery Steps</p>
                  <p className="text-sm text-yellow-700">Please complete all steps before marking as delivered</p>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
