import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "@/App";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import TicketList from "@/pages/tickets/TicketList";
import CreateTicket from "@/pages/tickets/CreateTicket";
import TicketDetail from "@/pages/tickets/TicketDetail";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AgentDashboard from "@/pages/dashboards/AgentDashboard";
import CustomerDashboard from "@/pages/dashboards/CustomerDashboard";
import KnowledgeBaseHome from "@/pages/knowledge/KnowledgeBaseHome";
import ArticleDetail from "@/pages/knowledge/ArticleDetail";
import ArticleEditor from "@/pages/knowledge/ArticleEditor";
import UserProfile from "@/pages/profile/UserProfile";

// Layouts
import { PublicLayout } from "@/components/layout/PublicLayout";
import { RoleLayout } from "@/components/layout/RoleLayouts";

// Public pages
import Landing from "@/pages/Landing";
import Features from "@/pages/Features";
import Pricing from "@/pages/Pricing";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/NotFound";

export const router = createBrowserRouter([
  // Public pages
  {
    element: <PublicLayout />,
    children: [
      { path: "/", element: <Landing /> },
      { path: "/features", element: <Features /> },
      { path: "/pricing", element: <Pricing /> },
      { path: "/contact", element: <Contact /> },
    ],
  },
  
  // Auth pages
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  
  // Admin Routes
  {
    path: "/admin",
    element: <RoleLayout allowedRole="admin" />,
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: "dashboard", element: <Navigate to="/admin" replace /> },
      { path: "tickets", element: <TicketList /> },
      { path: "tickets/:ticketId", element: <TicketDetail /> },
      { path: "kb", element: <KnowledgeBaseHome /> },
      { path: "kb/new", element: <ArticleEditor /> },
      { path: "kb/:articleId", element: <ArticleDetail /> },
      { path: "kb/:articleId/edit", element: <ArticleEditor /> },
      { path: "profile", element: <UserProfile /> },
    ]
  },
  
  // Agent Routes
  {
    path: "/agent",
    element: <RoleLayout allowedRole="agent" />,
    children: [
      { index: true, element: <AgentDashboard /> },
      { path: "dashboard", element: <Navigate to="/agent" replace /> },
      { path: "tickets", element: <TicketList /> },
      { path: "tickets/:ticketId", element: <TicketDetail /> },
      { path: "kb", element: <KnowledgeBaseHome /> },
      { path: "kb/new", element: <ArticleEditor /> },
      { path: "kb/:articleId", element: <ArticleDetail /> },
      { path: "kb/:articleId/edit", element: <ArticleEditor /> },
      { path: "profile", element: <UserProfile /> },
    ]
  },
  
  // Customer Routes
  {
    path: "/customer",
    element: <RoleLayout allowedRole="customer" />,
    children: [
      { index: true, element: <CustomerDashboard /> },
      { path: "dashboard", element: <Navigate to="/customer" replace /> },
      { path: "tickets", element: <TicketList /> },
      { path: "tickets/new", element: <CreateTicket /> },
      { path: "tickets/:ticketId", element: <TicketDetail /> },
      { path: "kb", element: <KnowledgeBaseHome /> },
      { path: "kb/:articleId", element: <ArticleDetail /> },
      { path: "profile", element: <UserProfile /> },
    ]
  },

  // Legacy redirects
  { path: "/dashboard", element: <Navigate to="/login" replace /> },
  
  // 404 catch-all
  { path: "*", element: <NotFound /> },
]);
