import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import {
  MapPin,
  Search,
  Camera,
  Upload,
  CheckCircle,
  XCircle,
  AlertCircle,
  FileText,
  Wrench,
  Package
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { toast } from 'sonner';

export function PreDispatchYard() {
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [inspectionStatus, setInspectionStatus] = useState<'pass' | 'fail' | null>(null);

  // Yard slots grid (simplified representation)
  const yardSlots = [
    { id: 'A1', status: 'occupied', vehicle: 'VIN123456789', model: 'Sedan XL' },
    { id: 'A2', status: 'occupied', vehicle: 'VIN987654321', model: 'SUV Pro' },
    { id: 'A3', status: 'reserved', vehicle: null, model: null },
    { id: 'A4', status: 'available', vehicle: null, model: null },
    { id: 'B1', status: 'occupied', vehicle: 'VIN456789123', model: 'Truck Max' },
    { id: 'B2', status: 'reserved', vehicle: null, model: null },
    { id: 'B3', status: 'available', vehicle: null, model: null },
    { id: 'B4', status: 'occupied', vehicle: 'VIN789123456', model: 'Van Cargo' },
    { id: 'C1', status: 'available', vehicle: null, model: null },
    { id: 'C2', status: 'occupied', vehicle: 'VIN321654987', model: 'Sedan XL' },
    { id: 'C3', status: 'available', vehicle: null, model: null },
    { id: 'C4', status: 'reserved', vehicle: null, model: null },
  ];

  const inspectionChecklist = [
    { id: 'exterior', label: 'Vehicle Exterior Condition (scratches, dents)', checked: false },
    { id: 'fuel', label: 'Fuel Level Check', checked: false },
    { id: 'fluids', label: 'Fluid Levels (oil, coolant, brake fluid)', checked: false },
    { id: 'tires', label: 'Tire Pressure & Condition', checked: false },
    { id: 'accessories', label: 'Accessories Verification (spare tire, jack, etc.)', checked: false },
    { id: 'lights', label: 'Lights & Signals Working', checked: false },
    { id: 'interior', label: 'Interior Condition', checked: false },
    { id: 'documents', label: 'Vehicle Documents Present', checked: false },
  ];

  const getSlotColor = (status: string) => {
    switch (status) {
      case 'occupied':
        return 'bg-blue-100 border-blue-400 hover:bg-blue-200';
      case 'reserved':
        return 'bg-yellow-100 border-yellow-400 hover:bg-yellow-200';
      case 'available':
        return 'bg-green-100 border-green-400 hover:bg-green-200';
      default:
        return 'bg-gray-100 border-gray-400';
    }
  };

  const handleInspectionFail = () => {
    toast.error('Vehicle failed inspection - routing to maintenance');
    // This would trigger the maintenance workflow
  };

  const handleInspectionPass = () => {
    toast.success('Vehicle passed inspection - ready for dispatch');
  };

  return (
    <div className="h-full">
      {/* Header */}
      <div className="p-6 border-b bg-white">
        <h1 className="text-3xl mb-2">Pre-Dispatch Yard Management</h1>
        <p className="text-gray-600">Manage vehicles in parking yard before dispatch</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-4 gap-6 p-6 pb-4 bg-gray-50">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl">{yardSlots.filter(s => s.status === 'occupied').length}</p>
              <p className="text-sm text-gray-600">Occupied Slots</p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="bg-yellow-100 p-3 rounded-lg">
              <AlertCircle className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl">{yardSlots.filter(s => s.status === 'reserved').length}</p>
              <p className="text-sm text-gray-600">Reserved Slots</p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="bg-green-100 p-3 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl">{yardSlots.filter(s => s.status === 'available').length}</p>
              <p className="text-sm text-gray-600">Available Slots</p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="bg-gray-100 p-3 rounded-lg">
              <MapPin className="w-6 h-6 text-gray-600" />
            </div>
            <div>
              <p className="text-2xl">{yardSlots.length}</p>
              <p className="text-sm text-gray-600">Total Capacity</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-12 gap-6 px-6 pb-6 bg-gray-50">
        {/* Left - Yard Map */}
        <div className="col-span-7">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium flex items-center gap-2">
                <MapPin className="w-5 h-5 text-red-600" />
                Yard Slot Allocation
              </h3>
              <div className="flex gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-400 rounded"></div>
                  <span className="text-xs">Occupied</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-400 rounded"></div>
                  <span className="text-xs">Reserved</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-400 rounded"></div>
                  <span className="text-xs">Available</span>
                </div>
              </div>
            </div>

            {/* Search & Locate */}
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input placeholder="Search by VIN or slot number..." className="pl-10" />
              </div>
            </div>

            {/* Yard Grid */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="grid grid-cols-4 gap-4">
                {yardSlots.map((slot) => (
                  <div
                    key={slot.id}
                    onClick={() => setSelectedSlot(slot.id)}
                    className={`
                      p-4 rounded-lg border-2 cursor-pointer transition-all
                      ${getSlotColor(slot.status)}
                      ${selectedSlot === slot.id ? 'ring-2 ring-red-600' : ''}
                    `}
                  >
                    <div className="text-center">
                      <p className="font-medium mb-2">{slot.id}</p>
                      {slot.vehicle ? (
                        <>
                          <p className="text-xs font-medium">{slot.model}</p>
                          <p className="text-xs font-mono text-gray-600">{slot.vehicle}</p>
                        </>
                      ) : (
                        <p className="text-xs text-gray-500 capitalize">{slot.status}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Right - Inspection Panel */}
        <div className="col-span-5">
          <Card className="p-6 mb-6">
            <h3 className="font-medium mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-red-600" />
              Pre-Delivery Inspection
            </h3>

            {selectedSlot ? (
              <div className="space-y-4">
                {/* Selected Vehicle Info */}
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-600">Selected Slot</p>
                  <p className="font-medium">{selectedSlot}</p>
                  {yardSlots.find(s => s.id === selectedSlot)?.vehicle && (
                    <>
                      <p className="text-sm font-mono mt-1">
                        {yardSlots.find(s => s.id === selectedSlot)?.vehicle}
                      </p>
                      <p className="text-sm text-gray-600">
                        {yardSlots.find(s => s.id === selectedSlot)?.model}
                      </p>
                    </>
                  )}
                </div>

                {/* Inspection Checklist */}
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {inspectionChecklist.map((item) => (
                    <div key={item.id} className="flex items-start gap-3 p-2 hover:bg-gray-50 rounded">
                      <Checkbox id={item.id} />
                      <Label htmlFor={item.id} className="text-sm cursor-pointer flex-1">
                        {item.label}
                      </Label>
                    </div>
                  ))}
                </div>

                {/* Photo Upload */}
                <div className="border-t pt-4">
                  <Label className="mb-2 block">Inspection Photos</Label>
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <Button variant="outline" size="sm">
                      <Camera className="w-4 h-4 mr-2" />
                      Take Photo
                    </Button>
                    <Button variant="outline" size="sm">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload
                    </Button>
                  </div>
                  <div className="bg-gray-100 p-4 rounded-lg border-2 border-dashed text-center">
                    <p className="text-sm text-gray-500">No photos uploaded</p>
                  </div>
                </div>

                {/* Inspector Signature */}
                <div>
                  <Label>Inspector Signature</Label>
                  <Input placeholder="Sign here..." className="mt-1" />
                </div>

                {/* Pass/Fail Actions */}
                <div className="grid grid-cols-2 gap-3 pt-4">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-50">
                        <XCircle className="w-4 h-4 mr-2" />
                        Fail Inspection
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Failed Inspection</DialogTitle>
                        <DialogDescription>
                          Document the issues and route to maintenance
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 mt-4">
                        <div>
                          <Label>Failure Reason</Label>
                          <Textarea 
                            placeholder="Describe the issues found..."
                            rows={4}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label>Assign to Maintenance</Label>
                          <Input placeholder="Maintenance team/person" className="mt-1" />
                        </div>
                        <div className="flex justify-end gap-2">
                          <Button variant="outline">Cancel</Button>
                          <Button 
                            className="bg-red-600 hover:bg-red-700"
                            onClick={handleInspectionFail}
                          >
                            <Wrench className="w-4 h-4 mr-2" />
                            Send to Maintenance
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Button 
                    className="bg-green-600 hover:bg-green-700"
                    onClick={handleInspectionPass}
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Pass Inspection
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <MapPin className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                <p>Select a yard slot to begin inspection</p>
              </div>
            )}
          </Card>

          {/* Quick Stats */}
          <Card className="p-6 bg-gradient-to-br from-green-50 to-blue-50 border-green-200">
            <h3 className="font-medium mb-3">Today's Inspection Summary</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white p-3 rounded">
                <p className="text-2xl text-green-600">24</p>
                <p className="text-xs text-gray-600">Passed</p>
              </div>
              <div className="bg-white p-3 rounded">
                <p className="text-2xl text-red-600">3</p>
                <p className="text-xs text-gray-600">Failed</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
