# UI/UX Design Guidelines

## 1. Aesthetic: "Cyber/Terminal"
The goal is to create an interface that feels like a high-end, rigid terminal or command center. It should eschew soft, friendly modern UI trends (like heavy glassmorphism, rounded corners, or soft drop shadows) in favor of harsh, striking geometric lines.

## 2. Shapes & Geometry
- **Corners:** `rounded-none`. No exceptions. All buttons, inputs, dialogs, and cards must have sharp 90-degree corners.
- **Borders:** Prominent borders (`border-2 border-black dark:border-white`) for major structural elements, and subtle borders (`border-black/20 dark:border-white/20`) for interior divisions.

## 3. Typography
- **Headings (H1, H2):** `font-black`, `uppercase`, `tracking-[0.2em]`. Often accompanied by decorative terminal prefixes (e.g., `// SYSTEM_OVERVIEW`).
- **Subheadings / Labels:** `text-[10px]`, `font-bold`, `uppercase`, `tracking-widest`, `text-muted-foreground`.
- **Body:** Legible Sans-serif (like Inter) or Monospace for data tables and logs.
- **Micro-copy:** Heavy use of technical phrasing (`ABORT_VIEW`, `COMMIT_CHANGES`, `TRANSMISSION_SENT`) instead of friendly phrasing ("Back", "Save", "Message sent").

## 4. Colors
- **Backgrounds:** `bg-background` (pure black in dark mode, pure white in light mode).
- **Cards/Containers:** Subtle offsets using `bg-black/5 dark:bg-white/5`.
- **Accents:** 
  - Pure primary colors (Indigo/Blue for main actions).
  - Status colors: Emerald (Resolved/Success), Amber (Open/Warning), Red (Urgent/Error).
- **Data Visualizations:** Recharts must use a vibrant, hardcoded palette (`#4f46e5`, `#10b981`, `#f59e0b`, `#ef4444`, `#8b5cf6`) to ensure high contrast in dark mode, overriding default theme fills.

## 5. Micro-Animations
- Fast, snappy transitions (`duration-300`).
- Hover effects on cards often involve glowing borders (`hover:border-primary`) or opacity shifts, never rounded scaling.
- Flashing cursors or pulse animations (`animate-pulse`) used sparingly for loading states to mimic terminal processing.

## 6. User Flow Highlights
- **Role Isolation:** A strict Navbar that prefixes routes dynamically based on role (`/customer/*`, `/admin/*`) ensuring users never encounter 404s for mismatched layouts.
- **Density:** Interfaces (like Admin Dashboard tables) should feel data-dense but readable, packing information tightly with thin borders and distinct typographic hierarchy rather than excessive whitespace.
