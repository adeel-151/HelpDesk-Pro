import { useAuth } from "@/features/auth/AuthProvider";
import { logoutUser } from "@/features/auth/services/authService";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

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

  return (
    <div className="min-h-screen p-8 bg-muted/20">
      <div className="max-w-4xl mx-auto space-y-6">
        <header className="flex justify-between items-center bg-card p-6 rounded-lg border shadow-sm">
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {profile?.name || user?.email}</p>
          </div>
          <Button variant="outline" onClick={handleLogout}>Log out</Button>
        </header>

        <main className="grid gap-6 md:grid-cols-2">
          <div className="bg-card p-6 rounded-lg border shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Your Profile</h2>
            <div className="space-y-2 text-sm">
              <p><span className="font-medium">Email:</span> {user?.email}</p>
              <p><span className="font-medium">Role:</span> <span className="capitalize">{role || "Loading..."}</span></p>
              <p><span className="font-medium">User ID:</span> {user?.uid}</p>
            </div>
          </div>
          
          <div className="bg-card p-6 rounded-lg border shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Role-Specific Actions</h2>
            {role === "customer" && (
              <p className="text-muted-foreground text-sm">You can create and manage your own tickets.</p>
            )}
            {role === "agent" && (
              <p className="text-muted-foreground text-sm">You can view and reply to assigned tickets.</p>
            )}
            {role === "admin" && (
              <p className="text-muted-foreground text-sm">You have full access to manage users, roles, and all tickets.</p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
