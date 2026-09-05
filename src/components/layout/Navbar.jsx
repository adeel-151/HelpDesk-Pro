import { useState, useEffect } from "react";
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
  const isLanding = location.pathname === "/";
  const [scrolled, setScrolled] = useState(false);

  // Add scroll listener
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navClass = isLanding && !scrolled
    ? "fixed top-0 z-50 w-full transition-all duration-300 bg-transparent text-black dark:text-white"
    : "sticky top-0 z-50 w-full border-b border-black/10 dark:border-white/10 bg-white/60 dark:bg-black/60 backdrop-blur-xl transition-all duration-300 shadow-sm dark:shadow-[0_4px_30px_rgba(0,0,0,0.5)] text-black dark:text-white";

  return (
    <>
      <header className={navClass}>
        <div className="container mx-auto flex h-16 sm:h-20 items-center justify-between px-4 sm:px-8">
          <div className="flex items-center gap-8">
            <Link to={user ? `/${role}` : "/"} className="flex items-center space-x-2 group">
              <div className="flex items-center gap-3">
                <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-black dark:text-white transition-transform group-hover:scale-105 duration-300">
                  <path d="M50 5 L93 25 V75 L50 95 L7 75 V25 L50 5 Z" stroke="currentColor" strokeWidth="3" strokeOpacity="0.3"/>
                  <path d="M28 35 V65 M48 35 V65 M28 50 H48" stroke="currentColor" strokeWidth="6" strokeLinecap="round"/>
                  <path d="M60 35 H65 C73.284 35 80 41.716 80 50 C80 58.284 73.284 65 65 65 H60 V35 Z" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="80" cy="50" r="3" fill="currentColor"/>
                </svg>
                <span className="font-bold text-base sm:text-xl tracking-[0.2em] text-black/90 dark:text-white/90 hidden xs:inline">
                  HELPDESK
                </span>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-2 md:gap-6">
            <nav className="hidden md:flex items-center gap-6 mr-4">
              {visibleLinks.map((link) => (
                <Link key={link.path} to={link.path}>
                  <span
                    className={`text-xs font-bold uppercase tracking-[0.2em] transition-colors ${
                      isActive(link.path)
                        ? "text-primary drop-shadow-[0_0_10px_rgba(79,70,229,0.5)]"
                        : "text-black/60 hover:text-black dark:text-white/60 dark:hover:text-white"
                    }`}
                  >
                    {link.label}
                  </span>
                </Link>
              ))}
            </nav>

            {!user ? (
              <div className="hidden md:flex items-center gap-4">
                <ModeToggle />
                <div className="h-6 w-px bg-black/20 dark:bg-white/20" />
                <Link to="/login">
                  <span className="text-xs font-bold uppercase tracking-[0.1em] text-black/80 hover:text-black dark:text-white/80 dark:hover:text-white transition-colors">Log in</span>
                </Link>
                <Link to="/register">
                  <Button className="bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90 font-bold uppercase tracking-[0.1em] text-xs px-6 rounded-none">Get Started</Button>
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
                      <DropdownMenuItem onClick={() => navigate(`/${role}`)} className="cursor-pointer rounded-none">
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
              className="md:hidden p-2 rounded-none border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-black dark:text-white"
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
            className="md:hidden fixed top-[64px] sm:top-[80px] left-0 right-0 z-40 bg-white/95 dark:bg-black/95 backdrop-blur-xl border-b border-black/10 dark:border-white/10 shadow-xl overflow-hidden"
          >
            <div className="container mx-auto px-4 py-6 space-y-3">
              {visibleLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center px-4 py-3 rounded-none text-xs uppercase tracking-widest font-bold transition-colors ${
                    isActive(link.path)
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-muted text-black dark:text-white"
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
                    <span className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Theme</span>
                    <ModeToggle />
                  </div>
                  <div className="flex gap-3">
                    <Link to="/login" className="flex-1" onClick={() => setMobileOpen(false)}>
                      <Button variant="outline" className="w-full h-12 rounded-none uppercase tracking-widest text-xs font-bold border-black/20 dark:border-white/20 text-black dark:text-white">
                        Log in
                      </Button>
                    </Link>
                    <Link to="/register" className="flex-1" onClick={() => setMobileOpen(false)}>
                      <Button className="w-full h-12 rounded-none uppercase tracking-widest text-xs font-bold bg-black text-white dark:bg-white dark:text-black">Get Started</Button>
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
                        <p className="text-sm font-medium text-black dark:text-white">{user.displayName || "User"}</p>
                        <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{role}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-black dark:text-white">
                      <ModeToggle />
                      <NotificationCenter />
                    </div>
                  </div>
                  
                  {role === "customer" && (
                    <Link to="/tickets/new" onClick={() => setMobileOpen(false)}>
                      <Button className="w-full h-11 mb-2 rounded-none uppercase tracking-widest text-xs font-bold">
                        <PlusCircle className="mr-2 h-4 w-4" /> New Ticket
                      </Button>
                    </Link>
                  )}
                  
                  <div className="grid grid-cols-2 gap-3">
                    <Link to={`/${role}`} onClick={() => setMobileOpen(false)}>
                      <Button variant="outline" className="w-full h-11 justify-start px-4 rounded-none border-black/20 dark:border-white/20 text-black dark:text-white font-bold uppercase tracking-widest text-xs">
                        <LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard
                      </Button>
                    </Link>
                    <Link to="/profile" onClick={() => setMobileOpen(false)}>
                      <Button variant="outline" className="w-full h-11 justify-start px-4 rounded-none border-black/20 dark:border-white/20 text-black dark:text-white">
                        <UserIcon className="mr-2 h-4 w-4" /> Profile
                      </Button>
                    </Link>
                  </div>
                  <Link to="/profile" onClick={() => setMobileOpen(false)}>
                    <Button variant="outline" className="w-full h-11 justify-start px-4 mb-3 rounded-none border-black/20 dark:border-white/20 text-black dark:text-white">
                      <Settings className="mr-2 h-4 w-4" /> Settings
                    </Button>
                  </Link>
                  <Button variant="destructive" className="w-full h-11 rounded-none uppercase tracking-widest text-xs font-bold" onClick={handleLogout}>
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
            className="md:hidden fixed inset-0 top-[64px] sm:top-[80px] z-30 bg-black/20 dark:bg-black/80 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
