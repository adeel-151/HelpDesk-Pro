# Project Memory & Context

This document tracks key decisions, recurring bugs, and architectural context to aid future development iterations.

## 1. The Design Transition (Glassmorphism -> Terminal)
- **Context:** The project initially started with soft "glassmorphism" UI elements (blurry backgrounds, rounded corners, soft shadows). The user explicitly mandated a pivot to a "Cyber/Terminal" aesthetic.
- **Key Decision:** We removed all `rounded-*` classes (enforcing `rounded-none`), stripped heavy box shadows, and applied rigid borders (`border-black/20`). 
- **Rule of Thumb:** If introducing a new Shadcn UI component, its default rounded corners and soft styling MUST be overridden immediately.

## 2. Recharts Dark Mode Visibility Bug
- **Bug:** The Recharts Bar and Pie charts were using `fill="currentColor"` or relying heavily on standard text colors. In dark mode, these fills appeared black against a black background, rendering the charts invisible.
- **Fix:** Chart components in `AdminDashboard` and `AgentDashboard` were updated to use a static array of vibrant hex colors (`['#4f46e5', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']`) mapped directly to the Recharts `<Cell />` components. 
- **Lesson:** Data visualizations require hardcoded, high-contrast color palettes rather than relying exclusively on Tailwind's `bg-foreground` dynamic text colors.

## 3. Horizontal Scroll Overflow Issues
- **Bug:** Recharts `ResponsiveContainer` components placed inside CSS Grids were causing horizontal overflow on mobile devices.
- **Root Cause:** Flex and Grid children inherently resist shrinking below their intrinsic minimum content width (`min-width: auto`). This forces the grid to expand beyond `100vw`.
- **Fix:** Applied `min-w-0` to the parent container `div` wrapping the charts. This allows the flex container to shrink below its intrinsic width, permitting the `ResponsiveContainer` to scale down properly.
- **Lesson:** Always add `min-w-0` to layout wrappers containing responsive SVG/Canvas elements.

## 4. Role-Based Navigation Routing (The 404 Issue)
- **Bug:** Authenticated users were experiencing 404 errors when clicking Navbar links (e.g., clicking "Tickets" and being sent to `/tickets` instead of `/customer/tickets`).
- **Fix:** The `Navbar.jsx` component was rebuilt to inject the current user's `role` directly into the route paths. The `navLinks` array is dynamically filtered and mapped based on the active role provided by `AuthProvider`.
- **Lesson:** Never hardcode absolute paths for authenticated features. Always prefix with `/${role}/`.

## 5. Mobile Layout Principles
- Always use `break-words` on large uppercase headers, as long strings (like user emails or ticket hashes) will break out of the viewport on 320px screens.
- Use `grid-cols-1 sm:grid-cols-2` for statistical metric grids. Strict 2-column grids squish metric numbers and text unreadably.
