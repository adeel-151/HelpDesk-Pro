import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Zap, Edit3, BookOpen, ShieldCheck, CheckCircle, Search, Clock } from "lucide-react";
import { motion } from "framer-motion";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
};

const fadeRight = {
  initial: { opacity: 0, x: -30 },
  animate: { opacity: 1, x: 0 },
};

const fadeLeft = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0 },
};

export default function Features() {
  return (
    <>
      {/* Features Hero */}
      <section className="py-24 md:py-32 bg-black text-white relative overflow-hidden border-b border-white/10">
        <div className="absolute top-0 right-0 -mr-40 -mt-40 w-[600px] h-[600px] bg-primary/20 blur-[150px] rounded-full" />
        <div className="absolute bottom-0 left-0 -ml-40 -mb-40 w-[600px] h-[600px] bg-accent/20 blur-[150px] rounded-full" />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="container mx-auto px-4 text-center relative z-10"
        >
          <div className="inline-flex items-center border border-white/20 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white/50 mb-8 bg-white/5">
            // SYSTEM.FEATURES_MATRIX
          </div>
          <h1 className="text-4xl md:text-7xl font-black tracking-[0.2em] uppercase mb-8 drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
            EVERYTHING YOU NEED.<br/>
            <span className="text-white/30">NOTHING YOU DON'T.</span>
          </h1>
          <p className="text-xs md:text-sm text-white/50 uppercase tracking-[0.2em] max-w-3xl mx-auto font-bold leading-relaxed">
            We stripped away the clutter of legacy helpdesks to bring you a lightning-fast, incredibly powerful workspace built for modern teams.
          </p>
        </motion.div>
      </section>

      {/* Core Ticket Management */}
      <section className="py-24 border-b border-white/10 bg-black">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <motion.div
              variants={fadeRight}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex-1 space-y-8"
            >
              <div className="w-16 h-16 bg-transparent border border-white/20 text-white flex items-center justify-center">
                <Clock className="h-8 w-8" />
              </div>
              <h2 className="text-2xl md:text-3xl font-black uppercase tracking-[0.2em] text-white">SMART SLAs & TIMERS</h2>
              <p className="text-sm text-white/50 tracking-widest leading-relaxed uppercase">
                Stop letting tickets slip through the cracks. Our system automatically categorizes and prioritizes issues, applying precise Service Level Agreement countdown timers based on severity.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-xs uppercase tracking-widest text-white/80"><CheckCircle className="text-primary h-5 w-5 shrink-0" /> Color-coded urgency indicators</li>
                <li className="flex items-center gap-3 text-xs uppercase tracking-widest text-white/80"><CheckCircle className="text-primary h-5 w-5 shrink-0" /> Real-time status updates</li>
                <li className="flex items-center gap-3 text-xs uppercase tracking-widest text-white/80"><CheckCircle className="text-primary h-5 w-5 shrink-0" /> One-click reassignment</li>
              </ul>
            </motion.div>
            <motion.div
              variants={fadeLeft}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex-1 w-full relative group"
            >
              <div className="absolute inset-0 bg-primary/20 blur-[50px] rounded-full" />
              <div className="relative z-10 bg-white/5 border border-white/10 p-2 overflow-hidden hover:border-white/30 transition-colors duration-500">
                <img 
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=2070&q=80" 
                  alt="Dashboard Data" 
                  className="w-full h-[350px] object-cover mix-blend-luminosity opacity-50 group-hover:opacity-80 transition-opacity duration-500"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Collaboration & Markdown */}
      <section className="py-24 border-b border-white/10 bg-black">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row-reverse gap-16 items-center">
            <motion.div
              variants={fadeLeft}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex-1 space-y-8"
            >
              <div className="w-16 h-16 bg-transparent border border-white/20 text-white flex items-center justify-center">
                <Edit3 className="h-8 w-8" />
              </div>
              <h2 className="text-2xl md:text-3xl font-black uppercase tracking-[0.2em] text-white">EXPRESSIVE COMMUNICATION</h2>
              <p className="text-sm text-white/50 tracking-widest leading-relaxed uppercase">
                Plain text isn't enough for complex technical support. Our integrated Markdown editor allows you to format code snippets, create tables, and highlight text with zero friction.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-xs uppercase tracking-widest text-white/80"><CheckCircle className="text-accent h-5 w-5 shrink-0" /> Full Markdown Support</li>
                <li className="flex items-center gap-3 text-xs uppercase tracking-widest text-white/80"><CheckCircle className="text-accent h-5 w-5 shrink-0" /> Private Internal Notes</li>
                <li className="flex items-center gap-3 text-xs uppercase tracking-widest text-white/80"><CheckCircle className="text-accent h-5 w-5 shrink-0" /> Drag-and-drop file attachments</li>
              </ul>
            </motion.div>
            <motion.div
              variants={fadeRight}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex-1 w-full bg-white/5 border border-white/10 p-8 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 blur-[50px] rounded-full" />
              <div className="space-y-3 relative z-10">
                <div className="text-[10px] font-bold text-accent uppercase tracking-[0.2em]">MARKDOWN PREVIEW</div>
                <div className="p-4 bg-black border border-white/10 font-mono text-xs text-white/70">
                  <span className="text-primary">```javascript</span><br/>
                  <span className="text-accent">function</span> resolveIssue() {'{'}<br/>
                  &nbsp;&nbsp;<span className="text-primary">return</span> <span className="text-white">"Customer Happy!"</span>;<br/>
                  {'}'}<br/>
                  <span className="text-primary">```</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Knowledge Base */}
      <section className="py-24 border-b border-white/10 bg-black">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <motion.div
              variants={fadeRight}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex-1 space-y-8"
            >
              <div className="w-16 h-16 bg-transparent border border-white/20 text-white flex items-center justify-center">
                <BookOpen className="h-8 w-8" />
              </div>
              <h2 className="text-2xl md:text-3xl font-black uppercase tracking-[0.2em] text-white">DEFLECT TICKETS</h2>
              <p className="text-sm text-white/50 tracking-widest leading-relaxed uppercase">
                The best ticket is the one that was never created. Build a searchable Knowledge Base that empowers your customers to find their own answers instantly.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-xs uppercase tracking-widest text-white/80"><CheckCircle className="text-primary h-5 w-5 shrink-0" /> Global lightning-fast search</li>
                <li className="flex items-center gap-3 text-xs uppercase tracking-widest text-white/80"><CheckCircle className="text-primary h-5 w-5 shrink-0" /> Category organization</li>
                <li className="flex items-center gap-3 text-xs uppercase tracking-widest text-white/80"><CheckCircle className="text-primary h-5 w-5 shrink-0" /> WYSIWYG Article Editor</li>
              </ul>
            </motion.div>
            <motion.div
              variants={fadeLeft}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex-1 w-full relative group"
            >
              <div className="absolute inset-0 bg-primary/10 blur-[50px] rounded-full" />
              <div className="relative z-10 bg-white/5 border border-white/10 p-2 overflow-hidden hover:border-white/30 transition-colors duration-500">
                <img 
                  src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=2070&q=80" 
                  alt="Knowledge Base" 
                  className="w-full h-[350px] object-cover mix-blend-luminosity opacity-50 group-hover:opacity-80 transition-opacity duration-500"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Security */}
      <section className="py-24 bg-black border-b border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-50" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="container mx-auto px-4 max-w-4xl text-center relative z-10"
        >
          <ShieldCheck className="h-20 w-20 mx-auto text-primary mb-8" />
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-[0.2em] mb-8 text-white">ENTERPRISE-GRADE SECURITY</h2>
          <p className="text-xs md:text-sm text-white/50 tracking-widest uppercase mb-12">
            Powered by Google's Firebase infrastructure. Military-grade encryption, real-time synchronization, and infinite scalability.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {[
              { title: "REAL-TIME SYNC", desc: "Data synchronizes instantly without page refreshes." },
              { title: "ROLE-BASED ACCESS", desc: "Strict segregation between Customers, Agents, and Admins." },
              { title: "SECURE ATTACHMENTS", desc: "Files stored securely in GCP with strict access rules." },
            ].map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="bg-white/5 border border-white/10 p-6 hover:border-primary/50 transition-colors"
              >
                <h4 className="font-bold text-sm text-white uppercase tracking-widest mb-2">{card.title}</h4>
                <p className="text-white/50 text-xs tracking-wide uppercase leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Legacy vs HelpDesk Pro */}
      <section className="py-24 bg-black border-b border-white/10">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-black uppercase tracking-[0.2em] text-white text-center mb-16"
          >
            SYSTEM COMPARISON
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid md:grid-cols-2 gap-0 border border-white/10 overflow-hidden"
          >
            <div className="p-10 bg-white/5">
              <h3 className="text-lg font-bold text-white/50 uppercase tracking-widest mb-8">LEGACY SYSTEMS</h3>
              <ul className="space-y-6">
                {["Cluttered interfaces", "Requires page reloads", "Weeks of training", "Plain text only"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-white/50 text-xs uppercase tracking-widest">
                    <div className="w-5 h-5 border border-white/20 flex items-center justify-center text-white/50 text-[10px] shrink-0">✕</div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-10 bg-primary/10 border-l border-white/10 relative">
              <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-primary/20 to-transparent pointer-events-none" />
              <h3 className="text-lg font-bold text-white uppercase tracking-widest mb-8 relative z-10">HELPDESK PRO</h3>
              <ul className="space-y-6 relative z-10">
                {["Intuitive Cyber UI", "Real-time WebSockets", "Zero training required", "Full Markdown Support"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-white text-xs uppercase tracking-widest font-bold">
                    <CheckCircle className="text-primary h-5 w-5 shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 relative overflow-hidden bg-black text-white">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-gradient-to-r from-primary/30 via-accent/30 to-primary/30 blur-[150px] pointer-events-none" />
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
          <Link to="/register">
            <Button size="lg" className="h-14 px-10 text-xs font-bold tracking-[0.2em] uppercase bg-white text-black hover:bg-white/90 border-0 shadow-[0_0_40px_rgba(255,255,255,0.4)] transition-all rounded-none">
              AUTHORIZE ACCESS
            </Button>
          </Link>
        </motion.div>
      </section>
    </>
  );
}
