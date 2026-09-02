import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/features/auth/AuthProvider";
import { markNotificationRead, markAllNotificationsRead } from "../services/notificationService";
import { collection, query, where, orderBy, onSnapshot, limit } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { format } from "date-fns";

import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";

export function NotificationCenter() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "notifications"),
      where("userId", "==", user.uid),
      orderBy("createdAt", "desc"),
      limit(20)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const notifs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setNotifications(notifs);
      setUnreadCount(notifs.filter(n => !n.read).length);
    });

    return () => unsubscribe();
  }, [user]);

  const handleNotificationClick = async (notif) => {
    if (!notif.read) {
      await markNotificationRead(notif.id);
    }
    if (notif.ticketId) {
      navigate(`/tickets/${notif.ticketId}`);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative rounded-full">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px]"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="p-4 flex items-center justify-between border-b">
          <h4 className="font-semibold">Notifications</h4>
          {unreadCount > 0 && (
            <button 
              onClick={() => markAllNotificationsRead(user.uid, notifications.filter(n => !n.read).map(n => n.id))}
              className="text-xs text-primary hover:underline font-medium cursor-pointer"
            >
              Mark all read
            </button>
          )}
        </div>
        <ScrollArea className="h-80">
          {notifications.length === 0 ? (
            <div className="p-4 text-center text-sm text-muted-foreground">
              No notifications yet.
            </div>
          ) : (
            <div className="flex flex-col">
              {notifications.map((notif) => (
                <div key={notif.id}>
                  <button 
                    onClick={() => handleNotificationClick(notif)}
                    className={`w-full text-left p-4 hover:bg-muted/50 transition-colors ${!notif.read ? 'bg-primary/5' : ''}`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <p className={`text-sm ${!notif.read ? 'font-semibold' : 'font-medium'}`}>
                        {notif.title}
                      </p>
                      {!notif.read && <span className="h-2 w-2 rounded-full bg-primary mt-1.5" />}
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{notif.body}</p>
                    <p className="text-[10px] text-muted-foreground">
                      {notif.createdAt?.toDate() ? format(notif.createdAt.toDate(), 'MMM d, h:mm a') : "Just now"}
                    </p>
                  </button>
                  <Separator />
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
