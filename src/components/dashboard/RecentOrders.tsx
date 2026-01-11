import { Link } from 'react-router-dom';
import { Clock, ChevronRight, Package, CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatDistanceToNow } from 'date-fns';

interface Order {
  id: string;
  total_amount: number;
  status: string;
  delivery_address: string;
  delivery_city: string;
  created_at: string;
}

interface RecentOrdersProps {
  orders: Order[];
  loading?: boolean;
}

const getStatusConfig = (status: string) => {
  switch (status) {
    case 'pending':
      return { 
        icon: Clock, 
        color: 'bg-secondary/20 text-secondary-foreground border-secondary/30',
        label: 'Pending'
      };
    case 'preparing':
      return { 
        icon: Loader2, 
        color: 'bg-primary/20 text-primary border-primary/30',
        label: 'Preparing'
      };
    case 'ready':
      return { 
        icon: Package, 
        color: 'bg-accent/20 text-accent border-accent/30',
        label: 'Ready'
      };
    case 'delivered':
      return { 
        icon: CheckCircle2, 
        color: 'bg-accent/20 text-accent border-accent/30',
        label: 'Delivered'
      };
    case 'cancelled':
      return { 
        icon: XCircle, 
        color: 'bg-destructive/20 text-destructive border-destructive/30',
        label: 'Cancelled'
      };
    default:
      return { 
        icon: Clock, 
        color: 'bg-muted text-muted-foreground border-border',
        label: status
      };
  }
};

const RecentOrders = ({ orders, loading }: RecentOrdersProps) => {
  const recentOrders = orders.slice(0, 3);

  if (loading) {
    return (
      <Card className="border-0 shadow-card">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-semibold">Recent Orders</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="p-4 rounded-xl bg-muted/50 animate-pulse">
              <div className="h-4 bg-muted rounded w-24 mb-2" />
              <div className="h-3 bg-muted rounded w-32" />
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  if (recentOrders.length === 0) {
    return (
      <Card className="border-0 shadow-card">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Package className="h-12 w-12 text-muted-foreground/50 mx-auto mb-3" />
            <p className="text-muted-foreground mb-4">No orders yet</p>
            <Button asChild size="sm">
              <Link to="/menu">Browse Menu</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-0 shadow-card">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold">Recent Orders</CardTitle>
        {orders.length > 3 && (
          <Button variant="ghost" size="sm" className="text-primary" asChild>
            <Link to="/orders">
              View All
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
        )}
      </CardHeader>
      <CardContent className="space-y-3">
        {recentOrders.map((order) => {
          const statusConfig = getStatusConfig(order.status);
          const StatusIcon = statusConfig.icon;
          const isActive = ['pending', 'preparing'].includes(order.status);

          return (
            <div 
              key={order.id}
              className={`p-4 rounded-xl transition-all ${
                isActive 
                  ? 'bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/20' 
                  : 'bg-muted/30 hover:bg-muted/50'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-sm truncate">
                      Order #{order.id.slice(0, 8)}
                    </span>
                    <Badge variant="outline" className={`text-xs ${statusConfig.color}`}>
                      <StatusIcon className={`h-3 w-3 mr-1 ${isActive ? 'animate-spin' : ''}`} />
                      {statusConfig.label}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">
                    {order.delivery_address}, {order.delivery_city}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {formatDistanceToNow(new Date(order.created_at), { addSuffix: true })}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-primary">
                    ₦{Number(order.total_amount).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default RecentOrders;
