import { useState, useMemo } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DishCard from '@/components/DishCard';
import { useProducts } from '@/hooks/useProducts';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

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

const Menu = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { data: products, isLoading, error } = useProducts();

  const categories = [
    { id: 'all', label: 'All Dishes' },
    { id: 'rice', label: 'Rice Dishes' },
    { id: 'soup', label: 'Soups' },
    { id: 'snack', label: 'Snacks' },
    { id: 'swallow', label: 'Swallows' },
  ];

  // Transform products to dish format for DishCard
  const dishes = useMemo(() => {
    if (!products) return [];
    
    return products.map(product => ({
      id: product.id,
      name: product.name,
      description: product.description,
      price: Number(product.price),
      image: imageMap[product.image_url] || product.image_url,
      category: product.category as 'rice' | 'soup' | 'snack' | 'swallow',
      ingredients: product.ingredients || [],
      isPopular: product.is_popular || false,
    }));
  }, [products]);

  const filteredDishes = useMemo(() => {
    return dishes.filter((dish) => {
      const matchesSearch = dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dish.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !selectedCategory || selectedCategory === 'all' || dish.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [dishes, searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onSearch={setSearchQuery} />
      
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Menu</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Explore our full collection of authentic Nigerian dishes
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id || (!selectedCategory && category.id === 'all') ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category.id === 'all' ? null : category.id)}
                className="hover-scale"
              >
                {category.label}
              </Button>
            ))}
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="space-y-3">
                  <Skeleton className="h-48 w-full rounded-lg" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-20">
              <p className="text-2xl text-destructive">Failed to load menu. Please try again.</p>
            </div>
          )}

          {/* Dishes Grid */}
          {!isLoading && !error && filteredDishes.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredDishes.map((dish) => (
                <DishCard key={dish.id} dish={dish} />
              ))}
            </div>
          )}

          {/* Empty State */}
          {!isLoading && !error && filteredDishes.length === 0 && (
            <div className="text-center py-20">
              <p className="text-2xl text-muted-foreground">No dishes found matching your criteria</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Menu;
