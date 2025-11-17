import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import {
  FileText,
  CheckCircle,
  Download,
  Printer,
  Send,
  User,
  Truck,
  MapPin,
  Package,
  AlertCircle,
  Image as ImageIcon
} from 'lucide-react';
import { Progress } from './ui/progress';
import { toast } from 'sonner';

export function DispatchPreparation() {
  const [documentsChecked, setDocumentsChecked] = useState({
    manifest: false,
    inspection: false,
    route: false,
    instructions: false,
    insurance: false,
  });

  const tripDetails = {
    orderId: 'ORD-2025-001',
    vehicle: 'TRK-001',
    driver: 'Roberto Martinez',
    destination: 'Guadalajara, Jalisco',
    vehicleCount: 6,
    estimatedDistance: '542 km',
    estimatedDuration: '6.5 hrs'
  };

  const documents = [
    { id: 'manifest', label: 'Delivery Manifest', status: 'ready', icon: FileText },
    { id: 'inspection', label: 'Vehicle Inspection Report', status: 'ready', icon: CheckCircle },
    { id: 'route', label: 'Route Plan', status: 'ready', icon: MapPin },
    { id: 'instructions', label: 'Customer Delivery Instructions', status: 'ready', icon: Package },
    { id: 'insurance', label: 'Insurance/Transit Documents', status: 'pending', icon: AlertCircle },
  ];

  const inspectionPhotos = [
    { id: 1, vehicle: 'VIN123456789', timestamp: '10:30 AM', count: 4 },
    { id: 2, vehicle: 'VIN987654321', timestamp: '10:35 AM', count: 5 },
    { id: 3, vehicle: 'VIN456789123', timestamp: '10:42 AM', count: 4 },
  ];

  const allDocumentsChecked = Object.values(documentsChecked).every(Boolean);
  const checkedCount = Object.values(documentsChecked).filter(Boolean).length;
  const progress = (checkedCount / Object.keys(documentsChecked).length) * 100;

  const handleGenerateDocuments = () => {
    toast.success('Generating dispatch documentation...');
  };

  const handlePrintDocuments = () => {
    toast.success('Sending documents to printer...');
  };

  const handleSendToDriver = () => {
    toast.success('Digital copies sent to driver app');
  };

  const handleConfirmDispatch = () => {
    if (!allDocumentsChecked) {
      toast.error('Please complete all document checks before dispatching');
      return;
    }
    toast.success('Dispatch confirmed! Vehicle is cleared to leave yard');
  };

  return (
    <div className="h-full">
      {/* Header */}
      <div className="p-6 border-b bg-white">
        <h1 className="text-3xl mb-2">Dispatch Preparation & Documentation</h1>
        <p className="text-gray-600">Final checks before vehicle leaves yard</p>
      </div>

      {/* Trip Summary */}
      <Card className="p-6 m-6 mb-4 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <h3 className="font-medium mb-4">Trip Summary</h3>
        <div className="grid grid-cols-6 gap-4">
          <div>
            <p className="text-sm text-gray-600">Order ID</p>
            <p className="font-medium">{tripDetails.orderId}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Vehicle</p>
            <p className="font-medium">{tripDetails.vehicle}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Driver</p>
            <p className="font-medium">{tripDetails.driver}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Destination</p>
            <p className="font-medium">{tripDetails.destination}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Vehicle Count</p>
            <p className="font-medium">{tripDetails.vehicleCount} units</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Est. Duration</p>
            <p className="font-medium">{tripDetails.estimatedDuration}</p>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-12 gap-6 px-6 pb-6 bg-gray-50">
        {/* Left Panel - Document Checklist */}
        <div className="col-span-5">
          <Card className="p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium flex items-center gap-2">
                <FileText className="w-5 h-5 text-red-600" />
                Document Checklist
              </h3>
              <Badge variant={allDocumentsChecked ? 'default' : 'secondary'} 
                     className={allDocumentsChecked ? 'bg-green-500' : ''}>
                {checkedCount}/{Object.keys(documentsChecked).length}
              </Badge>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Completion</span>
                <span className="text-sm font-medium">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            {/* Document List */}
            <div className="space-y-3">
              {documents.map((doc) => {
                const Icon = doc.icon;
                return (
                  <div 
                    key={doc.id}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      documentsChecked[doc.id as keyof typeof documentsChecked]
                        ? 'bg-green-50 border-green-300'
                        : 'bg-white border-gray-200'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <Checkbox
                        id={doc.id}
                        checked={documentsChecked[doc.id as keyof typeof documentsChecked]}
                        onCheckedChange={(checked) =>
                          setDocumentsChecked(prev => ({ ...prev, [doc.id]: checked as boolean }))
                        }
                      />
                      <div className="flex-1">
                        <Label htmlFor={doc.id} className="cursor-pointer font-medium flex items-center gap-2">
                          <Icon className="w-4 h-4" />
                          {doc.label}
                        </Label>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge 
                            variant="outline" 
                            className={doc.status === 'ready' ? 'border-green-500 text-green-700' : 'border-orange-500 text-orange-700'}
                          >
                            {doc.status}
                          </Badge>
                          <Button variant="ghost" size="sm" className="h-6 text-xs">
                            Preview
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Driver Confirmation */}
          <Card className="p-6">
            <h3 className="font-medium mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-red-600" />
              Driver Assignment Confirmation
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <span className="text-sm">Driver Name</span>
                <span className="font-medium">{tripDetails.driver}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <span className="text-sm">License Verified</span>
                <Badge className="bg-green-500">Valid</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <span className="text-sm">Vehicle Assignment</span>
                <span className="font-medium">{tripDetails.vehicle}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <span className="text-sm">Fuel Level</span>
                <Badge className="bg-green-500">Full</Badge>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Panel - Photos & Actions */}
        <div className="col-span-7">
          {/* Inspection Photo Gallery */}
          <Card className="p-6 mb-6">
            <h3 className="font-medium mb-4 flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-red-600" />
              Inspection Photo Gallery
            </h3>
            <div className="grid grid-cols-3 gap-4">
              {inspectionPhotos.map((photo) => (
                <div key={photo.id} className="border rounded-lg p-3 hover:shadow-md transition-shadow">
                  <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded h-32 mb-2 flex items-center justify-center">
                    <ImageIcon className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-sm font-mono text-gray-700">{photo.vehicle}</p>
                  <p className="text-xs text-gray-500">{photo.timestamp}</p>
                  <Badge variant="outline" className="mt-1 text-xs">{photo.count} photos</Badge>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              View All Photos
            </Button>
          </Card>

          {/* Dispatch Authorization */}
          <Card className="p-6 mb-6">
            <h3 className="font-medium mb-4">Dispatch Authorization</h3>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-blue-900">Pre-Dispatch Checklist</p>
                    <ul className="text-sm text-blue-700 mt-2 space-y-1">
                      <li>✓ All documents verified and ready</li>
                      <li>✓ Driver briefed on route and delivery instructions</li>
                      <li>✓ Vehicle inspection completed and passed</li>
                      <li>✓ Load secured and manifest verified</li>
                      <li>✓ Emergency contact information updated</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-3 gap-3">
                <Button 
                  variant="outline"
                  onClick={handleGenerateDocuments}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Generate PDF
                </Button>
                <Button 
                  variant="outline"
                  onClick={handlePrintDocuments}
                >
                  <Printer className="w-4 h-4 mr-2" />
                  Print Papers
                </Button>
                <Button 
                  variant="outline"
                  onClick={handleSendToDriver}
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send to Driver
                </Button>
              </div>

              {/* Confirm Dispatch Button */}
              <Button 
                className={`w-full h-14 text-lg ${
                  allDocumentsChecked 
                    ? 'bg-green-600 hover:bg-green-700' 
                    : 'bg-gray-400 cursor-not-allowed'
                }`}
                onClick={handleConfirmDispatch}
                disabled={!allDocumentsChecked}
              >
                <CheckCircle className="w-5 h-5 mr-2" />
                Confirm Dispatch & Clear to Leave
              </Button>
            </div>
          </Card>

          {/* Timeline */}
          <Card className="p-6 bg-gradient-to-br from-green-50 to-blue-50 border-green-200">
            <h3 className="font-medium mb-3">Dispatch Timeline</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Inspection Completed: 10:45 AM</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Loading Completed: 11:20 AM</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Documents Prepared: 11:35 AM</span>
              </div>
              <div className="flex items-center gap-2 text-blue-600 font-medium">
                <div className="w-4 h-4 border-2 border-blue-600 rounded-full animate-pulse" />
                <span>Ready for Dispatch: Pending Authorization</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
