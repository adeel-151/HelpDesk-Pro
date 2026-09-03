import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { LifeBuoy, Zap, Edit3, BookOpen, CheckCircle, ArrowRight, Sparkles, Shield, Globe, Users, Activity } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import ThreeHeroModels from "@/components/ui/ThreeHeroModels";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

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
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 2;
    const y = (clientY / innerHeight - 0.5) * 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const springConfig = { damping: 30, stiffness: 200, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothY, [-1, 1], [15, -15]);
  const rotateY = useTransform(smoothX, [-1, 1], [-15, 15]);
  
  const glowX = useTransform(smoothX, [-1, 1], [-300, 300]);
  const glowY = useTransform(smoothY, [-1, 1], [-300, 300]);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
    
    tl.fromTo(".hero-badge", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1 })
      .fromTo(".hero-title", { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.1 }, "-=0.8")
      .fromTo(".hero-desc", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, "-=0.8")
      .fromTo(".hero-btns", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, "-=0.8")
      .fromTo(".hero-image", { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 1.5, ease: "expo.out" }, "-=0.6");
  }, { scope: container });

  return (
    <section 
      ref={container}
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-[90vh] pt-4 pb-16 flex flex-col items-center justify-center overflow-hidden bg-background"
      style={{ perspective: 1500 }}
    >
      {/* Three.js 3D Background */}
      <ThreeHeroModels />

      {/* Cinematic Mouse Catcher Glow */}
      <motion.div
        style={{ x: glowX, y: glowY }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 blur-[160px] rounded-full pointer-events-none"
      />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      <div className="container mx-auto px-4 relative z-10 text-center flex flex-col items-center justify-center h-full mt-10">
        {/* Badge */}
        <div className="hero-badge inline-flex items-center rounded-full border border-border/50 px-4 py-1.5 text-sm font-medium bg-muted/20 text-muted-foreground backdrop-blur-md mb-6 gap-2 shadow-sm">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          Now with AI-powered smart routing
        </div>

        <h1 className="hero-title text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 text-foreground drop-shadow-sm leading-[1.1]">
          Customer support,<br/>
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            beautifully organized.
          </span>
        </h1>
        
        <p className="hero-desc text-base md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto font-light leading-relaxed">
          Resolve faster. Serve better. A modern, AI-ready workspace for your entire support team. Stop managing tickets and start building relationships.
        </p>
        
        <div className="hero-btns flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <Link to="/register">
            <Button size="lg" className="h-12 px-8 text-base font-semibold group hover:scale-[1.03] transition-all duration-300 rounded-xl shadow-lg shadow-primary/20">
              Start for free
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link to="/login">
            <Button size="lg" variant="outline" className="h-12 px-8 text-base font-semibold hover:scale-[1.03] transition-all duration-300 rounded-xl bg-background/20 backdrop-blur-md border-border/50">
              View Demo
            </Button>
          </Link>
        </div>

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

      {/* Metrics/Trust Section */}
      <section className="py-32 bg-background relative overflow-hidden border-y">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
            className="grid md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-border"
          >
            {[
              { value: "99.9%", label: "Uptime", gradient: "from-foreground to-foreground/50" },
              { value: "10k+", label: "Tickets Resolved", gradient: "from-emerald-400 to-emerald-600" },
              { value: "<2h", label: "Avg Response Time", gradient: "from-blue-400 to-indigo-600" },
              { value: "24/7", label: "Monitoring", gradient: "from-foreground to-foreground/50" },
            ].map((stat) => (
              <motion.div key={stat.label} variants={fadeUp} transition={{ duration: 0.5 }} className="p-4">
                <div className={`text-5xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-br ${stat.gradient} mb-4 tracking-tighter`}>
                  <AnimatedCounter value={stat.value} />
                </div>
                <div className="text-base text-muted-foreground font-semibold uppercase tracking-[0.15em]">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-gradient-to-r from-blue-600/30 via-indigo-600/30 to-violet-600/30 blur-[100px] pointer-events-none" />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="container mx-auto px-4 max-w-4xl text-center relative z-10"
        >
          <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tight">Ready to transform your support?</h2>
          <p className="text-xl md:text-2xl text-slate-300 mb-12 font-light">
            Join today and start delivering exceptional customer experiences. It takes less than 2 minutes to set up.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/register">
              <Button size="lg" className="h-14 px-10 text-lg bg-white text-slate-950 hover:bg-slate-100 border-0 shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:scale-[1.03] transition-all rounded-xl">
                Create Free Account
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>
    </>
  );
}
