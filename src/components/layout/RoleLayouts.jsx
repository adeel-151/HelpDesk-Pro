import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/features/auth/AuthProvider";
import { AdminSidebar } from "@/components/layout/AdminSidebar";
import { Navbar } from "@/components/layout/Navbar";

export const RoleLayout = ({ allowedRole }) => {
  const { user, role, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (role !== allowedRole) {
    return <Navigate to={`/${role}`} replace />;
  }

  const isAgentOrAdmin = role === 'admin' || role === 'agent';
  
  if (isAgentOrAdmin) {
    return (
      <div className="min-h-screen flex bg-background text-foreground selection:bg-primary/20 selection:text-primary">
        <AdminSidebar />
        <main className="flex-1 flex flex-col h-screen overflow-y-auto w-full">
          {/* Mobile Header */}
          <div className="md:hidden h-16 border-b bg-card flex items-center px-4 shrink-0 sticky top-0 z-40">
            <span className="font-bold text-lg text-foreground">
              HelpDesk
            </span>
          </div>
          <Outlet />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col selection:bg-primary/20 selection:text-primary bg-background">
      <Navbar />
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>
    </div>
  );
};
