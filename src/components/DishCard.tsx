import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dish } from '@/types/dish';
import { useCart } from '@/context/CartContext';

interface DishCardProps {
  dish: Dish;
}

const DishCard = ({ dish }: DishCardProps) => {
  const { addToCart } = useCart();

  return (
    <Card className="group overflow-hidden hover-lift">
      <Link to={`/dish/${dish.id}`}>
        <div className="relative overflow-hidden aspect-square">
          <img
            src={dish.image}
            alt={dish.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          {dish.isPopular && (
            <Badge className="absolute top-3 right-3 bg-secondary text-secondary-foreground">
              Popular
            </Badge>
          )}
        </div>
      </Link>
      
      <CardContent className="p-4">
        <Link to={`/dish/${dish.id}`}>
          <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
            {dish.name}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {dish.description}
          </p>
        </Link>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-primary">
            ₦{dish.price.toLocaleString()}
          </span>
          <Button
            size="icon"
            onClick={(e) => {
              e.preventDefault();
              addToCart(dish);
            }}
            className="rounded-full hover-scale"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DishCard;
