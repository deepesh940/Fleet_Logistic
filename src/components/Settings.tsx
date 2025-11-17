import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

export function Settings() {
  return (
    <div className="h-full">
      <div className="p-6 border-b bg-white">
        <h1 className="text-3xl mb-2">Settings</h1>
        <p className="text-gray-600">System configuration and preferences</p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="operations">Operations</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="users">Users & Roles</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card className="p-6">
            <h2 className="text-xl mb-4">General Settings</h2>
            <div className="space-y-4">
              <div>
                <Label>Company Name</Label>
                <Input placeholder="Grupo TYT" className="mt-1" />
              </div>
              <div>
                <Label>Contact Email</Label>
                <Input type="email" placeholder="contact@grupotyt.com" className="mt-1" />
              </div>
              <div>
                <Label>Time Zone</Label>
                <Input placeholder="America/Mexico_City" className="mt-1" />
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="operations">
          <Card className="p-6">
            <h2 className="text-xl mb-4">Operations Configuration</h2>
            <div className="space-y-6">
              <div>
                <Label>Consolidation Window (days)</Label>
                <Input type="number" defaultValue="3" className="mt-1" />
                <p className="text-sm text-gray-500 mt-1">Orders must be consolidated within this timeframe</p>
              </div>
              <div>
                <Label>Delivery SLA (days)</Label>
                <Input type="number" defaultValue="7" className="mt-1" />
                <p className="text-sm text-gray-500 mt-1">Standard delivery timeline from dispatch</p>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Auto-Generate Orders from Stock Sync</Label>
                  <p className="text-sm text-gray-500">Automatically create dispatch suggestions</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>AI Optimization Priority</Label>
                  <p className="text-sm text-gray-500">Default optimization goal</p>
                </div>
                <Input className="w-48" defaultValue="Cost" />
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="integrations">
          <Card className="p-6">
            <h2 className="text-xl mb-4">System Integrations</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">Google Maps API</p>
                  <p className="text-sm text-gray-600">GPS tracking and route optimization</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">ERP System</p>
                  <p className="text-sm text-gray-600">Stock and order synchronization</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">OEM Portal</p>
                  <p className="text-sm text-gray-600">Vehicle data integration</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card className="p-6">
            <h2 className="text-xl mb-4">User Roles & Access Control</h2>
            <div className="space-y-3">
              {['Admin', 'Planner', 'Yard Operator', 'Driver', 'Manager'].map((role) => (
                <div key={role} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <p className="font-medium">{role}</p>
                  <Button variant="outline" size="sm">Configure</Button>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
