import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { 
  Truck, 
  Search, 
  Plus,
  Settings,
  AlertCircle,
  CheckCircle,
  Wrench
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { Progress } from './ui/progress';

export function FleetManagement() {
  const [searchQuery, setSearchQuery] = useState('');

  const fleets = [
    {
      id: 'TRK-001',
      type: 'Single Carrier',
      capacity: '2 vehicles',
      status: 'Active',
      currentLoad: 2,
      maxLoad: 2,
      driver: 'Juan Rodriguez',
      location: 'In Transit - Highway MEX-57',
      maintenance: 'Good',
      lastService: '2025-10-01',
      nextService: '2025-11-01',
    },
    {
      id: 'TRK-002',
      type: 'Multi Carrier',
      capacity: '8 vehicles',
      status: 'Active',
      currentLoad: 6,
      maxLoad: 8,
      driver: 'Maria Garcia',
      location: 'Loading - Plant A',
      maintenance: 'Good',
      lastService: '2025-09-15',
      nextService: '2025-10-15',
    },
    {
      id: 'TRK-003',
      type: 'Single Carrier',
      capacity: '2 vehicles',
      status: 'Available',
      currentLoad: 0,
      maxLoad: 2,
      driver: 'Not Assigned',
      location: 'Depot - Mexico City',
      maintenance: 'Good',
      lastService: '2025-10-10',
      nextService: '2025-11-10',
    },
    {
      id: 'TRK-004',
      type: 'Multi Carrier',
      capacity: '8 vehicles',
      status: 'Maintenance',
      currentLoad: 0,
      maxLoad: 8,
      driver: 'Not Assigned',
      location: 'Service Center',
      maintenance: 'In Service',
      lastService: '2025-10-20',
      nextService: '2025-11-20',
    },
    {
      id: 'TRK-005',
      type: 'Trailer',
      capacity: '12 vehicles',
      status: 'Active',
      currentLoad: 10,
      maxLoad: 12,
      driver: 'Carlos Martinez',
      location: 'In Transit - Highway MEX-15',
      maintenance: 'Warning',
      lastService: '2025-08-20',
      nextService: '2025-10-20',
    },
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { variant: 'default' | 'secondary' | 'destructive' | 'outline', className?: string }> = {
      'Active': { variant: 'default', className: 'bg-green-500' },
      'Available': { variant: 'default', className: 'bg-blue-500' },
      'Maintenance': { variant: 'destructive' },
    };

    const config = statusConfig[status] || { variant: 'outline' as const };
    return (
      <Badge variant={config.variant} className={config.className}>
        {status}
      </Badge>
    );
  };

  const getMaintenanceIcon = (status: string) => {
    switch (status) {
      case 'Good':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'Warning':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      default:
        return <Wrench className="w-5 h-5 text-blue-500" />;
    }
  };

  const filteredFleets = fleets.filter(fleet =>
    fleet.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    fleet.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    fleet.driver.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = {
    total: fleets.length,
    active: fleets.filter(f => f.status === 'Active').length,
    available: fleets.filter(f => f.status === 'Available').length,
    maintenance: fleets.filter(f => f.status === 'Maintenance').length,
  };

  return (
    <div className="h-full">
      <div className="flex items-center justify-between p-6 border-b bg-white">
        <div>
          <h1 className="text-3xl mb-2">Fleet Management</h1>
          <p className="text-gray-600">Monitor and manage your vehicle carrier fleet</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add New Fleet
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6 pb-4">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="bg-indigo-100 p-3 rounded-lg">
              <Truck className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <p className="text-2xl">{stats.total}</p>
              <p className="text-sm text-gray-600">Total Fleet</p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="bg-green-100 p-3 rounded-lg">
              <Truck className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl">{stats.active}</p>
              <p className="text-sm text-gray-600">Active</p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Truck className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl">{stats.available}</p>
              <p className="text-sm text-gray-600">Available</p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="bg-red-100 p-3 rounded-lg">
              <Wrench className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-2xl">{stats.maintenance}</p>
              <p className="text-sm text-gray-600">In Maintenance</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Search */}
      <Card className="p-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search by Fleet ID, Type, or Driver..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </Card>

      {/* Fleet Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Fleet ID</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Capacity</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Current Load</TableHead>
              <TableHead>Driver</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Maintenance</TableHead>
              <TableHead>Next Service</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredFleets.map((fleet) => (
              <TableRow key={fleet.id}>
                <TableCell className="font-medium">{fleet.id}</TableCell>
                <TableCell>{fleet.type}</TableCell>
                <TableCell>{fleet.capacity}</TableCell>
                <TableCell>{getStatusBadge(fleet.status)}</TableCell>
                <TableCell>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>{fleet.currentLoad} / {fleet.maxLoad}</span>
                      <span className="text-gray-500">
                        {Math.round((fleet.currentLoad / fleet.maxLoad) * 100)}%
                      </span>
                    </div>
                    <Progress 
                      value={(fleet.currentLoad / fleet.maxLoad) * 100} 
                      className="h-2"
                    />
                  </div>
                </TableCell>
                <TableCell>{fleet.driver}</TableCell>
                <TableCell>{fleet.location}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {getMaintenanceIcon(fleet.maintenance)}
                    <span className="text-sm">{fleet.maintenance}</span>
                  </div>
                </TableCell>
                <TableCell>{fleet.nextService}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">
                    <Settings className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
