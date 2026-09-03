import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/features/auth/AuthProvider";
import { logoutUser } from "@/features/auth/services/authService";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { LayoutDashboard, Users, Ticket, FileText, LogOut, Settings, X, Menu } from "lucide-react";
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
    { name: "Command Center", path: "/dashboard", icon: <LayoutDashboard className="w-5 h-5" />, roles: ["admin", "agent"] },
    { name: "User Management", path: "/admin", icon: <Users className="w-5 h-5" />, roles: ["admin"] },
    { name: "Ticket Queue", path: "/tickets", icon: <Ticket className="w-5 h-5" />, roles: ["admin", "agent"] },
    { name: "Knowledge Base", path: "/kb", icon: <FileText className="w-5 h-5" />, roles: ["admin", "agent"] },
  ];

  const visibleNavItems = navItems.filter(item => item.roles.includes(role));

  const SidebarContent = ({ onNavigate }) => (
    <>
      {/* Brand Header */}
      <div className="h-16 flex items-center justify-between px-6 border-b shrink-0">
        <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          HelpDesk Pro
        </span>
        {/* Close button for mobile */}
        <button
          onClick={() => setMobileOpen(false)}
          className="md:hidden p-1.5 rounded-lg hover:bg-muted transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* User Profile Summary */}
      <div className="p-6 border-b shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-lg uppercase border border-primary/20">
            {profile?.name?.charAt(0) || "A"}
          </div>
          <div className="overflow-hidden">
            <h4 className="text-sm font-semibold truncate">{profile?.name || "Admin"}</h4>
            <span className="text-xs text-muted-foreground uppercase tracking-wider font-medium inline-flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              {role}
            </span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
        {visibleNavItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link key={item.path} to={item.path} onClick={onNavigate}>
              <div
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${
                  isActive 
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/20 font-medium" 
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <div className={`${isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-primary"} transition-colors`}>
                  {item.icon}
                </div>
                <span className="text-sm">{item.name}</span>
              </div>
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t space-y-1.5 shrink-0">
        <div className="flex items-center justify-between px-3 mb-4 pb-2 border-b border-border/50">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Preferences</span>
          <div className="flex items-center gap-1">
            <ModeToggle />
            <NotificationCenter />
          </div>
        </div>
        <Link to="/profile" onClick={onNavigate}>
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors text-muted-foreground hover:bg-muted hover:text-foreground cursor-pointer">
            <Settings className="w-5 h-5" />
            <span className="text-sm">Account Settings</span>
          </div>
        </Link>
        <div 
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors text-red-500/80 hover:bg-red-500/10 hover:text-red-600 cursor-pointer"
        >
          <LogOut className="w-5 h-5" />
          <span className="text-sm font-medium">Log out</span>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="w-64 border-r bg-card/50 backdrop-blur-xl h-screen flex-col sticky top-0 left-0 hidden md:flex shrink-0">
        <SidebarContent onNavigate={() => {}} />
      </div>

      {/* Mobile Toggle Button (rendered by ProtectedRoute) */}
      <button
        onClick={() => setMobileOpen(true)}
        className="md:hidden fixed bottom-6 left-6 z-50 bg-primary text-primary-foreground p-3 rounded-full shadow-lg shadow-primary/30 hover:scale-105 transition-transform"
        aria-label="Open sidebar"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Mobile Sidebar Overlay + Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="md:hidden fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
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
