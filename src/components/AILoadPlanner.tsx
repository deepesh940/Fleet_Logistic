import { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { 
  Zap, 
  RefreshCw,
  CheckCircle,
  TrendingDown,
  DollarSign,
  Clock,
  Package,
  Truck,
  MapPin,
  FileText,
  Settings,
  AlertCircle,
  Edit2,
  Car
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Progress } from './ui/progress';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { toast } from 'sonner';
import { TrailerVisualization3D } from './TrailerVisualization3D';

interface AILoadPlannerProps {
  orderData?: any;
  onClearOrder: () => void;
  workflowData?: any;
  onComplete?: (data: any) => void;
  isWorkflowMode?: boolean;
}

interface Fleet {
  id: string;
  name: string;
  capacity: number;
  topDeck: Vehicle[];      // Position 1 (1 car max)
  middleDeck: Vehicle[];   // Positions 2-3 (2 cars max)
  bottomDeck: Vehicle[];   // Positions 4-6 (3 cars max)
  totalM3: number;
  utilization: number;
  destinations?: string[];
}

interface Vehicle {
  vin: string;
  model: string;
  m3: number;
  destination?: string;
}

export function AILoadPlanner({ orderData, onClearOrder, workflowData, onComplete, isWorkflowMode = false }: AILoadPlannerProps) {
  const [transportMode, setTransportMode] = useState('trailer');
  const [vehicleCapacity, setVehicleCapacity] = useState('45');
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedVehicles, setSelectedVehicles] = useState<string[]>([]);
  const [fleets, setFleets] = useState<Fleet[]>([]);
  const [showTransportSection, setShowTransportSection] = useState(false);
  const [showOptimizedResults, setShowOptimizedResults] = useState(false);

  // Get vehicle cubic meters based on type
  const getVehicleM3 = (type: string): number => {
    const m3Map: Record<string, number> = {
      'Sedan': 13.02,
      'SUV': 16.88,
      'Hatchback': 12.50,
      'Van Cargo': 19.98,
      'Truck': 20.50,
    };
    return m3Map[type] || 15.0;
  };

  // Parse order data to get vehicles
  const getVehiclesFromOrder = (): Vehicle[] => {
    if (!orderData) {
      // Default sample vehicles - Pattern: Upper (3 SUV, 1 Sedan, 2 Hatchback), Lower (1 SUV, 4 Sedan, 2 Hatchback)
      return [
        // Fleet 1 - Upper Deck (6 vehicles: 3 SUV, 1 Sedan, 2 Hatchback)
        { vin: 'VIN001SUV2024', model: 'SUV', m3: 16.88, destination: 'Guadalajara Dealer' },
        { vin: 'VIN002SUV2024', model: 'SUV', m3: 16.88, destination: 'Guadalajara Dealer' },
        { vin: 'VIN003SUV2024', model: 'SUV', m3: 16.88, destination: 'Guadalajara Dealer' },
        { vin: 'VIN004SED2024', model: 'Sedan', m3: 13.02, destination: 'Guadalajara Dealer' },
        { vin: 'VIN005HAT2024', model: 'Hatchback', m3: 12.50, destination: 'Guadalajara Dealer' },
        { vin: 'VIN006HAT2024', model: 'Hatchback', m3: 12.50, destination: 'Guadalajara Dealer' },
        
        // Fleet 1 - Lower Deck (7 vehicles: 1 SUV, 4 Sedan, 2 Hatchback)
        { vin: 'VIN007SUV2024', model: 'SUV', m3: 16.88, destination: 'Guadalajara Dealer' },
        { vin: 'VIN008SED2024', model: 'Sedan', m3: 13.02, destination: 'Guadalajara Dealer' },
        { vin: 'VIN009SED2024', model: 'Sedan', m3: 13.02, destination: 'Guadalajara Dealer' },
        { vin: 'VIN010SED2024', model: 'Sedan', m3: 13.02, destination: 'Guadalajara Dealer' },
        { vin: 'VIN011SED2024', model: 'Sedan', m3: 13.02, destination: 'Guadalajara Dealer' },
        { vin: 'VIN012HAT2024', model: 'Hatchback', m3: 12.50, destination: 'Guadalajara Dealer' },
        { vin: 'VIN013HAT2024', model: 'Hatchback', m3: 12.50, destination: 'Guadalajara Dealer' },
      ];
    }

    // Parse VINs from order and create vehicles based on new structure
    const vins = orderData.vin.split(', ');
    const vehicleTypes = orderData.vehicleTypes || [];
    const destinations = orderData.destinations || ['Unknown'];
    
    // Build all vehicles first
    const allVehicles: Vehicle[] = [];
    let vinIndex = 0;
    
    // Distribute VINs across vehicle types based on quantities
    for (const vt of vehicleTypes) {
      for (let i = 0; i < vt.quantity; i++) {
        if (vinIndex < vins.length) {
          allVehicles.push({
            vin: vins[vinIndex],
            model: vt.type,
            m3: getVehicleM3(vt.type),
            destination: destinations[vinIndex % destinations.length],
          });
          vinIndex++;
        }
      }
    }
    
    // Reorder vehicles based on order ID
    const suvs = allVehicles.filter(v => v.model === 'SUV');
    const sedans = allVehicles.filter(v => v.model === 'Sedan');
    const hatchbacks = allVehicles.filter(v => v.model === 'Hatchback');
    const others = allVehicles.filter(v => v.model !== 'SUV' && v.model !== 'Sedan' && v.model !== 'Hatchback');
    
    let vehicles: Vehicle[] = [];
    
    // Special pattern for ORD-2025-004: Upper (1 SUV, 1 Hatchback, 1 SUV, 1 Sedan, 1 SUV, 1 Hatchback), Lower (1 SUV, 1 Sedan, 1 Sedan, 1 Sedan, 1 SUV, 1 SUV)
    if (orderData.id === 'ORD-2025-004') {
      vehicles = [
        // Upper Deck 1st row: 1 SUV, 1 Hatchback, 1 SUV
        ...suvs.slice(0, 1),
        ...hatchbacks.slice(0, 1),
        ...suvs.slice(1, 2),
        // Upper Deck 2nd row: 1 Sedan, 1 SUV, 1 Hatchback
        ...sedans.slice(0, 1),
        ...suvs.slice(2, 3),
        ...hatchbacks.slice(1, 2),
        // Lower Deck 1st row: 1 SUV, 1 Sedan, 1 Sedan
        ...suvs.slice(3, 4),
        ...sedans.slice(1, 2),
        ...sedans.slice(2, 3),
        // Lower Deck 2nd row: 1 Sedan, 1 SUV, 1 SUV
        ...sedans.slice(3, 4),
        ...suvs.slice(4, 5),
        ...suvs.slice(5, 6),
        // Any remaining vehicles
        ...suvs.slice(6),
        ...sedans.slice(4),
        ...hatchbacks.slice(2),
        ...others
      ];
    } else {
      // Default pattern for other orders: Upper (3 SUV, 1 Sedan, 2 Hatchback), Lower (1 SUV, 4 Sedan, 2 Hatchback)
      vehicles = [
        // Upper Deck: 3 SUV, 1 Sedan, 2 Hatchback
        ...suvs.slice(0, 3),
        ...sedans.slice(0, 1),
        ...hatchbacks.slice(0, 2),
        // Lower Deck: 1 SUV, 4 Sedan, 2 Hatchback
        ...suvs.slice(3, 4),
        ...sedans.slice(1, 5),
        ...hatchbacks.slice(2, 4),
        // Any remaining vehicles
        ...suvs.slice(4),
        ...sedans.slice(5),
        ...hatchbacks.slice(4),
        ...others
      ];
    }
    
    return vehicles;
  };

  const availableVehicles = getVehiclesFromOrder();

  // Auto-calculate fleet allocation - 6-Position Layout: Top(1), Middle(2), Bottom(3)
  const calculateFleetAllocation = (vehicles: Vehicle[]): Fleet[] => {
    const fleetCapacity = parseFloat(vehicleCapacity) || 45;
    
    // 6-Position Layout per carrier:
    // Top Deck: 1 vehicle (Position 1)
    // Middle Deck: 2 vehicles (Positions 2-3)
    // Bottom Deck: 3 vehicles (Positions 4-6)
    const maxVehiclesPerCarrier = 6;
    
    const fleetList: Fleet[] = [];
    let currentFleetIndex = 0;
    let remainingVehicles = [...vehicles];

    while (remainingVehicles.length > 0) {
      const fleet: Fleet = {
        id: `FLT-${String(currentFleetIndex + 1).padStart(3, '0')}`,
        name: `Fleet ${currentFleetIndex + 1}`,
        capacity: fleetCapacity,
        topDeck: [],
        middleDeck: [],
        bottomDeck: [],
        totalM3: 0,
        utilization: 0,
        destinations: [],
      };

      let upperDeckM3 = 0;
      let lowerDeckM3 = 0;
      const fleetDestinations = new Set<string>();

      // Assign exactly 6 vehicles to upper deck (or remaining if less than 6)
      const upperDeckCount = Math.min(maxVehiclesPerCarrier, remainingVehicles.length);
      for (let i = 0; i < upperDeckCount; i++) {
        const vehicle = remainingVehicles.shift()!;
        if (i < 1) {
          fleet.topDeck.push(vehicle);
          upperDeckM3 += vehicle.m3;
        } else if (i < 3) {
          fleet.middleDeck.push(vehicle);
          upperDeckM3 += vehicle.m3;
        } else {
          fleet.bottomDeck.push(vehicle);
          lowerDeckM3 += vehicle.m3;
        }
        if (vehicle.destination) fleetDestinations.add(vehicle.destination);
      }

      fleet.totalM3 = upperDeckM3 + lowerDeckM3;
      fleet.utilization = Math.round((fleet.totalM3 / fleetCapacity) * 100);
      fleet.destinations = Array.from(fleetDestinations);

      // Only add fleet if it has vehicles
      if (fleet.topDeck.length > 0 || fleet.middleDeck.length > 0 || fleet.bottomDeck.length > 0) {
        fleetList.push(fleet);
      }
      
      currentFleetIndex++;

      // Safety check to prevent infinite loop
      if (currentFleetIndex > 10) {
        break;
      }
    }

    return fleetList;
  };

  // Initialize fleets when order data changes
  useEffect(() => {
    if (orderData) {
      toast.info(`Loading order ${orderData.id} for AI planning...`);
      const calculatedFleets = calculateFleetAllocation(availableVehicles);
      setFleets(calculatedFleets);
    } else {
      // Default fleet allocation for demo
      setFleets(calculateFleetAllocation(availableVehicles));
    }
  }, [orderData]);

  const handleAutoOptimize = () => {
    setIsGenerating(true);
    toast.info('Optimizing load plan...');
    setTimeout(() => {
      const optimizedFleets = calculateFleetAllocation(availableVehicles);
      setFleets(optimizedFleets);
      setIsGenerating(false);
      setShowOptimizedResults(true);
      toast.success('Load plan optimized successfully!');
    }, 2000);
  };

  const handleGenerateManifest = () => {
    toast.success('Load manifest generated successfully!');
  };

  const toggleVehicleSelection = (vin: string) => {
    setSelectedVehicles(prev => 
      prev.includes(vin) ? prev.filter(v => v !== vin) : [...prev, vin]
    );
  };

  const totalVehicles = fleets.reduce((sum, fleet) => sum + fleet.topDeck.length + fleet.middleDeck.length + fleet.bottomDeck.length, 0);
  const avgUtilization = fleets.length > 0 ? Math.round(fleets.reduce((sum, fleet) => sum + fleet.utilization, 0) / fleets.length) : 0;

  // Calculate vehicle type summary from order data
  const getVehicleTypeSummary = () => {
    if (orderData && orderData.vehicleTypes) {
      return orderData.vehicleTypes;
    }
    return [];
  };

  const vehicleTypeSummary = getVehicleTypeSummary();
  const destinations = orderData?.destinations || [];

  return (
    <div className="h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b bg-white">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl">AI Load Planning</h1>
            {orderData && (
              <Badge className="bg-purple-600">Order: {orderData.id}</Badge>
            )}
          </div>
          <p className="text-gray-600">Optimize vehicle loading and transport mode selection</p>
        </div>
        <div className="flex gap-3">
          <Button 
            variant="outline"
            className="border-gray-300"
            onClick={() => setShowTransportSection(!showTransportSection)}
          >
            <Edit2 className="w-4 h-4 mr-2" />
            {showTransportSection ? 'Hide Transport' : 'Edit Transport'}
          </Button>
          <Button 
            className="bg-green-600 hover:bg-green-700"
            onClick={handleAutoOptimize}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Optimizing...
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 mr-2" />
                Generate Plan
              </>
            )}
          </Button>
          <Button 
            className="bg-red-600 hover:bg-red-700"
            onClick={handleGenerateManifest}
          >
            <FileText className="w-4 h-4 mr-2" />
            Generate Manifest
          </Button>
        </div>
      </div>

      {/* Vehicle Type Summary & Destinations Header */}
      {orderData && (
        <div className="p-6 bg-gradient-to-r from-purple-50 to-blue-50 border-b">
          {/* Vehicle Type Summary */}
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-3">Vehicle Type Summary</p>
            <div className="flex flex-wrap gap-3">
              {vehicleTypeSummary.map((vt, idx) => {
                // Get color based on vehicle type
                const getVehicleTypeColor = (type: string) => {
                  const colors = {
                    'SUV': {
                      bg: 'bg-purple-600',
                      icon: 'text-purple-600',
                      border: 'border-purple-200'
                    },
                    'Sedan': {
                      bg: 'bg-blue-600',
                      icon: 'text-blue-600',
                      border: 'border-blue-200'
                    },
                    'Hatchback': {
                      bg: 'bg-green-600',
                      icon: 'text-green-600',
                      border: 'border-green-200'
                    },
                    'Van Cargo': {
                      bg: 'bg-indigo-600',
                      icon: 'text-indigo-600',
                      border: 'border-indigo-200'
                    },
                    'Truck': {
                      bg: 'bg-slate-600',
                      icon: 'text-slate-600',
                      border: 'border-slate-200'
                    }
                  };
                  return colors[type as keyof typeof colors] || {
                    bg: 'bg-purple-600',
                    icon: 'text-purple-600',
                    border: 'border-purple-200'
                  };
                };
                
                const colors = getVehicleTypeColor(vt.type);
                
                return (
                  <div key={idx} className={`flex items-center gap-2 bg-white px-4 py-2 rounded-lg border ${colors.border}`}>
                    <Car className={`w-5 h-5 ${colors.icon}`} />
                    <span className="font-medium">{vt.type}:</span>
                    <Badge className={colors.bg}>{vt.quantity} vehicles</Badge>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Destination Overview */}
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-3">Destinations</p>
            <div className="flex flex-wrap gap-2">
              {destinations.map((dest, idx) => (
                <Badge key={idx} variant="outline" className="px-3 py-1 bg-white border-blue-300 text-blue-700">
                  <MapPin className="w-3 h-3 mr-1 inline" />
                  {dest}
                </Badge>
              ))}
            </div>
          </div>

          {/* Fleet Summary Stats */}
          <div className="flex gap-6 pt-3 border-t border-purple-200">
            <div>
              <p className="text-sm text-gray-600">Total Vehicles</p>
              <p className="text-xl font-medium">{orderData.count}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Fleets Required</p>
              <p className="text-xl font-medium text-purple-600">{fleets.length}</p>
            </div>
          </div>
        </div>
      )}

      {/* 3-Panel Layout */}
      <div className="grid grid-cols-12 gap-6 p-6 bg-gray-50">
        {/* LEFT PANEL - Transport Selection (Conditionally Visible) */}
        {showTransportSection && showOptimizedResults && (
          <div className="col-span-3 space-y-6">
            <Card className="p-6">
              <h3 className="font-medium mb-4 flex items-center gap-2">
                <Settings className="w-5 h-5 text-red-600" />
                Transport Selection
              </h3>
              
              <div className="space-y-4">
                {/* Transport Mode */}
                <div>
                  <Label className="mb-3 block">Transport Mode</Label>
                  <RadioGroup value={transportMode} onValueChange={setTransportMode}>
                    <div className="flex items-center space-x-2 mb-2">
                      <RadioGroupItem value="truck" id="truck" />
                      <Label htmlFor="truck" className="cursor-pointer">Single Truck</Label>
                    </div>
                    <div className="flex items-center space-x-2 mb-2">
                      <RadioGroupItem value="trailer" id="trailer" />
                      <Label htmlFor="trailer" className="cursor-pointer">Trailer (12-Unit)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="multi" id="multi" />
                      <Label htmlFor="multi" className="cursor-pointer">Multi-Vehicle</Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Capacity Calculator */}
                <div>
                  <Label>Vehicle Capacity (M³)</Label>
                  <Input 
                    type="number" 
                    value={vehicleCapacity}
                    onChange={(e) => setVehicleCapacity(e.target.value)}
                    className="mt-1"
                    placeholder="45"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Standard trailer: 45 M³
                  </p>
                </div>


              </div>
            </Card>

            {/* Available Vehicles */}
            <Card className="p-6">
              <h3 className="font-medium mb-4 flex items-center gap-2">
                <Package className="w-5 h-5 text-red-600" />
                Available Vehicles
              </h3>
              <div className="space-y-2">
                {availableVehicles.map((vehicle) => (
                  <div 
                    key={vehicle.vin}
                    onClick={() => toggleVehicleSelection(vehicle.vin)}
                    className={`p-3 border rounded-lg cursor-pointer transition-all ${
                      selectedVehicles.includes(vehicle.vin)
                        ? 'bg-blue-50 border-blue-300'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">{vehicle.model}</span>
                      <Badge variant="outline" className="text-xs">{vehicle.m3} M³</Badge>
                    </div>
                    <p className="text-xs text-gray-500 font-mono">{vehicle.vin}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <MapPin className="w-3 h-3 text-gray-400" />
                      <span className="text-xs text-gray-600">{vehicle.destination}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* CENTER PANEL - Fleet Visualization */}
        <div className={showTransportSection && showOptimizedResults ? "col-span-6" : "col-span-9"}>
          {showOptimizedResults && (
            <Card className="p-6">
              <h3 className="font-medium mb-4 flex items-center gap-2">
                <Truck className="w-5 h-5 text-red-600" />
                Fleet Allocation & Load Visualization
              </h3>

              {/* AI Suggestions Banner */}
              {orderData && (
                <Card className="p-4 mb-6 bg-gradient-to-r from-green-50 to-blue-50 border-green-200 shadow-md">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Zap className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-green-900 mb-1">AI Auto-Allocation Complete</p>
                      <p className="text-sm text-gray-700 mb-2">
                        Successfully allocated {totalVehicles} vehicles across {fleets.length} fleet(s) with optimal load distribution
                      </p>
                      <div className="flex gap-2 mt-2">
                        <Badge className="bg-green-600">
                          {fleets.length} Fleet{fleets.length > 1 ? 's' : ''}
                        </Badge>
                        <Badge className="bg-blue-600">
                          {totalVehicles} Vehicles
                        </Badge>
                      </div>
                    </div>
                  </div>
                </Card>
              )}

              {/* Fleet Visualizations */}
              <div className="space-y-8 max-h-[700px] overflow-y-auto pr-2">
                {fleets.map((fleet, fleetIdx) => {
                  // Calculate vehicle type breakdown for this fleet
                  const allVehicles = [...fleet.topDeck, ...fleet.middleDeck, ...fleet.bottomDeck];
                  const typeBreakdown = allVehicles.reduce((acc, vehicle) => {
                    acc[vehicle.model] = (acc[vehicle.model] || 0) + 1;
                    return acc;
                  }, {} as Record<string, number>);

                  return (
                    <div key={fleet.id} className="space-y-4">
                      {/* Fleet Summary Header Card */}
                      <Card className="p-5 bg-gradient-to-br from-slate-50 via-white to-slate-50 border-2 border-slate-300 shadow-lg">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-700 rounded-xl flex items-center justify-center shadow-md">
                              <Truck className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-bold text-lg">{fleet.name}</h4>
                                <Badge variant="outline" className="bg-white border-2">
                                  {fleet.id}
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-600">
                                Carrier Trailer • 2-Level Configuration
                              </p>
                            </div>
                          </div>
                          <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-md">
                            {fleet.utilization}% Utilized
                          </Badge>
                        </div>

                        {/* Quick Stats Grid */}
                        <div className="grid grid-cols-4 gap-3 mb-4">
                          <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                            <div className="text-xs text-blue-700 mb-1">Total Vehicles</div>
                            <div className="text-xl font-bold text-blue-900">
                              {fleet.topDeck.length + fleet.middleDeck.length + fleet.bottomDeck.length}
                            </div>
                          </div>
                          <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                            <div className="text-xs text-green-700 mb-1">Total Volume</div>
                            <div className="text-xl font-bold text-green-900">
                              {fleet.totalM3.toFixed(1)} M³
                            </div>
                          </div>
                          <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
                            <div className="text-xs text-purple-700 mb-1">Upper Deck</div>
                            <div className="text-xl font-bold text-purple-900">
                              {fleet.topDeck.length + fleet.middleDeck.length} units
                            </div>
                          </div>
                          <div className="bg-orange-50 p-3 rounded-lg border border-orange-200">
                            <div className="text-xs text-orange-700 mb-1">Lower Deck</div>
                            <div className="text-xl font-bold text-orange-900">
                              {fleet.bottomDeck.length} units
                            </div>
                          </div>
                        </div>

                        {/* Vehicle Type Breakdown */}
                        <div className="mb-4">
                          <p className="text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">Vehicle Type Distribution:</p>
                          <div className="flex flex-wrap gap-2">
                            {Object.entries(typeBreakdown).map(([type, count]) => (
                              <Badge key={type} variant="secondary" className="bg-gradient-to-r from-blue-100 to-blue-50 text-blue-800 border border-blue-300">
                                <Car className="w-3 h-3 mr-1" />
                                {type} × {count}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Assigned Destinations */}
                        {fleet.destinations && fleet.destinations.length > 0 && (
                          <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
                            <div className="flex items-start gap-2">
                              <MapPin className="w-4 h-4 text-amber-700 mt-0.5 flex-shrink-0" />
                              <div>
                                <p className="text-xs font-bold text-amber-900 mb-1">Delivery Destinations:</p>
                                <div className="flex flex-wrap gap-1">
                                  {fleet.destinations.map((dest, idx) => (
                                    <Badge key={idx} variant="outline" className="text-xs bg-white border-amber-300">
                                      {dest}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </Card>

                      {/* 2D/3D Trailer Visualization - Side View Default */}
                      <TrailerVisualization3D 
                        upperDeck={fleet.topDeck}
                        lowerDeck={fleet.bottomDeck}
                        fleetId={fleet.id}
                        fleetName={fleet.name}
                      />

                      {/* Detailed Deck View - Vehicle Cards */}
                      <Card className="p-5 bg-white border-2 border-gray-300 shadow-md">
                        <h4 className="font-bold mb-4 flex items-center gap-2">
                          <Package className="w-5 h-5 text-gray-700" />
                          Detailed Vehicle Manifest
                        </h4>

                        {/* Upper Deck */}
                        <div className="mb-6">
                          <div className="flex items-center justify-between mb-3 pb-2 border-b-2 border-blue-200">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-xs">U</span>
                              </div>
                              <span className="font-bold text-gray-800">Upper Deck</span>
                            </div>
                            <Badge variant="outline" className="bg-blue-50 border-blue-300">
                              {fleet.topDeck.length + fleet.middleDeck.length} vehicles • {(
                                [...fleet.topDeck, ...fleet.middleDeck].reduce((sum, v) => sum + v.m3, 0)
                              ).toFixed(2)} M³
                            </Badge>
                          </div>
                          
                          <div className="bg-gradient-to-br from-blue-50 to-white border-2 border-blue-300 rounded-xl p-4">
                            <div className="grid grid-cols-3 gap-3">
                              {fleet.topDeck.map((vehicle, vIdx) => {
                                const getVehicleColor = (model: string) => {
                                  const colors: Record<string, string> = {
                                    'SUV': 'from-purple-500 to-purple-600',
                                    'Sedan': 'from-blue-500 to-blue-600',
                                    'Hatchback': 'from-green-500 to-green-600',
                                    'Van Cargo': 'from-indigo-500 to-indigo-600',
                                    'Truck': 'from-slate-500 to-slate-600',
                                  };
                                  return colors[model] || 'from-blue-500 to-blue-600';
                                };
                                
                                return (
                                  <div 
                                    key={vIdx}
                                    className={`bg-gradient-to-br ${getVehicleColor(vehicle.model)} text-white p-3 rounded-lg shadow-md hover:shadow-lg transition-shadow relative`}
                                  >
                                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-white text-gray-800 rounded-full flex items-center justify-center text-xs font-bold border-2 border-gray-300">
                                      {vIdx + 1}
                                    </div>
                                    <div className="font-bold text-sm mb-1">{vehicle.model}</div>
                                    <div className="text-xs opacity-90 font-mono truncate mb-2">{vehicle.vin}</div>
                                    <div className="flex items-center justify-between">
                                      <Badge className="bg-white/20 text-white text-xs">
                                        {vehicle.m3} M³
                                      </Badge>
                                    </div>
                                  </div>
                                );
                              })}
                              {fleet.middleDeck.map((vehicle, vIdx) => {
                                const getVehicleColor = (model: string) => {
                                  const colors: Record<string, string> = {
                                    'SUV': 'from-purple-500 to-purple-600',
                                    'Sedan': 'from-blue-500 to-blue-600',
                                    'Hatchback': 'from-green-500 to-green-600',
                                    'Van Cargo': 'from-indigo-500 to-indigo-600',
                                    'Truck': 'from-slate-500 to-slate-600',
                                  };
                                  return colors[model] || 'from-blue-500 to-blue-600';
                                };
                                
                                return (
                                  <div 
                                    key={vIdx}
                                    className={`bg-gradient-to-br ${getVehicleColor(vehicle.model)} text-white p-3 rounded-lg shadow-md hover:shadow-lg transition-shadow relative`}
                                  >
                                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-white text-gray-800 rounded-full flex items-center justify-center text-xs font-bold border-2 border-gray-300">
                                      {vIdx + 1}
                                    </div>
                                    <div className="font-bold text-sm mb-1">{vehicle.model}</div>
                                    <div className="text-xs opacity-90 font-mono truncate mb-2">{vehicle.vin}</div>
                                    <div className="flex items-center justify-between">
                                      <Badge className="bg-white/20 text-white text-xs">
                                        {vehicle.m3} M³
                                      </Badge>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>

                        {/* Lower Deck */}
                        <div>
                          <div className="flex items-center justify-between mb-3 pb-2 border-b-2 border-green-200">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-xs">L</span>
                              </div>
                              <span className="font-bold text-gray-800">Lower Deck</span>
                            </div>
                            <Badge variant="outline" className="bg-green-50 border-green-300">
                              {fleet.bottomDeck.length} vehicles • {fleet.bottomDeck.reduce((sum, v) => sum + v.m3, 0).toFixed(2)} M³
                            </Badge>
                          </div>
                          
                          <div className="bg-gradient-to-br from-green-50 to-white border-2 border-green-300 rounded-xl p-4">
                            <div className="grid grid-cols-3 gap-3">
                              {fleet.bottomDeck.map((vehicle, vIdx) => {
                                const getVehicleColor = (model: string) => {
                                  const colors: Record<string, string> = {
                                    'SUV': 'from-purple-600 to-purple-700',
                                    'Sedan': 'from-blue-600 to-blue-700',
                                    'Hatchback': 'from-green-600 to-green-700',
                                    'Van Cargo': 'from-indigo-600 to-indigo-700',
                                    'Truck': 'from-slate-600 to-slate-700',
                                  };
                                  return colors[model] || 'from-green-500 to-green-600';
                                };
                                
                                return (
                                  <div 
                                    key={vIdx}
                                    className={`bg-gradient-to-br ${getVehicleColor(vehicle.model)} text-white p-3 rounded-lg shadow-md hover:shadow-lg transition-shadow relative`}
                                  >
                                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-white text-gray-800 rounded-full flex items-center justify-center text-xs font-bold border-2 border-gray-300">
                                      {vIdx + 1}
                                    </div>
                                    <div className="font-bold text-sm mb-1">{vehicle.model}</div>
                                    <div className="text-xs opacity-90 font-mono truncate mb-2">{vehicle.vin}</div>
                                    <div className="flex items-center justify-between">
                                      <Badge className="bg-white/20 text-white text-xs">
                                        {vehicle.m3} M³
                                      </Badge>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </Card>

                      {/* Fleet Separator */}
                      {fleetIdx < fleets.length - 1 && (
                        <div className="my-8 border-t-2 border-dashed border-gray-300"></div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Tip */}
              <Card className="p-4 mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-300 shadow-md">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <AlertCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-blue-900 mb-1">Pro Tip</p>
                    <p className="text-sm text-blue-800">
                      Use the <strong>AI Optimize</strong> button to recalculate fleet allocation with updated parameters, 
                      or toggle between <strong>2D Side View</strong> and <strong>3D Isometric View</strong> for better visualization. 
                      You can also manually adjust vehicles between decks and fleets as needed.
                    </p>
                  </div>
                </div>
              </Card>
            </Card>
          )}
        </div>

        {/* RIGHT PANEL - Fleet Summary & Details */}
        {showOptimizedResults && (
          <div className="col-span-3 space-y-6">
          <Card className="p-6">
            <h3 className="font-medium mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-red-600" />
              Fleet Summary
            </h3>

            {/* Fleet Metrics */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-purple-600" />
                  <span className="text-sm">Total Fleets</span>
                </div>
                <span className="font-medium">{fleets.length}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-blue-600" />
                  <span className="text-sm">Total Vehicles</span>
                </div>
                <span className="font-medium">{totalVehicles}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-orange-600" />
                  <span className="text-sm">Est. Cost</span>
                </div>
                <span className="font-medium">${(fleets.length * 2450).toLocaleString()}</span>
              </div>
            </div>

            {/* Fleet Breakdown */}
            <div className="border-t pt-4 mb-6">
              <h4 className="text-sm font-medium mb-3">Fleet Breakdown</h4>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {fleets.map((fleet) => (
                  <div key={fleet.id} className="text-xs p-3 bg-gray-50 rounded border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{fleet.name}</span>
                      <Badge variant="outline" className="text-xs">{fleet.utilization}%</Badge>
                    </div>
                    <div className="flex items-center justify-between text-gray-600">
                      <span>Upper: {fleet.topDeck.length + fleet.middleDeck.length} vehicles</span>
                      <span>Lower: {fleet.bottomDeck.length} vehicles</span>
                    </div>
                    <div className="mt-1 text-gray-500">
                      {fleet.totalM3.toFixed(2)} / {fleet.capacity} M³
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Suggestions */}
            <div className="border-t pt-4">
              <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
                <Zap className="w-4 h-4 text-yellow-600" />
                Optimization Suggestions
              </h4>
              <div className="space-y-2">
                {avgUtilization < 80 && (
                  <div className="p-2 bg-yellow-50 rounded text-xs">
                    <AlertCircle className="w-3 h-3 inline mr-1" />
                    Consider consolidating to fewer fleets for better utilization
                  </div>
                )}
                {fleets.length > 1 && (
                  <div className="p-2 bg-blue-50 rounded text-xs">
                    <CheckCircle className="w-3 h-3 inline mr-1 text-blue-600" />
                    Group vehicles by destination for efficient routing
                  </div>
                )}
                <div className="p-2 bg-green-50 rounded text-xs">
                  <CheckCircle className="w-3 h-3 inline mr-1 text-green-600" />
                  Balance upper and lower deck loads for stability
                </div>
              </div>
            </div>
          </Card>

          {/* Notes Section */}
          <Card className="p-6">
            <h3 className="font-medium mb-4">Special Instructions</h3>
            <Textarea 
              placeholder="Enter delivery sequence, time windows, or mixed order notes..."
              rows={5}
              className="text-sm"
            />
          </Card>

          {/* Actions */}
          <div className="space-y-2">
            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              <Settings className="w-4 h-4 mr-2" />
              Manual Adjustment
            </Button>
            {isWorkflowMode && onComplete && (
              <Button 
                className="w-full bg-[#E30613] hover:bg-red-700"
                onClick={() => {
                  toast.success('Load planning completed!');
                  onComplete({ fleets, totalVehicles, avgUtilization });
                }}
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Complete Load Planning
              </Button>
            )}
          </div>
          </div>
        )}
      </div>
    </div>
  );
}