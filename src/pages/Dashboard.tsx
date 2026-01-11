import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useDashboardData } from '@/hooks/useDashboardData';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WelcomeSection from '@/components/dashboard/WelcomeSection';
import QuickStats from '@/components/dashboard/QuickStats';
import QuickActions from '@/components/dashboard/QuickActions';
import RecentOrders from '@/components/dashboard/RecentOrders';
import MenuPreview from '@/components/dashboard/MenuPreview';
import Recommendations from '@/components/dashboard/Recommendations';
import Notifications from '@/components/dashboard/Notifications';

const Dashboard = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const {
    profile,
    orders,
    recommendations,
    notifications,
    menuCategories,
    popularDishes,
    loading,
  } = useDashboardData();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-primary/20" />
          <div className="h-4 w-32 bg-muted rounded" />
        </div>
      </div>
    );
  }

  if (!user) return null;

  const userName = profile?.full_name || user.user_metadata?.full_name || 'Guest';

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-6 md:py-8 max-w-6xl">
        <div className="space-y-6">
          {/* Welcome Section */}
          <WelcomeSection userName={userName} loading={loading} />

          {/* Quick Stats */}
          <QuickStats orders={orders} loading={loading} />

          {/* Quick Actions */}
          <QuickActions />

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              <RecentOrders orders={orders} loading={loading} />
              <Notifications notifications={notifications} loading={loading} />
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <MenuPreview 
                categories={menuCategories} 
                popularDishes={popularDishes} 
                loading={loading} 
              />
              <Recommendations dishes={recommendations} loading={loading} />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
