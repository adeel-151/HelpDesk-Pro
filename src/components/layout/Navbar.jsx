import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/features/auth/AuthProvider";
import { logoutUser } from "@/features/auth/services/authService";
import { NotificationCenter } from "@/features/notifications/components/NotificationCenter";
import { Button } from "@/components/ui/button";
import { LogOut, Home, Ticket } from "lucide-react";

export function Navbar() {
  const { user, role } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUser();
    navigate("/");
  };

  if (!user) return null;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link to="/dashboard" className="flex items-center space-x-2">
            <span className="font-bold text-xl tracking-tight text-primary">HelpDesk Pro</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link to="/dashboard" className="transition-colors hover:text-foreground/80 text-foreground/60 flex items-center gap-2">
              <Home className="h-4 w-4" /> Dashboard
            </Link>
            <Link to="/tickets" className="transition-colors hover:text-foreground/80 text-foreground/60 flex items-center gap-2">
              <Ticket className="h-4 w-4" /> Tickets
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <NotificationCenter />
          
          <div className="hidden md:flex items-center gap-2 border-l pl-4 ml-2">
            <span className="text-sm font-medium capitalize text-muted-foreground mr-2">
              {role}
            </span>
            <Button variant="ghost" size="icon" onClick={handleLogout} title="Log Out">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
