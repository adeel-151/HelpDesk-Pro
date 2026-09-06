# Project Rules & Conventions

## 1. Design & UI Requirements (Cyber/Terminal Aesthetic)
- **Borders & Corners**: Absolutely NO rounded corners on interactive elements. Everything MUST use `rounded-none`.
- **Typography**: 
  - Monospace or highly legible sans-serif for UI elements.
  - Buttons, labels, and small text must be `uppercase` and `tracking-widest` or `tracking-[0.2em]`.
  - Use `font-black` for headers.
- **Colors**: 
  - Monochromatic baseline (black and white) using `border-black/20` and `border-white/20`.
  - Use high-contrast, vibrant accents sparingly (e.g. emerald, amber, primary/indigo) for alerts or specific status indicators.
  - Dark mode must look like a high-contrast terminal.
- **Animations**: Use `transition-all` and `group-hover` for subtle micro-interactions (like scaling icons on hover or glowing borders).

## 2. Responsiveness
- **Mobile First**: All dashboards and tables must scale down gracefully. 
- **Grids**: Use `grid-cols-1 sm:grid-cols-2` for metric grids. Avoid strict multi-column grids that don't wrap on small screens.
- **Charts**: Any chart wrapper must include `min-w-0` to prevent Recharts' `ResponsiveContainer` from breaking CSS Grid layouts and causing horizontal scrolling.
- **Paddings**: Use variable padding `p-4 sm:p-6` or `p-4 sm:p-8` to save space on mobile.
- **Text Overflow**: Apply `break-words` on large headers (`h1`, `h2`) to prevent long text (like names or ticket subjects) from causing horizontal scrolling.

## 3. Component Architecture
- Place highly reusable UI parts in `src/components/ui/`.
- Group domain logic into `src/features/` (e.g., tickets, auth).
- Keep Page components in `src/pages/` lean, delegating heavy logic or complex forms to feature components.

## 4. State & Data Fetching
- Use React Query for all Firebase `getDocs`/`getDoc` calls to handle caching and loading states automatically.
- Use `onSnapshot` for real-time features (like ticket messages) instead of React Query.

## 5. Routing Security
- Ensure all dashboard and feature routes are nested under their respective role prefixes (`/customer`, `/agent`, `/admin`).
- Use the `RoleLayout` wrapper to redirect users who attempt to access unauthorized paths.
