import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { 
  User, 
  Search, 
  Plus,
  Phone,
  Mail,
  Calendar,
  Award,
  MapPin
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';

export function DriverManagement() {
  const [searchQuery, setSearchQuery] = useState('');

  const drivers = [
    {
      id: 'DRV-001',
      name: 'Juan Rodriguez',
      license: 'LIC-12345',
      phone: '+52 555 1234567',
      email: 'juan.rodriguez@example.com',
      status: 'On Trip',
      currentTrip: 'ORD-2025-001',
      location: 'Highway MEX-57, KM 45',
      experience: '8 years',
      rating: 4.8,
      completedTrips: 1243,
      licenseExpiry: '2026-12-31',
    },
    {
      id: 'DRV-002',
      name: 'Maria Garcia',
      license: 'LIC-23456',
      phone: '+52 555 2345678',
      email: 'maria.garcia@example.com',
      status: 'On Trip',
      currentTrip: 'ORD-2025-002',
      location: 'Plant A - Loading',
      experience: '6 years',
      rating: 4.9,
      completedTrips: 892,
      licenseExpiry: '2027-03-15',
    },
    {
      id: 'DRV-003',
      name: 'Carlos Martinez',
      license: 'LIC-34567',
      phone: '+52 555 3456789',
      email: 'carlos.martinez@example.com',
      status: 'Available',
      currentTrip: 'None',
      location: 'Depot - Mexico City',
      experience: '12 years',
      rating: 4.7,
      completedTrips: 2156,
      licenseExpiry: '2025-11-20',
    },
    {
      id: 'DRV-004',
      name: 'Ana Lopez',
      license: 'LIC-45678',
      phone: '+52 555 4567890',
      email: 'ana.lopez@example.com',
      status: 'Off Duty',
      currentTrip: 'None',
      location: 'Home',
      experience: '4 years',
      rating: 4.6,
      completedTrips: 567,
      licenseExpiry: '2027-08-10',
    },
    {
      id: 'DRV-005',
      name: 'Roberto Sanchez',
      license: 'LIC-56789',
      phone: '+52 555 5678901',
      email: 'roberto.sanchez@example.com',
      status: 'Available',
      currentTrip: 'None',
      location: 'Depot - Guadalajara',
      experience: '10 years',
      rating: 4.9,
      completedTrips: 1789,
      licenseExpiry: '2026-05-22',
    },
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { variant: 'default' | 'secondary' | 'destructive' | 'outline', className?: string }> = {
      'On Trip': { variant: 'default', className: 'bg-blue-500' },
      'Available': { variant: 'default', className: 'bg-green-500' },
      'Off Duty': { variant: 'secondary' },
    };

    const config = statusConfig[status] || { variant: 'outline' as const };
    return (
      <Badge variant={config.variant} className={config.className}>
        {status}
      </Badge>
    );
  };

  const filteredDrivers = drivers.filter(driver =>
    driver.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    driver.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    driver.license.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = {
    total: drivers.length,
    onTrip: drivers.filter(d => d.status === 'On Trip').length,
    available: drivers.filter(d => d.status === 'Available').length,
    offDuty: drivers.filter(d => d.status === 'Off Duty').length,
  };

  return (
    <div className="h-full">
      <div className="flex items-center justify-between p-6 border-b bg-white">
        <div>
          <h1 className="text-3xl mb-2">Driver Management</h1>
          <p className="text-gray-600">Manage your driver workforce and assignments</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add New Driver
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="bg-indigo-100 p-3 rounded-lg">
              <User className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <p className="text-2xl">{stats.total}</p>
              <p className="text-sm text-gray-600">Total Drivers</p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <MapPin className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl">{stats.onTrip}</p>
              <p className="text-sm text-gray-600">On Trip</p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="bg-green-100 p-3 rounded-lg">
              <User className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl">{stats.available}</p>
              <p className="text-sm text-gray-600">Available</p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="bg-gray-100 p-3 rounded-lg">
              <User className="w-6 h-6 text-gray-600" />
            </div>
            <div>
              <p className="text-2xl">{stats.offDuty}</p>
              <p className="text-sm text-gray-600">Off Duty</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Search */}
      <Card className="p-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search by Name, ID, or License..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </Card>

      {/* Drivers Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredDrivers.map((driver) => (
          <Card key={driver.id} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <Avatar className="w-12 h-12">
                  <AvatarFallback className="bg-indigo-100 text-indigo-600">
                    {driver.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{driver.name}</h3>
                  <p className="text-sm text-gray-600">{driver.id}</p>
                </div>
              </div>
              {getStatusBadge(driver.status)}
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">{driver.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">{driver.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Award className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">{driver.license}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">Exp: {driver.licenseExpiry}</span>
              </div>
            </div>

            <div className="p-3 bg-gray-50 rounded-lg mb-4">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">Current Location</span>
              </div>
              <p className="text-sm font-medium">{driver.location}</p>
              {driver.currentTrip !== 'None' && (
                <p className="text-sm text-gray-600 mt-1">
                  Active Trip: {driver.currentTrip}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between text-sm">
              <div>
                <p className="text-gray-600">Experience</p>
                <p className="font-medium">{driver.experience}</p>
              </div>
              <div>
                <p className="text-gray-600">Rating</p>
                <p className="font-medium">⭐ {driver.rating}</p>
              </div>
              <div>
                <p className="text-gray-600">Completed Trips</p>
                <p className="font-medium">{driver.completedTrips}</p>
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              <Button variant="outline" className="flex-1" size="sm">
                View Profile
              </Button>
              <Button variant="outline" className="flex-1" size="sm">
                Assign Trip
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
