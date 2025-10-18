import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About Ola's Place</h1>
            <p className="text-xl text-muted-foreground">
              Bringing authentic Nigerian flavors to your table
            </p>
          </div>

          <div className="space-y-8 animate-slide-up">
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4">Our Story</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Ola's Place was founded with a simple mission: to share the rich, vibrant flavors of Nigerian cuisine with food lovers everywhere. Named after our founder Ola, who grew up learning traditional recipes from her grandmother in Lagos, our restaurant brings authentic home-cooked Nigerian meals to your doorstep.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Every dish we prepare honors the traditional cooking methods and recipes passed down through generations, while using only the freshest, highest-quality ingredients available.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4">What We Offer</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Authentic Recipes</h3>
                    <p className="text-muted-foreground">
                      From the iconic Jollof Rice to rich Egusi soup, every dish is prepared using time-honored Nigerian recipes and cooking techniques.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Fresh Ingredients</h3>
                    <p className="text-muted-foreground">
                      We source our ingredients locally and prepare everything fresh daily to ensure the highest quality and authentic taste.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Market Prices</h3>
                    <p className="text-muted-foreground">
                      Our prices reflect current market rates, ensuring fair pricing while maintaining the quality you deserve.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4">Our Commitment</h2>
                <p className="text-muted-foreground leading-relaxed">
                  At Ola's Place, we're committed to preserving and celebrating Nigerian culinary heritage. Whether you're Nigerian and missing home-cooked meals, or new to Nigerian cuisine and eager to explore, we're here to provide an authentic, delicious experience with every order.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
