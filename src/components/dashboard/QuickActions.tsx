import { Link } from 'react-router-dom';
import { UtensilsCrossed, ShoppingCart, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';

const QuickActions = () => {
  const { getTotalItems } = useCart();
  const cartItems = getTotalItems();

  const actions = [
    {
      icon: UtensilsCrossed,
      label: 'Order Now',
      to: '/menu',
      variant: 'default' as const,
      className: 'bg-gradient-to-r from-primary to-primary-glow hover:opacity-90',
    },
    {
      icon: ShoppingCart,
      label: cartItems > 0 ? `Cart (${cartItems})` : 'Cart',
      to: '/cart',
      variant: 'outline' as const,
      className: cartItems > 0 ? 'border-primary text-primary hover:bg-primary/5' : '',
    },
    {
      icon: Phone,
      label: 'Contact Us',
      to: '/contact',
      variant: 'outline' as const,
      className: '',
    },
    {
      icon: MapPin,
      label: 'Locations',
      to: '/about',
      variant: 'outline' as const,
      className: '',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {actions.map((action) => (
        <Button
          key={action.label}
          variant={action.variant}
          className={`h-auto py-4 flex flex-col gap-2 ${action.className}`}
          asChild
        >
          <Link to={action.to}>
            <action.icon className="h-5 w-5" />
            <span className="text-sm font-medium">{action.label}</span>
          </Link>
        </Button>
      ))}
    </div>
  );
};

export default QuickActions;
