import { LoginForm } from "@/features/auth/components/LoginForm";
import { Link, Navigate } from "react-router-dom";
import { LifeBuoy, CheckCircle } from "lucide-react";
import { useAuth } from "@/features/auth/AuthProvider";

export default function Login() {
  const { user, loading, role } = useAuth();

  if (!loading && user && role) {
    return <Navigate to={`/${role}`} replace />;
  }

  return (
    <div className="min-h-screen flex w-full font-sans bg-white dark:bg-black text-black dark:text-white selection:bg-primary/20 selection:text-primary">
      {/* Form Side */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-12 lg:px-24 xl:px-32 relative bg-white dark:bg-black border-r border-black/10 dark:border-white/10">
        
        {/* Logo */}
        <div className="absolute top-8 left-8 sm:left-12 flex items-center space-x-2">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-8 h-8 border-2 border-black dark:border-white flex items-center justify-center group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-colors">
              <span className="font-black text-xs tracking-tighter">HD</span>
            </div>
            <span className="font-black text-lg tracking-[0.2em] uppercase text-black dark:text-white">
              HELPDESK
            </span>
          </Link>
        </div>

        <div className="w-full max-w-md mx-auto pt-20 pb-12">
          <LoginForm />
        </div>
        
        <div className="absolute bottom-8 left-8 sm:left-12 text-[10px] uppercase tracking-widest text-black/50 dark:text-white/50">
          // SYSTEM BUILD {new Date().getFullYear()} © HELPDESK PRO.
        </div>
      </div>

      {/* Cinematic Image Side */}
      <div className="hidden lg:flex flex-1 relative bg-black text-white overflow-hidden items-end p-12 border-l border-black/10 dark:border-white/10">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2850&auto=format&fit=crop" 
            alt="Cyber Terminal" 
            className="w-full h-full object-cover object-center opacity-40 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
          {/* Subtle neon glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/30 blur-[150px] rounded-full z-0 pointer-events-none"></div>
        </div>
        
        <div className="relative z-10 max-w-lg pb-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="inline-flex items-center border border-white/20 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white/50 mb-8 bg-white/5">
            // AUTHENTICATION PROTOCOL
          </div>
          <h2 className="text-4xl font-black tracking-[0.2em] uppercase mb-6 drop-shadow-[0_0_20px_rgba(255,255,255,0.3)] text-white">
            AUTHORIZATION REQUIRED
          </h2>
          <p className="text-xs text-white/50 uppercase tracking-widest leading-relaxed mb-8">
            Access your control panel to manage active tickets, deploy solutions, and maintain operational stability.
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-6 h-6 border border-primary flex items-center justify-center bg-primary/10 shadow-[0_0_10px_rgba(79,70,229,0.5)]">
                <CheckCircle className="text-primary h-3 w-3" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-white/80">ENCRYPTED CONNECTION</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-6 h-6 border border-primary flex items-center justify-center bg-primary/10 shadow-[0_0_10px_rgba(79,70,229,0.5)]">
                <CheckCircle className="text-primary h-3 w-3" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-white/80">BIOMETRIC READY</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-6 h-6 border border-primary flex items-center justify-center bg-primary/10 shadow-[0_0_10px_rgba(79,70,229,0.5)]">
                <CheckCircle className="text-primary h-3 w-3" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-white/80">ZERO-TRUST ARCHITECTURE</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
