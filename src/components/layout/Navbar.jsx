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
import { LogOut, Ticket, ShieldCheck, BookOpen, User as UserIcon, LifeBuoy, PlusCircle, Menu, X, LayoutDashboard, Settings } from "lucide-react";
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

  const isActive = (path) => location.pathname === path || (path !== '/' && location.pathname.startsWith(path));

  // Determine which links to show based on auth state
  // Notice: 'Dashboard' is removed from navLinks as requested, and is only available in the profile dropdown
  const navLinks = user ? [
    { path: "/tickets", icon: <Ticket className="h-4 w-4 mr-2" />, label: "Tickets", show: true },
    { path: "/kb", icon: <BookOpen className="h-4 w-4 mr-2" />, label: "Help Center", show: true },
    { path: "/admin", icon: <ShieldCheck className="h-4 w-4 mr-2" />, label: "Admin", show: role === "admin" },
  ] : [
    { path: "/features", icon: null, label: "Features", show: true },
    { path: "/pricing", icon: null, label: "Pricing", show: true },
    { path: "/contact", icon: null, label: "Contact", show: true },
  ];

  const visibleLinks = navLinks.filter(l => l.show);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl transition-all">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-8">
            <Link to={user ? "/dashboard" : "/"} className="flex items-center space-x-2 group">
              <div className="bg-primary/10 text-primary p-2 rounded-xl group-hover:bg-primary/20 transition-colors">
                <LifeBuoy className="h-5 w-5" />
              </div>
              <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                HelpDesk Pro
              </span>
            </Link>
            
            <nav className="hidden md:flex items-center gap-1">
              {visibleLinks.map((link) => (
                <Link key={link.path} to={link.path}>
                  <Button
                    variant="ghost"
                    className={`${isActive(link.path) ? "text-primary bg-primary/5 font-semibold" : "text-foreground/70"}`}
                  >
                    {link.icon}
                    {link.label}
                  </Button>
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            {!user ? (
              <div className="hidden md:flex items-center gap-2">
                <ModeToggle />
                <div className="h-6 w-px bg-border/60 mx-1" />
                <Link to="/login">
                  <Button variant="outline">Log in</Button>
                </Link>
                <Link to="/register">
                  <Button>Get Started</Button>
                </Link>
              </div>
            ) : (
              <>
                {role === "customer" && (
                  <Button size="sm" onClick={() => navigate("/tickets/new")} className="hidden md:flex shadow-sm">
                    <PlusCircle className="mr-2 h-4 w-4" /> New Ticket
                  </Button>
                )}
                <div className="hidden md:flex items-center gap-2">
                  <div className="h-6 w-px bg-border/60 mx-1" />
                  <ModeToggle />
                  <NotificationCenter />
                  <div className="h-6 w-px bg-border/60 mx-1" />
                </div>
                
                {/* Desktop User Menu Dropdown */}
                <div className="hidden md:flex items-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="relative h-9 w-9 p-0 rounded-full ring-2 ring-primary/20 hover:ring-primary/50 transition-all">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={user.photoURL} alt={user.displayName || "User"} />
                          <AvatarFallback>{(user.displayName || user.email)?.charAt(0).toUpperCase()}</AvatarFallback>
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
                      <DropdownMenuItem onClick={() => navigate("/dashboard")} className="cursor-pointer">
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        <span>Dashboard</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigate("/profile")} className="cursor-pointer">
                        <UserIcon className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigate("/profile")} className="cursor-pointer">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600 focus:text-red-600">
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </>
            )}

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

      {/* Mobile Slide-Down Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden fixed top-16 left-0 right-0 z-40 bg-background/95 backdrop-blur-xl border-b shadow-xl overflow-hidden"
          >
            <div className="container mx-auto px-4 py-6 space-y-3">
              {visibleLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center px-4 py-3 rounded-xl text-lg font-medium transition-colors ${
                    isActive(link.path)
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-muted"
                  }`}
                >
                  {link.icon && <span className="mr-3">{link.icon}</span>}
                  {link.label}
                </Link>
              ))}
              
              <div className="h-px bg-border my-4" />
              
              {!user ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between px-2">
                    <span className="text-sm font-medium text-muted-foreground">Theme</span>
                    <ModeToggle />
                  </div>
                  <div className="flex gap-3">
                    <Link to="/login" className="flex-1" onClick={() => setMobileOpen(false)}>
                      <Button variant="outline" className="w-full h-12">
                        Log in
                      </Button>
                    </Link>
                    <Link to="/register" className="flex-1" onClick={() => setMobileOpen(false)}>
                      <Button className="w-full h-12">Get Started</Button>
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between px-2 mb-2">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 border border-primary/20">
                        <AvatarImage src={user.photoURL} />
                        <AvatarFallback>{(user.displayName || user.email)?.charAt(0).toUpperCase()}</AvatarFallback>
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
                      <Button className="w-full h-11 mb-2">
                        <PlusCircle className="mr-2 h-4 w-4" /> New Ticket
                      </Button>
                    </Link>
                  )}
                  
                  <div className="grid grid-cols-2 gap-3">
                    <Link to="/dashboard" onClick={() => setMobileOpen(false)}>
                      <Button variant="outline" className="w-full h-11 justify-start px-4">
                        <LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard
                      </Button>
                    </Link>
                    <Link to="/profile" onClick={() => setMobileOpen(false)}>
                      <Button variant="outline" className="w-full h-11 justify-start px-4">
                        <UserIcon className="mr-2 h-4 w-4" /> Profile
                      </Button>
                    </Link>
                  </div>
                  <Link to="/profile" onClick={() => setMobileOpen(false)}>
                    <Button variant="outline" className="w-full h-11 justify-start px-4 mb-3">
                      <Settings className="mr-2 h-4 w-4" /> Settings
                    </Button>
                  </Link>
                  <Button variant="destructive" className="w-full h-11" onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" /> Log out
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="md:hidden fixed inset-0 top-16 z-30 bg-black/20"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
