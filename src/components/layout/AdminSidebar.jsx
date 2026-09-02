import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/features/auth/AuthProvider";
import { logoutUser } from "@/features/auth/services/authService";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { LayoutDashboard, Users, Ticket, FileText, LogOut, Settings } from "lucide-react";

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
    { name: "Command Center", path: "/dashboard", icon: <LayoutDashboard className="w-5 h-5" />, roles: ["admin", "agent"] },
    { name: "User Management", path: "/admin", icon: <Users className="w-5 h-5" />, roles: ["admin"] },
    { name: "Ticket Queue", path: "/tickets", icon: <Ticket className="w-5 h-5" />, roles: ["admin", "agent"] },
    { name: "Knowledge Base", path: "/kb", icon: <FileText className="w-5 h-5" />, roles: ["admin", "agent"] },
  ];

  const visibleNavItems = navItems.filter(item => item.roles.includes(role));

  return (
    <div className="w-64 border-r bg-card/50 backdrop-blur-xl h-screen flex flex-col sticky top-0 left-0 hidden md:flex shrink-0">
      
      {/* Brand Header */}
      <div className="h-16 flex items-center px-6 border-b">
        <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          HelpDesk Pro
        </span>
      </div>

      {/* User Profile Summary */}
      <div className="p-6 border-b">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-lg uppercase border border-primary/20">
            {profile?.name?.charAt(0) || "A"}
          </div>
          <div className="overflow-hidden">
            <h4 className="text-sm font-semibold truncate">{profile?.name || "Admin"}</h4>
            <span className="text-xs text-muted-foreground uppercase tracking-wider font-medium inline-flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
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
            <Link key={item.path} to={item.path}>
              <div
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${
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

      {/* Footer / Logout */}
      <div className="p-4 border-t space-y-2">
        <Link to="/profile">
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-muted-foreground hover:bg-muted hover:text-foreground cursor-pointer">
            <Settings className="w-5 h-5" />
            <span className="text-sm">Account Settings</span>
          </div>
        </Link>
        <div 
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-red-500/80 hover:bg-red-500/10 hover:text-red-600 cursor-pointer"
        >
          <LogOut className="w-5 h-5" />
          <span className="text-sm font-medium">Log out</span>
        </div>
      </div>
    </div>
  );
}
