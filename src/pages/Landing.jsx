import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { LifeBuoy, Zap, Edit3, BookOpen, CheckCircle, ArrowRight, Sparkles, Shield, Globe, Users } from "lucide-react";
import { motion } from "framer-motion";

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

export default function Landing() {
  return (
    <>
      {/* Hero Section — Pure CSS gradient, no external images */}
      <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden bg-slate-950">
        {/* Animated gradient orbs */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/30 blur-[180px] rounded-full animate-pulse" style={{ animationDuration: '4s' }} />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent/25 blur-[150px] rounded-full animate-pulse" style={{ animationDuration: '6s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-emerald-500/15 blur-[120px] rounded-full animate-pulse" style={{ animationDuration: '5s' }} />
        </div>

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="container mx-auto px-4 relative z-10 text-center -mt-16"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center rounded-full border border-white/10 px-4 py-1.5 text-sm font-medium bg-white/5 text-white/80 backdrop-blur-md mb-8 gap-2"
          >
            <Sparkles className="h-3.5 w-3.5 text-amber-400" />
            Now with AI-powered smart routing
          </motion.div>

          <h1 className="text-5xl md:text-6xl lg:text-8xl font-extrabold tracking-tight mb-8 text-white drop-shadow-2xl leading-[1.08]">
            Customer support,<br/>
            <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-emerald-300 bg-clip-text text-transparent">
              beautifully organized.
            </span>
          </h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-lg md:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto font-light drop-shadow-md leading-relaxed"
          >
            Resolve faster. Serve better. A modern, AI-ready workspace for your entire support team. Stop managing tickets and start building relationships.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-5 justify-center items-center mb-16"
          >
            <Link to="/register">
              <Button size="lg" className="h-14 px-10 text-lg font-semibold group bg-white text-slate-950 hover:bg-slate-100 border-0 shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:shadow-[0_0_60px_rgba(255,255,255,0.4)] hover:scale-[1.03] transition-all duration-300 rounded-xl">
                Start for free
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="h-14 px-10 text-lg font-semibold bg-white/5 text-white border-white/15 hover:bg-white/10 hover:text-white backdrop-blur-md hover:scale-[1.03] transition-all duration-300 rounded-xl">
                View Demo
              </Button>
            </Link>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1, type: "spring", bounce: 0.3 }}
            className="mx-auto max-w-5xl relative rounded-2xl p-2 bg-white/5 border border-white/10 backdrop-blur-sm"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-10 rounded-2xl" />
            <img 
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=2070&q=80" 
              alt="Professional dashboard interface preview" 
              className="rounded-xl object-cover w-full h-[350px] md:h-[500px] shadow-2xl"
            />
          </motion.div>
        </motion.div>
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
