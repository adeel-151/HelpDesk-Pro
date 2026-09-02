import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/features/auth/AuthProvider";
import { logoutUser } from "@/features/auth/services/authService";
import { NotificationCenter } from "@/features/notifications/components/NotificationCenter";
import { ModeToggle } from "@/components/mode-toggle";
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
    <div className="sticky top-0 z-50 w-full pt-4 px-4 pb-2 bg-gradient-to-b from-background/80 to-transparent backdrop-blur-[2px] pointer-events-none">
      <header className="mx-auto max-w-7xl border border-border/50 bg-white/85 dark:bg-slate-950/85 backdrop-blur-2xl shadow-sm pointer-events-auto transition-all hover:shadow-md">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-8">
            <Link to="/dashboard" className="flex items-center space-x-2 group">
              <div className="bg-primary text-primary-foreground p-1.5 shadow-inner">
              <LifeBuoy className="h-5 w-5" />
            </div>
            <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              HelpDesk Pro
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
            <Link 
              to="/dashboard" 
              className={`px-4 py-2 transition-all flex items-center gap-2 border-b-2 ${isActive('/dashboard') ? 'border-primary text-primary font-bold bg-primary/5' : 'border-transparent hover:border-border text-foreground/70 hover:text-foreground hover:bg-muted/50'}`}
            >
              <Home className="h-4 w-4" /> Dashboard
            </Link>
            <Link 
              to="/tickets" 
              className={`px-4 py-2 transition-all flex items-center gap-2 border-b-2 ${isActive('/tickets') ? 'border-primary text-primary font-bold bg-primary/5' : 'border-transparent hover:border-border text-foreground/70 hover:text-foreground hover:bg-muted/50'}`}
            >
              <Ticket className="h-4 w-4" /> Tickets
            </Link>
            <Link 
              to="/kb" 
              className={`px-4 py-2 transition-all flex items-center gap-2 border-b-2 ${isActive('/kb') ? 'border-primary text-primary font-bold bg-primary/5' : 'border-transparent hover:border-border text-foreground/70 hover:text-foreground hover:bg-muted/50'}`}
            >
              <BookOpen className="h-4 w-4" /> Help Center
            </Link>
            {role === "admin" && (
              <Link 
                to="/admin" 
                className={`px-4 py-2 transition-all flex items-center gap-2 border-b-2 ${isActive('/admin') ? 'border-primary text-primary font-bold bg-primary/5' : 'border-transparent hover:border-border text-foreground/70 hover:text-foreground hover:bg-muted/50'}`}
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
          
          <ModeToggle />
          <NotificationCenter />
          
          <div className="hidden md:flex items-center gap-2 border-l pl-4 ml-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 p-0 ring-1 ring-border">
                  <Avatar className="h-9 w-9 rounded-none">
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
    </div>
  );
}
