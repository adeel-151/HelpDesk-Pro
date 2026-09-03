import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CheckCircle, HelpCircle, XCircle } from "lucide-react";
import { motion } from "framer-motion";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function Pricing() {
  return (
    <>
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
            // SYSTEM.PRICING_TIERS
          </div>
          <h1 className="text-4xl md:text-7xl font-black tracking-[0.2em] uppercase mb-8 drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
            PLANS THAT SCALE <br/>
            <span className="text-primary drop-shadow-[0_0_15px_rgba(79,70,229,0.5)]">WITH YOUR TEAM.</span>
          </h1>
          <p className="text-xs md:text-sm text-white/50 uppercase tracking-[0.2em] max-w-3xl mx-auto font-bold leading-relaxed">
            No hidden fees. No surprise charges. Choose the plan that fits your operational capacity.
          </p>
        </motion.div>
      </section>

      {/* Pricing Cards */}
      <section className="py-24 bg-black relative -mt-12 z-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8 items-start"
          >
            {/* Starter Plan */}
            <motion.div variants={fadeUp} transition={{ duration: 0.5 }} className="bg-white/5 border border-white/10 p-8 hover:border-white/30 transition-colors duration-300 flex flex-col h-full">
              <div className="mb-8">
                <h3 className="text-xl font-bold uppercase tracking-widest text-white mb-2">STARTER</h3>
                <p className="text-xs text-white/50 uppercase tracking-widest leading-relaxed">Perfect for small teams getting started.</p>
              </div>
              <div className="mb-8">
                <span className="text-5xl font-black text-white">$0</span>
                <span className="text-xs text-white/50 uppercase tracking-widest ml-2">/MO</span>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-center gap-3"><CheckCircle className="text-white/50 h-5 w-5 shrink-0" /> <span className="text-xs text-white/80 uppercase tracking-wide">Up to 3 Agents</span></li>
                <li className="flex items-center gap-3"><CheckCircle className="text-white/50 h-5 w-5 shrink-0" /> <span className="text-xs text-white/80 uppercase tracking-wide">500 Tickets/month</span></li>
                <li className="flex items-center gap-3"><CheckCircle className="text-white/50 h-5 w-5 shrink-0" /> <span className="text-xs text-white/80 uppercase tracking-wide">Basic Markdown Support</span></li>
                <li className="flex items-center gap-3 text-white/30"><XCircle className="h-5 w-5 shrink-0" /> <span className="text-xs uppercase tracking-wide">No Knowledge Base</span></li>
                <li className="flex items-center gap-3 text-white/30"><XCircle className="h-5 w-5 shrink-0" /> <span className="text-xs uppercase tracking-wide">No Custom SLAs</span></li>
              </ul>
              <Link to="/register" className="mt-auto">
                <Button variant="outline" className="w-full h-12 rounded-none text-xs font-bold uppercase tracking-widest bg-transparent text-white border-white/20 hover:bg-white/10 hover:text-white">GET STARTED FREE</Button>
              </Link>
            </motion.div>

            {/* Pro Plan */}
            <motion.div variants={fadeUp} transition={{ duration: 0.5 }} className="bg-white/5 border border-primary relative p-8 shadow-[0_0_50px_rgba(79,70,229,0.15)] transform md:-translate-y-4 flex flex-col h-full group">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white px-4 py-1 text-[10px] font-bold tracking-widest uppercase border border-primary">
                MOST POPULAR
              </div>
              <div className="mb-8 mt-2">
                <h3 className="text-xl font-bold uppercase tracking-widest text-white mb-2">PROFESSIONAL</h3>
                <p className="text-xs text-white/50 uppercase tracking-widest leading-relaxed">Everything you need to scale globally.</p>
              </div>
              <div className="mb-8">
                <span className="text-5xl font-black text-white drop-shadow-[0_0_15px_rgba(79,70,229,0.5)]">$49</span>
                <span className="text-xs text-white/50 uppercase tracking-widest ml-2">/MO PER AGENT</span>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-center gap-3"><CheckCircle className="text-primary drop-shadow-[0_0_5px_rgba(79,70,229,0.8)] h-5 w-5 shrink-0" /> <span className="text-xs text-white/80 uppercase tracking-wide">Unlimited Agents</span></li>
                <li className="flex items-center gap-3"><CheckCircle className="text-primary drop-shadow-[0_0_5px_rgba(79,70,229,0.8)] h-5 w-5 shrink-0" /> <span className="text-xs text-white/80 uppercase tracking-wide">Unlimited Tickets</span></li>
                <li className="flex items-center gap-3"><CheckCircle className="text-primary drop-shadow-[0_0_5px_rgba(79,70,229,0.8)] h-5 w-5 shrink-0" /> <span className="text-xs text-white/80 uppercase tracking-wide">Smart SLAs & Timers</span></li>
                <li className="flex items-center gap-3"><CheckCircle className="text-primary drop-shadow-[0_0_5px_rgba(79,70,229,0.8)] h-5 w-5 shrink-0" /> <span className="text-xs text-white/80 uppercase tracking-wide">Full Knowledge Base</span></li>
                <li className="flex items-center gap-3"><CheckCircle className="text-primary drop-shadow-[0_0_5px_rgba(79,70,229,0.8)] h-5 w-5 shrink-0" /> <span className="text-xs text-white/80 uppercase tracking-wide">Role-based Access</span></li>
              </ul>
              <Link to="/register" className="mt-auto">
                <Button className="w-full h-12 rounded-none text-xs font-bold uppercase tracking-widest bg-primary text-white hover:bg-primary/90 shadow-[0_0_20px_rgba(79,70,229,0.4)]">
                  START 14-DAY TRIAL
                </Button>
              </Link>
            </motion.div>

            {/* Enterprise Plan */}
            <motion.div variants={fadeUp} transition={{ duration: 0.5 }} className="bg-white/5 border border-white/10 p-8 hover:border-white/30 transition-colors duration-300 flex flex-col h-full">
              <div className="mb-8">
                <h3 className="text-xl font-bold uppercase tracking-widest text-white mb-2">ENTERPRISE</h3>
                <p className="text-xs text-white/50 uppercase tracking-widest leading-relaxed">Advanced security and custom deployments.</p>
              </div>
              <div className="mb-8">
                <span className="text-3xl font-black text-white uppercase tracking-widest mt-2 block">CUSTOM</span>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-center gap-3"><CheckCircle className="text-white/50 h-5 w-5 shrink-0" /> <span className="text-xs text-white/80 uppercase tracking-wide">Everything in Professional</span></li>
                <li className="flex items-center gap-3"><CheckCircle className="text-white/50 h-5 w-5 shrink-0" /> <span className="text-xs text-white/80 uppercase tracking-wide">Dedicated Account Manager</span></li>
                <li className="flex items-center gap-3"><CheckCircle className="text-white/50 h-5 w-5 shrink-0" /> <span className="text-xs text-white/80 uppercase tracking-wide">Custom Domain for KB</span></li>
                <li className="flex items-center gap-3"><CheckCircle className="text-white/50 h-5 w-5 shrink-0" /> <span className="text-xs text-white/80 uppercase tracking-wide">SSO / SAML Authentication</span></li>
                <li className="flex items-center gap-3"><CheckCircle className="text-white/50 h-5 w-5 shrink-0" /> <span className="text-xs text-white/80 uppercase tracking-wide">99.99% Uptime SLA</span></li>
              </ul>
              <Button variant="outline" className="mt-auto w-full h-12 rounded-none text-xs font-bold uppercase tracking-widest bg-transparent text-white border-white/20 hover:bg-white/10 hover:text-white">CONTACT COMMS</Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="py-24 bg-black border-t border-b border-white/10">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-4xl font-black uppercase tracking-[0.2em] text-white text-center mb-16"
          >
            DETAILED COMPARISON
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="overflow-x-auto border border-white/10"
          >
            <table className="w-full text-left border-collapse">
              <thead className="bg-white/5">
                <tr>
                  <th className="py-6 px-4 border-b border-white/10 font-bold text-xs uppercase tracking-widest text-white/80 w-2/5">FEATURE</th>
                  <th className="py-6 px-4 border-b border-white/10 font-bold text-xs uppercase tracking-widest text-white/80 text-center w-1/5">STARTER</th>
                  <th className="py-6 px-4 border-b border-white/10 font-bold text-xs uppercase tracking-widest text-primary text-center w-1/5">PROFESSIONAL</th>
                  <th className="py-6 px-4 border-b border-white/10 font-bold text-xs uppercase tracking-widest text-white/80 text-center w-1/5">ENTERPRISE</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 bg-black">
                {[
                  { feature: "AGENTS INCLUDED", starter: "3", pro: "UNLIMITED", enterprise: "UNLIMITED" },
                  { feature: "TICKET VOLUME", starter: "500 / MONTH", pro: "UNLIMITED", enterprise: "UNLIMITED" },
                  { feature: "MARKDOWN SUPPORT", starter: "check", pro: "check", enterprise: "check" },
                  { feature: "KNOWLEDGE BASE", starter: "-", pro: "check", enterprise: "check" },
                  { feature: "SMART SLAS & ROUTING", starter: "-", pro: "check", enterprise: "check" },
                  { feature: "SSO / SAML", starter: "-", pro: "-", enterprise: "check" },
                  { feature: "SUPPORT LEVEL", starter: "COMMUNITY", pro: "PRIORITY EMAIL", enterprise: "24/7 DIRECT" },
                ].map((row) => (
                  <tr key={row.feature} className="hover:bg-white/5 transition-colors">
                    <td className="py-4 px-4 text-xs font-bold text-white/50 uppercase tracking-widest">{row.feature}</td>
                    <td className="py-4 px-4 text-center font-medium text-xs text-white/80 uppercase tracking-widest">
                      {row.starter === "check" ? <CheckCircle className="h-4 w-4 mx-auto text-primary" /> :
                       row.starter === "-" ? <span className="text-white/30">-</span> : row.starter}
                    </td>
                    <td className="py-4 px-4 text-center font-medium text-xs text-white/80 uppercase tracking-widest">
                      {row.pro === "check" ? <CheckCircle className="h-4 w-4 mx-auto text-primary" /> :
                       row.pro === "-" ? <span className="text-white/30">-</span> : row.pro}
                    </td>
                    <td className="py-4 px-4 text-center font-medium text-xs text-white/80 uppercase tracking-widest">
                      {row.enterprise === "check" ? <CheckCircle className="h-4 w-4 mx-auto text-primary" /> :
                       row.enterprise === "-" ? <span className="text-white/30">-</span> : row.enterprise}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-24 bg-black border-b border-white/10">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-4xl font-black uppercase tracking-[0.2em] text-white text-center mb-16"
          >
            SYSTEM INQUIRIES
          </motion.h2>
          <motion.div
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="space-y-4"
          >
            {[
              { q: "IS THERE AN EVALUATION PERIOD?", a: "Yes. You can access the Professional tier for 14 days without payment authorization. Following the trial, unupgraded accounts fallback to the Starter tier." },
              { q: "CAN I TERMINATE MY SUBSCRIPTION?", a: "Yes. No restrictive contracts. Terminate directly from your billing dashboard without penalty." },
              { q: "WHAT IF I EXCEED THE TICKET LIMIT?", a: "Warnings are issued prior to the limit. Beyond the limit, incoming tickets are queued but locked from response until cycle reset or tier upgrade." },
            ].map((faq) => (
              <motion.div key={faq.q} variants={fadeUp} transition={{ duration: 0.4 }} className="bg-white/5 p-6 border border-white/10 hover:border-white/30 transition-colors">
                <h3 className="font-bold text-sm text-white/90 uppercase tracking-widest mb-4 flex items-center gap-3"><HelpCircle className="h-4 w-4 text-primary shrink-0" /> {faq.q}</h3>
                <p className="text-xs text-white/50 uppercase tracking-widest leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
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
