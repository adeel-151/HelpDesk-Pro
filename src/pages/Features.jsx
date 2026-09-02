import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { LifeBuoy, Zap, Edit3, BookOpen, ShieldCheck, CheckCircle, Search, MessageSquare, Clock } from "lucide-react";

export default function Features() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-primary/20 selection:text-primary">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-white/70 dark:bg-slate-950/70 backdrop-blur-xl">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-primary/10 text-primary p-2 rounded-xl">
              <LifeBuoy className="h-5 w-5" />
            </div>
            <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              HelpDesk Pro
            </span>
          </Link>
          <nav className="flex items-center gap-4">
            <Link to="/features">
              <Button variant="ghost" className="hidden sm:flex text-primary bg-primary/5 font-semibold">Features</Button>
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
        {/* Features Hero */}
        <section className="py-24 md:py-32 bg-slate-950 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-40 -mt-40 w-[600px] h-[600px] bg-primary/20 blur-[150px] rounded-full"></div>
          <div className="absolute bottom-0 left-0 -ml-40 -mb-40 w-[600px] h-[600px] bg-emerald-500/20 blur-[150px] rounded-full"></div>
          
          <div className="container mx-auto px-4 text-center relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="inline-flex items-center rounded-full border border-primary/30 px-3 py-1 text-sm font-semibold bg-primary/10 text-primary-foreground mb-8">
              Explore Our Platform
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 drop-shadow-lg">
              Everything you need.<br/>
              <span className="text-slate-400">Nothing you don't.</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto font-light leading-relaxed">
              We stripped away the clutter of legacy helpdesks to bring you a lightning-fast, incredibly powerful workspace built for modern teams.
            </p>
          </div>
        </section>

        {/* Core Ticket Management */}
        <section className="py-24 border-b bg-background">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex flex-col md:flex-row gap-16 items-center">
              <div className="flex-1 space-y-8">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center rounded-2xl">
                  <Clock className="h-8 w-8" />
                </div>
                <h2 className="text-4xl font-bold tracking-tight">Smart Ticket Management & SLAs</h2>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Stop letting tickets slip through the cracks. Our system automatically categorizes and prioritizes issues, applying precise Service Level Agreement (SLA) countdown timers based on severity.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3 text-lg"><CheckCircle className="text-primary h-6 w-6" /> Color-coded urgency indicators</li>
                  <li className="flex items-center gap-3 text-lg"><CheckCircle className="text-primary h-6 w-6" /> Real-time status updates</li>
                  <li className="flex items-center gap-3 text-lg"><CheckCircle className="text-primary h-6 w-6" /> One-click reassignment</li>
                </ul>
              </div>
              <div className="flex-1 w-full bg-slate-100 dark:bg-slate-900 rounded-3xl p-8 border shadow-inner">
                {/* Visual Placeholder */}
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-background p-4 rounded-xl shadow-sm border border-border/50 flex justify-between items-center">
                      <div>
                        <div className="h-4 w-32 bg-muted rounded mb-2"></div>
                        <div className="h-3 w-48 bg-muted/50 rounded"></div>
                      </div>
                      <div className="text-xs font-bold text-red-500 bg-red-500/10 px-2 py-1 rounded">2h 14m left</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Collaboration & Markdown */}
        <section className="py-24 border-b bg-muted/20">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex flex-col md:flex-row-reverse gap-16 items-center">
              <div className="flex-1 space-y-8">
                <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center rounded-2xl">
                  <Edit3 className="h-8 w-8" />
                </div>
                <h2 className="text-4xl font-bold tracking-tight">Expressive Communication</h2>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Plain text isn't enough for complex technical support. Our integrated Markdown editor allows you to format code snippets, create tables, and highlight text with zero friction.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3 text-lg"><CheckCircle className="text-emerald-500 h-6 w-6" /> Full Markdown Support</li>
                  <li className="flex items-center gap-3 text-lg"><CheckCircle className="text-emerald-500 h-6 w-6" /> Private Internal Notes</li>
                  <li className="flex items-center gap-3 text-lg"><CheckCircle className="text-emerald-500 h-6 w-6" /> Drag-and-drop file attachments</li>
                </ul>
              </div>
              <div className="flex-1 w-full bg-background rounded-3xl p-8 border shadow-lg border-emerald-500/20 relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-[50px] rounded-full"></div>
                 <div className="space-y-3 relative z-10">
                   <div className="text-sm font-bold text-emerald-500">MARKDOWN PREVIEW</div>
                   <div className="p-4 bg-muted/50 rounded-xl font-mono text-sm border">
                     <span className="text-blue-500">```javascript</span><br/>
                     <span className="text-purple-500">function</span> resolveIssue() {'{'}<br/>
                     &nbsp;&nbsp;<span className="text-emerald-500">return</span> <span className="text-amber-500">"Customer Happy!"</span>;<br/>
                     {'}'}<br/>
                     <span className="text-blue-500">```</span>
                   </div>
                 </div>
              </div>
            </div>
          </div>
        </section>

        {/* Knowledge Base */}
        <section className="py-24 border-b bg-background">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex flex-col md:flex-row gap-16 items-center">
              <div className="flex-1 space-y-8">
                <div className="w-16 h-16 bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 flex items-center justify-center rounded-2xl">
                  <BookOpen className="h-8 w-8" />
                </div>
                <h2 className="text-4xl font-bold tracking-tight">Deflect tickets with self-service</h2>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  The best ticket is the one that was never created. Build a beautiful, searchable Knowledge Base that empowers your customers to find their own answers instantly.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3 text-lg"><CheckCircle className="text-violet-500 h-6 w-6" /> Global lightning-fast search</li>
                  <li className="flex items-center gap-3 text-lg"><CheckCircle className="text-violet-500 h-6 w-6" /> Category organization</li>
                  <li className="flex items-center gap-3 text-lg"><CheckCircle className="text-violet-500 h-6 w-6" /> WYSIWYG Article Editor</li>
                </ul>
              </div>
              <div className="flex-1 w-full bg-slate-100 dark:bg-slate-900 rounded-3xl p-8 border shadow-inner">
                <div className="bg-background rounded-full px-4 py-3 flex items-center gap-3 border shadow-sm mb-6">
                  <Search className="text-muted-foreground h-5 w-5" />
                  <span className="text-muted-foreground font-medium">How to reset my password...</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-background p-4 rounded-xl border">
                    <div className="h-3 w-24 bg-violet-500/20 rounded mb-2"></div>
                    <div className="h-2 w-full bg-muted rounded"></div>
                  </div>
                  <div className="bg-background p-4 rounded-xl border">
                    <div className="h-3 w-20 bg-blue-500/20 rounded mb-2"></div>
                    <div className="h-2 w-full bg-muted rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Security / Enterprise */}
        <section className="py-24 bg-slate-950 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2940&auto=format&fit=crop')] opacity-10 bg-cover bg-center"></div>
          <div className="container mx-auto px-4 max-w-4xl text-center relative z-10">
            <ShieldCheck className="h-20 w-20 mx-auto text-emerald-400 mb-8" />
            <h2 className="text-4xl md:text-5xl font-bold mb-8">Enterprise-Grade Architecture</h2>
            <p className="text-xl text-slate-300 mb-12">
              HelpDesk Pro is powered by Google's Firebase infrastructure. That means military-grade encryption, real-time database synchronization across all devices, and an architecture that scales infinitely as your company grows.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
               <div className="bg-slate-900/80 backdrop-blur p-6 rounded-2xl border border-slate-800">
                 <h4 className="font-bold text-lg mb-2">Real-time Sync</h4>
                 <p className="text-slate-400 text-sm">When a ticket updates, everyone sees it instantly. No page refreshes required.</p>
               </div>
               <div className="bg-slate-900/80 backdrop-blur p-6 rounded-2xl border border-slate-800">
                 <h4 className="font-bold text-lg mb-2">Role-Based Access</h4>
                 <p className="text-slate-400 text-sm">Strict segregation between Customers, Agents, and Administrators.</p>
               </div>
               <div className="bg-slate-900/80 backdrop-blur p-6 rounded-2xl border border-slate-800">
                 <h4 className="font-bold text-lg mb-2">Secure Attachments</h4>
                 <p className="text-slate-400 text-sm">Files are stored securely in Google Cloud Storage with strict access rules.</p>
               </div>
            </div>
          </div>
        </section>

        {/* Checklist vs Legacy */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-4xl font-bold text-center mb-16">Why switch to HelpDesk Pro?</h2>
            
            <div className="grid md:grid-cols-2 gap-0 border rounded-3xl overflow-hidden shadow-xl">
              <div className="p-10 bg-slate-50 dark:bg-slate-900/50">
                <h3 className="text-2xl font-bold text-slate-500 mb-8">Legacy Helpdesks</h3>
                <ul className="space-y-6">
                  <li className="flex items-center gap-3 text-slate-500"><div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center text-red-500 font-bold text-xs">✕</div> Cluttered, confusing interfaces</li>
                  <li className="flex items-center gap-3 text-slate-500"><div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center text-red-500 font-bold text-xs">✕</div> Requires page reloads for updates</li>
                  <li className="flex items-center gap-3 text-slate-500"><div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center text-red-500 font-bold text-xs">✕</div> Weeks of training required</li>
                  <li className="flex items-center gap-3 text-slate-500"><div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center text-red-500 font-bold text-xs">✕</div> Plain text only</li>
                </ul>
              </div>
              <div className="p-10 bg-primary/5 border-l border-primary/20 relative">
                <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-primary/10 to-transparent pointer-events-none"></div>
                <h3 className="text-2xl font-bold text-primary mb-8 relative z-10">HelpDesk Pro</h3>
                <ul className="space-y-6 relative z-10">
                  <li className="flex items-center gap-3 font-medium"><CheckCircle className="text-primary h-6 w-6" /> Beautiful, intuitive UI</li>
                  <li className="flex items-center gap-3 font-medium"><CheckCircle className="text-primary h-6 w-6" /> Real-time WebSockets sync</li>
                  <li className="flex items-center gap-3 font-medium"><CheckCircle className="text-primary h-6 w-6" /> Zero training required</li>
                  <li className="flex items-center gap-3 font-medium"><CheckCircle className="text-primary h-6 w-6" /> Full Markdown Support</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Massive CTA Section */}
        <section className="py-32 relative overflow-hidden bg-slate-950 text-white">
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

      {/* Footer */}
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
              <li><a href="#" className="hover:text-primary transition-colors">Contact Support</a></li>
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
