import { RegisterForm } from "@/features/auth/components/RegisterForm";
import { Link, Navigate } from "react-router-dom";
import { LifeBuoy, ShieldCheck, Zap } from "lucide-react";
import { useAuth } from "@/features/auth/AuthProvider";

export default function Register() {
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
          <RegisterForm />
        </div>
        
        <div className="absolute bottom-8 left-8 sm:left-12 text-sm text-muted-foreground hidden sm:block">
          © {new Date().getFullYear()} HelpDesk Pro. All rights reserved.
        </div>
      </div>

      {/* Cinematic Image Side */}
      <div className="hidden lg:flex flex-1 relative bg-slate-950 text-white overflow-hidden items-end p-12">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2940&auto=format&fit=crop" 
            alt="HelpDesk Background" 
            className="w-full h-full object-cover object-center opacity-40 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent"></div>
          {/* Subtle neon glow */}
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-emerald-500/20 blur-[150px] rounded-full z-0 pointer-events-none"></div>
        </div>
        
        <div className="relative z-10 max-w-lg pb-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <h2 className="text-4xl font-extrabold tracking-tight mb-6 leading-tight">
            Start delivering better support today.
          </h2>
          <p className="text-lg text-slate-300 font-light mb-10">
            Join thousands of modern teams who have switched to HelpDesk Pro for faster resolutions and happier customers.
          </p>
          
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800 p-6 rounded-2xl">
              <div className="w-10 h-10 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mb-4">
                <Zap className="h-5 w-5" />
              </div>
              <h4 className="font-bold mb-2">Set up in minutes</h4>
              <p className="text-slate-400 text-sm">No complex training required. You'll be up and running instantly.</p>
            </div>
            <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800 p-6 rounded-2xl">
              <div className="w-10 h-10 bg-blue-500/20 text-blue-400 rounded-full flex items-center justify-center mb-4">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h4 className="font-bold mb-2">Secure by default</h4>
              <p className="text-slate-400 text-sm">Backed by Google's infrastructure and strict access controls.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
