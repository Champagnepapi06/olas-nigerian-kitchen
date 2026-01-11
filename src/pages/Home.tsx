import { Link } from 'react-router-dom';
import Hero from '@/components/Hero';
import DishCard from '@/components/DishCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { usePopularProducts } from '@/hooks/useProducts';
import { ArrowRight } from 'lucide-react';

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

const Home = () => {
  const { data: products, isLoading } = usePopularProducts();

  const featuredDishes = products?.map(product => ({
    id: product.id,
    name: product.name,
    description: product.description,
    price: Number(product.price),
    image: imageMap[product.image_url] || product.image_url,
    category: product.category as 'rice' | 'soup' | 'snack' | 'swallow',
    ingredients: product.ingredients || [],
    isPopular: product.is_popular || false,
  })) || [];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      
      <main className="flex-1">
        {/* Featured Dishes Section */}
        <section className="py-16 container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl font-bold mb-4">Popular Dishes</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Discover our most loved Nigerian dishes, prepared with authentic recipes and fresh ingredients
            </p>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="space-y-3">
                  <Skeleton className="h-48 w-full rounded-lg" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {featuredDishes.map((dish) => (
                <DishCard key={dish.id} dish={dish} />
              ))}
            </div>
          )}
          
          <div className="text-center">
            <Link to="/menu">
              <Button size="lg" className="group">
                View Full Menu
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Why Choose Ola's Place?</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6 rounded-xl bg-card shadow-card hover-lift">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🍲</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Authentic Recipes</h3>
                <p className="text-muted-foreground">
                  Traditional Nigerian recipes passed down through generations
                </p>
              </div>
              
              <div className="text-center p-6 rounded-xl bg-card shadow-card hover-lift">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">✨</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Fresh Ingredients</h3>
                <p className="text-muted-foreground">
                  Only the freshest local ingredients in every dish
                </p>
              </div>
              
              <div className="text-center p-6 rounded-xl bg-card shadow-card hover-lift">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🚚</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
                <p className="text-muted-foreground">
                  Hot meals delivered straight to your doorstep
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
