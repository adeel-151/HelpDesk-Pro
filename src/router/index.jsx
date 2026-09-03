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

// Public pages wrapped in shared layout
import { PublicLayout } from "@/components/layout/PublicLayout";
import Landing from "@/pages/Landing";
import Features from "@/pages/Features";
import Pricing from "@/pages/Pricing";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/NotFound";

export const router = createBrowserRouter([
  // Public pages with shared header/footer layout
  {
    element: <PublicLayout />,
    children: [
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
        path: "/contact",
        element: <Contact />,
      },
    ],
  },
  // Auth pages (no shared layout)
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  // Protected pages
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
      <ProtectedRoute allowedRoles={["admin"]} layout="sidebar">
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
  },
  // 404 catch-all
  {
    path: "*",
    element: <NotFound />,
  },
]);
