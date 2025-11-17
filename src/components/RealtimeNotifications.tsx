import { useEffect } from 'react';
import { toast } from 'sonner';
import { Bell, CheckCircle2, AlertTriangle, Info, Truck, MapPin } from 'lucide-react';

export function RealtimeNotifications() {
  useEffect(() => {
    // Simulate real-time notifications
    const notifications = [
      {
        delay: 5000,
        type: 'success',
        message: 'Order ORD-2025-045 has been dispatched',
        icon: CheckCircle2,
      },
      {
        delay: 15000,
        type: 'warning',
        message: 'Route delay detected for TRP-003 - Traffic on highway',
        icon: AlertTriangle,
      },
      {
        delay: 25000,
        type: 'info',
        message: 'New vehicle added to stock: Sedan XL 2025',
        icon: Info,
      },
      {
        delay: 35000,
        type: 'success',
        message: 'Fleet TRK-456 has reached destination',
        icon: Truck,
      },
    ];

    const timeouts = notifications.map(({ delay, type, message, icon: Icon }) => {
      return setTimeout(() => {
        switch (type) {
          case 'success':
            toast.success(message, {
              icon: <Icon className="w-5 h-5" />,
            });
            break;
          case 'warning':
            toast.warning(message, {
              icon: <Icon className="w-5 h-5" />,
            });
            break;
          case 'info':
            toast.info(message, {
              icon: <Icon className="w-5 h-5" />,
            });
            break;
          default:
            toast(message);
        }
      }, delay);
    });

    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout));
    };
  }, []);

  return null;
}
