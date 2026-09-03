import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { LifeBuoy, Zap, Edit3, BookOpen, CheckCircle, ArrowRight, Sparkles, Shield, Globe, Users, Activity, Star, MessageSquare, Plus, Minus, Check } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import ThreeHeroModels from "@/components/ui/ThreeHeroModels";
import heroImg from "@/assets/hero.jpg";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

function AnimatedCounter({ value, suffix = "", prefix = "" }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="inline-block"
    >
      {prefix}{value}{suffix}
    </motion.span>
  );
}

function CinematicHero() {
  const container = useRef();
  
  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
    
    tl.fromTo(".hero-bg-img", { scale: 1.1, opacity: 0 }, { scale: 1, opacity: 1, duration: 2, ease: "power2.out" })
      .fromTo(".hero-huge-text", { letterSpacing: "1em", opacity: 0 }, { letterSpacing: "0.2em", opacity: 1, duration: 1.5 }, "-=1.5")
      .fromTo(".hero-subtext", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, "-=1")
      .fromTo(".hero-glass-box", { x: -50, opacity: 0 }, { x: 0, opacity: 1, duration: 1 }, "-=0.8")
      .fromTo(".hero-side-elements", { opacity: 0 }, { opacity: 1, duration: 1 }, "-=0.5");
  }, { scope: container });

  return (
    <section 
      ref={container}
      className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-black"
    >
      {/* Background Image */}
      <div 
        className="hero-bg-img absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImg})` }}
      />
      
      {/* Subtle overlay for text readability */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Massive Center Typography */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center z-10 flex flex-col items-center justify-center pointer-events-none">
        <h1 className="hero-huge-text font-black text-5xl md:text-[8vw] text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.4)] uppercase w-full flex justify-center whitespace-nowrap">
          H E L P D E S K
        </h1>
        <p className="hero-subtext text-white/80 mt-4 tracking-[0.2em] uppercase font-bold text-xs md:text-sm drop-shadow-md">
          Customer support, beautifully organized.
        </p>
      </div>

      {/* Bottom Left Glassmorphic Box */}
      <div className="hero-glass-box absolute bottom-12 md:bottom-24 left-6 md:left-16 z-20 max-w-sm">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 md:p-8 relative overflow-hidden group hover:bg-white/15 transition-colors duration-500">
          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary to-accent" />
          
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center flex-shrink-0 group-hover:border-white transition-colors cursor-pointer">
              <div className="w-0 h-0 border-t-4 border-t-transparent border-l-6 border-l-white border-b-4 border-b-transparent ml-1" />
            </div>
            <div>
              <h3 className="text-white font-bold text-xs uppercase tracking-widest mb-2">SMART RESOLUTION</h3>
              <p className="text-white/70 text-xs leading-relaxed">
                Resolve faster. Serve better. A modern, AI-ready workspace for your entire support team. Stop managing tickets and start building relationships.
              </p>
            </div>
          </div>
          
          <div className="flex gap-4 mt-6">
            <Link to="/register" className="w-full">
              <Button className="w-full bg-white text-black hover:bg-white/90 font-bold uppercase tracking-widest text-xs h-10 rounded-none">
                Start for free
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Right Navigation Dots */}
      <div className="hero-side-elements absolute right-6 md:right-12 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-20">
        {[1, 2, 3, 4, 5].map((dot, i) => (
          <div 
            key={i} 
            className={`w-1.5 h-1.5 rounded-full border border-white/50 ${i === 2 ? 'bg-white' : 'bg-transparent cursor-pointer hover:bg-white/50'} transition-colors`}
          />
        ))}
      </div>

      {/* Bottom Right Social Links */}
      <div className="hero-side-elements absolute bottom-12 md:bottom-24 right-6 md:right-12 flex gap-6 z-20">
        {["IN", "TW", "YT"].map((social) => (
          <a key={social} href="#" className="text-white/60 hover:text-white font-bold text-xs tracking-widest transition-colors">
            {social}
          </a>
        ))}
      </div>
    </section>
  );
}

export default function Landing() {
  return (
    <>
      <CinematicHero />

      {/* Premium Stats Section */}
      <section className="py-20 bg-background border-b border-border/50 relative overflow-hidden">
        {/* Ambient glow behind stats */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-5xl bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center"
            >
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 border border-primary/20">
                <Activity className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-4xl md:text-5xl font-black text-foreground mb-2 tracking-tighter drop-shadow-sm">99.9%</h3>
              <p className="text-sm text-muted-foreground font-bold uppercase tracking-[0.1em]">Uptime</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-col items-center"
            >
              <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center mb-4 border border-accent/20">
                <CheckCircle className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-4xl md:text-5xl font-black text-foreground mb-2 tracking-tighter drop-shadow-sm">10k+</h3>
              <p className="text-sm text-muted-foreground font-bold uppercase tracking-[0.1em]">Tickets Resolved</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col items-center"
            >
              <div className="h-12 w-12 rounded-full bg-emerald-500/10 flex items-center justify-center mb-4 border border-emerald-500/20">
                <Zap className="h-6 w-6 text-emerald-500" />
              </div>
              <h3 className="text-4xl md:text-5xl font-black text-foreground mb-2 tracking-tighter drop-shadow-sm">&lt;2h</h3>
              <p className="text-sm text-muted-foreground font-bold uppercase tracking-[0.1em]">Avg Response Time</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col items-center"
            >
              <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center mb-4 border border-blue-500/20">
                <Shield className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="text-4xl md:text-5xl font-black text-foreground mb-2 tracking-tighter drop-shadow-sm">24/7</h3>
              <p className="text-sm text-muted-foreground font-bold uppercase tracking-[0.1em]">Monitoring</p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Trusted by / Social Proof */}
      <section className="py-16 border-b bg-background">
        <div className="container mx-auto px-4">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-sm font-semibold text-muted-foreground uppercase tracking-[0.2em] mb-10"
          >
            Trusted by leading support teams worldwide
          </motion.p>
          <motion.div
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6 opacity-40"
          >
            {["TechCorp", "DataFlow", "CloudSync", "SecureIO", "ScalePro"].map((name) => (
              <motion.div
                key={name}
                variants={fadeUp}
                className="text-xl md:text-2xl font-black tracking-tight text-foreground"
              >
                {name}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section (Bento Grid) */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20 max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">Built for scale. Designed for speed.</h2>
            <p className="text-xl text-muted-foreground">
              A carefully crafted suite of tools that gets out of your way, letting your team focus on what matters most: your customers.
            </p>
          </motion.div>
          
          <motion.div
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-5 auto-rows-[280px]"
          >
            {/* Feature 1 (Large spans 2 cols) */}
            <motion.div variants={fadeUp} transition={{ duration: 0.5 }} className="md:col-span-2 bg-background border rounded-2xl p-10 flex flex-col justify-between relative overflow-hidden group hover:border-primary/50 hover:shadow-lg transition-all duration-300">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[80px] rounded-full group-hover:bg-primary/15 transition-colors duration-500" />
              <div className="relative z-10 max-w-md">
                <div className="w-14 h-14 bg-primary/10 text-primary flex items-center justify-center rounded-xl mb-6">
                  <Zap className="h-7 w-7" />
                </div>
                <h3 className="text-3xl font-bold mb-4">Smart SLAs & Timers</h3>
                <p className="text-lg text-muted-foreground">
                  Automated deadline tracking based on ticket priority. Never miss a critical issue with our built-in countdown timers and visual alerts.
                </p>
              </div>
            </motion.div>
            
            {/* Feature 2 */}
            <motion.div variants={fadeUp} transition={{ duration: 0.5 }} className="bg-background border rounded-2xl p-10 flex flex-col justify-between relative overflow-hidden group hover:border-emerald-500/50 hover:shadow-lg transition-all duration-300">
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-emerald-500/10 blur-[50px] rounded-full group-hover:bg-emerald-500/20 transition-colors duration-500" />
              <div className="relative z-10">
                <div className="w-14 h-14 bg-emerald-500/10 text-emerald-500 flex items-center justify-center rounded-xl mb-6">
                  <Edit3 className="h-7 w-7" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Rich Markdown</h3>
                <p className="text-muted-foreground">
                  Format code blocks, lists, and bold text effortlessly in every reply.
                </p>
              </div>
            </motion.div>
            
            {/* Feature 3 */}
            <motion.div variants={fadeUp} transition={{ duration: 0.5 }} className="bg-background border rounded-2xl p-10 flex flex-col justify-between relative overflow-hidden group hover:border-violet-500/50 hover:shadow-lg transition-all duration-300">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-violet-500/10 blur-[50px] rounded-full group-hover:bg-violet-500/20 transition-colors duration-500" />
              <div className="relative z-10">
                <div className="w-14 h-14 bg-violet-500/10 text-violet-500 flex items-center justify-center rounded-xl mb-6">
                  <BookOpen className="h-7 w-7" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Knowledge Base</h3>
                <p className="text-muted-foreground">
                  Build a searchable Help Center that empowers customers to find answers.
                </p>
              </div>
            </motion.div>

            {/* Feature 4 (Large spans 2 cols) */}
            <motion.div variants={fadeUp} transition={{ duration: 0.5 }} className="md:col-span-2 bg-slate-950 text-white border border-slate-800 rounded-2xl p-10 flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-emerald-500/10 opacity-50 group-hover:opacity-80 transition-opacity duration-500" />
              <div className="relative z-10 max-w-md">
                <div className="w-14 h-14 bg-white/10 text-white flex items-center justify-center rounded-xl mb-6 border border-white/20 backdrop-blur-sm">
                  <CheckCircle className="h-7 w-7" />
                </div>
                <h3 className="text-3xl font-bold mb-4">Enterprise Grade Security</h3>
                <p className="text-slate-400 text-lg">
                  Real-time Firebase synchronization, Bank-grade authentication, and strict Role-Based Access Control out of the box.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Workflow Section */}
      <section className="py-32 bg-background relative overflow-hidden">
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">Seamless Workflow</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We've designed every interaction to save you seconds. Over thousands of tickets, those seconds turn into weeks of saved time.
            </p>
          </div>

          <div className="space-y-32">
            {[
              {
                title: "AI-Powered Triage",
                desc: "Incoming tickets are instantly analyzed, categorized, and routed to the most capable agent based on their skill set and current load.",
                icon: <Zap className="h-8 w-8 text-primary" />,
                align: "left"
              },
              {
                title: "Collaborative Resolution",
                desc: "Agents can whisper to each other internally, share context, and escalate without the customer ever seeing the internal mess.",
                icon: <Users className="h-8 w-8 text-accent" />,
                align: "right"
              },
              {
                title: "One-Click Responses",
                desc: "Access your entire knowledge base directly from the composer. Insert canned responses and articles with a single keystroke.",
                icon: <MessageSquare className="h-8 w-8 text-emerald-500" />,
                align: "left"
              }
            ].map((step, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7 }}
                className={`flex flex-col ${step.align === 'left' ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 md:gap-24`}
              >
                <div className="flex-1 text-center md:text-left">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-muted/50 border mb-6 ${step.align === 'left' ? 'mx-auto md:mx-0' : 'mx-auto md:ml-auto md:mr-0'}`}>
                    {step.icon}
                  </div>
                  <h3 className="text-3xl font-bold mb-4">{step.title}</h3>
                  <p className="text-xl text-muted-foreground leading-relaxed">{step.desc}</p>
                </div>
                <div className="flex-1 w-full relative">
                  <div className="aspect-[4/3] rounded-2xl bg-muted/20 border border-border/50 shadow-2xl relative overflow-hidden backdrop-blur-sm">
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-accent/5" />
                    <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/30 font-medium text-lg">
                      [ Interactive UI Mockup ]
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Wall of Love (Testimonials) */}
      <section className="py-32 bg-muted/20 border-y relative overflow-hidden">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">Wall of Love</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Don't just take our word for it. See what top support teams are saying about HelpDesk Pro.
            </p>
          </div>

          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {[
              { text: "This platform completely changed how we handle customer requests. The AI routing alone saved us 20 hours a week.", author: "Sarah J.", role: "Head of Support" },
              { text: "Incredibly fast and beautifully designed. My agents actually enjoy logging in every morning.", author: "Mike T.", role: "Operations Lead" },
              { text: "We migrated from Zendesk and haven't looked back. The real-time collaboration features are unmatched.", author: "Elena R.", role: "Customer Success Manager" },
              { text: "The cleanest UI I have ever seen in a B2B product. It just gets out of your way.", author: "David K.", role: "Founder & CEO" },
              { text: "Support response times dropped by 40% in the first month. The canned responses feature is a lifesaver.", author: "Jessica W.", role: "Support Specialist" },
              { text: "Finally, a helpdesk that feels like it was built in this decade. Absolutely phenomenal.", author: "Alex M.", role: "CTO" }
            ].map((review, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="break-inside-avoid bg-background border rounded-2xl p-8 hover:shadow-xl hover:border-primary/30 transition-all duration-300"
              >
                <div className="flex text-amber-400 mb-4">
                  {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-foreground/90 text-lg mb-6 leading-relaxed">"{review.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-accent" />
                  <div>
                    <h4 className="font-bold text-foreground">{review.author}</h4>
                    <p className="text-sm text-muted-foreground">{review.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-32 bg-background relative overflow-hidden">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">Simple, transparent pricing</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              No hidden fees. No surprise charges. Choose the plan that best fits your team's needs.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Starter Plan */}
            <div className="bg-background border rounded-3xl p-8 flex flex-col hover:border-foreground/20 transition-all duration-300">
              <h3 className="text-2xl font-bold mb-2">Starter</h3>
              <p className="text-muted-foreground mb-6">Perfect for small teams getting started.</p>
              <div className="mb-8">
                <span className="text-5xl font-black">$29</span>
                <span className="text-muted-foreground">/mo per agent</span>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                {["Up to 3 agents", "Basic reporting", "Email support", "Standard knowledge base"].map((feat, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-emerald-500" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
              <Button variant="outline" className="w-full h-12 rounded-xl text-base">Get Started</Button>
            </div>

            {/* Pro Plan */}
            <div className="bg-background border border-primary relative rounded-3xl p-8 flex flex-col shadow-[0_0_50px_rgba(6,182,212,0.15)] md:-translate-y-4">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider">
                Most Popular
              </div>
              <h3 className="text-2xl font-bold mb-2">Professional</h3>
              <p className="text-muted-foreground mb-6">For growing teams that need more power.</p>
              <div className="mb-8">
                <span className="text-5xl font-black">$79</span>
                <span className="text-muted-foreground">/mo per agent</span>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                {["Unlimited agents", "Advanced AI routing", "Custom domains", "24/7 Priority support", "Custom workflows"].map((feat, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-primary" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
              <Button className="w-full h-12 rounded-xl text-base shadow-lg shadow-primary/25 hover:scale-[1.02] transition-transform">Start Free Trial</Button>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-background border rounded-3xl p-8 flex flex-col hover:border-foreground/20 transition-all duration-300">
              <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
              <p className="text-muted-foreground mb-6">Advanced security and custom deployments.</p>
              <div className="mb-8">
                <span className="text-5xl font-black">Custom</span>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                {["Dedicated success manager", "SSO & SAML", "SLA guarantees", "On-premise deployment options"].map((feat, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-emerald-500" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
              <Button variant="outline" className="w-full h-12 rounded-xl text-base">Contact Sales</Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 bg-muted/20 border-t relative overflow-hidden">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">Frequently Asked Questions</h2>
          </div>
          
          <div className="space-y-4">
            {[
              { q: "How long does it take to migrate from another helpdesk?", a: "Most migrations take less than 24 hours. Our dedicated onboarding team handles the entire data import process from Zendesk, Intercom, or Freshdesk." },
              { q: "Do you offer a free trial?", a: "Yes, we offer a fully-featured 14-day free trial on our Professional plan. No credit card required." },
              { q: "What integrations do you support?", a: "We integrate with Slack, Jira, Salesforce, Stripe, Shopify, and over 1,000 other tools via Zapier. We also provide a robust REST API." },
              { q: "Can I customize the look of the knowledge base?", a: "Absolutely. You have full control over CSS, HTML, and domain mapping to ensure the help center perfectly matches your brand." }
            ].map((faq, i) => {
              const [isOpen, setIsOpen] = useState(false);
              return (
                <div key={i} className="bg-background border rounded-2xl overflow-hidden">
                  <button 
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-muted/30 transition-colors"
                  >
                    <span className="font-bold text-lg">{faq.q}</span>
                    {isOpen ? <Minus className="w-5 h-5 text-muted-foreground flex-shrink-0" /> : <Plus className="w-5 h-5 text-muted-foreground flex-shrink-0" />}
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="px-6 pb-6 text-muted-foreground"
                      >
                        {faq.a}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden bg-foreground text-background">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-gradient-to-r from-primary/30 via-accent/30 to-primary/30 blur-[100px] pointer-events-none" />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="container mx-auto px-4 max-w-4xl text-center relative z-10"
        >
          <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tight">Ready to transform your support?</h2>
          <p className="text-xl md:text-2xl text-background/70 mb-12 font-light">
            Join today and start delivering exceptional customer experiences. It takes less than 2 minutes to set up.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/register">
              <Button size="lg" className="h-14 px-10 text-lg bg-background text-foreground hover:bg-background/90 border-0 shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:scale-[1.03] transition-all rounded-xl">
                Create Free Account
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>
    </>
  );
}
