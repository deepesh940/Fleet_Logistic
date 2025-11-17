import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  ClipboardCheck,
  Camera,
  CheckCircle,
  AlertTriangle,
  Calendar
} from 'lucide-react';

export function InspectionMaintenance() {
  const inspections = [
    { id: 'INS-001', truck: 'TRK-002', type: 'Pre-Dispatch', date: '2025-10-21', status: 'Passed', operator: 'Juan Rodriguez' },
    { id: 'INS-002', truck: 'TRK-005', type: 'Entry Check', date: '2025-10-21', status: 'Passed', operator: 'Maria Garcia' },
    { id: 'INS-003', truck: 'TRK-001', type: 'Pre-Dispatch', date: '2025-10-20', status: 'Failed', operator: 'Carlos Martinez' },
  ];

  const maintenance = [
    { fleet: 'TRK-002', type: 'Routine Service', scheduled: '2025-10-25', status: 'Scheduled' },
    { fleet: 'TRL-001', type: 'Brake Inspection', scheduled: '2025-10-23', status: 'In Progress' },
    { fleet: 'TRK-004', type: 'Tire Replacement', scheduled: '2025-10-28', status: 'Completed' },
  ];

  return (
    <div className="h-full">
      <div className="p-6 border-b bg-white">
        <h1 className="text-3xl mb-2">Fleet Inspection & Maintenance</h1>
        <p className="text-gray-600">Quality checks and maintenance scheduling</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Button className="h-20 bg-red-600 hover:bg-red-700">
          <ClipboardCheck className="w-6 h-6 mr-2" />
          New Entry Inspection
        </Button>
        <Button className="h-20 bg-blue-600 hover:bg-blue-700">
          <Camera className="w-6 h-6 mr-2" />
          Pre-Dispatch Check
        </Button>
        <Button className="h-20 bg-green-600 hover:bg-green-700">
          <Calendar className="w-6 h-6 mr-2" />
          Schedule Maintenance
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Inspection History */}
        <Card className="p-6">
          <h2 className="text-xl mb-4">Recent Inspections</h2>
          <div className="space-y-3">
            {inspections.map((ins) => (
              <div key={ins.id} className="p-4 bg-gray-50 rounded-lg border">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-medium">{ins.id}</p>
                    <p className="text-sm text-gray-600">{ins.truck} • {ins.type}</p>
                  </div>
                  <Badge variant={ins.status === 'Passed' ? 'default' : 'destructive'} className={ins.status === 'Passed' ? 'bg-green-500' : ''}>
                    {ins.status === 'Passed' ? <CheckCircle className="w-3 h-3 mr-1" /> : <AlertTriangle className="w-3 h-3 mr-1" />}
                    {ins.status}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">Operator: {ins.operator}</p>
                <p className="text-xs text-gray-500">{ins.date}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Maintenance Schedule */}
        <Card className="p-6">
          <h2 className="text-xl mb-4">Maintenance Schedule</h2>
          <div className="space-y-3">
            {maintenance.map((maint, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg border">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-medium">{maint.fleet}</p>
                    <p className="text-sm text-gray-600">{maint.type}</p>
                  </div>
                  <Badge variant={
                    maint.status === 'Completed' ? 'default' :
                    maint.status === 'In Progress' ? 'default' : 'secondary'
                  } className={
                    maint.status === 'Completed' ? 'bg-green-500' :
                    maint.status === 'In Progress' ? 'bg-blue-500' : ''
                  }>
                    {maint.status}
                  </Badge>
                </div>
                <p className="text-xs text-gray-500">{maint.scheduled}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
