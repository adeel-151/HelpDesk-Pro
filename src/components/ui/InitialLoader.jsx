import { useEffect, useState } from "react";
import { LifeBuoy } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const loadingPhrases = [
  "Initializing Workspace...",
  "Authenticating secure session...",
  "Loading dashboard...",
  "Syncing latest tickets...",
  "Preparing environment..."
];

export function InitialLoader() {
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % loadingPhrases.length);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] bg-slate-950 flex flex-col items-center justify-center overflow-hidden">
      {/* Premium Background Effects */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.3, 0.15],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/30 blur-[150px] rounded-full"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.25, 0.1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-emerald-500/20 blur-[120px] rounded-full"
        />
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center max-w-sm w-full px-6">
        {/* Animated Icon & Rings */}
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
          className="relative w-32 h-32 mb-10 flex items-center justify-center"
        >
          {/* Outer glowing ring */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border-[1.5px] border-primary/30 border-t-primary border-r-primary shadow-[0_0_30px_rgba(79,70,229,0.2)]"
          />
          {/* Inner ring counter-rotating */}
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            className="absolute inset-3 rounded-full border border-emerald-500/30 border-b-emerald-500 border-l-emerald-500"
          />
          {/* Center Icon Container */}
          <div className="bg-slate-900/80 backdrop-blur-xl p-5 rounded-3xl border border-white/10 shadow-2xl relative z-10">
            <LifeBuoy className="h-10 w-10 text-primary drop-shadow-[0_0_15px_rgba(79,70,229,0.5)]" />
          </div>
        </motion.div>

        {/* Brand Name */}
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl font-extrabold tracking-tight text-white mb-10 drop-shadow-lg"
        >
          HelpDesk <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">Pro</span>
        </motion.h2>

        {/* Glassmorphic Progress Container */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="w-full bg-slate-900/60 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.4)] relative overflow-hidden"
        >
          {/* Top edge glare highlight */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          
          <div className="h-1.5 w-full bg-slate-800/80 rounded-full overflow-hidden mb-5 border border-black/20 shadow-inner">
            <motion.div
              animate={{ 
                x: ["-100%", "100%"]
              }}
              transition={{ 
                duration: 2, 
                ease: "easeInOut", 
                repeat: Infinity 
              }}
              className="h-full w-1/2 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full"
            />
          </div>

          <div className="h-5 relative flex justify-center items-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={phraseIndex}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
                className="text-slate-400 text-sm font-medium tracking-wide absolute"
              >
                {loadingPhrases[phraseIndex]}
              </motion.p>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
