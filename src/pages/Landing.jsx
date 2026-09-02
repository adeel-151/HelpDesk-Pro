import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { LifeBuoy, Zap, Edit3, BookOpen, CheckCircle, ArrowRight } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-primary/20 selection:text-primary">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-white/70 dark:bg-slate-950/70 backdrop-blur-xl">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center space-x-2">
            <div className="bg-primary/10 text-primary p-2 rounded-xl">
              <LifeBuoy className="h-5 w-5" />
            </div>
            <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              HelpDesk Pro
            </span>
          </div>
          <nav className="flex items-center gap-4">
            <Link to="/features">
              <Button variant="ghost" className="hidden sm:flex">Features</Button>
            </Link>
            <Link to="/pricing">
              <Button variant="ghost" className="hidden sm:flex">Pricing</Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" className="hidden sm:flex mr-2">Log in</Button>
            </Link>
            <Link to="/register">
              <Button>Get Started</Button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 flex flex-col">
        {/* Hero Section */}
        <section className="relative w-full h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2850&auto=format&fit=crop" 
              alt="HelpDesk Background" 
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-slate-950/70 dark:bg-slate-950/80 backdrop-blur-[2px]"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10 text-center animate-in fade-in zoom-in-95 duration-1000 -mt-24">
            
            
            <h1 className="text-5xl md:text-6xl lg:text-8xl font-extrabold tracking-tight mb-8 text-white drop-shadow-2xl leading-[1.1]">
              Customer support, <br/>
              <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-emerald-300 bg-clip-text text-transparent">
                beautifully organized.
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-200 mb-10 max-w-3xl mx-auto font-light drop-shadow-md">
              Resolve faster. Serve better. A modern, AI-ready workspace for your entire support team. Stop managing tickets and start building relationships.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-12">
              <Link to="/register">
                <Button size="lg" className="h-16 px-12 text-lg font-semibold group bg-white text-slate-950 hover:bg-slate-200 border-0 shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_rgba(255,255,255,0.5)] hover:scale-105 transition-all duration-300">
                  Start for free
                  <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1.5 transition-transform" />
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="h-16 px-12 text-lg font-semibold bg-white/5 text-white border-white/20 hover:bg-white/10 hover:text-white backdrop-blur-md hover:scale-105 transition-all duration-300">
                  View Demo
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section (Bento Grid) */}
        <section className="py-24 bg-muted/20 border-t">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-20 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">Built for scale. Designed for speed.</h2>
              <p className="text-xl text-muted-foreground">
                A carefully crafted suite of tools that gets out of your way, letting your team focus on what matters most: your customers.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
              {/* Feature 1 (Large spans 2 cols) */}
              <div className="md:col-span-2 bg-background border p-10 flex flex-col justify-between relative overflow-hidden group hover:border-primary/50 transition-colors">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[80px] rounded-full group-hover:bg-primary/20 transition-colors"></div>
                <div className="relative z-10 max-w-md">
                  <div className="w-14 h-14 bg-primary/10 text-primary flex items-center justify-center mb-6">
                    <Zap className="h-7 w-7" />
                  </div>
                  <h3 className="text-3xl font-bold mb-4">Smart SLAs & Timers</h3>
                  <p className="text-lg text-muted-foreground">
                    Automated deadline tracking based on ticket priority. Never miss a critical issue with our built-in countdown timers and visual alerts.
                  </p>
                </div>
              </div>
              
              {/* Feature 2 (Square) */}
              <div className="bg-background border p-10 flex flex-col justify-between relative overflow-hidden group hover:border-emerald-500/50 transition-colors">
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-emerald-500/10 blur-[50px] rounded-full group-hover:bg-emerald-500/20 transition-colors"></div>
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-6">
                    <Edit3 className="h-7 w-7" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Rich Markdown</h3>
                  <p className="text-muted-foreground">
                    Format code blocks, lists, and bold text effortlessly in every reply.
                  </p>
                </div>
              </div>
              
              {/* Feature 3 (Square) */}
              <div className="bg-background border p-10 flex flex-col justify-between relative overflow-hidden group hover:border-violet-500/50 transition-colors">
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-violet-500/10 blur-[50px] rounded-full group-hover:bg-violet-500/20 transition-colors"></div>
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-violet-500/10 text-violet-500 flex items-center justify-center mb-6">
                    <BookOpen className="h-7 w-7" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Knowledge Base</h3>
                  <p className="text-muted-foreground">
                    Build a searchable Help Center that empowers customers to find answers.
                  </p>
                </div>
              </div>

              {/* Feature 4 (Large spans 2 cols) */}
              <div className="md:col-span-2 bg-slate-950 text-white border border-slate-800 p-10 flex flex-col justify-between relative overflow-hidden group">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2940&auto=format&fit=crop')] opacity-10 bg-cover bg-center mix-blend-overlay"></div>
                <div className="relative z-10 max-w-md">
                  <div className="w-14 h-14 bg-white/10 text-white flex items-center justify-center mb-6 border border-white/20 backdrop-blur-sm">
                    <CheckCircle className="h-7 w-7" />
                  </div>
                  <h3 className="text-3xl font-bold mb-4">Enterprise Grade Security</h3>
                  <p className="text-slate-400 text-lg">
                    Real-time Firebase synchronization, Bank-grade authentication, and strict Role-Based Access Control out of the box.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Metrics/Trust Section */}
        <section className="py-32 bg-background relative overflow-hidden border-y">
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-border">
              <div className="p-4">
                <div className="text-5xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-br from-foreground to-foreground/50 mb-4 tracking-tighter">99.9%</div>
                <div className="text-lg text-muted-foreground font-medium uppercase tracking-widest">Uptime</div>
              </div>
              <div className="p-4">
                <div className="text-5xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-br from-emerald-400 to-emerald-600 mb-4 tracking-tighter">10k+</div>
                <div className="text-lg text-muted-foreground font-medium uppercase tracking-widest">Tickets Resolved</div>
              </div>
              <div className="p-4">
                <div className="text-5xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-indigo-600 mb-4 tracking-tighter">&lt;2h</div>
                <div className="text-lg text-muted-foreground font-medium uppercase tracking-widest">Avg Response Time</div>
              </div>
              <div className="p-4">
                <div className="text-5xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-br from-foreground to-foreground/50 mb-4 tracking-tighter">24/7</div>
                <div className="text-lg text-muted-foreground font-medium uppercase tracking-widest">Monitoring</div>
              </div>
            </div>
          </div>
        </section>

        {/* Massive CTA Section */}
        <section className="py-32 relative overflow-hidden bg-slate-950 text-white">
          {/* Neon Glows */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-gradient-to-r from-blue-600/30 via-indigo-600/30 to-violet-600/30 blur-[100px] pointer-events-none"></div>
          
          <div className="container mx-auto px-4 max-w-4xl text-center relative z-10">
            <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tight">Ready to transform your support?</h2>
            <p className="text-2xl text-slate-300 mb-12 font-light">
              Join today and start delivering exceptional customer experiences. It takes less than 2 minutes to set up.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/register">
                <Button size="lg" className="h-16 px-12 text-xl bg-white text-slate-950 hover:bg-slate-200 border-0 shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:scale-105 transition-all">
                  Create Free Account
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      {/* Polished Footer */}
      <footer className="bg-background pt-20 pb-10 border-t">
        <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-5 gap-12 mb-16">
          <div className="col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-primary/10 text-primary p-2 rounded-none border border-primary/20">
                <LifeBuoy className="h-6 w-6" />
              </div>
              <span className="font-extrabold text-2xl tracking-tight">HelpDesk Pro</span>
            </div>
            <p className="text-base text-muted-foreground max-w-sm mb-6">
              A meticulously designed workspace for modern support teams. Build relationships, not backlogs.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-foreground tracking-tight">Product</h4>
            <ul className="space-y-4 text-muted-foreground">
              <li><Link to="/features" className="hover:text-primary transition-colors">Features</Link></li>
              <li><Link to="/pricing" className="hover:text-primary transition-colors">Pricing</Link></li>
              <li><a href="#" className="hover:text-primary transition-colors">Security</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Changelog</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-foreground tracking-tight">Resources</h4>
            <ul className="space-y-4 text-muted-foreground">
              <li><Link to="/kb" className="hover:text-primary transition-colors">Help Center</Link></li>
              <li><a href="#" className="hover:text-primary transition-colors">API Documentation</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Community</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-foreground tracking-tight">Company</h4>
            <ul className="space-y-4 text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contact Support</Link></li>
              <li><a href="#" className="hover:text-primary transition-colors">Partners</a></li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-4 pt-8 border-t flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} HelpDesk Pro. All rights reserved.</p>
          <div className="flex gap-6 mt-6 md:mt-0">
            <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-foreground transition-colors">Cookie Settings</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
