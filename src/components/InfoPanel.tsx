import { Card } from './ui/card';
import { CheckCircle } from 'lucide-react';

interface InfoPanelProps {
  title: string;
  items: string[];
  variant?: 'yellow' | 'blue' | 'orange';
}

export function InfoPanel({ title, items, variant = 'yellow' }: InfoPanelProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'blue':
        return 'bg-blue-50 border-blue-300';
      case 'orange':
        return 'bg-orange-50 border-orange-300';
      default:
        return 'bg-yellow-50 border-yellow-300';
    }
  };

  return (
    <Card className={`p-6 border-2 ${getVariantStyles()}`}>
      <h4 className="mb-3">{title}</h4>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-600" />
            <span className="text-sm">{item}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
