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
      <section className="py-24 md:py-32 bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-40 -mt-40 w-[600px] h-[600px] bg-primary/20 blur-[150px] rounded-full" />
        <div className="absolute bottom-0 left-0 -ml-40 -mb-40 w-[600px] h-[600px] bg-emerald-500/20 blur-[150px] rounded-full" />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="container mx-auto px-4 text-center relative z-10"
        >
          <div className="inline-flex items-center rounded-full border border-primary/30 px-4 py-1.5 text-sm font-semibold bg-primary/10 text-primary-foreground mb-8">
            Explore Our Platform
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 drop-shadow-lg">
            Everything you need.<br/>
            <span className="text-slate-400">Nothing you don't.</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto font-light leading-relaxed">
            We stripped away the clutter of legacy helpdesks to bring you a lightning-fast, incredibly powerful workspace built for modern teams.
          </p>
        </motion.div>
      </section>

      {/* Core Ticket Management */}
      <section className="py-24 border-b bg-background">
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
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center rounded-2xl">
                <Clock className="h-8 w-8" />
              </div>
              <h2 className="text-4xl font-bold tracking-tight">Smart Ticket Management & SLAs</h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Stop letting tickets slip through the cracks. Our system automatically categorizes and prioritizes issues, applying precise Service Level Agreement (SLA) countdown timers based on severity.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-lg"><CheckCircle className="text-primary h-6 w-6 shrink-0" /> Color-coded urgency indicators</li>
                <li className="flex items-center gap-3 text-lg"><CheckCircle className="text-primary h-6 w-6 shrink-0" /> Real-time status updates</li>
                <li className="flex items-center gap-3 text-lg"><CheckCircle className="text-primary h-6 w-6 shrink-0" /> One-click reassignment</li>
              </ul>
            </motion.div>
            <motion.div
              variants={fadeLeft}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex-1 w-full bg-slate-100 dark:bg-slate-900 rounded-2xl p-8 border shadow-inner"
            >
              <div className="space-y-4">
                {[
                  { color: "text-red-500 bg-red-500/10", time: "2h 14m left" },
                  { color: "text-amber-500 bg-amber-500/10", time: "8h 30m left" },
                  { color: "text-emerald-500 bg-emerald-500/10", time: "2d left" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.15 }}
                    className="bg-background p-4 rounded-xl shadow-sm border border-border/50 flex justify-between items-center hover:shadow-md transition-shadow"
                  >
                    <div>
                      <div className="h-4 w-32 bg-muted rounded mb-2" />
                      <div className="h-3 w-48 bg-muted/50 rounded" />
                    </div>
                    <div className={`text-xs font-bold ${item.color} px-3 py-1 rounded-full`}>{item.time}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Collaboration & Markdown */}
      <section className="py-24 border-b bg-muted/20">
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
              <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center rounded-2xl">
                <Edit3 className="h-8 w-8" />
              </div>
              <h2 className="text-4xl font-bold tracking-tight">Expressive Communication</h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Plain text isn't enough for complex technical support. Our integrated Markdown editor allows you to format code snippets, create tables, and highlight text with zero friction.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-lg"><CheckCircle className="text-emerald-500 h-6 w-6 shrink-0" /> Full Markdown Support</li>
                <li className="flex items-center gap-3 text-lg"><CheckCircle className="text-emerald-500 h-6 w-6 shrink-0" /> Private Internal Notes</li>
                <li className="flex items-center gap-3 text-lg"><CheckCircle className="text-emerald-500 h-6 w-6 shrink-0" /> Drag-and-drop file attachments</li>
              </ul>
            </motion.div>
            <motion.div
              variants={fadeRight}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex-1 w-full bg-background rounded-2xl p-8 border shadow-lg border-emerald-500/20 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-[50px] rounded-full" />
              <div className="space-y-3 relative z-10">
                <div className="text-sm font-bold text-emerald-500 uppercase tracking-wider">Markdown Preview</div>
                <div className="p-4 bg-muted/50 rounded-xl font-mono text-sm border">
                  <span className="text-blue-500">```javascript</span><br/>
                  <span className="text-purple-500">function</span> resolveIssue() {'{'}<br/>
                  &nbsp;&nbsp;<span className="text-emerald-500">return</span> <span className="text-amber-500">"Customer Happy!"</span>;<br/>
                  {'}'}<br/>
                  <span className="text-blue-500">```</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Knowledge Base */}
      <section className="py-24 border-b bg-background">
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
              <div className="w-16 h-16 bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 flex items-center justify-center rounded-2xl">
                <BookOpen className="h-8 w-8" />
              </div>
              <h2 className="text-4xl font-bold tracking-tight">Deflect tickets with self-service</h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                The best ticket is the one that was never created. Build a beautiful, searchable Knowledge Base that empowers your customers to find their own answers instantly.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-lg"><CheckCircle className="text-violet-500 h-6 w-6 shrink-0" /> Global lightning-fast search</li>
                <li className="flex items-center gap-3 text-lg"><CheckCircle className="text-violet-500 h-6 w-6 shrink-0" /> Category organization</li>
                <li className="flex items-center gap-3 text-lg"><CheckCircle className="text-violet-500 h-6 w-6 shrink-0" /> WYSIWYG Article Editor</li>
              </ul>
            </motion.div>
            <motion.div
              variants={fadeLeft}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex-1 w-full bg-slate-100 dark:bg-slate-900 rounded-2xl p-8 border shadow-inner"
            >
              <div className="bg-background rounded-full px-4 py-3 flex items-center gap-3 border shadow-sm mb-6">
                <Search className="text-muted-foreground h-5 w-5" />
                <span className="text-muted-foreground font-medium">How to reset my password...</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-background p-4 rounded-xl border hover:shadow-md transition-shadow cursor-pointer">
                  <div className="h-3 w-24 bg-violet-500/20 rounded mb-2" />
                  <div className="h-2 w-full bg-muted rounded" />
                </div>
                <div className="bg-background p-4 rounded-xl border hover:shadow-md transition-shadow cursor-pointer">
                  <div className="h-3 w-20 bg-blue-500/20 rounded mb-2" />
                  <div className="h-2 w-full bg-muted rounded" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Security */}
      <section className="py-24 bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-emerald-500/10 opacity-50" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="container mx-auto px-4 max-w-4xl text-center relative z-10"
        >
          <ShieldCheck className="h-20 w-20 mx-auto text-emerald-400 mb-8" />
          <h2 className="text-4xl md:text-5xl font-bold mb-8">Enterprise-Grade Architecture</h2>
          <p className="text-xl text-slate-300 mb-12">
            HelpDesk Pro is powered by Google's Firebase infrastructure. That means military-grade encryption, real-time database synchronization across all devices, and an architecture that scales infinitely.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {[
              { title: "Real-time Sync", desc: "When a ticket updates, everyone sees it instantly. No page refreshes required." },
              { title: "Role-Based Access", desc: "Strict segregation between Customers, Agents, and Administrators." },
              { title: "Secure Attachments", desc: "Files are stored securely in Google Cloud Storage with strict access rules." },
            ].map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="bg-slate-900/80 backdrop-blur p-6 rounded-2xl border border-slate-800 hover:border-slate-700 transition-colors"
              >
                <h4 className="font-bold text-lg mb-2">{card.title}</h4>
                <p className="text-slate-400 text-sm">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Legacy vs HelpDesk Pro */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-16"
          >
            Why switch to HelpDesk Pro?
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid md:grid-cols-2 gap-0 border rounded-2xl overflow-hidden shadow-xl"
          >
            <div className="p-10 bg-slate-50 dark:bg-slate-900/50">
              <h3 className="text-2xl font-bold text-slate-500 mb-8">Legacy Helpdesks</h3>
              <ul className="space-y-6">
                {["Cluttered, confusing interfaces", "Requires page reloads for updates", "Weeks of training required", "Plain text only"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-slate-500">
                    <div className="w-6 h-6 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-500 font-bold text-xs shrink-0">✕</div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-10 bg-primary/5 border-l border-primary/20 relative">
              <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-primary/10 to-transparent pointer-events-none" />
              <h3 className="text-2xl font-bold text-primary mb-8 relative z-10">HelpDesk Pro</h3>
              <ul className="space-y-6 relative z-10">
                {["Beautiful, intuitive UI", "Real-time WebSockets sync", "Zero training required", "Full Markdown Support"].map((item) => (
                  <li key={item} className="flex items-center gap-3 font-medium">
                    <CheckCircle className="text-primary h-6 w-6 shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
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
            Join today and start delivering exceptional customer experiences.
          </p>
          <Link to="/register">
            <Button size="lg" className="h-14 px-10 text-lg bg-white text-slate-950 hover:bg-slate-100 border-0 shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:scale-[1.03] transition-all rounded-xl">
              Create Free Account
            </Button>
          </Link>
        </motion.div>
      </section>
    </>
  );
}
