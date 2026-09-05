import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/features/auth/AuthProvider";
import { logoutUser } from "@/features/auth/services/authService";
import { toast } from "sonner";
import { LayoutDashboard, Users, Ticket, FileText, LogOut, Settings, X, Menu, TerminalSquare } from "lucide-react";
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
      toast.success("LOGGED OUT SUCESSFULLY");
      navigate("/");
    } catch (error) {
      toast.error("FAILED TO LOG OUT");
    }
  };

  const navItems = [
    { name: "COMMAND CENTER", path: "/dashboard", icon: <LayoutDashboard className="w-4 h-4" />, roles: ["admin", "agent"] },
    { name: "USER MANAGEMENT", path: "/admin", icon: <Users className="w-4 h-4" />, roles: ["admin"] },
    { name: "TICKET QUEUE", path: "/tickets", icon: <Ticket className="w-4 h-4" />, roles: ["admin", "agent"] },
    { name: "KNOWLEDGE BASE", path: "/kb", icon: <FileText className="w-4 h-4" />, roles: ["admin", "agent"] },
  ];

  const visibleNavItems = navItems.filter(item => item.roles.includes(role));

  const SidebarContent = ({ onNavigate }) => (
    <>
      {/* Brand Header */}
      <div className="h-16 flex items-center justify-between px-6 border-b border-black/10 dark:border-white/10 shrink-0">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-8 h-8 border border-primary text-primary flex items-center justify-center bg-primary/10">
            <TerminalSquare className="w-4 h-4" />
          </div>
          <span className="font-black text-sm tracking-[0.2em] uppercase text-black dark:text-white">
            HELPDESK //
          </span>
        </Link>
        {/* Close button for mobile */}
        <button
          onClick={() => setMobileOpen(false)}
          className="md:hidden p-1.5 border border-black/20 dark:border-white/20 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* User Profile Summary */}
      <div className="p-6 border-b border-black/10 dark:border-white/10 shrink-0 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 blur-xl group-hover:bg-primary/10 transition-colors" />
        <div className="flex items-center gap-4 relative z-10">
          <div className="w-10 h-10 bg-transparent text-primary flex items-center justify-center font-black text-sm uppercase border border-primary/50 shadow-[0_0_10px_rgba(79,70,229,0.3)]">
            {profile?.name?.charAt(0) || "A"}
          </div>
          <div className="overflow-hidden flex flex-col">
            <h4 className="text-xs font-black truncate uppercase tracking-widest">{profile?.name || "ADMIN"}</h4>
            <span className="text-[10px] text-black/50 dark:text-white/50 uppercase tracking-[0.2em] font-bold flex items-center gap-2 mt-1">
              <span className="w-1.5 h-1.5 bg-emerald-500 shadow-[0_0_5px_#10b981]" />
              {role}
            </span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {visibleNavItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link key={item.path} to={item.path} onClick={onNavigate}>
              <div
                className={`flex items-center gap-4 px-4 py-3 border transition-all duration-300 group ${
                  isActive 
                    ? "bg-primary text-white border-primary shadow-[0_0_15px_rgba(79,70,229,0.3)]" 
                    : "bg-transparent border-transparent text-black/70 dark:text-white/70 hover:border-black/20 dark:hover:border-white/20 hover:bg-black/5 dark:hover:bg-white/5"
                }`}
              >
                <div className={`${isActive ? "text-white" : "text-black/50 dark:text-white/50 group-hover:text-primary"} transition-colors`}>
                  {item.icon}
                </div>
                <span className="text-xs font-bold tracking-widest uppercase">{item.name}</span>
              </div>
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-black/10 dark:border-white/10 space-y-2 shrink-0">
        <div className="flex items-center justify-between px-4 mb-4 pb-4 border-b border-black/10 dark:border-white/10">
          <span className="text-[10px] font-bold text-black/50 dark:text-white/50 uppercase tracking-[0.2em]">PREFERENCES</span>
          <div className="flex items-center gap-2">
            <ModeToggle />
            <NotificationCenter />
          </div>
        </div>
        
        <Link to="/profile" onClick={onNavigate}>
          <div className="flex items-center gap-4 px-4 py-3 border border-transparent transition-colors text-black/70 dark:text-white/70 hover:border-black/20 dark:hover:border-white/20 hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer">
            <Settings className="w-4 h-4 text-black/50 dark:text-white/50" />
            <span className="text-xs font-bold tracking-widest uppercase">SETTINGS</span>
          </div>
        </Link>
        
        <div 
          onClick={handleLogout}
          className="flex items-center gap-4 px-4 py-3 border border-transparent transition-colors text-red-500 hover:border-red-500/30 hover:bg-red-500/10 cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span className="text-xs font-bold tracking-widest uppercase">DISCONNECT</span>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="w-64 border-r border-black/10 dark:border-white/10 bg-white dark:bg-black h-screen flex-col sticky top-0 left-0 hidden md:flex shrink-0">
        <SidebarContent onNavigate={() => {}} />
      </div>

      {/* Mobile Toggle Button (rendered by ProtectedRoute) */}
      <button
        onClick={() => setMobileOpen(true)}
        className="md:hidden fixed bottom-6 left-6 z-50 bg-primary text-white p-3 shadow-[0_0_20px_rgba(79,70,229,0.5)] border border-primary"
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
              className="md:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 250 }}
              className="md:hidden fixed top-0 left-0 bottom-0 z-50 w-72 bg-white dark:bg-black border-r border-black/10 dark:border-white/10 shadow-2xl flex flex-col"
            >
              <SidebarContent onNavigate={() => setMobileOpen(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
