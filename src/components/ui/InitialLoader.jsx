import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const loadingPhrases = [
  "INITIALIZING SECURE LINK...",
  "ESTABLISHING CONNECTION...",
  "SYNCING ENCRYPTED DATA...",
  "LOADING DASHBOARD...",
  "SYSTEM READY."
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
    <div className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center overflow-hidden">
      {/* Faint Cyber Glow */}
      <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
        <motion.div 
          animate={{ opacity: [0.1, 0.2, 0.1], scale: [1, 1.1, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="w-[600px] h-[600px] bg-primary/20 blur-[150px] rounded-full absolute -translate-x-20"
        />
        <motion.div 
          animate={{ opacity: [0.1, 0.2, 0.1], scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="w-[500px] h-[500px] bg-accent/20 blur-[120px] rounded-full absolute translate-x-20"
        />
      </div>

      <div className="relative z-10 flex flex-col items-center max-w-sm w-full px-6">
        
        {/* SVG Logo */}
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8"
        >
          <svg width="64" height="64" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
            <motion.path 
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
              d="M50 5 L93 25 V75 L50 95 L7 75 V25 L50 5 Z" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeOpacity="0.4"
            />
            <motion.path 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              d="M28 35 V65 M48 35 V65 M28 50 H48" 
              stroke="currentColor" 
              strokeWidth="5" 
              strokeLinecap="round"
            />
            <motion.path 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              d="M60 35 H65 C73.284 35 80 41.716 80 50 C80 58.284 73.284 65 65 65 H60 V35 Z" 
              stroke="currentColor" 
              strokeWidth="5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
            <motion.circle 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.5, type: "spring" }}
              cx="80" cy="50" r="4" fill="currentColor"
            />
          </svg>
        </motion.div>

        {/* Brand Name */}
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-2xl font-black tracking-[0.5em] text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] uppercase ml-[0.5em]"
        >
          HELPDESK
        </motion.h2>

        {/* Minimal Progress Line */}
        <motion.div 
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="w-full max-w-[200px] mt-12 mb-6"
        >
          <div className="h-[1px] w-full bg-white/10 relative overflow-hidden">
            <motion.div
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
              className="absolute top-0 bottom-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-white to-transparent"
            />
          </div>
        </motion.div>

        {/* Terminal Loading Text */}
        <div className="h-4 relative flex justify-center items-center w-full">
          <AnimatePresence mode="wait">
            <motion.p
              key={phraseIndex}
              initial={{ opacity: 0, filter: "blur(4px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(4px)" }}
              transition={{ duration: 0.3 }}
              className="text-white/50 text-[10px] font-bold tracking-[0.2em] uppercase absolute whitespace-nowrap"
            >
              {loadingPhrases[phraseIndex]}
            </motion.p>
          </AnimatePresence>
        </div>
        
      </div>
    </div>
  );
}
