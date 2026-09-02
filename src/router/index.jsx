import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Dashboard from "@/pages/Dashboard";
import TicketList from "@/pages/tickets/TicketList";
import CreateTicket from "@/pages/tickets/CreateTicket";
import TicketDetail from "@/pages/tickets/TicketDetail";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import { ProtectedRoute } from "./ProtectedRoute";

// A basic layout wrapper for public landing page
import Landing from "@/pages/Landing";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/tickets",
    element: (
      <ProtectedRoute>
        <TicketList />
      </ProtectedRoute>
    ),
  },
  {
    path: "/tickets/new",
    element: (
      <ProtectedRoute allowedRoles={["customer"]}>
        <CreateTicket />
      </ProtectedRoute>
    ),
  },
  {
    path: "/tickets/:ticketId",
    element: (
      <ProtectedRoute>
        <TicketDetail />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <AdminDashboard />
      </ProtectedRoute>
    ),
  }
]);
