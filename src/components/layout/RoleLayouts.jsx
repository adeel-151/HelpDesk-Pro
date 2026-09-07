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
      <div className="min-h-screen flex flex-col selection:bg-primary/20 selection:text-primary bg-background text-foreground">
        <div className="md:hidden">
          <Navbar />
        </div>
        <div className="flex-1 flex flex-row overflow-hidden">
          <AdminSidebar />
          <main className="flex-1 flex flex-col h-full overflow-y-auto overflow-x-hidden relative">
            <Outlet />
          </main>
        </div>
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
