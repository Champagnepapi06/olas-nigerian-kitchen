import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import heroImage from '@/assets/hero-bg.jpg';

const Hero = () => {
  return (
    <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Nigerian cuisine"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-hero" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto animate-fade-in">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 drop-shadow-lg">
          Taste Nigeria in Every Bite
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-white/90 drop-shadow-md">
          Authentic Nigerian dishes, freshly made with love and delivered to your doorstep
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/menu">
            <Button size="lg" className="text-lg px-8 shadow-glow">
              Order Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link to="/about">
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm"
            >
              Learn More
            </Button>
          </Link>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;
