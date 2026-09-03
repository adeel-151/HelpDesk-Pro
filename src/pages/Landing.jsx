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
      <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center z-10 flex flex-col items-center justify-center pointer-events-none px-4">
        <h1 className="hero-huge-text font-black text-4xl md:text-[7vw] text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.4)] uppercase w-full flex justify-center whitespace-nowrap">
          H E L P D E S K
        </h1>
        <p className="hero-subtext text-white/80 mt-4 tracking-[0.2em] uppercase font-bold text-[10px] md:text-sm drop-shadow-md">
          Customer support, beautifully organized.
        </p>
      </div>

      {/* Bottom Left Glassmorphic Box */}
      <div className="hero-glass-box absolute bottom-6 md:bottom-12 left-4 md:left-12 z-20 max-w-sm md:max-w-md w-[calc(100%-2rem)] md:w-auto">
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
      <section className="py-20 bg-black border-b border-white/10 relative overflow-hidden">
        {/* Ambient glow behind stats */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-5xl bg-primary/10 blur-[150px] rounded-full pointer-events-none" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center p-6 bg-white/5 border border-white/10 backdrop-blur-md"
            >
              <h3 className="text-4xl md:text-5xl font-black text-white mb-2 tracking-widest drop-shadow-[0_0_15px_rgba(79,70,229,0.5)]">99.9%</h3>
              <p className="text-xs text-white/50 font-bold uppercase tracking-[0.2em] mt-2">UPTIME</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-col items-center p-6 bg-white/5 border border-white/10 backdrop-blur-md"
            >
              <h3 className="text-4xl md:text-5xl font-black text-white mb-2 tracking-widest drop-shadow-[0_0_15px_rgba(79,70,229,0.5)]">10K+</h3>
              <p className="text-xs text-white/50 font-bold uppercase tracking-[0.2em] mt-2">RESOLVED</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col items-center p-6 bg-white/5 border border-white/10 backdrop-blur-md"
            >
              <h3 className="text-4xl md:text-5xl font-black text-white mb-2 tracking-widest drop-shadow-[0_0_15px_rgba(79,70,229,0.5)]">&lt;2H</h3>
              <p className="text-xs text-white/50 font-bold uppercase tracking-[0.2em] mt-2">RESPONSE</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col items-center p-6 bg-white/5 border border-white/10 backdrop-blur-md"
            >
              <h3 className="text-4xl md:text-5xl font-black text-white mb-2 tracking-widest drop-shadow-[0_0_15px_rgba(79,70,229,0.5)]">24/7</h3>
              <p className="text-xs text-white/50 font-bold uppercase tracking-[0.2em] mt-2">MONITORING</p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Trusted by / Social Proof */}
      <section className="py-16 border-b border-white/10 bg-black">
        <div className="container mx-auto px-4">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-xs font-bold text-white/50 uppercase tracking-[0.3em] mb-10"
          >
            TRUSTED BY LEADING SUPPORT TEAMS WORLDWIDE
          </motion.p>
          <motion.div
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6 opacity-60"
          >
            {["TECHCORP", "DATAFLOW", "CLOUDSYNC", "SECUREIO", "SCALEPRO"].map((name) => (
              <motion.div
                key={name}
                variants={fadeUp}
                className="text-xl md:text-2xl font-black tracking-widest text-white/40 hover:text-white transition-colors cursor-pointer"
              >
                {name}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section (Bento Grid) */}
      <section className="py-24 bg-black border-t border-white/10">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20 max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-[0.2em] text-white mb-6">BUILT FOR SCALE</h2>
            <p className="text-sm md:text-base text-white/50 tracking-widest uppercase">
              A carefully crafted suite of tools designed for maximum velocity.
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
            <motion.div variants={fadeUp} transition={{ duration: 0.5 }} className="md:col-span-2 bg-white/5 border border-white/10 backdrop-blur-sm p-10 flex flex-col justify-between relative overflow-hidden group hover:border-primary/50 transition-colors duration-300">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[80px] rounded-full group-hover:bg-primary/20 transition-colors duration-500" />
              <div className="relative z-10 max-w-md">
                <div className="w-14 h-14 bg-transparent border border-white/20 text-white flex items-center justify-center mb-6">
                  <Zap className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold uppercase tracking-widest text-white mb-4">SMART SLAS & TIMERS</h3>
                <p className="text-sm text-white/50 leading-relaxed">
                  Automated deadline tracking based on ticket priority. Never miss a critical issue with our built-in countdown timers and visual alerts.
                </p>
              </div>
            </motion.div>
            
            {/* Feature 2 */}
            <motion.div variants={fadeUp} transition={{ duration: 0.5 }} className="bg-white/5 border border-white/10 backdrop-blur-sm p-10 flex flex-col justify-between relative overflow-hidden group hover:border-white/30 transition-colors duration-300">
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/5 blur-[50px] rounded-full group-hover:bg-white/10 transition-colors duration-500" />
              <div className="relative z-10">
                <div className="w-14 h-14 bg-transparent border border-white/20 text-white flex items-center justify-center mb-6">
                  <Edit3 className="h-7 w-7" />
                </div>
                <h3 className="text-lg font-bold uppercase tracking-widest text-white mb-3">RICH MARKDOWN</h3>
                <p className="text-sm text-white/50 leading-relaxed">
                  Format code blocks, lists, and bold text effortlessly in every reply.
                </p>
              </div>
            </motion.div>
            
            {/* Feature 3 */}
            <motion.div variants={fadeUp} transition={{ duration: 0.5 }} className="bg-white/5 border border-white/10 backdrop-blur-sm p-10 flex flex-col justify-between relative overflow-hidden group hover:border-white/30 transition-colors duration-300">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/5 blur-[50px] rounded-full group-hover:bg-white/10 transition-colors duration-500" />
              <div className="relative z-10">
                <div className="w-14 h-14 bg-transparent border border-white/20 text-white flex items-center justify-center mb-6">
                  <BookOpen className="h-7 w-7" />
                </div>
                <h3 className="text-lg font-bold uppercase tracking-widest text-white mb-3">KNOWLEDGE BASE</h3>
                <p className="text-sm text-white/50 leading-relaxed">
                  Build a searchable Help Center that empowers customers to find answers.
                </p>
              </div>
            </motion.div>

            {/* Feature 4 (Large spans 2 cols) */}
            <motion.div variants={fadeUp} transition={{ duration: 0.5 }} className="md:col-span-2 bg-white/5 border border-white/10 backdrop-blur-sm p-10 flex flex-col justify-between relative overflow-hidden group hover:border-accent/50 transition-colors duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-50 group-hover:opacity-80 transition-opacity duration-500" />
              <div className="relative z-10 max-w-md">
                <div className="w-14 h-14 bg-transparent border border-white/20 text-white flex items-center justify-center mb-6">
                  <CheckCircle className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold uppercase tracking-widest text-white mb-4">ENTERPRISE SECURITY</h3>
                <p className="text-sm text-white/50 leading-relaxed">
                  Real-time synchronization, advanced encryption, and strict Role-Based Access Control out of the box.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Workflow Section */}
      <section className="py-32 bg-black border-t border-white/10 relative overflow-hidden">
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="text-center mb-24">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-[0.2em] text-white mb-6">SEAMLESS WORKFLOW</h2>
            <p className="text-sm md:text-base text-white/50 tracking-widest uppercase max-w-2xl mx-auto">
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
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-transparent border border-white/20 mb-6 ${step.align === 'left' ? 'mx-auto md:mx-0' : 'mx-auto md:ml-auto md:mr-0'}`}>
                    {step.icon}
                  </div>
                  <h3 className="text-2xl font-bold uppercase tracking-widest text-white mb-4">{step.title}</h3>
                  <p className="text-sm text-white/50 leading-relaxed">{step.desc}</p>
                </div>
                <div className="flex-1 w-full relative">
                  <div className="aspect-[4/3] bg-white/5 border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)] relative overflow-hidden backdrop-blur-sm group hover:border-white/30 transition-colors duration-500">
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-accent/10 opacity-50 group-hover:opacity-80 transition-opacity" />
                    <div className="absolute inset-0 flex items-center justify-center text-white/30 font-bold uppercase tracking-[0.2em] text-sm">
                      [ INTERACTIVE UI MOCKUP ]
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Wall of Love (Testimonials) */}
      <section className="py-32 bg-black border-t border-white/10 relative overflow-hidden">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-[0.2em] text-white mb-6">WALL OF LOVE</h2>
            <p className="text-sm md:text-base text-white/50 tracking-widest uppercase max-w-2xl mx-auto">
              Don't just take our word for it. See what top support teams are saying about HelpDesk.
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
                className="break-inside-avoid bg-white/5 border border-white/10 p-8 hover:border-primary/50 transition-colors duration-300 group"
              >
                <div className="flex text-primary mb-4">
                  {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-current drop-shadow-[0_0_5px_rgba(79,70,229,0.8)]" />)}
                </div>
                <p className="text-white/80 text-sm mb-6 leading-relaxed uppercase tracking-wide">"{review.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gradient-to-tr from-primary to-accent border border-white/20" />
                  <div>
                    <h4 className="font-bold text-white uppercase tracking-wider text-xs">{review.author}</h4>
                    <p className="text-[10px] text-white/50 uppercase tracking-[0.2em]">{review.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-32 bg-black border-t border-white/10 relative overflow-hidden">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-24">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-[0.2em] text-white mb-6">TRANSPARENT PRICING</h2>
            <p className="text-sm md:text-base text-white/50 tracking-widest uppercase max-w-2xl mx-auto">
              No hidden fees. Choose the tier that fits your operational capacity.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Starter Plan */}
            <div className="bg-white/5 border border-white/10 p-8 flex flex-col hover:border-white/30 transition-colors duration-300">
              <h3 className="text-xl font-bold uppercase tracking-widest text-white mb-2">STARTER</h3>
              <p className="text-xs text-white/50 uppercase tracking-widest mb-6 leading-relaxed">Perfect for small teams getting started.</p>
              <div className="mb-8">
                <span className="text-5xl font-black text-white">$29</span>
                <span className="text-xs text-white/50 uppercase tracking-widest ml-2">/MO PER AGENT</span>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                {["Up to 3 agents", "Basic reporting", "Email support", "Standard knowledge base"].map((feat, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-white/50" />
                    <span className="text-sm text-white/80 uppercase tracking-wide">{feat}</span>
                  </li>
                ))}
              </ul>
              <Button variant="outline" className="w-full h-12 rounded-none text-xs font-bold uppercase tracking-widest bg-transparent text-white border-white/20 hover:bg-white/10 hover:text-white">INITIATE</Button>
            </div>

            {/* Pro Plan */}
            <div className="bg-white/5 border border-primary relative p-8 flex flex-col shadow-[0_0_50px_rgba(79,70,229,0.15)] md:-translate-y-4 group">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white px-4 py-1 text-[10px] font-bold uppercase tracking-widest border border-primary">
                MOST POPULAR
              </div>
              <h3 className="text-xl font-bold uppercase tracking-widest text-white mb-2">PROFESSIONAL</h3>
              <p className="text-xs text-white/50 uppercase tracking-widest mb-6 leading-relaxed">For growing teams that need more power.</p>
              <div className="mb-8">
                <span className="text-5xl font-black text-white drop-shadow-[0_0_15px_rgba(79,70,229,0.5)]">$79</span>
                <span className="text-xs text-white/50 uppercase tracking-widest ml-2">/MO PER AGENT</span>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                {["Unlimited agents", "Advanced AI routing", "Custom domains", "24/7 Priority support", "Custom workflows"].map((feat, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-primary drop-shadow-[0_0_5px_rgba(79,70,229,0.8)]" />
                    <span className="text-sm text-white/80 uppercase tracking-wide">{feat}</span>
                  </li>
                ))}
              </ul>
              <Button className="w-full h-12 rounded-none text-xs font-bold uppercase tracking-widest bg-primary text-white hover:bg-primary/90 shadow-[0_0_20px_rgba(79,70,229,0.4)]">START FREE TRIAL</Button>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-white/5 border border-white/10 p-8 flex flex-col hover:border-white/30 transition-colors duration-300">
              <h3 className="text-xl font-bold uppercase tracking-widest text-white mb-2">ENTERPRISE</h3>
              <p className="text-xs text-white/50 uppercase tracking-widest mb-6 leading-relaxed">Advanced security and custom deployments.</p>
              <div className="mb-8">
                <span className="text-3xl font-black text-white uppercase tracking-widest mt-2 block">CUSTOM</span>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                {["Dedicated success manager", "SSO & SAML", "SLA guarantees", "On-premise deployment options"].map((feat, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-white/50" />
                    <span className="text-sm text-white/80 uppercase tracking-wide">{feat}</span>
                  </li>
                ))}
              </ul>
              <Button variant="outline" className="w-full h-12 rounded-none text-xs font-bold uppercase tracking-widest bg-transparent text-white border-white/20 hover:bg-white/10 hover:text-white">CONTACT COMMS</Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 bg-black border-t border-white/10 relative overflow-hidden">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-[0.2em] text-white mb-6">SYSTEM INQUIRIES</h2>
          </div>
          
          <div className="space-y-4">
            {[
              { q: "How long does it take to migrate?", a: "Migrations are typically executed in under 24 hours. Our automated processes handle data imports from legacy systems." },
              { q: "Is there an evaluation period?", a: "Yes, a 14-day full access trial is available on the Professional tier. No payment data required." },
              { q: "Which external protocols are supported?", a: "Native integrations exist for Slack, Jira, Salesforce, Stripe, and a robust REST API for custom links." },
              { q: "Can we modify the knowledge base UI?", a: "Full CSS and HTML overrides are supported, along with domain mapping for complete brand alignment." }
            ].map((faq, i) => {
              const [isOpen, setIsOpen] = useState(false);
              return (
                <div key={i} className="bg-white/5 border border-white/10 overflow-hidden">
                  <button 
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-white/10 transition-colors"
                  >
                    <span className="font-bold text-sm uppercase tracking-widest text-white/90">{faq.q}</span>
                    {isOpen ? <Minus className="w-5 h-5 text-white/50 flex-shrink-0" /> : <Plus className="w-5 h-5 text-white/50 flex-shrink-0" />}
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="px-6 pb-6 text-xs text-white/50 uppercase tracking-widest leading-relaxed"
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
      <section className="py-32 relative overflow-hidden bg-black border-t border-white/10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 blur-[150px] pointer-events-none" />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="container mx-auto px-4 max-w-4xl text-center relative z-10"
        >
          <h2 className="text-4xl md:text-7xl font-black mb-8 tracking-[0.2em] uppercase text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">INITIATE SEQUENCE</h2>
          <p className="text-xs md:text-sm text-white/50 uppercase tracking-[0.3em] mb-12 font-bold">
            System ready for immediate deployment. Access granted in under 2 minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/register">
              <Button size="lg" className="h-14 px-10 text-xs font-bold tracking-[0.2em] uppercase bg-white text-black hover:bg-white/90 border-0 shadow-[0_0_40px_rgba(255,255,255,0.4)] transition-all rounded-none">
                AUTHORIZE ACCESS
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>
    </>
  );
}
