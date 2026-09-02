import { useAuth } from "@/features/auth/AuthProvider";
import { PageTransition } from "@/components/ui/PageTransition";

// Import the specific dashboards
import CustomerDashboard from "./dashboards/CustomerDashboard";
import AgentDashboard from "./dashboards/AgentDashboard";

export default function Dashboard() {
  const { role } = useAuth();

  // If role is still loading
  if (!role) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <PageTransition className="w-full h-full p-4 sm:p-8">
      {role === "customer" ? (
        <CustomerDashboard />
      ) : (
        <AgentDashboard />
      )}
    </PageTransition>
  );
}

