# System Architecture

## 1. Tech Stack
- **Frontend Framework:** React 18+ (via Vite)
- **Styling:** Tailwind CSS (Vanilla utilities, no external heavy component libraries that break the theme)
- **Components:** Shadcn UI (radix-ui primitives heavily customized to the Cyber/Terminal theme)
- **Routing:** React Router v6
- **State Management & Data Fetching:** React Query (@tanstack/react-query)
- **Backend & Database:** Firebase (Firestore)
- **Authentication:** Firebase Auth
- **Storage:** Firebase Cloud Storage (for ticket attachments, avatars)
- **Forms & Validation:** React Hook Form + Zod
- **Charts:** Recharts

## 2. Database Schema (Firestore)
- **Users Collection (`users`)**:
  - `uid` (Document ID)
  - `email`, `displayName`, `photoURL`
  - `role` ('customer', 'agent', 'admin')
  - `createdAt`, `updatedAt`
- **Tickets Collection (`tickets`)**:
  - `id` (Document ID)
  - `ticketNumber` (e.g., TKT-123456)
  - `subject`, `description`
  - `status` ('new', 'open', 'pending customer', 'resolved', 'closed')
  - `priority` ('low', 'normal', 'high', 'urgent')
  - `createdBy` (Reference to users)
  - `assignedAgentId` (Reference to users)
  - `categoryId`
  - `slaDueDate`, `createdAt`, `updatedAt`
- **Ticket Messages Collection (`tickets/{ticketId}/messages`)**:
  - `messageId` (Document ID)
  - `senderId`, `senderRole`
  - `body`
  - `isInternal` (boolean - hidden from customers)
  - `attachments` (Array of URLs)
  - `createdAt`
- **Knowledge Base Collection (`articles`)**:
  - `id` (Document ID)
  - `title`, `summary`, `content` (Markdown)
  - `category`
  - `authorId`, `createdAt`, `updatedAt`
- **Notifications Collection (`notifications`)**:
  - `id` (Document ID)
  - `userId`
  - `title`, `message`, `type`, `link`
  - `isRead`, `createdAt`

## 3. Folder Structure
```
src/
├── components/       # Reusable UI components (Shadcn customized)
│   ├── layout/       # Navbar, RoleLayout wrappers
│   └── ui/           # Buttons, Inputs, Dialogs, etc.
├── features/         # Domain-specific logic
│   ├── auth/         # AuthProvider, authService
│   ├── notifications/# NotificationCenter component
│   └── tickets/      # Ticket forms, ticketService, storageService
├── lib/              # Utilities and configs
│   ├── firebase/     # Firebase initialization (config.js)
│   └── utils.js      # cn() utility for Tailwind
├── pages/            # Routable page components
│   ├── admin/        # AdminDashboard
│   ├── dashboards/   # AgentDashboard, CustomerDashboard
│   ├── knowledge/    # KnowledgeBaseHome, ArticleDetail, ArticleEditor
│   ├── profile/      # UserProfile
│   ├── tickets/      # TicketList, TicketDetail, CreateTicket
│   ├── Landing.jsx   # Public landing page
│   └── NotFound.jsx  # 404 page
├── router/           # React Router definitions (index.jsx)
├── App.jsx           # Root component (Providers)
└── index.css         # Global styles (Tailwind + Theme variables)
```
