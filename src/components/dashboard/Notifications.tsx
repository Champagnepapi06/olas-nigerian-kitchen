import { Bell, Package, Megaphone, Info, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatDistanceToNow } from 'date-fns';

interface Notification {
  id: string;
  type: 'order' | 'promo' | 'info';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

interface NotificationsProps {
  notifications: Notification[];
  loading?: boolean;
}

const getNotificationIcon = (type: string) => {
  switch (type) {
    case 'order':
      return Package;
    case 'promo':
      return Megaphone;
    default:
      return Info;
  }
};

const Notifications = ({ notifications, loading }: NotificationsProps) => {
  const unreadCount = notifications.filter(n => !n.read).length;

  if (loading) {
    return (
      <Card className="border-0 shadow-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[1, 2].map(i => (
            <div key={i} className="p-3 rounded-xl bg-muted/50 animate-pulse">
              <div className="h-4 bg-muted rounded w-32 mb-2" />
              <div className="h-3 bg-muted rounded w-48" />
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-0 shadow-card">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Notifications
          {unreadCount > 0 && (
            <span className="h-5 min-w-5 px-1.5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </CardTitle>
        {notifications.length > 3 && (
          <Button variant="ghost" size="sm" className="text-primary">
            View All
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        )}
      </CardHeader>
      <CardContent className="space-y-2">
        {notifications.length === 0 ? (
          <div className="text-center py-6">
            <Bell className="h-10 w-10 text-muted-foreground/50 mx-auto mb-2" />
            <p className="text-muted-foreground text-sm">No notifications yet</p>
          </div>
        ) : (
          notifications.slice(0, 4).map((notification) => {
            const Icon = getNotificationIcon(notification.type);
            return (
              <div
                key={notification.id}
                className={`p-3 rounded-xl transition-colors cursor-pointer ${
                  notification.read
                    ? 'bg-muted/30 hover:bg-muted/50'
                    : 'bg-primary/5 border border-primary/10 hover:bg-primary/10'
                }`}
              >
                <div className="flex gap-3">
                  <div className={`h-8 w-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    notification.read ? 'bg-muted' : 'bg-primary/10'
                  }`}>
                    <Icon className={`h-4 w-4 ${notification.read ? 'text-muted-foreground' : 'text-primary'}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className={`text-sm font-medium truncate ${!notification.read && 'text-foreground'}`}>
                        {notification.title}
                      </p>
                      {!notification.read && (
                        <span className="h-2 w-2 rounded-full bg-primary flex-shrink-0 mt-1.5" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{notification.message}</p>
                    <p className="text-xs text-muted-foreground/70 mt-1">
                      {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </CardContent>
    </Card>
  );
};

export default Notifications;
