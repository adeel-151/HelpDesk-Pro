import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LifeBuoy, Menu, X, User as UserIcon, LogOut, LayoutDashboard } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/features/auth/AuthProvider";
import { logoutUser } from "@/features/auth/services/authService";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

const navLinks = [
  { name: "Features", path: "/features" },
  { name: "Pricing", path: "/pricing" },
  { name: "Contact", path: "/contact" },
];

export function PublicHeader() {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  
  // Use auth state
  const { user, role } = useAuth();

  const isActive = (path) => location.pathname === path;

  const handleLogout = async () => {
    await logoutUser();
    navigate("/");
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="bg-primary/10 text-primary p-2 rounded-xl group-hover:bg-primary/20 transition-colors">
              <LifeBuoy className="h-5 w-5" />
            </div>
            <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              HelpDesk Pro
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path}>
                <Button
                  variant="ghost"
                  className={`${
                    isActive(link.path)
                      ? "text-primary bg-primary/5 font-semibold"
                      : ""
                  }`}
                >
                  {link.name}
                </Button>
              </Link>
            ))}
            
            <div className="w-px h-6 bg-border mx-2" />
            
            {!user ? (
              <>
                <Link to="/login">
                  <Button variant="outline" className="mr-2">
                    Log in
                  </Button>
                </Link>
                <Link to="/register">
                  <Button>Get Started</Button>
                </Link>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/dashboard">
                  <Button variant="outline" className="mr-2">
                    Dashboard
                  </Button>
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-9 w-9 p-0 rounded-full ring-1 ring-border">
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
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600 focus:text-red-600">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
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
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-4 py-3 rounded-xl text-lg font-medium transition-colors ${
                    isActive(link.path)
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-muted"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="h-px bg-border my-4" />
              
              {!user ? (
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
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 px-2">
                    <Avatar className="h-10 w-10 border">
                      <AvatarImage src={user.photoURL} />
                      <AvatarFallback>{(user.displayName || user.email)?.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{user.displayName || "User"}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <Link to="/dashboard" onClick={() => setMobileOpen(false)}>
                      <Button variant="outline" className="w-full h-12">
                        <LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard
                      </Button>
                    </Link>
                    <Link to="/profile" onClick={() => setMobileOpen(false)}>
                      <Button variant="outline" className="w-full h-12">
                        <UserIcon className="mr-2 h-4 w-4" /> Profile
                      </Button>
                    </Link>
                  </div>
                  <Button variant="destructive" className="w-full h-12" onClick={handleLogout}>
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
