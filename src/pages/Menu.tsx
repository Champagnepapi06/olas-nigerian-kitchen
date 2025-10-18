import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DishCard from '@/components/DishCard';
import { dishes } from '@/data/dishes';
import { Button } from '@/components/ui/button';

const Menu = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Dishes' },
    { id: 'rice', label: 'Rice Dishes' },
    { id: 'soup', label: 'Soups' },
    { id: 'snack', label: 'Snacks' },
    { id: 'swallow', label: 'Swallows' },
  ];

  const filteredDishes = dishes.filter((dish) => {
    const matchesSearch = dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dish.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || selectedCategory === 'all' || dish.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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

          {/* Dishes Grid */}
          {filteredDishes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredDishes.map((dish) => (
                <DishCard key={dish.id} dish={dish} />
              ))}
            </div>
          ) : (
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
