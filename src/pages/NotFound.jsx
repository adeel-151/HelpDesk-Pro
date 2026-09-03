import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Home, ArrowLeft, TerminalSquare } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Decorative glows */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-primary/20 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent/20 blur-[120px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 text-center max-w-lg bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 p-12"
      >
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 border border-primary text-primary flex items-center justify-center bg-primary/10 shadow-[0_0_20px_rgba(79,70,229,0.3)]">
            <TerminalSquare className="h-8 w-8" />
          </div>
        </div>

        <div className="inline-flex items-center border border-black/20 dark:border-white/20 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-black/50 dark:text-white/50 mb-6 bg-black/5 dark:bg-white/5">
          // SYSTEM.ERROR
        </div>

        <h1 className="text-6xl md:text-8xl font-black tracking-[0.2em] uppercase text-black dark:text-white mb-4 drop-shadow-[0_0_20px_rgba(0,0,0,0.1)] dark:drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
          404
        </h1>
        <h2 className="text-xl md:text-2xl font-bold tracking-[0.1em] uppercase mb-4 text-black/90 dark:text-white/90">
          SECTOR NOT FOUND
        </h2>
        <p className="text-xs text-black/50 dark:text-white/50 uppercase tracking-widest leading-relaxed mb-10">
          The coordinates you specified do not exist within our current infrastructure. Return to active sectors or recalibrate your query.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button className="h-12 px-8 rounded-none text-xs font-bold uppercase tracking-widest bg-primary text-white hover:bg-primary/90 shadow-[0_0_20px_rgba(79,70,229,0.4)] transition-all">
              <Home className="mr-3 h-4 w-4" /> MAIN HUB
            </Button>
          </Link>
          <Button
            variant="outline"
            className="h-12 px-8 rounded-none text-xs font-bold uppercase tracking-widest bg-transparent text-black dark:text-white border-black/20 dark:border-white/20 hover:bg-black/10 dark:hover:bg-white/10"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="mr-3 h-4 w-4" /> REVERT
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
