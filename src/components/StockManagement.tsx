import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { 
  Search, 
  Filter,
  Download,
  Upload,
  AlertCircle,
  CheckCircle,
  Clock
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

export function StockManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [yardFilter, setYardFilter] = useState('all');

  const stock = [
    {
      vin: 'VIN123456789',
      model: 'Sedan XL 2025',
      type: 'Sedan',
      yard: 'Yard A - CDMX',
      location: 'A-12-05',
      age: 5,
      status: 'Available',
      source: 'Sales Stock',
    },
    {
      vin: 'VIN987654321',
      model: 'SUV Pro 2025',
      type: 'SUV',
      yard: 'Yard A - CDMX',
      location: 'A-15-08',
      age: 12,
      status: 'Available',
      source: 'Yard Stock',
    },
    {
      vin: 'VIN456789123',
      model: 'Truck Max 2025',
      type: 'Truck',
      yard: 'Yard B - Monterrey',
      location: 'B-03-02',
      age: 8,
      status: 'Reserved',
      source: 'Special Order',
    },
    {
      vin: 'VIN789123456',
      model: 'Van Cargo 2025',
      type: 'Van Cargo',
      yard: 'Yard C - Puebla',
      location: 'C-08-11',
      age: 18,
      status: 'Aged Stock',
      source: 'Sales Stock',
    },
  ];

  const getStatusBadge = (status: string, age: number) => {
    if (status === 'Reserved') {
      return <Badge className="bg-blue-500">Reserved</Badge>;
    }
    if (age > 15) {
      return <Badge variant="destructive">Aged Stock ({age}d)</Badge>;
    }
    if (age > 10) {
      return <Badge className="bg-yellow-500">Alert ({age}d)</Badge>;
    }
    return <Badge className="bg-green-500">Available ({age}d)</Badge>;
  };

  const stats = {
    total: 1245,
    available: 892,
    reserved: 234,
    agedStock: 119
  };

  return (
    <div className="h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b bg-white">
        <div>
          <h1 className="text-3xl mb-2">Stock Master</h1>
          <p className="text-gray-600">Vehicle inventory and availability tracking</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Upload className="w-4 h-4 mr-2" />
            Import Stock
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="bg-indigo-100 p-3 rounded-lg">
              <CheckCircle className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <p className="text-2xl">{stats.total}</p>
              <p className="text-sm text-gray-600">Total Vehicles</p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="bg-green-100 p-3 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl">{stats.available}</p>
              <p className="text-sm text-gray-600">Available</p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl">{stats.reserved}</p>
              <p className="text-sm text-gray-600">Reserved</p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="bg-red-100 p-3 rounded-lg">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-2xl">{stats.agedStock}</p>
              <p className="text-sm text-gray-600">Aged Stock (&gt;15d)</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search by VIN, Model, or Location..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={yardFilter} onValueChange={setYardFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filter by yard" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Yards</SelectItem>
              <SelectItem value="yard-a">Yard A - CDMX</SelectItem>
              <SelectItem value="yard-b">Yard B - Monterrey</SelectItem>
              <SelectItem value="yard-c">Yard C - Puebla</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Stock Age" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Ages</SelectItem>
              <SelectItem value="fresh">0-10 days</SelectItem>
              <SelectItem value="warning">11-15 days</SelectItem>
              <SelectItem value="aged">15+ days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Stock Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>VIN</TableHead>
              <TableHead>Model</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Yard Location</TableHead>
              <TableHead>Slot Position</TableHead>
              <TableHead>Stock Age</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {stock.map((item) => (
              <TableRow key={item.vin} className="cursor-pointer hover:bg-gray-50">
                <TableCell className="font-medium">{item.vin}</TableCell>
                <TableCell>{item.model}</TableCell>
                <TableCell>
                  <Badge variant="outline">{item.type}</Badge>
                </TableCell>
                <TableCell>{item.yard}</TableCell>
                <TableCell>
                  <code className="text-sm bg-gray-100 px-2 py-1 rounded">{item.location}</code>
                </TableCell>
                <TableCell>
                  <span className={item.age > 15 ? 'text-red-600 font-medium' : item.age > 10 ? 'text-yellow-600 font-medium' : ''}>
                    {item.age} days
                  </span>
                </TableCell>
                <TableCell>{item.source}</TableCell>
                <TableCell>{getStatusBadge(item.status, item.age)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
