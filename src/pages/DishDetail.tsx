import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Minus } from 'lucide-react';
import { useState, useMemo } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useProduct } from '@/hooks/useProducts';
import { useCart } from '@/context/CartContext';

// Import local images for fallback
import jollofRice from '@/assets/jollof-rice.jpg';
import ofadaRice from '@/assets/ofada-rice.jpg';
import egusiSoup from '@/assets/egusi-soup.jpg';
import efoRiro from '@/assets/efo-riro.jpg';
import suya from '@/assets/suya.jpg';
import moiMoi from '@/assets/moi-moi.jpg';
import akara from '@/assets/akara.jpg';
import poundedYam from '@/assets/pounded-yam.jpg';

const imageMap: Record<string, string> = {
  '/dishes/jollof-rice.jpg': jollofRice,
  '/dishes/ofada-rice.jpg': ofadaRice,
  '/dishes/egusi-soup.jpg': egusiSoup,
  '/dishes/efo-riro.jpg': efoRiro,
  '/dishes/suya.jpg': suya,
  '/dishes/moi-moi.jpg': moiMoi,
  '/dishes/akara.jpg': akara,
  '/dishes/pounded-yam.jpg': poundedYam,
};

const DishDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  
  const { data: product, isLoading, error } = useProduct(id || '');

  const dish = useMemo(() => {
    if (!product) return null;
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      price: Number(product.price),
      image: imageMap[product.image_url] || product.image_url,
      category: product.category as 'rice' | 'soup' | 'snack' | 'swallow',
      ingredients: product.ingredients || [],
      isPopular: product.is_popular || false,
    };
  }, [product]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 py-12">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12">
              <Skeleton className="h-96 w-full rounded-lg" />
              <div className="space-y-6">
                <Skeleton className="h-8 w-32" />
                <Skeleton className="h-12 w-3/4" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-32 w-full" />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !dish) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Dish not found</h2>
            <Button onClick={() => navigate('/menu')}>Back to Menu</Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(dish);
    }
    navigate('/cart');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={() => navigate('/menu')}
            className="mb-8"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Menu
          </Button>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Image */}
            <div className="animate-fade-in">
              <Card className="overflow-hidden">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full aspect-square object-cover"
                />
              </Card>
            </div>

            {/* Details */}
            <div className="space-y-6 animate-slide-up">
              <div>
                {dish.isPopular && (
                  <Badge className="mb-3 bg-secondary text-secondary-foreground">
                    Popular Choice
                  </Badge>
                )}
                <h1 className="text-4xl font-bold mb-3">{dish.name}</h1>
                <p className="text-3xl font-bold text-primary">
                  ₦{dish.price.toLocaleString()}
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2">Description</h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {dish.description}
                </p>
              </div>

              {dish.ingredients && dish.ingredients.length > 0 && (
                <Card>
                  <CardContent className="pt-6">
                    <h2 className="text-xl font-semibold mb-3">Ingredients</h2>
                    <ul className="grid grid-cols-2 gap-2">
                      {dish.ingredients.map((ingredient, index) => (
                        <li key={index} className="flex items-center text-muted-foreground">
                          <span className="w-2 h-2 bg-primary rounded-full mr-2" />
                          {ingredient}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* Quantity Selector */}
              <div className="flex items-center gap-4">
                <span className="font-semibold">Quantity:</span>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="text-xl font-semibold w-12 text-center">
                    {quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <Button
                size="lg"
                onClick={handleAddToCart}
                className="w-full text-lg"
              >
                Add to Cart - ₦{(dish.price * quantity).toLocaleString()}
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DishDetail;
