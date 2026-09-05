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
      <div className="min-h-screen flex bg-white dark:bg-black text-black dark:text-white selection:bg-primary/20 selection:text-primary">
        <AdminSidebar />
        <main className="flex-1 flex flex-col h-screen overflow-y-auto w-full">
          {/* Mobile Header (since sidebar is hidden on small screens) */}
          <div className="md:hidden h-16 border-b border-black/10 dark:border-white/10 bg-white dark:bg-black flex items-center px-4 shrink-0 sticky top-0 z-40">
            <span className="font-black text-xl tracking-[0.2em] uppercase text-black dark:text-white">
              HELPDESK //
            </span>
          </div>
          {children}
        </main>
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
