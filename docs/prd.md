# Product Requirements Document (PRD)

## 1. Goal
Build a modern, highly responsive HelpDesk and Ticketing system called **HelpDesk-Pro** that caters to Customers, Agents, and Administrators. The platform distinguishes itself through a unique, striking **"Cyber/Terminal"** design aesthetic that feels rigid, technical, and premium.

## 2. Features
- **Role-Based Access Control (RBAC):** Three distinct user roles (Customer, Agent, Admin).
- **Authentication:** Secure login/signup system with role assignment.
- **Ticket Management:** 
  - Customers can create, view, and track tickets.
  - Agents can claim, reply to, and resolve tickets.
  - Admins can oversee all tickets.
  - Internal notes/logs for agents and admins (hidden from customers).
  - File attachments support.
- **Knowledge Base (KB):**
  - Searchable repository of articles.
  - Markdown support for rich text authoring.
  - CRUD operations restricted to Agents and Admins.
- **Dashboards:**
  - Role-specific landing dashboards showcasing relevant metrics.
  - Interactive charts (Volume over time, status distributions) for Agents and Admins.
- **Notifications:** In-app notification center for ticket updates.

## 3. Target Users
- **Customers/End-Users:** Individuals needing support or access to documentation.
- **Support Agents:** Employees handling incoming requests, triaging tickets, and authoring KB articles.
- **Administrators:** System managers overseeing user roles, system metrics, and overall performance.

## 4. What is NOT Included (Out of Scope for Initial Version)
- Live real-time chat (e.g., WebSocket-based instant messaging).
- Automated AI Chatbot responses.
- Billing and invoicing integration.
- Multi-language support (i18n).
