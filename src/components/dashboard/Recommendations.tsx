import { Link } from 'react-router-dom';
import { Sparkles, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dish } from '@/types/dish';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';

interface RecommendationsProps {
  dishes: Dish[];
  loading?: boolean;
}

const Recommendations = ({ dishes, loading }: RecommendationsProps) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent, dish: Dish) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(dish);
    toast.success(`${dish.name} added to cart`);
  };

  if (loading) {
    return (
      <Card className="border-0 shadow-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-secondary" />
            Recommended for You
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex-shrink-0 w-40 animate-pulse">
                <div className="h-28 bg-muted rounded-xl mb-2" />
                <div className="h-4 bg-muted rounded w-24 mb-1" />
                <div className="h-3 bg-muted rounded w-16" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (dishes.length === 0) return null;

  return (
    <Card className="border-0 shadow-card overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-secondary" />
          Recommended for You
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-hide">
          {dishes.map((dish) => (
            <Link
              key={dish.id}
              to={`/dish/${dish.id}`}
              className="flex-shrink-0 w-40 group"
            >
              <div className="relative rounded-xl overflow-hidden mb-2">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-28 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {dish.isPopular && (
                  <Badge className="absolute top-2 left-2 bg-secondary text-secondary-foreground text-xs">
                    Popular
                  </Badge>
                )}
                <Button
                  size="icon"
                  variant="secondary"
                  className="absolute bottom-2 right-2 h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                  onClick={(e) => handleAddToCart(e, dish)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <p className="font-medium text-sm truncate group-hover:text-primary transition-colors">
                {dish.name}
              </p>
              <p className="text-primary font-semibold text-sm">
                ₦{dish.price.toLocaleString()}
              </p>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Recommendations;
