import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { dishes } from '@/data/dishes';
import { Dish } from '@/types/dish';

interface Profile {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
}

interface Order {
  id: string;
  total_amount: number;
  status: string;
  delivery_address: string;
  delivery_city: string;
  delivery_phone: string;
  created_at: string;
  notes: string | null;
}

interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  price: number;
}

interface Notification {
  id: string;
  type: 'order' | 'promo' | 'info';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

export interface DashboardData {
  profile: Profile | null;
  orders: Order[];
  orderItems: Map<string, OrderItem[]>;
  recommendations: Dish[];
  notifications: Notification[];
  menuCategories: { name: string; count: number }[];
  popularDishes: Dish[];
  loading: boolean;
  error: string | null;
}

export const useDashboardData = (): DashboardData => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [orderItems, setOrderItems] = useState<Map<string, OrderItem[]>>(new Map());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch profile
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .maybeSingle();

        if (profileError) throw profileError;
        setProfile(profileData);

        // Fetch orders
        const { data: ordersData, error: ordersError } = await supabase
          .from('orders')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (ordersError) throw ordersError;
        setOrders(ordersData || []);

        // Fetch order items for all orders
        if (ordersData && ordersData.length > 0) {
          const orderIds = ordersData.map(o => o.id);
          const { data: itemsData, error: itemsError } = await supabase
            .from('order_items')
            .select('*')
            .in('order_id', orderIds);

          if (itemsError) throw itemsError;

          const itemsMap = new Map<string, OrderItem[]>();
          itemsData?.forEach(item => {
            const existing = itemsMap.get(item.order_id) || [];
            itemsMap.set(item.order_id, [...existing, item]);
          });
          setOrderItems(itemsMap);
        }

      } catch (err: any) {
        setError(err.message);
        console.error('Dashboard data error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  // Generate recommendations based on past orders or popular items
  const recommendations = dishes
    .filter(dish => dish.isPopular)
    .slice(0, 4);

  // Generate menu categories from available dishes
  const categoryMap = new Map<string, number>();
  dishes.forEach(dish => {
    const count = categoryMap.get(dish.category) || 0;
    categoryMap.set(dish.category, count + 1);
  });
  const menuCategories = Array.from(categoryMap.entries()).map(([name, count]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    count,
  }));

  // Popular dishes from local data
  const popularDishes = dishes.filter(d => d.isPopular).slice(0, 6);

  // Generate notifications from orders
  const notifications: Notification[] = orders.slice(0, 5).map((order, index) => ({
    id: order.id,
    type: 'order' as const,
    title: getOrderNotificationTitle(order.status),
    message: `Order #${order.id.slice(0, 8)} - ₦${order.total_amount.toLocaleString()}`,
    timestamp: new Date(order.created_at),
    read: index > 1,
  }));

  // Add a welcome notification if no orders
  if (notifications.length === 0) {
    notifications.push({
      id: 'welcome',
      type: 'info',
      title: 'Welcome to Ola\'s Place! 🎉',
      message: 'Browse our menu and place your first order today.',
      timestamp: new Date(),
      read: false,
    });
  }

  return {
    profile,
    orders,
    orderItems,
    recommendations,
    notifications,
    menuCategories,
    popularDishes,
    loading,
    error,
  };
};

function getOrderNotificationTitle(status: string): string {
  switch (status) {
    case 'pending':
      return 'Order Received';
    case 'preparing':
      return 'Order Being Prepared 🍳';
    case 'ready':
      return 'Order Ready for Pickup';
    case 'delivered':
      return 'Order Delivered ✓';
    case 'cancelled':
      return 'Order Cancelled';
    default:
      return 'Order Update';
  }
}
