import { LoginForm } from "@/features/auth/components/LoginForm";
import { Link, Navigate } from "react-router-dom";
import { LifeBuoy, CheckCircle } from "lucide-react";
import { useAuth } from "@/features/auth/AuthProvider";

export default function Login() {
  const { user, loading } = useAuth();

  if (!loading && user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen flex w-full font-sans selection:bg-primary/20 selection:text-primary">
      {/* Form Side */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-12 lg:px-24 xl:px-32 relative bg-background">
        
        {/* Logo */}
        <div className="absolute top-8 left-8 sm:left-12 flex items-center space-x-2">
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-primary/10 text-primary p-2 rounded-xl">
              <LifeBuoy className="h-5 w-5" />
            </div>
            <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              HelpDesk Pro
            </span>
          </Link>
        </div>

        <div className="w-full max-w-md mx-auto pt-20 pb-12">
          <LoginForm />
        </div>
        
        <div className="absolute bottom-8 left-8 sm:left-12 text-sm text-muted-foreground">
          © {new Date().getFullYear()} HelpDesk Pro. All rights reserved.
        </div>
      </div>

      {/* Cinematic Image Side */}
      <div className="hidden lg:flex flex-1 relative bg-slate-950 text-white overflow-hidden items-end p-12">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2850&auto=format&fit=crop" 
            alt="HelpDesk Background" 
            className="w-full h-full object-cover object-center opacity-40 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent"></div>
          {/* Subtle neon glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/20 blur-[100px] rounded-full z-0"></div>
        </div>
        
        <div className="relative z-10 max-w-lg pb-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <h2 className="text-4xl font-extrabold tracking-tight mb-6 leading-tight">
            Welcome back to your workspace.
          </h2>
          <p className="text-lg text-slate-300 font-light mb-8">
            Access your dashboard to manage tickets, collaborate with your team, and deliver exceptional support.
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="text-emerald-400 h-5 w-5" />
              <span className="text-slate-200">Real-time collaboration</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="text-emerald-400 h-5 w-5" />
              <span className="text-slate-200">Automated SLAs</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="text-emerald-400 h-5 w-5" />
              <span className="text-slate-200">Enterprise security</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
