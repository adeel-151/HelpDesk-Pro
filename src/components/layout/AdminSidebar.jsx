import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/features/auth/AuthProvider";
import { logoutUser } from "@/features/auth/services/authService";
import { toast } from "sonner";
import { LayoutDashboard, Ticket, FileText, LogOut, Settings, ShieldCheck } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { NotificationCenter } from "@/features/notifications/components/NotificationCenter";

export function AdminSidebar() {
  const { profile, role } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

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
    { name: "DASHBOARD", path: `/${role}`, icon: <LayoutDashboard className="w-4 h-4" />, roles: ["admin", "agent"] },
    { name: "TICKET QUEUE", path: `/${role}/tickets`, icon: <Ticket className="w-4 h-4" />, roles: ["admin", "agent"] },
    { name: "KNOWLEDGE BASE", path: `/${role}/kb`, icon: <FileText className="w-4 h-4" />, roles: ["admin", "agent"] },
  ];

  const visibleNavItems = navItems.filter(item => item.roles.includes(role));

  const SidebarContent = ({ onNavigate }) => (
    <>
      {/* Brand Header */}
      <div className="h-16 flex items-center justify-between px-6 border-b border-black/10 dark:border-white/10 shrink-0 bg-black text-white dark:bg-white dark:text-black">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex items-center justify-center">
            <span className="font-black text-xs tracking-tighter border-2 border-white dark:border-black p-1">HD</span>
          </div>
          <span className="font-black text-sm tracking-[0.2em] uppercase">
            HELPDESK //
          </span>
        </Link>
      </div>

      {/* User Profile Summary */}
      <div className="p-6 shrink-0 relative overflow-hidden border-b border-black/10 dark:border-white/10">
        <div className="flex items-center gap-4 relative z-10">
          <div className="w-12 h-12 border border-primary text-primary flex items-center justify-center font-bold text-lg bg-primary/5">
            {profile?.name?.charAt(0) || "A"}
          </div>
          <div className="overflow-hidden flex flex-col">
            <h4 className="font-bold text-xs uppercase tracking-widest truncate">{profile?.name || "OPERATIVE"}</h4>
            <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold flex items-center gap-2 mt-1">
              <span className="w-1.5 h-1.5 bg-emerald-500 shadow-[0_0_5px_#10b981]" />
              ROLE: {role}
            </span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="px-4 py-4 shrink-0">
        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-4 block px-2">
          // MAIN_DIRECTIVES
        </span>
      </div>
      <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
        {visibleNavItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link key={item.path} to={item.path} onClick={onNavigate}>
              <div
                className={`flex items-center gap-4 px-3 py-3 transition-colors border ${
                  isActive 
                    ? "bg-primary text-primary-foreground border-primary font-bold shadow-[0_0_15px_rgba(79,70,229,0.2)]" 
                    : "bg-transparent text-muted-foreground border-transparent hover:border-primary/50 hover:text-foreground font-bold"
                }`}
              >
                <div className={`${isActive ? "text-primary-foreground" : "text-primary"} transition-colors`}>
                  {item.icon}
                </div>
                <span className="text-xs uppercase tracking-widest">{item.name}</span>
              </div>
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 space-y-2 shrink-0 border-t border-black/10 dark:border-white/10">
        <div className="flex items-center justify-between px-3 mb-4 pb-4 border-b border-black/10 dark:border-white/10">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">
            // CONFIG
          </span>
          <div className="flex items-center gap-2">
            <ModeToggle />
            <NotificationCenter />
          </div>
        </div>
        
        <Link to={`/${role}/profile`} onClick={onNavigate}>
          <div className="flex items-center gap-4 px-3 py-3 transition-colors border border-transparent text-muted-foreground hover:border-black/20 dark:hover:border-white/20 hover:text-foreground font-bold cursor-pointer">
            <Settings className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs uppercase tracking-widest">SETTINGS</span>
          </div>
        </Link>
        
        <div 
          onClick={handleLogout}
          className="flex items-center gap-4 px-3 py-3 transition-colors border border-transparent text-red-500 hover:border-red-500/50 hover:bg-red-500/5 cursor-pointer font-bold"
        >
          <LogOut className="w-4 h-4" />
          <span className="text-xs uppercase tracking-widest">TERMINATE_SESSION</span>
        </div>
      </div>
    </>
  );

  return (
    <div className="w-64 border-r border-black/10 dark:border-white/10 bg-background h-screen flex-col sticky top-0 left-0 hidden md:flex shrink-0">
      <SidebarContent onNavigate={() => {}} />
    </div>
  );
}
