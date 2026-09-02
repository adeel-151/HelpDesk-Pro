import { LifeBuoy } from "lucide-react";

export function InitialLoader() {
  return (
    <div className="fixed inset-0 z-[9999] bg-background flex flex-col items-center justify-center overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/20 blur-[120px] rounded-full z-0"></div>
      
      <div className="relative z-10 flex flex-col items-center">
        <div className="relative w-20 h-20 mb-8">
          {/* Outer spinning ring */}
          <div className="absolute inset-0 rounded-full border-t-2 border-primary animate-spin" style={{ animationDuration: '1.5s' }}></div>
          {/* Inner pulsating icon */}
          <div className="absolute inset-0 flex items-center justify-center animate-pulse">
            <div className="bg-primary/10 text-primary p-4 rounded-xl">
              <LifeBuoy className="h-8 w-8" />
            </div>
          </div>
        </div>
        
        <h2 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2 animate-pulse">
          HelpDesk Pro
        </h2>
        <p className="text-muted-foreground text-sm font-medium tracking-widest uppercase opacity-60 animate-pulse">
          Initializing Workspace
        </p>
      </div>
    </div>
  );
}
