import { ShoppingBag, Clock, Star, Wallet } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface Order {
  id: string;
  total_amount: number;
  status: string;
  created_at: string;
}

interface QuickStatsProps {
  orders: Order[];
  loading?: boolean;
}

const QuickStats = ({ orders, loading }: QuickStatsProps) => {
  const totalOrders = orders.length;
  const activeOrders = orders.filter(o => 
    ['pending', 'preparing', 'ready'].includes(o.status)
  ).length;
  const totalSpent = orders.reduce((sum, o) => sum + Number(o.total_amount), 0);
  const loyaltyPoints = Math.floor(totalSpent / 100); // 1 point per ₦100

  const stats = [
    {
      icon: ShoppingBag,
      label: 'Total Orders',
      value: totalOrders.toString(),
      color: 'bg-primary/10 text-primary',
    },
    {
      icon: Clock,
      label: 'Active Orders',
      value: activeOrders.toString(),
      color: 'bg-secondary/20 text-secondary-foreground',
    },
    {
      icon: Wallet,
      label: 'Total Spent',
      value: `₦${totalSpent.toLocaleString()}`,
      color: 'bg-accent/10 text-accent',
    },
    {
      icon: Star,
      label: 'Loyalty Points',
      value: loyaltyPoints.toString(),
      color: 'bg-secondary/20 text-secondary-foreground',
    },
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {[1, 2, 3, 4].map(i => (
          <Card key={i} className="p-4 animate-pulse">
            <div className="h-10 w-10 bg-muted rounded-lg mb-3" />
            <div className="h-6 bg-muted rounded w-16 mb-1" />
            <div className="h-4 bg-muted rounded w-20" />
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
      {stats.map((stat) => (
        <Card 
          key={stat.label} 
          className="p-4 hover-lift cursor-pointer border-0 shadow-card"
        >
          <div className={`h-10 w-10 rounded-lg ${stat.color} flex items-center justify-center mb-3`}>
            <stat.icon className="h-5 w-5" />
          </div>
          <p className="text-xl md:text-2xl font-bold text-foreground">{stat.value}</p>
          <p className="text-xs md:text-sm text-muted-foreground">{stat.label}</p>
        </Card>
      ))}
    </div>
  );
};

export default QuickStats;
