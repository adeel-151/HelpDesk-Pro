import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/features/auth/AuthProvider";
import { Navbar } from "@/components/layout/Navbar";
import { AdminSidebar } from "@/components/layout/AdminSidebar";

export const ProtectedRoute = ({ children, allowedRoles, layout = "auto" }) => {
  const { user, role, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    // Redirect to unauthorized page or dashboard if user doesn't have required role
    return <Navigate to="/dashboard" replace />;
  }

  const isAgentOrAdmin = role === 'admin' || role === 'agent';
  const showSidebar = layout === 'sidebar' || (layout === 'auto' && isAgentOrAdmin);

  if (showSidebar) {
    return (
      <div className="min-h-screen flex flex-col selection:bg-primary/20 selection:text-primary bg-white dark:bg-black text-black dark:text-white">
        <div className="md:hidden">
          <Navbar />
        </div>
        <div className="flex-1 flex flex-row overflow-hidden">
          <AdminSidebar />
          <main className="flex-1 flex flex-col h-full overflow-y-auto overflow-x-hidden relative">
            {children}
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col selection:bg-primary/20 selection:text-primary">
      <Navbar />
      <main className="flex-1 flex flex-col">
        {children}
      </main>
    </div>
  );
};
