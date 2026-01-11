import { MapPin, Clock } from 'lucide-react';

interface WelcomeSectionProps {
  userName: string;
  loading?: boolean;
}

const WelcomeSection = ({ userName, loading }: WelcomeSectionProps) => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const firstName = userName.split(' ')[0] || 'Guest';

  if (loading) {
    return (
      <div className="bg-gradient-to-r from-primary to-primary-glow rounded-2xl p-6 md:p-8 text-primary-foreground animate-pulse">
        <div className="h-8 bg-primary-foreground/20 rounded w-1/2 mb-2" />
        <div className="h-4 bg-primary-foreground/20 rounded w-3/4" />
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-primary to-primary-glow rounded-2xl p-6 md:p-8 text-primary-foreground shadow-elegant">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold mb-1">
            {getGreeting()}, {firstName}! 👋
          </h1>
          <p className="text-primary-foreground/90 text-sm md:text-base">
            What delicious Nigerian dish are you craving today?
          </p>
        </div>
        
        <div className="flex flex-col gap-2 text-sm">
          <div className="flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm rounded-lg px-3 py-2">
            <MapPin className="h-4 w-4" />
            <span>Ola's Place, Lagos</span>
          </div>
          <div className="flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm rounded-lg px-3 py-2">
            <Clock className="h-4 w-4" />
            <span>Open: 9AM - 10PM</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection;
