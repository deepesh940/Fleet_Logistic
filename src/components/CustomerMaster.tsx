import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { 
  Search, 
  Plus,
  Edit,
  Trash2,
  MapPin,
  Phone,
  Mail,
  Building2,
  User,
  Package
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
import { Textarea } from './ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface Customer {
  id: string;
  code: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  customerType: string;
  status: 'Active' | 'Inactive';
  totalOrders: number;
  activeOrders: number;
  creditLimit: string;
  paymentTerms: string;
}

export function CustomerMaster() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);

  const customers: Customer[] = [
    {
      id: 'CST-001',
      code: 'GDL-001',
      name: 'Customer Central Guadalajara',
      contactPerson: 'Juan Rodriguez',
      email: 'juan@customercentral.com',
      phone: '+52 33 1234 5678',
      address: 'Av. López Mateos 2500',
      city: 'Guadalajara',
      state: 'Jalisco',
      zipCode: '44600',
      customerType: 'Premium',
      status: 'Active',
      totalOrders: 245,
      activeOrders: 8,
      creditLimit: '$500,000',
      paymentTerms: 'Net 30'
    },
    {
      id: 'CST-002',
      code: 'TIJ-001',
      name: 'Customer Norte Tijuana',
      contactPerson: 'Maria Garcia',
      email: 'maria@customernorte.com',
      phone: '+52 664 987 6543',
      address: 'Blvd. Agua Caliente 10050',
      city: 'Tijuana',
      state: 'Baja California',
      zipCode: '22420',
      customerType: 'Standard',
      status: 'Active',
      totalOrders: 189,
      activeOrders: 5,
      creditLimit: '$300,000',
      paymentTerms: 'Net 30'
    },
    {
      id: 'CST-003',
      code: 'MTY-001',
      name: 'Customer Express Monterrey',
      contactPerson: 'Carlos Hernandez',
      email: 'carlos@customerexpress.com',
      phone: '+52 81 8765 4321',
      address: 'Av. Constitución 2000',
      city: 'Monterrey',
      state: 'Nuevo León',
      zipCode: '64000',
      customerType: 'Premium',
      status: 'Active',
      totalOrders: 312,
      activeOrders: 12,
      creditLimit: '$750,000',
      paymentTerms: 'Net 45'
    },
    {
      id: 'CST-004',
      code: 'VER-001',
      name: 'Customer Costa Veracruz',
      contactPerson: 'Ana Martinez',
      email: 'ana@customercosta.com',
      phone: '+52 229 123 4567',
      address: 'Blvd. Ávila Camacho 1234',
      city: 'Veracruz',
      state: 'Veracruz',
      zipCode: '91910',
      customerType: 'Standard',
      status: 'Active',
      totalOrders: 156,
      activeOrders: 4,
      creditLimit: '$250,000',
      paymentTerms: 'Net 30'
    },
  ];

  const handleEdit = (customer: Customer) => {
    setEditingCustomer(customer);
    setIsDialogOpen(true);
  };

  const handleNew = () => {
    setEditingCustomer(null);
    setIsDialogOpen(true);
  };

  const getStatusBadge = (status: string) => {
    return status === 'Active' ? (
      <Badge className="bg-green-500">Active</Badge>
    ) : (
      <Badge variant="destructive">Inactive</Badge>
    );
  };

  const getCustomerTypeBadge = (type: string) => {
    return type === 'Premium' ? (
      <Badge className="bg-purple-600">Premium</Badge>
    ) : (
      <Badge variant="outline">Standard</Badge>
    );
  };

  return (
    <div className="h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b bg-white">
        <div>
          <h1 className="text-3xl mb-2">Customer Master</h1>
          <p className="text-gray-600">Manage customer information and relationships</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-red-600 hover:bg-red-700" onClick={handleNew}>
              <Plus className="w-4 h-4 mr-2" />
              Add New Customer
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingCustomer ? 'Edit Customer' : 'Add New Customer'}
              </DialogTitle>
              <DialogDescription>
                {editingCustomer 
                  ? 'Update customer information below' 
                  : 'Enter customer details to add to the system'}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              {/* Basic Information */}
              <div className="border-b pb-4">
                <h3 className="font-medium mb-3">Basic Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Customer Code *</Label>
                    <Input 
                      placeholder="e.g., GDL-001" 
                      className="mt-1"
                      defaultValue={editingCustomer?.code}
                    />
                  </div>
                  <div>
                    <Label>Customer Name *</Label>
                    <Input 
                      placeholder="Enter customer name" 
                      className="mt-1"
                      defaultValue={editingCustomer?.name}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <Label>Customer Type</Label>
                    <Select defaultValue={editingCustomer?.customerType.toLowerCase() || 'standard'}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">Standard</SelectItem>
                        <SelectItem value="premium">Premium</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Status</Label>
                    <Select defaultValue={editingCustomer?.status.toLowerCase() || 'active'}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="border-b pb-4">
                <h3 className="font-medium mb-3">Contact Information</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <Label>Contact Person *</Label>
                    <Input 
                      placeholder="Full name" 
                      className="mt-1"
                      defaultValue={editingCustomer?.contactPerson}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <Label>Email *</Label>
                    <Input 
                      type="email" 
                      placeholder="email@example.com" 
                      className="mt-1"
                      defaultValue={editingCustomer?.email}
                    />
                  </div>
                  <div>
                    <Label>Phone *</Label>
                    <Input 
                      placeholder="+52 123 456 7890" 
                      className="mt-1"
                      defaultValue={editingCustomer?.phone}
                    />
                  </div>
                </div>
              </div>

              {/* Address Information */}
              <div className="border-b pb-4">
                <h3 className="font-medium mb-3">Address</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <Label>Street Address *</Label>
                    <Input 
                      placeholder="Street address" 
                      className="mt-1"
                      defaultValue={editingCustomer?.address}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-4">
                  <div>
                    <Label>City *</Label>
                    <Input 
                      placeholder="City" 
                      className="mt-1"
                      defaultValue={editingCustomer?.city}
                    />
                  </div>
                  <div>
                    <Label>State *</Label>
                    <Input 
                      placeholder="State" 
                      className="mt-1"
                      defaultValue={editingCustomer?.state}
                    />
                  </div>
                  <div>
                    <Label>ZIP Code *</Label>
                    <Input 
                      placeholder="ZIP" 
                      className="mt-1"
                      defaultValue={editingCustomer?.zipCode}
                    />
                  </div>
                </div>
              </div>

              {/* Financial Information */}
              <div>
                <h3 className="font-medium mb-3">Financial Terms</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Credit Limit</Label>
                    <Input 
                      placeholder="$0.00" 
                      className="mt-1"
                      defaultValue={editingCustomer?.creditLimit}
                    />
                  </div>
                  <div>
                    <Label>Payment Terms</Label>
                    <Select defaultValue={editingCustomer?.paymentTerms || 'net30'}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select terms" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="net30">Net 30</SelectItem>
                        <SelectItem value="net45">Net 45</SelectItem>
                        <SelectItem value="net60">Net 60</SelectItem>
                        <SelectItem value="cod">Cash on Delivery</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-2 pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button 
                  className="bg-red-600 hover:bg-red-700"
                  onClick={() => setIsDialogOpen(false)}
                >
                  {editingCustomer ? 'Update Customer' : 'Add Customer'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Building2 className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl">{customers.length}</p>
              <p className="text-sm text-gray-600">Total Customers</p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="bg-green-100 p-3 rounded-lg">
              <User className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl">{customers.filter(d => d.status === 'Active').length}</p>
              <p className="text-sm text-gray-600">Active Customers</p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="bg-purple-100 p-3 rounded-lg">
              <Package className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl">{customers.reduce((sum, d) => sum + d.activeOrders, 0)}</p>
              <p className="text-sm text-gray-600">Active Orders</p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="bg-orange-100 p-3 rounded-lg">
              <Building2 className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-2xl">{customers.filter(d => d.customerType === 'Premium').length}</p>
              <p className="text-sm text-gray-600">Premium Customers</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Search Bar */}
      <Card className="p-4 mb-6">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search by customer name, code, city, or contact person..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </Card>

      {/* Customers Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer Code</TableHead>
              <TableHead>Customer Name</TableHead>
              <TableHead>Contact Person</TableHead>
              <TableHead>Contact Info</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Total Orders</TableHead>
              <TableHead>Active Orders</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>
                  <span className="font-medium">{customer.code}</span>
                </TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium">{customer.name}</p>
                    <p className="text-sm text-gray-500">{customer.id}</p>
                  </div>
                </TableCell>
                <TableCell>{customer.contactPerson}</TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1 text-sm">
                      <Mail className="w-3 h-3 text-gray-400" />
                      <span className="text-sm">{customer.email}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <Phone className="w-3 h-3 text-gray-400" />
                      <span className="text-sm">{customer.phone}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-start gap-1">
                    <MapPin className="w-3 h-3 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm">{customer.city}</p>
                      <p className="text-xs text-gray-500">{customer.state}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{getCustomerTypeBadge(customer.customerType)}</TableCell>
                <TableCell>
                  <Badge variant="outline">{customer.totalOrders}</Badge>
                </TableCell>
                <TableCell>
                  <Badge className="bg-blue-500">{customer.activeOrders}</Badge>
                </TableCell>
                <TableCell>{getStatusBadge(customer.status)}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleEdit(customer)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
