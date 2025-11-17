import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { 
  Search, 
  Filter, 
  Plus,
  MoreVertical,
  Eye,
  Edit,
  Trash2
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Badge } from './ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface OrderListProps {
  onSelectOrder: (orderId: string) => void;
  onCreateOrder: () => void;
}

export function OrderList({ onSelectOrder, onCreateOrder }: OrderListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const orders = [
    {
      id: 'ORD-2025-001',
      vehicleTypes: ['SUV', 'Sedan', 'Hatchback'],
      vehicleCount: 13,
      status: 'Ready to dispatch',
      source: 'Plant A - Mexico City',
      yard: 'Yard MX-01',
      destinations: ['Guadalajara Dealer'],
      deliveryDate: '2025-10-25',
      fleetCount: 1,
      fleets: ['FLT-001']
    },
    {
      id: 'ORD-2025-002',
      vehicleTypes: ['Hatchback', 'Sedan'],
      vehicleCount: 8,
      status: 'Pending Confirmation',
      source: 'Plant B - Tijuana',
      yard: 'Yard TJ-03',
      destinations: ['Cancun Dealer'],
      deliveryDate: '2025-10-26',
      fleetCount: 1,
      fleets: ['FLT-003']
    },
    {
      id: 'ORD-2025-003',
      vehicleTypes: ['Van Cargo', 'Truck'],
      vehicleCount: 18,
      status: 'New',
      source: 'Plant A - Mexico City',
      yard: 'Yard MX-02',
      destinations: ['Puebla Dealer', 'Veracruz Dealer', 'Oaxaca Dealer'],
      deliveryDate: '2025-10-27',
      fleetCount: 2,
      fleets: ['FLT-004', 'FLT-005']
    },
    {
      id: 'ORD-2025-004',
      vehicleTypes: ['Sedan'],
      vehicleCount: 6,
      status: 'Ready to dispatch',
      source: 'Plant C - Aguascalientes',
      yard: 'Yard AG-01',
      destinations: ['Puebla Dealer'],
      deliveryDate: '2025-10-28',
      fleetCount: 1,
      fleets: ['FLT-006']
    },
    {
      id: 'ORD-2025-005',
      vehicleTypes: ['Van Cargo'],
      vehicleCount: 10,
      status: 'Pending Confirmation',
      source: 'Plant B - Tijuana',
      yard: 'Yard TJ-03',
      destinations: ['Tijuana Dealer'],
      deliveryDate: '2025-10-22',
      fleetCount: 1,
      fleets: ['FLT-007']
    },
    {
      id: 'ORD-2025-006',
      vehicleTypes: ['SUV', 'Sedan'],
      vehicleCount: 15,
      status: 'New',
      source: 'Plant A - Mexico City',
      yard: 'Yard MX-01',
      destinations: ['Cancun Dealer', 'Merida Dealer'],
      deliveryDate: '2025-10-30',
      fleetCount: 2,
      fleets: ['FLT-008', 'FLT-009']
    },
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { variant: 'default' | 'secondary' | 'destructive' | 'outline', className?: string }> = {
      'New': { variant: 'default', className: 'bg-blue-500' },
      'Ready to dispatch': { variant: 'default', className: 'bg-green-500' },
      'Pending Confirmation': { variant: 'default', className: 'bg-yellow-500' },
    };

    const config = statusConfig[status] || { variant: 'outline' as const };
    return (
      <Badge variant={config.variant} className={config.className}>
        {status}
      </Badge>
    );
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.vehicleTypes.some(type => type.toLowerCase().includes(searchQuery.toLowerCase())) ||
      order.source.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.destinations.some(dest => dest.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="h-full">
      <div className="flex items-center justify-between p-6 border-b bg-white">
        <div>
          <h1 className="text-3xl mb-2">Order Management</h1>
          <p className="text-gray-600">Track and manage all vehicle delivery orders with AI-powered load planning</p>
        </div>
      </div>

      {/* Filters */}
      <Card className="p-4 m-6 mb-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search by Order ID, Vehicle Type, Source, or Destination..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="New">New</SelectItem>
              <SelectItem value="Ready to dispatch">Ready to dispatch</SelectItem>
              <SelectItem value="Pending Confirmation">Pending Confirmation</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Orders Table */}
      <Card className="mx-6 mb-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Vehicle Types</TableHead>
              <TableHead>Total Vehicles</TableHead>
              <TableHead>Source Location</TableHead>
              <TableHead>Yard</TableHead>
              <TableHead>Destination(s)</TableHead>
              <TableHead>Delivery Date</TableHead>
              <TableHead>Fleets</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.id} className="cursor-pointer hover:bg-gray-50">
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {order.vehicleTypes.map((type, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {type}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <span className="font-medium">{order.vehicleCount}</span>
                </TableCell>
                <TableCell className="text-sm">{order.source}</TableCell>
                <TableCell className="text-sm">{order.yard}</TableCell>
                <TableCell>
                  <div className="space-y-1 max-w-xs">
                    {order.destinations.map((dest, idx) => (
                      <div key={idx} className="text-sm text-gray-700">
                        {dest}
                      </div>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="text-sm">{order.deliveryDate}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Badge variant="secondary" className="text-xs">
                      {order.fleetCount} Fleet{order.fleetCount > 1 ? 's' : ''}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell>{getStatusBadge(order.status)}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onSelectOrder(order.id)}>
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="w-4 h-4 mr-2" />
                        AI Load Planning
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete Order
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {filteredOrders.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No orders found matching your criteria</p>
        </div>
      )}
    </div>
  );
}
