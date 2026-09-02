import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Dashboard from "@/pages/Dashboard";
import TicketList from "@/pages/tickets/TicketList";
import CreateTicket from "@/pages/tickets/CreateTicket";
import TicketDetail from "@/pages/tickets/TicketDetail";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import KnowledgeBaseHome from "@/pages/knowledge/KnowledgeBaseHome";
import ArticleDetail from "@/pages/knowledge/ArticleDetail";
import ArticleEditor from "@/pages/knowledge/ArticleEditor";
import UserProfile from "@/pages/profile/UserProfile";
import { ProtectedRoute } from "./ProtectedRoute";

// A basic layout wrapper for public landing page
import Landing from "@/pages/Landing";
import Features from "@/pages/Features";
import Pricing from "@/pages/Pricing";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/features",
    element: <Features />,
  },
  {
    path: "/pricing",
    element: <Pricing />,
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
  },
  {
    path: "/kb",
    element: (
      <ProtectedRoute>
        <KnowledgeBaseHome />
      </ProtectedRoute>
    ),
  },
  {
    path: "/kb/new",
    element: (
      <ProtectedRoute allowedRoles={["admin", "agent"]}>
        <ArticleEditor />
      </ProtectedRoute>
    ),
  },
  {
    path: "/kb/:articleId",
    element: (
      <ProtectedRoute>
        <ArticleDetail />
      </ProtectedRoute>
    ),
  },
  {
    path: "/kb/:articleId/edit",
    element: (
      <ProtectedRoute allowedRoles={["admin", "agent"]}>
        <ArticleEditor />
      </ProtectedRoute>
    ),
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <UserProfile />
      </ProtectedRoute>
    ),
  }
]);
