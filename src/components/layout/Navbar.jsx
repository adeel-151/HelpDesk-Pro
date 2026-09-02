import { Link, useNavigate } from "react-router-dom";
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
import { LogOut, Home, Ticket, ShieldCheck, BookOpen, User as UserIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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
            <Link to="/kb" className="transition-colors hover:text-foreground/80 text-foreground/60 flex items-center gap-2">
              <BookOpen className="h-4 w-4" /> Help Center
            </Link>
            {role === "admin" && (
              <Link to="/admin" className="transition-colors hover:text-foreground/80 text-foreground/60 flex items-center gap-2">
                <ShieldCheck className="h-4 w-4" /> Admin
              </Link>
            )}
          </nav>
        </div>

        <div className="flex items-center gap-4">
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
