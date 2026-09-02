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
            <Button variant="ghost" className="hidden sm:flex">Features</Button>
            <Button variant="ghost" className="hidden sm:flex">Pricing</Button>
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
        <section className="relative overflow-hidden pt-24 pb-32 lg:pt-36 lg:pb-40">
          <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left z-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary/10 text-primary mb-6">
                ✨ v2.0 Now Live
              </div>
              <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1]">
                Customer support, <br/>
                <span className="bg-gradient-to-r from-primary via-indigo-500 to-accent bg-clip-text text-transparent">
                  beautifully organized.
                </span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0">
                Resolve faster. Serve better. A modern, AI-ready workspace for your entire support team. Stop managing tickets and start building relationships.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/register">
                  <Button size="lg" className="h-12 px-8 text-base group">
                    Start for free
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/login">
                  <Button size="lg" variant="outline" className="h-12 px-8 text-base">
                    View Demo
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="flex-1 w-full max-w-2xl lg:max-w-none relative z-10 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-150">
              <div className="relative rounded-2xl border bg-background/50 shadow-2xl overflow-hidden backdrop-blur-sm ring-1 ring-border/50">
                <div className="absolute top-0 w-full h-12 bg-muted/50 border-b flex items-center px-4 gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                </div>
                <img 
                  src="https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2850&auto=format&fit=crop" 
                  alt="Dashboard Preview" 
                  className="w-full h-auto object-cover mt-12 border-t opacity-90 hover:opacity-100 transition-opacity"
                />
              </div>
              
              {/* Decorative blur elements */}
              <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/20 blur-[100px] rounded-full z-[-1]"></div>
              <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-accent/20 blur-[100px] rounded-full z-[-1]"></div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 bg-muted/30 border-y">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold tracking-tight mb-4">Everything you need to scale support</h2>
              <p className="text-lg text-muted-foreground">
                We've built a comprehensive suite of tools designed to help your team resolve issues faster and keep your customers happy.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-background rounded-2xl p-8 border shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-6">
                  <Zap className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">Smart SLAs</h3>
                <p className="text-muted-foreground">
                  Automated deadline tracking based on ticket priority. Never miss a critical issue with our built-in countdown timers and visual alerts.
                </p>
              </div>
              
              {/* Feature 2 */}
              <div className="bg-background rounded-2xl p-8 border shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-6">
                  <Edit3 className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">Rich Text Editor</h3>
                <p className="text-muted-foreground">
                  Communicate clearly using full Markdown support. Format code blocks, lists, and bold text effortlessly in every reply.
                </p>
              </div>
              
              {/* Feature 3 */}
              <div className="bg-background rounded-2xl p-8 border shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 flex items-center justify-center mb-6">
                  <BookOpen className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">Knowledge Base</h3>
                <p className="text-muted-foreground">
                  Deflect tickets before they are created. Build a searchable, structured Help Center that empowers customers to find their own answers.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Metrics/Trust Section */}
        <section className="py-24 bg-slate-950 text-slate-50 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2940&auto=format&fit=crop')] opacity-10 bg-cover bg-center"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                  Trusted by fast-growing teams worldwide.
                </h2>
                <p className="text-slate-400 text-lg mb-8">
                  Our platform is designed for reliability and speed, processing thousands of requests daily without breaking a sweat.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="text-emerald-400 h-6 w-6" />
                    <span>Real-time Firebase Synchronization</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="text-emerald-400 h-6 w-6" />
                    <span>Bank-grade Authentication Security</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="text-emerald-400 h-6 w-6" />
                    <span>Role-Based Access Control</span>
                  </li>
                </ul>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-slate-900/80 backdrop-blur p-6 rounded-2xl border border-slate-800">
                  <div className="text-4xl font-black text-white mb-2">99.9%</div>
                  <div className="text-slate-400 font-medium">Uptime Guarantee</div>
                </div>
                <div className="bg-slate-900/80 backdrop-blur p-6 rounded-2xl border border-slate-800">
                  <div className="text-4xl font-black text-white mb-2">10k+</div>
                  <div className="text-slate-400 font-medium">Tickets Resolved</div>
                </div>
                <div className="bg-slate-900/80 backdrop-blur p-6 rounded-2xl border border-slate-800">
                  <div className="text-4xl font-black text-white mb-2">&lt;2h</div>
                  <div className="text-slate-400 font-medium">Avg Response Time</div>
                </div>
                <div className="bg-slate-900/80 backdrop-blur p-6 rounded-2xl border border-slate-800">
                  <div className="text-4xl font-black text-white mb-2">24/7</div>
                  <div className="text-slate-400 font-medium">System Monitoring</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 text-center">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-4xl font-bold mb-6">Ready to transform your support?</h2>
            <p className="text-xl text-muted-foreground mb-10">
              Join today and start delivering exceptional customer experiences. It takes less than 2 minutes to set up.
            </p>
            <Link to="/register">
              <Button size="lg" className="h-14 px-10 text-lg">
                Create your free account
              </Button>
            </Link>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="border-t bg-muted/20 py-12">
        <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <div className="bg-primary/10 text-primary p-1.5 rounded-lg">
                <LifeBuoy className="h-4 w-4" />
              </div>
              <span className="font-bold text-lg tracking-tight">HelpDesk Pro</span>
            </div>
            <p className="text-sm text-muted-foreground">
              A modern workspace for your entire support team.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Security</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link to="/kb" className="hover:text-primary transition-colors">Help Center</Link></li>
              <li><a href="#" className="hover:text-primary transition-colors">API Docs</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-4 border-t pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} HelpDesk Pro. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Cookies</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
