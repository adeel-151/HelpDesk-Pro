import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { LifeBuoy, Mail, MessageSquare, MapPin, Send, CheckCircle2 } from "lucide-react";

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate network request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

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
              <Button variant="ghost" className="hidden sm:flex">Pricing</Button>
            </Link>
            <Link to="/contact">
              <Button variant="ghost" className="hidden sm:flex text-primary bg-primary/5 font-semibold">Contact</Button>
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
        {/* Contact Hero */}
        <section className="py-24 bg-slate-950 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-40 -mt-40 w-[600px] h-[600px] bg-primary/20 blur-[150px] rounded-full"></div>
          
          <div className="container mx-auto px-4 text-center relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 drop-shadow-lg">
              Get in touch
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
              Whether you have a question about features, trials, pricing, need a demo, or anything else, our team is ready to answer all your questions.
            </p>
          </div>
        </section>

        {/* Contact Methods Grid */}
        <section className="py-16 bg-background relative -mt-8 z-20">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="grid md:grid-cols-3 gap-6 items-stretch">
              
              <div className="bg-background border rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow text-center">
                <div className="w-14 h-14 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <MessageSquare className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">Chat to Sales</h3>
                <p className="text-muted-foreground text-sm mb-6">Speak to our friendly team about custom plans or enterprise deals.</p>
                <a href="mailto:sales@helpdeskpro.com" className="font-semibold text-primary hover:underline">sales@helpdeskpro.com</a>
              </div>

              <div className="bg-background border rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow text-center">
                <div className="w-14 h-14 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <LifeBuoy className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">Support</h3>
                <p className="text-muted-foreground text-sm mb-6">Need technical help? We're here to assist you 24/7.</p>
                <a href="mailto:support@helpdeskpro.com" className="font-semibold text-emerald-600 hover:underline">support@helpdeskpro.com</a>
              </div>

              <div className="bg-background border rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow text-center">
                <div className="w-14 h-14 bg-violet-500/10 text-violet-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MapPin className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">Visit Us</h3>
                <p className="text-muted-foreground text-sm mb-6">Visit our headquarters in San Francisco.</p>
                <p className="font-semibold text-violet-600">100 Market St, SF, CA</p>
              </div>

            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-24 bg-muted/20 border-t">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="bg-background border rounded-3xl p-8 md:p-12 shadow-xl relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 rounded-full blur-[40px]"></div>
              <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-emerald-500/10 rounded-full blur-[40px]"></div>

              <div className="relative z-10">
                {isSubmitted ? (
                  <div className="text-center py-16 animate-in fade-in zoom-in duration-500">
                    <div className="w-20 h-20 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 className="h-10 w-10" />
                    </div>
                    <h3 className="text-3xl font-bold mb-4">Message Sent!</h3>
                    <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
                      Thanks for reaching out. Our team will get back to you within 24 hours.
                    </p>
                    <Button onClick={() => setIsSubmitted(false)} variant="outline">
                      Send another message
                    </Button>
                  </div>
                ) : (
                  <>
                    <div className="text-center mb-10">
                      <h2 className="text-3xl font-bold mb-4">Send us a message</h2>
                      <p className="text-muted-foreground">Fill out the form below and we'll get back to you shortly.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">First Name</label>
                          <input required type="text" className="w-full bg-background border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow" placeholder="Jane" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Last Name</label>
                          <input required type="text" className="w-full bg-background border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow" placeholder="Doe" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Email Address</label>
                        <input required type="email" className="w-full bg-background border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow" placeholder="jane@company.com" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Subject</label>
                        <select required className="w-full bg-background border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow">
                          <option value="">Select a topic...</option>
                          <option value="sales">Sales Inquiry</option>
                          <option value="support">Technical Support</option>
                          <option value="billing">Billing Question</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Message</label>
                        <textarea required rows={5} className="w-full bg-background border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow resize-none" placeholder="How can we help you?"></textarea>
                      </div>
                      <Button type="submit" disabled={isSubmitting} className="w-full h-14 text-lg">
                        {isSubmitting ? "Sending..." : (
                          <>
                            Send Message <Send className="ml-2 h-5 w-5" />
                          </>
                        )}
                      </Button>
                    </form>
                  </>
                )}
              </div>
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
