import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="border-b px-6 py-4 flex items-center justify-between">
        <div className="font-bold text-xl text-primary flex items-center gap-2">
          <span className="bg-primary text-primary-foreground p-1 rounded-md">
            HP
          </span>
          HelpDesk Pro
        </div>
        <nav className="flex items-center gap-4">
          <Button variant="ghost">Features</Button>
          <Button variant="ghost">Pricing</Button>
          <Link to="/login">
            <Button>Sign In</Button>
          </Link>
        </nav>
      </header>
      
      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-5xl font-extrabold tracking-tight mb-4">
          Customer support, <span className="text-accent">organized.</span>
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
          Resolve faster. Serve better. A modern workspace for your entire support team.
        </p>
        <div className="flex gap-4">
          <Link to="/register">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Get Started
            </Button>
          </Link>
          <Button size="lg" variant="outline">
            View Demo
          </Button>
        </div>
      </main>
      
      <footer className="border-t py-6 text-center text-sm text-muted-foreground">
        © 2026 HelpDesk Pro. All rights reserved.
      </footer>
    </div>
  );
}
