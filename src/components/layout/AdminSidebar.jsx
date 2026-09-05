import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/features/auth/AuthProvider";
import { logoutUser } from "@/features/auth/services/authService";
import { toast } from "sonner";
import { LayoutDashboard, Users, Ticket, FileText, LogOut, Settings, X, Menu, ShieldCheck } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { NotificationCenter } from "@/features/notifications/components/NotificationCenter";
import { motion, AnimatePresence } from "framer-motion";

export function AdminSidebar() {
  const { profile, role } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logoutUser();
      toast.success("Logged out successfully");
      navigate("/");
    } catch (error) {
      toast.error("Failed to log out");
    }
  };

  const navItems = [
    { name: "Dashboard", path: `/${role}`, icon: <LayoutDashboard className="w-5 h-5" />, roles: ["admin", "agent"] },
    { name: "Ticket Queue", path: `/${role}/tickets`, icon: <Ticket className="w-5 h-5" />, roles: ["admin", "agent"] },
    { name: "Knowledge Base", path: `/${role}/kb`, icon: <FileText className="w-5 h-5" />, roles: ["admin", "agent"] },
  ];

  const visibleNavItems = navItems.filter(item => item.roles.includes(role));

  const SidebarContent = ({ onNavigate }) => (
    <>
      {/* Brand Header */}
      <div className="h-16 flex items-center justify-between px-6 border-b shrink-0">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <span className="font-bold text-lg text-foreground">
            HelpDesk
          </span>
        </Link>
        {/* Close button for mobile */}
        <button
          onClick={() => setMobileOpen(false)}
          className="md:hidden p-1.5 rounded-lg hover:bg-muted transition-colors"
        >
          <X className="h-5 w-5 text-muted-foreground" />
        </button>
      </div>

      {/* User Profile Summary */}
      <div className="p-6 shrink-0 relative overflow-hidden group">
        <div className="flex items-center gap-4 relative z-10">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold text-lg">
            {profile?.name?.charAt(0) || "A"}
          </div>
          <div className="overflow-hidden flex flex-col">
            <h4 className="font-semibold truncate text-foreground">{profile?.name || "Admin"}</h4>
            <span className="text-xs text-muted-foreground capitalize font-medium flex items-center gap-2 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_5px_#10b981]" />
              {role}
            </span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto">
        {visibleNavItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link key={item.path} to={item.path} onClick={onNavigate}>
              <div
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
                  isActive 
                    ? "bg-primary text-primary-foreground font-medium shadow-sm" 
                    : "bg-transparent text-muted-foreground hover:bg-muted hover:text-foreground font-medium"
                }`}
              >
                <div className={`${isActive ? "text-primary-foreground" : "text-muted-foreground"} transition-colors`}>
                  {item.icon}
                </div>
                <span className="text-sm">{item.name}</span>
              </div>
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 space-y-1.5 shrink-0">
        <div className="flex items-center justify-between px-3 mb-4 pb-4 border-b">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Preferences</span>
          <div className="flex items-center gap-2">
            <ModeToggle />
            <NotificationCenter />
          </div>
        </div>
        
        <Link to={`/${role}/profile`} onClick={onNavigate}>
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors text-muted-foreground hover:bg-muted hover:text-foreground font-medium cursor-pointer">
            <Settings className="w-5 h-5" />
            <span className="text-sm">Settings</span>
          </div>
        </Link>
        
        <div 
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors text-red-500 hover:bg-red-500/10 cursor-pointer font-medium"
        >
          <LogOut className="w-5 h-5" />
          <span className="text-sm">Log out</span>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="w-64 border-r bg-card h-screen flex-col sticky top-0 left-0 hidden md:flex shrink-0">
        <SidebarContent onNavigate={() => {}} />
      </div>

      {/* Mobile Toggle Button (rendered by ProtectedRoute) */}
      <button
        onClick={() => setMobileOpen(true)}
        className="md:hidden fixed bottom-6 left-6 z-50 bg-primary text-primary-foreground p-3 rounded-full shadow-lg"
        aria-label="Open sidebar"
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Mobile Sidebar Overlay + Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="md:hidden fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 250 }}
              className="md:hidden fixed top-0 left-0 bottom-0 z-50 w-72 bg-card border-r shadow-2xl flex flex-col"
            >
              <SidebarContent onNavigate={() => setMobileOpen(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
