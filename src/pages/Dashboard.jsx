import { useAuth } from "@/features/auth/AuthProvider";
import { logoutUser } from "@/features/auth/services/authService";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/config";

// Import the specific dashboards
import CustomerDashboard from "./dashboards/CustomerDashboard";
import AgentDashboard from "./dashboards/AgentDashboard";

export default function Dashboard() {
  const { user, profile, role } = useAuth();
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

  const handleToggleRole = async () => {
    if (!user) return;
    
    let newRole = "customer";
    if (role === "customer") newRole = "agent";
    if (role === "agent") newRole = "admin";
    
    try {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, { role: newRole });
      toast.success(`Role updated to ${newRole}. Please refresh the page to see changes.`);
    } catch (error) {
      toast.error("Failed to update role");
    }
  };

  // If role is still loading (should be handled by AuthProvider, but just in case)
  if (!role) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/20 flex flex-col font-sans selection:bg-primary/20 selection:text-primary">
      
      {/* Global Topbar for Authenticated Users */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-8">
          <div className="flex items-center gap-4">
            <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              HelpDesk Pro
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:block text-sm text-muted-foreground text-right mr-2">
              <div className="font-medium text-foreground">{profile?.name || user?.email}</div>
              <div className="capitalize text-xs">{role}</div>
            </div>
            <Button variant="outline" size="sm" onClick={handleLogout}>Log out</Button>
          </div>
        </div>
      </header>

      {/* Main Content Area - Role Based Routing */}
      <main className="flex-1 container mx-auto p-4 sm:p-8">
        
        {/* Render appropriate dashboard based on role */}
        {role === "customer" ? (
          <CustomerDashboard />
        ) : (
          <AgentDashboard />
        )}

        {/* Development Tool - Keep for testing */}
        <div className="mt-20 pt-8 border-t text-center">
          <p className="text-xs text-muted-foreground mb-3">Development Testing Tool</p>
          <Button variant="outline" size="sm" onClick={handleToggleRole} className="text-xs h-8">
            Toggle Role (Current: {role})
          </Button>
        </div>

      </main>
    </div>
  );
}
