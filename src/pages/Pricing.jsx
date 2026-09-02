import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { LifeBuoy, CheckCircle, HelpCircle, XCircle } from "lucide-react";

export default function Pricing() {
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
              <Button variant="ghost" className="hidden sm:flex">Features</Button>
            </Link>
            <Link to="/pricing">
              <Button variant="ghost" className="hidden sm:flex text-primary bg-primary/5 font-semibold">Pricing</Button>
            </Link>
            <Link to="/contact">
              <Button variant="ghost" className="hidden sm:flex">Contact</Button>
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
        {/* Pricing Hero */}
        <section className="py-24 md:py-32 bg-slate-950 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-40 -mt-40 w-[600px] h-[600px] bg-primary/20 blur-[150px] rounded-full"></div>
          <div className="absolute bottom-0 left-0 -ml-40 -mb-40 w-[600px] h-[600px] bg-emerald-500/20 blur-[150px] rounded-full"></div>
          
          <div className="container mx-auto px-4 text-center relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="inline-flex items-center rounded-full border border-primary/30 px-3 py-1 text-sm font-semibold bg-primary/10 text-primary-foreground mb-8">
              Simple & Transparent Pricing
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 drop-shadow-lg">
              Plans that scale with <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">your growing team.</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto font-light leading-relaxed">
              No hidden fees. No surprise charges. Choose the plan that fits your needs and start supporting your customers better today.
            </p>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-24 bg-background relative -mt-12 z-20">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid md:grid-cols-3 gap-8 items-start">
              
              {/* Starter Plan */}
              <div className="bg-background border rounded-3xl p-8 shadow-sm">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-2">Starter</h3>
                  <p className="text-muted-foreground text-sm">Perfect for small teams just getting started with customer support.</p>
                </div>
                <div className="mb-8">
                  <span className="text-5xl font-black">$0</span>
                  <span className="text-muted-foreground">/mo</span>
                </div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-3"><CheckCircle className="text-primary h-5 w-5" /> Up to 3 Agents</li>
                  <li className="flex items-center gap-3"><CheckCircle className="text-primary h-5 w-5" /> 500 Tickets/month</li>
                  <li className="flex items-center gap-3"><CheckCircle className="text-primary h-5 w-5" /> Basic Markdown Support</li>
                  <li className="flex items-center gap-3 text-muted-foreground"><XCircle className="h-5 w-5 opacity-50" /> No Knowledge Base</li>
                  <li className="flex items-center gap-3 text-muted-foreground"><XCircle className="h-5 w-5 opacity-50" /> No Custom SLAs</li>
                </ul>
                <Link to="/register">
                  <Button variant="outline" className="w-full h-12 text-lg">Get Started Free</Button>
                </Link>
              </div>

              {/* Pro Plan */}
              <div className="bg-slate-950 text-white border-2 border-primary rounded-3xl p-8 shadow-[0_0_40px_rgba(79,70,229,0.2)] transform md:-translate-y-4 relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-bold tracking-wider uppercase">
                  Most Popular
                </div>
                <div className="mb-8 mt-2">
                  <h3 className="text-2xl font-bold mb-2">Professional</h3>
                  <p className="text-slate-400 text-sm">Everything you need to scale your support operations globally.</p>
                </div>
                <div className="mb-8">
                  <span className="text-5xl font-black">$49</span>
                  <span className="text-slate-400">/mo per agent</span>
                </div>
                <ul className="space-y-4 mb-8 text-slate-200">
                  <li className="flex items-center gap-3"><CheckCircle className="text-emerald-400 h-5 w-5" /> Unlimited Agents</li>
                  <li className="flex items-center gap-3"><CheckCircle className="text-emerald-400 h-5 w-5" /> Unlimited Tickets</li>
                  <li className="flex items-center gap-3"><CheckCircle className="text-emerald-400 h-5 w-5" /> Smart SLAs & Timers</li>
                  <li className="flex items-center gap-3"><CheckCircle className="text-emerald-400 h-5 w-5" /> Full Knowledge Base</li>
                  <li className="flex items-center gap-3"><CheckCircle className="text-emerald-400 h-5 w-5" /> Role-based Access Control</li>
                </ul>
                <Link to="/register">
                  <Button className="w-full h-12 text-lg bg-white text-slate-950 hover:bg-slate-200 shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                    Start 14-Day Free Trial
                  </Button>
                </Link>
              </div>

              {/* Enterprise Plan */}
              <div className="bg-background border rounded-3xl p-8 shadow-sm">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
                  <p className="text-muted-foreground text-sm">Advanced security, custom integrations, and dedicated support.</p>
                </div>
                <div className="mb-8">
                  <span className="text-5xl font-black">Custom</span>
                </div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-3"><CheckCircle className="text-primary h-5 w-5" /> Everything in Professional</li>
                  <li className="flex items-center gap-3"><CheckCircle className="text-primary h-5 w-5" /> Dedicated Account Manager</li>
                  <li className="flex items-center gap-3"><CheckCircle className="text-primary h-5 w-5" /> Custom Domain for KB</li>
                  <li className="flex items-center gap-3"><CheckCircle className="text-primary h-5 w-5" /> SSO / SAML Authentication</li>
                  <li className="flex items-center gap-3"><CheckCircle className="text-primary h-5 w-5" /> 99.99% Uptime SLA</li>
                </ul>
                <Button variant="outline" className="w-full h-12 text-lg">Contact Sales</Button>
              </div>

            </div>
          </div>
        </section>

        {/* Feature Comparison Table */}
        <section className="py-24 bg-muted/20 border-t border-b">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-3xl font-bold text-center mb-16">Compare Plans in Detail</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr>
                    <th className="py-6 px-4 border-b font-bold text-lg w-2/5">Features</th>
                    <th className="py-6 px-4 border-b font-bold text-lg text-center w-1/5">Starter</th>
                    <th className="py-6 px-4 border-b font-bold text-lg text-center w-1/5 text-primary">Professional</th>
                    <th className="py-6 px-4 border-b font-bold text-lg text-center w-1/5">Enterprise</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr>
                    <td className="py-4 px-4 text-muted-foreground">Agents Included</td>
                    <td className="py-4 px-4 text-center font-medium">3</td>
                    <td className="py-4 px-4 text-center font-medium">Unlimited</td>
                    <td className="py-4 px-4 text-center font-medium">Unlimited</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 text-muted-foreground">Ticket Volume</td>
                    <td className="py-4 px-4 text-center font-medium">500 / month</td>
                    <td className="py-4 px-4 text-center font-medium">Unlimited</td>
                    <td className="py-4 px-4 text-center font-medium">Unlimited</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 text-muted-foreground">Markdown Support</td>
                    <td className="py-4 px-4 text-center"><CheckCircle className="h-5 w-5 mx-auto text-primary" /></td>
                    <td className="py-4 px-4 text-center"><CheckCircle className="h-5 w-5 mx-auto text-primary" /></td>
                    <td className="py-4 px-4 text-center"><CheckCircle className="h-5 w-5 mx-auto text-primary" /></td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 text-muted-foreground">Knowledge Base</td>
                    <td className="py-4 px-4 text-center text-muted-foreground">-</td>
                    <td className="py-4 px-4 text-center"><CheckCircle className="h-5 w-5 mx-auto text-primary" /></td>
                    <td className="py-4 px-4 text-center"><CheckCircle className="h-5 w-5 mx-auto text-primary" /></td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 text-muted-foreground">Smart SLAs & Routing</td>
                    <td className="py-4 px-4 text-center text-muted-foreground">-</td>
                    <td className="py-4 px-4 text-center"><CheckCircle className="h-5 w-5 mx-auto text-primary" /></td>
                    <td className="py-4 px-4 text-center"><CheckCircle className="h-5 w-5 mx-auto text-primary" /></td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 text-muted-foreground">SSO / SAML</td>
                    <td className="py-4 px-4 text-center text-muted-foreground">-</td>
                    <td className="py-4 px-4 text-center text-muted-foreground">-</td>
                    <td className="py-4 px-4 text-center"><CheckCircle className="h-5 w-5 mx-auto text-primary" /></td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 text-muted-foreground">Support Level</td>
                    <td className="py-4 px-4 text-center font-medium">Community</td>
                    <td className="py-4 px-4 text-center font-medium">Priority Email</td>
                    <td className="py-4 px-4 text-center font-medium">24/7 Phone + Email</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-3xl font-bold text-center mb-16">Frequently Asked Questions</h2>
            <div className="space-y-8">
              <div className="bg-muted/30 p-6 rounded-2xl border">
                <h3 className="font-bold text-lg mb-2 flex items-center gap-2"><HelpCircle className="h-5 w-5 text-primary" /> Do you offer a free trial?</h3>
                <p className="text-muted-foreground">Yes! You can try the Professional plan completely free for 14 days. No credit card required. If you decide not to upgrade, you will automatically be downgraded to the free Starter plan.</p>
              </div>
              <div className="bg-muted/30 p-6 rounded-2xl border">
                <h3 className="font-bold text-lg mb-2 flex items-center gap-2"><HelpCircle className="h-5 w-5 text-primary" /> Can I cancel my subscription at any time?</h3>
                <p className="text-muted-foreground">Absolutely. We don't believe in lock-in contracts. You can cancel your subscription at any time from your billing dashboard, and you won't be charged again.</p>
              </div>
              <div className="bg-muted/30 p-6 rounded-2xl border">
                <h3 className="font-bold text-lg mb-2 flex items-center gap-2"><HelpCircle className="h-5 w-5 text-primary" /> What happens if I go over my ticket limit on the Starter plan?</h3>
                <p className="text-muted-foreground">We will gently notify you when you approach your 500 ticket limit. If you exceed it, new tickets will still be collected but you won't be able to reply to them until the next billing cycle or until you upgrade to Professional.</p>
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
                  Start your free trial
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
