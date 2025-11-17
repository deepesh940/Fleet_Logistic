import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { 
  ChevronRight, 
  ChevronLeft, 
  Check,
  Building2,
  Car,
  MapPin,
  Calendar,
  FileText
} from 'lucide-react';
import { Calendar as CalendarComponent } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { format } from 'date-fns';

interface OrderCreationWizardProps {
  open: boolean;
  onClose: () => void;
}

export function OrderCreationWizard({ open, onClose }: OrderCreationWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [deliveryDate, setDeliveryDate] = useState<Date>();

  const steps = [
    { number: 1, title: 'Customer Selection', icon: Building2 },
    { number: 2, title: 'Vehicle Details', icon: Car },
    { number: 3, title: 'Delivery Info', icon: MapPin },
    { number: 4, title: 'Review & Confirm', icon: FileText },
  ];

  const customers = [
    { id: 'CST-001', name: 'Customer Central Guadalajara', code: 'GDL-001', city: 'Guadalajara' },
    { id: 'CST-002', name: 'Customer Norte Tijuana', code: 'TIJ-001', city: 'Tijuana' },
    { id: 'CST-003', name: 'Customer Express Monterrey', code: 'MTY-001', city: 'Monterrey' },
    { id: 'CST-004', name: 'Customer Costa Veracruz', code: 'VER-001', city: 'Veracruz' },
  ];

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    // Handle order creation
    onClose();
    setCurrentStep(1);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Order</DialogTitle>
          <DialogDescription>
            Follow the steps to create a new vehicle delivery order
          </DialogDescription>
        </DialogHeader>

        {/* Progress Steps */}
        <div className="py-6 border-b">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.number;
              const isCompleted = currentStep > step.number;
              const isLast = index === steps.length - 1;

              return (
                <div key={step.number} className="flex items-center flex-1">
                  <div className="flex flex-col items-center relative z-10 flex-1">
                    {/* Step Circle */}
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all ${
                        isCompleted
                          ? 'bg-green-500 border-green-500 text-white'
                          : isActive
                          ? 'bg-red-600 border-red-600 text-white'
                          : 'bg-white border-gray-300 text-gray-400'
                      }`}
                    >
                      {isCompleted ? (
                        <Check className="w-6 h-6" />
                      ) : (
                        <Icon className="w-6 h-6" />
                      )}
                    </div>

                    {/* Step Label */}
                    <p
                      className={`text-sm mt-2 text-center ${
                        isActive ? 'text-gray-900' : isCompleted ? 'text-gray-700' : 'text-gray-400'
                      }`}
                    >
                      {step.title}
                    </p>
                  </div>

                  {/* Connecting Line */}
                  {!isLast && (
                    <div className="flex-1 h-0.5 mx-2 relative" style={{ top: '-28px' }}>
                      <div
                        className={`h-full ${
                          isCompleted ? 'bg-green-500' : 'bg-gray-300'
                        }`}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Step Content */}
        <div className="py-6">
          {/* Step 1: Customer Selection */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div>
                <Label>Select Customer *</Label>
                <Select>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Choose a customer" />
                  </SelectTrigger>
                  <SelectContent>
                    {customers.map((customer) => (
                      <SelectItem key={customer.id} value={customer.id}>
                        <div className="flex items-center gap-2">
                          <Building2 className="w-4 h-4" />
                          <span>{customer.name}</span>
                          <Badge variant="outline" className="ml-2">{customer.code}</Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-sm text-gray-500 mt-1">
                  Orders will be created on behalf of the selected customer
                </p>
              </div>

              <Card className="p-4 bg-blue-50 border-blue-200">
                <div className="flex items-start gap-3">
                  <Building2 className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-blue-900">Customer Information</p>
                    <p className="text-sm text-blue-700 mt-1">
                      Select a customer to view their details, delivery address, and order history
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* Step 2: Vehicle Details */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div>
                <Label>VIN Numbers *</Label>
                <Textarea 
                  placeholder="Enter VIN numbers (one per line)"
                  className="mt-1"
                  rows={4}
                />
                <p className="text-sm text-gray-500 mt-1">
                  Enter one VIN per line. System will validate each VIN
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Vehicle Type *</Label>
                  <Select>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="suv">SUV</SelectItem>
                      <SelectItem value="sedan">Sedan</SelectItem>
                      <SelectItem value="hatchback">Hatchback</SelectItem>
                      <SelectItem value="van-cargo">Van Cargo</SelectItem>
                      <SelectItem value="truck">Truck</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Source Yard *</Label>
                  <Select>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select yard" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yard-a">Yard A - CDMX</SelectItem>
                      <SelectItem value="yard-b">Yard B - Monterrey</SelectItem>
                      <SelectItem value="yard-c">Yard C - Puebla</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label>Stock Source</Label>
                <Select>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select source" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sales">Sales Stock</SelectItem>
                    <SelectItem value="special">Special Order</SelectItem>
                    <SelectItem value="yard">Yard Stock</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* Step 3: Delivery Information */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <div>
                <Label>Delivery Address</Label>
                <Input
                  placeholder="Will auto-fill from customer address"
                  className="mt-1"
                  disabled
                />
                <p className="text-sm text-gray-500 mt-1">
                  Auto-populated from customer master data
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Delivery Timeline *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start mt-1">
                        <Calendar className="mr-2 h-4 w-4" />
                        {deliveryDate ? format(deliveryDate, 'PPP') : 'Pick a date'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <CalendarComponent
                        mode="single"
                        selected={deliveryDate}
                        onSelect={setDeliveryDate}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div>
                  <Label>Priority</Label>
                  <Select>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label>Special Instructions</Label>
                <Textarea
                  placeholder="Any special delivery instructions..."
                  className="mt-1"
                  rows={3}
                />
              </div>
            </div>
          )}

          {/* Step 4: Review & Confirm */}
          {currentStep === 4 && (
            <div className="space-y-4">
              <Card className="p-6">
                <h3 className="font-medium mb-4">Order Summary</h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-600">Customer:</span>
                    <span className="font-medium">Customer Central Guadalajara</span>
                  </div>
                  
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-600">VIN Count:</span>
                    <span className="font-medium">3 vehicles</span>
                  </div>
                  
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-600">Vehicle Type:</span>
                    <span className="font-medium">Sedan</span>
                  </div>
                  
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-600">Source Yard:</span>
                    <span className="font-medium">Yard A - CDMX</span>
                  </div>
                  
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-600">Delivery Date:</span>
                    <span className="font-medium">
                      {deliveryDate ? format(deliveryDate, 'PPP') : 'Not selected'}
                    </span>
                  </div>
                  
                  <div className="flex justify-between py-2">
                    <span className="text-gray-600">Destination:</span>
                    <span className="font-medium">Guadalajara, Jalisco</span>
                  </div>
                </div>
              </Card>

              <Card className="p-4 bg-green-50 border-green-200">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-green-900">Ready to Create Order</p>
                    <p className="text-sm text-green-700 mt-1">
                      Review the information above and click "Create Order" to proceed
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-6 border-t">
          <Button
            variant="outline"
            onClick={currentStep === 1 ? onClose : handlePrevious}
          >
            {currentStep === 1 ? 'Cancel' : (
              <>
                <ChevronLeft className="w-4 h-4 mr-2" />
                Previous
              </>
            )}
          </Button>

          <Button
            className="bg-red-600 hover:bg-red-700"
            onClick={currentStep === steps.length ? handleComplete : handleNext}
          >
            {currentStep === steps.length ? (
              <>
                <Check className="w-4 h-4 mr-2" />
                Create Order
              </>
            ) : (
              <>
                Next
                <ChevronRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
