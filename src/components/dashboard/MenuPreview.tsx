import { Link } from 'react-router-dom';
import { ChevronRight, Utensils } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dish } from '@/types/dish';

interface MenuPreviewProps {
  categories: { name: string; count: number }[];
  popularDishes: Dish[];
  loading?: boolean;
}

const MenuPreview = ({ categories, popularDishes, loading }: MenuPreviewProps) => {
  if (loading) {
    return (
      <Card className="border-0 shadow-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold">Today's Menu</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="p-3 rounded-xl bg-muted/50 animate-pulse">
                <div className="h-16 w-full bg-muted rounded-lg mb-2" />
                <div className="h-4 bg-muted rounded w-20" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-0 shadow-card">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold">Today's Menu</CardTitle>
        <Button variant="ghost" size="sm" className="text-primary" asChild>
          <Link to="/menu">
            Full Menu
            <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 mb-4">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              to={`/menu?category=${cat.name.toLowerCase()}`}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted hover:bg-primary/10 hover:text-primary transition-colors text-sm"
            >
              <Utensils className="h-3 w-3" />
              {cat.name}
              <span className="text-xs text-muted-foreground">({cat.count})</span>
            </Link>
          ))}
        </div>

        {/* Popular Dishes Grid */}
        <div className="grid grid-cols-2 gap-3">
          {popularDishes.slice(0, 4).map((dish) => (
            <Link
              key={dish.id}
              to={`/dish/${dish.id}`}
              className="group relative overflow-hidden rounded-xl hover-lift"
            >
              <div className="aspect-square">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <p className="text-primary-foreground font-medium text-sm truncate">
                    {dish.name}
                  </p>
                  <p className="text-primary-foreground/80 text-xs">
                    ₦{dish.price.toLocaleString()}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MenuPreview;
