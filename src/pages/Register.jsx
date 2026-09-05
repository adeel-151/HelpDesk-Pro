import { RegisterForm } from "@/features/auth/components/RegisterForm";
import { Link, Navigate } from "react-router-dom";
import { LifeBuoy, ShieldCheck, Zap } from "lucide-react";
import { useAuth } from "@/features/auth/AuthProvider";

export default function Register() {
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
          <RegisterForm />
        </div>
        
        <div className="absolute bottom-8 left-8 sm:left-12 text-[10px] uppercase tracking-widest text-black/50 dark:text-white/50 hidden sm:block">
          // SYSTEM BUILD {new Date().getFullYear()} © HELPDESK PRO.
        </div>
      </div>

      {/* Cinematic Image Side */}
      <div className="hidden lg:flex flex-1 relative bg-black text-white overflow-hidden items-end p-12 border-l border-black/10 dark:border-white/10">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2940&auto=format&fit=crop" 
            alt="Cyber Terminal" 
            className="w-full h-full object-cover object-center opacity-40 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
          {/* Subtle neon glow */}
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent/30 blur-[150px] rounded-full z-0 pointer-events-none"></div>
        </div>
        
        <div className="relative z-10 max-w-lg pb-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="inline-flex items-center border border-white/20 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white/50 mb-8 bg-white/5">
            // NEW OPERATIVE REGISTRATION
          </div>
          <h2 className="text-4xl font-black tracking-[0.2em] uppercase mb-6 drop-shadow-[0_0_20px_rgba(255,255,255,0.3)] text-white">
            INITIALIZE WORKSPACE
          </h2>
          <p className="text-xs text-white/50 uppercase tracking-widest leading-relaxed mb-10">
            Join thousands of active operatives who have switched to HelpDesk Pro for faster resolutions and encrypted data storage.
          </p>
          
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white/5 border border-white/10 p-6 hover:border-primary/50 transition-colors">
              <div className="w-8 h-8 border border-primary text-primary flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(79,70,229,0.3)]">
                <Zap className="h-4 w-4" />
              </div>
              <h4 className="font-bold text-xs uppercase tracking-widest mb-2 text-white">RAPID DEPLOYMENT</h4>
              <p className="text-white/50 text-[10px] uppercase tracking-wider leading-relaxed">No complex training required. You'll be online instantly.</p>
            </div>
            <div className="bg-white/5 border border-white/10 p-6 hover:border-accent/50 transition-colors">
              <div className="w-8 h-8 border border-accent text-accent flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <h4 className="font-bold text-xs uppercase tracking-widest mb-2 text-white">SECURE BY DEFAULT</h4>
              <p className="text-white/50 text-[10px] uppercase tracking-wider leading-relaxed">Backed by Google's infrastructure and strict access controls.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
