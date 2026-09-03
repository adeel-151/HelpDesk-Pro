import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Home, ArrowLeft, LifeBuoy } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Decorative glows */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-primary/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent/10 blur-[120px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 text-center max-w-lg"
      >
        <div className="flex justify-center mb-8">
          <div className="bg-primary/10 text-primary p-4 rounded-2xl">
            <LifeBuoy className="h-12 w-12" />
          </div>
        </div>

        <h1 className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-primary to-accent mb-4">
          404
        </h1>
        <h2 className="text-2xl font-bold tracking-tight mb-4">
          Page not found
        </h2>
        <p className="text-muted-foreground text-lg mb-10">
          The page you're looking for doesn't exist or has been moved. Let's
          get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button size="lg" className="h-12 px-8">
              <Home className="mr-2 h-4 w-4" /> Back to Home
            </Button>
          </Link>
          <Button
            variant="outline"
            size="lg"
            className="h-12 px-8"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
