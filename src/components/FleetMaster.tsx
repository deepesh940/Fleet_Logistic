import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { 
  Search, 
  Plus,
  Wrench,
  Calendar,
  AlertCircle
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

export function FleetMaster() {
  const [searchQuery, setSearchQuery] = useState('');

  const fleets = [
    {
      id: 'TRK-001',
      type: 'Single Carrier',
      dimensions: '6.0 x 2.4 x 2.0 m',
      rampConfig: 'Hydraulic Ramp - Rear',
      maxM3: 28.8,
      axles: 2,
      capacity: '2 vehicles',
      status: 'Available',
      lastMaintenance: '2025-10-01',
      nextMaintenance: '2025-11-01',
      licensePlate: 'MX-ABC-1234'
    },
    {
      id: 'TRK-002',
      type: 'Multi Carrier',
      dimensions: '18.0 x 2.5 x 3.5 m',
      rampConfig: 'Bi-Level with Upper Deck',
      maxM3: 157.5,
      axles: 5,
      capacity: '8 vehicles',
      status: 'In Trip',
      lastMaintenance: '2025-09-15',
      nextMaintenance: '2025-10-15',
      licensePlate: 'MX-XYZ-5678'
    },
    {
      id: 'TRK-003',
      type: 'Single Carrier',
      dimensions: '6.0 x 2.4 x 2.0 m',
      rampConfig: 'Hydraulic Ramp - Rear',
      maxM3: 28.8,
      axles: 2,
      capacity: '2 vehicles',
      status: 'Available',
      lastMaintenance: '2025-10-10',
      nextMaintenance: '2025-11-10',
      licensePlate: 'MX-DEF-9012'
    },
    {
      id: 'TRL-001',
      type: 'Trailer (12-Unit)',
      dimensions: '22.0 x 2.6 x 4.0 m',
      rampConfig: 'Tri-Level with Hydraulic Lifts',
      maxM3: 228.8,
      axles: 6,
      capacity: '12 vehicles',
      status: 'Maintenance',
      lastMaintenance: '2025-10-20',
      nextMaintenance: '2025-11-20',
      licensePlate: 'MX-TRL-3456'
    },
  ];

  const maintenanceSchedule = [
    { fleetId: 'TRK-002', type: 'Routine Service', date: '2025-10-25', status: 'Scheduled' },
    { fleetId: 'TRL-001', type: 'Brake Inspection', date: '2025-10-23', status: 'In Progress' },
    { fleetId: 'TRK-005', type: 'Tire Replacement', date: '2025-10-28', status: 'Scheduled' },
  ];

  const getStatusBadge = (status: string) => {
    const config: Record<string, { variant: 'default' | 'secondary' | 'destructive' | 'outline', className?: string }> = {
      'Available': { variant: 'default', className: 'bg-green-500' },
      'In Trip': { variant: 'default', className: 'bg-blue-500' },
      'Maintenance': { variant: 'destructive' },
    };
    const c = config[status] || { variant: 'outline' as const };
    return <Badge variant={c.variant} className={c.className}>{status}</Badge>;
  };

  return (
    <div className="h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b bg-white">
        <div>
          <h1 className="text-3xl mb-2">Fleet & Trailer Master</h1>
          <p className="text-gray-600">Manage carrier trucks and trailer configurations</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-red-600 hover:bg-red-700">
              <Plus className="w-4 h-4 mr-2" />
              Add New Fleet
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Fleet Vehicle</DialogTitle>
              <DialogDescription>Enter fleet specifications and configuration</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Fleet ID</Label>
                  <Input placeholder="TRK-XXX" className="mt-1" />
                </div>
                <div>
                  <Label>License Plate</Label>
                  <Input placeholder="MX-ABC-1234" className="mt-1" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Type</Label>
                  <Select>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single">Single Carrier (2 vehicles)</SelectItem>
                      <SelectItem value="multi">Multi Carrier (8 vehicles)</SelectItem>
                      <SelectItem value="trailer">Trailer (12 vehicles)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Axles</Label>
                  <Input type="number" placeholder="2" className="mt-1" />
                </div>
              </div>
              <div>
                <Label>Dimensions (L x W x H in meters)</Label>
                <Input placeholder="6.0 x 2.4 x 2.0" className="mt-1" />
              </div>
              <div>
                <Label>Ramp Configuration</Label>
                <Input placeholder="e.g., Hydraulic Ramp - Rear" className="mt-1" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Max M³</Label>
                  <Input type="number" step="0.1" placeholder="28.8" className="mt-1" />
                </div>
                <div>
                  <Label>Capacity (vehicles)</Label>
                  <Input type="number" placeholder="2" className="mt-1" />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline">Cancel</Button>
                <Button className="bg-red-600 hover:bg-red-700">Add Fleet</Button>
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
            placeholder="Search by Fleet ID, Type, or License Plate..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Fleet Table */}
        <Card className="lg:col-span-2">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fleet ID</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Dimensions</TableHead>
                <TableHead>Ramp Config</TableHead>
                <TableHead>Max M³</TableHead>
                <TableHead>Axles</TableHead>
                <TableHead>Capacity</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {fleets.map((fleet) => (
                <TableRow key={fleet.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium">{fleet.id}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{fleet.type}</Badge>
                  </TableCell>
                  <TableCell className="text-sm">{fleet.dimensions}</TableCell>
                  <TableCell className="text-sm">{fleet.rampConfig}</TableCell>
                  <TableCell>
                    <span className="font-medium text-blue-600">{fleet.maxM3} M³</span>
                  </TableCell>
                  <TableCell>{fleet.axles}</TableCell>
                  <TableCell>{fleet.capacity}</TableCell>
                  <TableCell>{getStatusBadge(fleet.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>

        {/* Maintenance Schedule Card */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl">Maintenance Schedule</h2>
            <Wrench className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-3">
            {maintenanceSchedule.map((item, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg border">
                <div className="flex items-start justify-between mb-2">
                  <p className="font-medium text-sm">{item.fleetId}</p>
                  <Badge 
                    variant={item.status === 'In Progress' ? 'default' : 'secondary'}
                    className={item.status === 'In Progress' ? 'bg-blue-500' : ''}
                  >
                    {item.status}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-1">{item.type}</p>
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <Calendar className="w-3 h-3" />
                  <span>{item.date}</span>
                </div>
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full mt-4" size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            Schedule Maintenance
          </Button>
        </Card>
      </div>

      {/* Trailer Config Visual */}
      <Card className="p-6">
        <h2 className="text-xl mb-4">Trailer Configuration Diagram</h2>
        <div className="bg-gray-100 rounded-lg p-8">
          <div className="max-w-4xl mx-auto">
            <p className="text-center text-gray-600 mb-4">Multi-Level Carrier - Top View</p>
            <div className="bg-white rounded-lg border-2 border-gray-300 p-6">
              <div className="grid grid-cols-4 gap-2">
                {/* Upper Level */}
                <div className="col-span-4 mb-4">
                  <p className="text-sm text-gray-600 mb-2">Upper Level (4 vehicles)</p>
                  <div className="grid grid-cols-4 gap-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={`upper-${i}`} className="bg-blue-100 border-2 border-blue-400 rounded p-3 text-center">
                        <p className="text-xs">Position {i}</p>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Lower Level */}
                <div className="col-span-4">
                  <p className="text-sm text-gray-600 mb-2">Lower Level (4 vehicles)</p>
                  <div className="grid grid-cols-4 gap-2">
                    {[5, 6, 7, 8].map((i) => (
                      <div key={`lower-${i}`} className="bg-green-100 border-2 border-green-400 rounded p-3 text-center">
                        <p className="text-xs">Position {i}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-center gap-1 text-sm text-gray-600">
                <AlertCircle className="w-4 h-4" />
                <span>Hydraulic ramp at rear for loading/unloading</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
