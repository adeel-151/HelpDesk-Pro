import { useState } from "react";
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
import { LogOut, Home, Ticket, ShieldCheck, BookOpen, User as UserIcon, LifeBuoy, PlusCircle, Menu, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const { user, role } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    await logoutUser();
    navigate("/");
  };

  const isActive = (path) => location.pathname.startsWith(path);

  if (!user) return null;

  const navLinks = [
    { path: "/dashboard", icon: <Home className="h-4 w-4" />, label: "Dashboard", show: true },
    { path: "/tickets", icon: <Ticket className="h-4 w-4" />, label: "Tickets", show: true },
    { path: "/kb", icon: <BookOpen className="h-4 w-4" />, label: "Help Center", show: true },
    { path: "/admin", icon: <ShieldCheck className="h-4 w-4" />, label: "Admin", show: role === "admin" },
  ];

  return (
    <>
      <div className="sticky top-0 z-50 w-full pt-4 px-4 pb-2 bg-gradient-to-b from-background/80 to-transparent backdrop-blur-[2px] pointer-events-none">
        <header className="mx-auto max-w-7xl border border-border/50 bg-white/85 dark:bg-slate-950/85 backdrop-blur-2xl shadow-sm pointer-events-auto transition-all hover:shadow-md rounded-2xl">
          <div className="flex h-16 items-center justify-between px-6">
            <div className="flex items-center gap-8">
              <Link to="/dashboard" className="flex items-center space-x-2 group">
                <div className="bg-primary text-primary-foreground p-1.5 rounded-lg shadow-inner">
                  <LifeBuoy className="h-5 w-5" />
                </div>
                <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  HelpDesk Pro
                </span>
              </Link>
              <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
                {navLinks.filter(l => l.show).map((link) => (
                  <Link 
                    key={link.path}
                    to={link.path} 
                    className={`px-4 py-2 transition-all flex items-center gap-2 rounded-lg ${isActive(link.path) ? 'text-primary font-bold bg-primary/5' : 'text-foreground/70 hover:text-foreground hover:bg-muted/50'}`}
                  >
                    {link.icon} {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="flex items-center gap-3">
              {role === "customer" && (
                <Button size="sm" onClick={() => navigate("/tickets/new")} className="hidden md:flex shadow-sm">
                  <PlusCircle className="mr-2 h-4 w-4" /> New Ticket
                </Button>
              )}
              <div className="hidden md:flex items-center gap-2">
                <div className="h-6 w-px bg-border/60" />
                <ModeToggle />
                <NotificationCenter />
                <div className="h-6 w-px bg-border/60" />
              </div>
              
              {/* Desktop User Menu */}
              <div className="hidden md:flex items-center">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-9 w-9 p-0 rounded-full ring-1 ring-border">
                      <Avatar className="h-9 w-9">
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

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </header>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="md:hidden fixed inset-0 z-40 bg-black/20"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="md:hidden fixed top-20 left-4 right-4 z-50 bg-card border rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="p-4 space-y-2">
                {navLinks.filter(l => l.show).map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                      isActive(link.path) ? 'bg-primary/10 text-primary' : 'hover:bg-muted'
                    }`}
                  >
                    {link.icon} {link.label}
                  </Link>
                ))}

                <div className="h-px bg-border my-3" />

                <div className="flex items-center justify-between px-4 py-2">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.photoURL} />
                      <AvatarFallback className="text-xs">{(user.displayName || user.email).charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{user.displayName || "User"}</p>
                      <p className="text-xs text-muted-foreground">{role}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <ModeToggle />
                    <NotificationCenter />
                  </div>
                </div>

                {role === "customer" && (
                  <Link to="/tickets/new" onClick={() => setMobileOpen(false)}>
                    <Button className="w-full h-11">
                      <PlusCircle className="mr-2 h-4 w-4" /> New Ticket
                    </Button>
                  </Link>
                )}

                <div className="flex gap-2">
                  <Link to="/profile" className="flex-1" onClick={() => setMobileOpen(false)}>
                    <Button variant="outline" className="w-full h-11">
                      <UserIcon className="mr-2 h-4 w-4" /> Profile
                    </Button>
                  </Link>
                  <Button variant="outline" className="h-11 text-red-600 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30" onClick={handleLogout}>
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
