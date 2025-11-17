import { Card } from './ui/card';
import { 
  BarChart3, 
  TrendingUp, 
  Package,
  Truck,
  Clock,
  DollarSign
} from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

export function Analytics() {
  const kpis = [
    {
      label: 'Total Deliveries',
      value: '1,234',
      change: '+12%',
      trend: 'up',
      icon: Package,
      color: 'bg-blue-500',
    },
    {
      label: 'Fleet Utilization',
      value: '87%',
      change: '+5%',
      trend: 'up',
      icon: Truck,
      color: 'bg-green-500',
    },
    {
      label: 'Avg. Delivery Time',
      value: '4.2 hrs',
      change: '-8%',
      trend: 'down',
      icon: Clock,
      color: 'bg-purple-500',
    },
    {
      label: 'Total Revenue',
      value: '$284K',
      change: '+18%',
      trend: 'up',
      icon: DollarSign,
      color: 'bg-yellow-500',
    },
  ];

  const deliveryMetrics = [
    { month: 'Apr', deliveries: 820, onTime: 742 },
    { month: 'May', deliveries: 945, onTime: 856 },
    { month: 'Jun', deliveries: 1023, onTime: 934 },
    { month: 'Jul', deliveries: 987, onTime: 901 },
    { month: 'Aug', deliveries: 1156, onTime: 1068 },
    { month: 'Sep', deliveries: 1089, onTime: 1012 },
    { month: 'Oct', deliveries: 1234, onTime: 1145 },
  ];

  const topRoutes = [
    { route: 'Mexico City - Guadalajara', trips: 245, revenue: '$45,600' },
    { route: 'Monterrey - Tijuana', trips: 189, revenue: '$38,200' },
    { route: 'Puebla - Veracruz', trips: 156, revenue: '$28,400' },
    { route: 'Querétaro - León', trips: 134, revenue: '$24,100' },
    { route: 'CDMX - Cancun', trips: 98, revenue: '$21,800' },
  ];

  const fleetPerformance = [
    { fleet: 'TRK-001', utilization: 92, trips: 78, rating: 4.8 },
    { fleet: 'TRK-002', utilization: 88, trips: 65, rating: 4.9 },
    { fleet: 'TRK-003', utilization: 85, trips: 59, rating: 4.7 },
    { fleet: 'TRK-004', utilization: 79, trips: 45, rating: 4.6 },
    { fleet: 'TRK-005', utilization: 95, trips: 82, rating: 4.9 },
  ];

  return (
    <div className="h-full">
      <div className="flex items-center justify-between p-6 border-b bg-white">
        <div>
          <h1 className="text-3xl mb-2">Analytics & Reports</h1>
          <p className="text-gray-600">Performance insights and business intelligence</p>
        </div>
        <Select defaultValue="7days">
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7days">Last 7 days</SelectItem>
            <SelectItem value="30days">Last 30 days</SelectItem>
            <SelectItem value="90days">Last 90 days</SelectItem>
            <SelectItem value="12months">Last 12 months</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          const isPositive = kpi.change.startsWith('+');
          const isGoodTrend = (kpi.trend === 'up' && isPositive) || (kpi.trend === 'down' && !isPositive);
          
          return (
            <Card key={kpi.label} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className={`${kpi.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className={`text-sm font-medium ${isGoodTrend ? 'text-green-600' : 'text-red-600'}`}>
                  {kpi.change}
                </span>
              </div>
              <p className="text-2xl mb-1">{kpi.value}</p>
              <p className="text-sm text-gray-600">{kpi.label}</p>
            </Card>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Delivery Trends */}
        <Card className="p-6">
          <h2 className="text-xl mb-6">Delivery Trends</h2>
          <div className="space-y-4">
            {deliveryMetrics.map((data, index) => {
              const onTimePercentage = Math.round((data.onTime / data.deliveries) * 100);
              return (
                <div key={data.month}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">{data.month}</span>
                    <div className="text-sm text-gray-600">
                      {data.deliveries} total • {onTimePercentage}% on-time
                    </div>
                  </div>
                  <div className="relative h-8 bg-gray-100 rounded-lg overflow-hidden">
                    <div 
                      className="absolute h-full bg-blue-500 opacity-30"
                      style={{ width: `${(data.deliveries / 1300) * 100}%` }}
                    />
                    <div 
                      className="absolute h-full bg-green-500"
                      style={{ width: `${(data.onTime / 1300) * 100}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex items-center gap-4 mt-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 opacity-30 rounded" />
              <span className="text-gray-600">Total Deliveries</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded" />
              <span className="text-gray-600">On-Time Deliveries</span>
            </div>
          </div>
        </Card>

        {/* Top Routes */}
        <Card className="p-6">
          <h2 className="text-xl mb-6">Top Routes by Revenue</h2>
          <div className="space-y-4">
            {topRoutes.map((route, index) => (
              <div key={route.route} className="flex items-center gap-4">
                <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-medium text-indigo-600">#{index + 1}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{route.route}</p>
                  <p className="text-sm text-gray-600">{route.trips} trips</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{route.revenue}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Fleet Performance */}
      <Card className="p-6 mb-8">
        <h2 className="text-xl mb-6">Fleet Performance Overview</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4">Fleet ID</th>
                <th className="text-left py-3 px-4">Utilization</th>
                <th className="text-left py-3 px-4">Completed Trips</th>
                <th className="text-left py-3 px-4">Rating</th>
                <th className="text-left py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {fleetPerformance.map((fleet) => (
                <tr key={fleet.fleet} className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">{fleet.fleet}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 bg-gray-100 rounded-full h-2 max-w-32">
                        <div 
                          className={`h-full rounded-full ${
                            fleet.utilization >= 90 ? 'bg-green-500' :
                            fleet.utilization >= 80 ? 'bg-blue-500' :
                            'bg-yellow-500'
                          }`}
                          style={{ width: `${fleet.utilization}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium">{fleet.utilization}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">{fleet.trips}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500">⭐</span>
                      <span>{fleet.rating}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    {fleet.utilization >= 85 ? (
                      <span className="text-green-600 flex items-center gap-1">
                        <TrendingUp className="w-4 h-4" />
                        Excellent
                      </span>
                    ) : (
                      <span className="text-yellow-600 flex items-center gap-1">
                        <BarChart3 className="w-4 h-4" />
                        Good
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Additional Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <h3 className="font-medium mb-4">Delivery Success Rate</h3>
          <div className="text-center">
            <div className="text-4xl font-medium text-green-600 mb-2">94.8%</div>
            <p className="text-sm text-gray-600">On-time deliveries this month</p>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-medium mb-4">Average Trip Duration</h3>
          <div className="text-center">
            <div className="text-4xl font-medium text-blue-600 mb-2">4.2 hrs</div>
            <p className="text-sm text-gray-600">Down 8% from last month</p>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-medium mb-4">Customer Satisfaction</h3>
          <div className="text-center">
            <div className="text-4xl font-medium text-purple-600 mb-2">4.7/5</div>
            <p className="text-sm text-gray-600">Based on 1,234 reviews</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
