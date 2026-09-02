import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/features/auth/AuthProvider";
import { logoutUser } from "@/features/auth/services/authService";
import { NotificationCenter } from "@/features/notifications/components/NotificationCenter";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { LogOut, Home, Ticket, ShieldCheck, BookOpen, User as UserIcon, LifeBuoy, PlusCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function Navbar() {
  const { user, role } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logoutUser();
    navigate("/");
  };

  const isActive = (path) => location.pathname.startsWith(path);

  if (!user) return null;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-white/70 dark:bg-slate-950/70 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Link to="/dashboard" className="flex items-center space-x-2 group">
            <div className="bg-primary/10 text-primary p-2 rounded-xl group-hover:bg-primary group-hover:text-white transition-colors">
              <LifeBuoy className="h-5 w-5" />
            </div>
            <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              HelpDesk Pro
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
            <Link 
              to="/dashboard" 
              className={`px-3 py-2 rounded-md transition-colors flex items-center gap-2 ${isActive('/dashboard') ? 'bg-primary/10 text-primary font-semibold' : 'hover:bg-muted text-foreground/70 hover:text-foreground'}`}
            >
              <Home className="h-4 w-4" /> Dashboard
            </Link>
            <Link 
              to="/tickets" 
              className={`px-3 py-2 rounded-md transition-colors flex items-center gap-2 ${isActive('/tickets') ? 'bg-primary/10 text-primary font-semibold' : 'hover:bg-muted text-foreground/70 hover:text-foreground'}`}
            >
              <Ticket className="h-4 w-4" /> Tickets
            </Link>
            <Link 
              to="/kb" 
              className={`px-3 py-2 rounded-md transition-colors flex items-center gap-2 ${isActive('/kb') ? 'bg-primary/10 text-primary font-semibold' : 'hover:bg-muted text-foreground/70 hover:text-foreground'}`}
            >
              <BookOpen className="h-4 w-4" /> Help Center
            </Link>
            {role === "admin" && (
              <Link 
                to="/admin" 
                className={`px-3 py-2 rounded-md transition-colors flex items-center gap-2 ${isActive('/admin') ? 'bg-primary/10 text-primary font-semibold' : 'hover:bg-muted text-foreground/70 hover:text-foreground'}`}
              >
                <ShieldCheck className="h-4 w-4" /> Admin
              </Link>
            )}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          {role === "customer" && (
            <Button size="sm" onClick={() => navigate("/tickets/new")} className="hidden md:flex shadow-sm">
              <PlusCircle className="mr-2 h-4 w-4" /> New Ticket
            </Button>
          )}
          <div className="h-6 w-px bg-border/60 mx-1 hidden md:block"></div>
          
          <NotificationCenter />
          
          <div className="hidden md:flex items-center gap-2 border-l pl-4 ml-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.photoURL} alt={user.displayName || "User"} />
                    <AvatarFallback>{(user.displayName || user.email).charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.displayName || "User"}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                    <Badge variant="secondary" className="w-fit mt-2 capitalize text-[10px]">
                      {role}
                    </Badge>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/profile")} className="cursor-pointer">
                  <UserIcon className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600 focus:text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
