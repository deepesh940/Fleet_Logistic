import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { 
  Search, 
  Plus,
  Edit,
  Calculator
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Label } from './ui/label';

export function VehicleMaster() {
  const [searchQuery, setSearchQuery] = useState('');
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');

  const vehicles = [
    {
      model: 'Sedan XL 2025',
      type: 'Sedan',
      length: 4.85,
      width: 1.85,
      height: 1.45,
      m3: 13.02,
      weight: 1450,
      oemCode: 'SDN-XL-2025'
    },
    {
      model: 'SUV Pro 2025',
      type: 'SUV',
      length: 4.95,
      width: 1.95,
      height: 1.75,
      m3: 16.88,
      weight: 1850,
      oemCode: 'SUV-PR-2025'
    },
    {
      model: 'Hatchback Sport 2025',
      type: 'Hatchback',
      length: 4.15,
      width: 1.78,
      height: 1.42,
      m3: 12.50,
      weight: 1250,
      oemCode: 'HB-SP-2025'
    },
    {
      model: 'Van Cargo 2025',
      type: 'Van Cargo',
      length: 5.15,
      width: 1.96,
      height: 1.98,
      m3: 19.98,
      weight: 1950,
      oemCode: 'VAN-CG-2025'
    },
    {
      model: 'Truck Max 2025',
      type: 'Truck',
      length: 5.35,
      width: 1.92,
      height: 1.82,
      m3: 20.50,
      weight: 2100,
      oemCode: 'TRK-MX-2025'
    },
  ];

  const calculateVolume = () => {
    const l = parseFloat(length);
    const w = parseFloat(width);
    const h = parseFloat(height);
    if (l && w && h) {
      return (l * w * h).toFixed(2);
    }
    return '0.00';
  };

  const getTypeBadge = (type: string) => {
    const colors: Record<string, string> = {
      'Sedan': 'bg-blue-500',
      'SUV': 'bg-green-500',
      'Hatchback': 'bg-pink-500',
      'Van Cargo': 'bg-purple-500',
      'Truck': 'bg-orange-500'
    };
    return <Badge className={colors[type] || 'bg-gray-500'}>{type}</Badge>;
  };

  return (
    <div className="h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b bg-white">
        <div>
          <h1 className="text-3xl mb-2">Vehicle Master</h1>
          <p className="text-gray-600">Vehicle specifications and load planning data</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-red-600 hover:bg-red-700">
              <Plus className="w-4 h-4 mr-2" />
              Add New Model
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Vehicle Model</DialogTitle>
              <DialogDescription>Enter vehicle specifications with automatic M³ calculation</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Model Name</Label>
                  <Input placeholder="e.g., Sedan XL 2025" className="mt-1" />
                </div>
                <div>
                  <Label>Type</Label>
                  <Input placeholder="SUV / Sedan / Hatchback / Van Cargo / Truck" className="mt-1" />
                </div>
              </div>
              
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center gap-2 mb-3">
                  <Calculator className="w-5 h-5 text-blue-600" />
                  <h3 className="font-medium">Automatic M³ Calculator</h3>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-3">
                  <div>
                    <Label className="text-sm">Length (m)</Label>
                    <Input 
                      type="number" 
                      step="0.01"
                      placeholder="4.85" 
                      className="mt-1"
                      value={length}
                      onChange={(e) => setLength(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label className="text-sm">Width (m)</Label>
                    <Input 
                      type="number" 
                      step="0.01"
                      placeholder="1.85" 
                      className="mt-1"
                      value={width}
                      onChange={(e) => setWidth(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label className="text-sm">Height (m)</Label>
                    <Input 
                      type="number" 
                      step="0.01"
                      placeholder="1.45" 
                      className="mt-1"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                    />
                  </div>
                </div>
                <div className="bg-white p-3 rounded border border-blue-300">
                  <p className="text-sm text-gray-600 mb-1">Calculated Volume (M³)</p>
                  <p className="text-2xl font-medium text-blue-600">{calculateVolume()} M³</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Weight (kg)</Label>
                  <Input type="number" placeholder="1450" className="mt-1" />
                </div>
                <div>
                  <Label>OEM Code</Label>
                  <Input placeholder="SDN-XL-2025" className="mt-1" />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline">Cancel</Button>
                <Button className="bg-red-600 hover:bg-red-700">
                  Add Model
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <Card className="p-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search by Model, Type, or OEM Code..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </Card>

      {/* Vehicles Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Model</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Length (m)</TableHead>
              <TableHead>Width (m)</TableHead>
              <TableHead>Height (m)</TableHead>
              <TableHead>Volume (M³)</TableHead>
              <TableHead>Weight (kg)</TableHead>
              <TableHead>OEM Code</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vehicles.map((vehicle) => (
              <TableRow key={vehicle.oemCode} className="hover:bg-gray-50">
                <TableCell className="font-medium">{vehicle.model}</TableCell>
                <TableCell>{getTypeBadge(vehicle.type)}</TableCell>
                <TableCell>{vehicle.length}</TableCell>
                <TableCell>{vehicle.width}</TableCell>
                <TableCell>{vehicle.height}</TableCell>
                <TableCell>
                  <span className="font-medium text-blue-600">{vehicle.m3} M³</span>
                </TableCell>
                <TableCell>{vehicle.weight} kg</TableCell>
                <TableCell>
                  <code className="text-sm bg-gray-100 px-2 py-1 rounded">{vehicle.oemCode}</code>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Integration Preview */}
      <Card className="p-6 mt-6 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium mb-1">Load Planner Integration</h3>
            <p className="text-sm text-gray-600">These specifications are used by the AI Load Planner for optimal vehicle placement</p>
          </div>
          <Button variant="outline">
            View in Load Planner
          </Button>
        </div>
      </Card>
    </div>
  );
}
