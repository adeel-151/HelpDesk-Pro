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
      {/* Pricing Hero */}
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
            Simple & Transparent Pricing
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 drop-shadow-lg">
            Plans that scale with <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">your growing team.</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto font-light leading-relaxed">
            No hidden fees. No surprise charges. Choose the plan that fits your needs and start supporting your customers better today.
          </p>
        </motion.div>
      </section>

      {/* Pricing Cards */}
      <section className="py-24 bg-background relative -mt-12 z-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8 items-start"
          >
            {/* Starter Plan */}
            <motion.div variants={fadeUp} transition={{ duration: 0.5 }} className="bg-background border rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow duration-300">
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-2">Starter</h3>
                <p className="text-muted-foreground text-sm">Perfect for small teams just getting started with customer support.</p>
              </div>
              <div className="mb-8">
                <span className="text-5xl font-black">$0</span>
                <span className="text-muted-foreground">/mo</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3"><CheckCircle className="text-primary h-5 w-5 shrink-0" /> Up to 3 Agents</li>
                <li className="flex items-center gap-3"><CheckCircle className="text-primary h-5 w-5 shrink-0" /> 500 Tickets/month</li>
                <li className="flex items-center gap-3"><CheckCircle className="text-primary h-5 w-5 shrink-0" /> Basic Markdown Support</li>
                <li className="flex items-center gap-3 text-muted-foreground"><XCircle className="h-5 w-5 opacity-50 shrink-0" /> No Knowledge Base</li>
                <li className="flex items-center gap-3 text-muted-foreground"><XCircle className="h-5 w-5 opacity-50 shrink-0" /> No Custom SLAs</li>
              </ul>
              <Link to="/register">
                <Button variant="outline" className="w-full h-12 text-lg rounded-xl">Get Started Free</Button>
              </Link>
            </motion.div>

            {/* Pro Plan */}
            <motion.div variants={fadeUp} transition={{ duration: 0.5 }} className="bg-slate-950 text-white border-2 border-primary rounded-2xl p-8 shadow-[0_0_40px_rgba(79,70,229,0.15)] transform md:-translate-y-4 relative">
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
                <li className="flex items-center gap-3"><CheckCircle className="text-emerald-400 h-5 w-5 shrink-0" /> Unlimited Agents</li>
                <li className="flex items-center gap-3"><CheckCircle className="text-emerald-400 h-5 w-5 shrink-0" /> Unlimited Tickets</li>
                <li className="flex items-center gap-3"><CheckCircle className="text-emerald-400 h-5 w-5 shrink-0" /> Smart SLAs & Timers</li>
                <li className="flex items-center gap-3"><CheckCircle className="text-emerald-400 h-5 w-5 shrink-0" /> Full Knowledge Base</li>
                <li className="flex items-center gap-3"><CheckCircle className="text-emerald-400 h-5 w-5 shrink-0" /> Role-based Access Control</li>
              </ul>
              <Link to="/register">
                <Button className="w-full h-12 text-lg bg-white text-slate-950 hover:bg-slate-100 shadow-[0_0_20px_rgba(255,255,255,0.2)] rounded-xl">
                  Start 14-Day Free Trial
                </Button>
              </Link>
            </motion.div>

            {/* Enterprise Plan */}
            <motion.div variants={fadeUp} transition={{ duration: 0.5 }} className="bg-background border rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow duration-300">
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
                <p className="text-muted-foreground text-sm">Advanced security, custom integrations, and dedicated support.</p>
              </div>
              <div className="mb-8">
                <span className="text-5xl font-black">Custom</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3"><CheckCircle className="text-primary h-5 w-5 shrink-0" /> Everything in Professional</li>
                <li className="flex items-center gap-3"><CheckCircle className="text-primary h-5 w-5 shrink-0" /> Dedicated Account Manager</li>
                <li className="flex items-center gap-3"><CheckCircle className="text-primary h-5 w-5 shrink-0" /> Custom Domain for KB</li>
                <li className="flex items-center gap-3"><CheckCircle className="text-primary h-5 w-5 shrink-0" /> SSO / SAML Authentication</li>
                <li className="flex items-center gap-3"><CheckCircle className="text-primary h-5 w-5 shrink-0" /> 99.99% Uptime SLA</li>
              </ul>
              <Button variant="outline" className="w-full h-12 text-lg rounded-xl">Contact Sales</Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="py-24 bg-muted/20 border-t border-b">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-16"
          >
            Compare Plans in Detail
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="overflow-x-auto"
          >
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
                {[
                  { feature: "Agents Included", starter: "3", pro: "Unlimited", enterprise: "Unlimited" },
                  { feature: "Ticket Volume", starter: "500 / month", pro: "Unlimited", enterprise: "Unlimited" },
                  { feature: "Markdown Support", starter: "check", pro: "check", enterprise: "check" },
                  { feature: "Knowledge Base", starter: "-", pro: "check", enterprise: "check" },
                  { feature: "Smart SLAs & Routing", starter: "-", pro: "check", enterprise: "check" },
                  { feature: "SSO / SAML", starter: "-", pro: "-", enterprise: "check" },
                  { feature: "Support Level", starter: "Community", pro: "Priority Email", enterprise: "24/7 Phone + Email" },
                ].map((row) => (
                  <tr key={row.feature} className="hover:bg-muted/30 transition-colors">
                    <td className="py-4 px-4 text-muted-foreground">{row.feature}</td>
                    <td className="py-4 px-4 text-center font-medium">
                      {row.starter === "check" ? <CheckCircle className="h-5 w-5 mx-auto text-primary" /> :
                       row.starter === "-" ? <span className="text-muted-foreground">-</span> : row.starter}
                    </td>
                    <td className="py-4 px-4 text-center font-medium">
                      {row.pro === "check" ? <CheckCircle className="h-5 w-5 mx-auto text-primary" /> :
                       row.pro === "-" ? <span className="text-muted-foreground">-</span> : row.pro}
                    </td>
                    <td className="py-4 px-4 text-center font-medium">
                      {row.enterprise === "check" ? <CheckCircle className="h-5 w-5 mx-auto text-primary" /> :
                       row.enterprise === "-" ? <span className="text-muted-foreground">-</span> : row.enterprise}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-16"
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.div
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="space-y-6"
          >
            {[
              { q: "Do you offer a free trial?", a: "Yes! You can try the Professional plan completely free for 14 days. No credit card required. If you decide not to upgrade, you will automatically be downgraded to the free Starter plan." },
              { q: "Can I cancel my subscription at any time?", a: "Absolutely. We don't believe in lock-in contracts. You can cancel your subscription at any time from your billing dashboard, and you won't be charged again." },
              { q: "What happens if I go over my ticket limit on the Starter plan?", a: "We will gently notify you when you approach your 500 ticket limit. If you exceed it, new tickets will still be collected but you won't be able to reply to them until the next billing cycle or until you upgrade to Professional." },
            ].map((faq) => (
              <motion.div key={faq.q} variants={fadeUp} transition={{ duration: 0.4 }} className="bg-muted/30 p-6 rounded-2xl border hover:shadow-md transition-shadow">
                <h3 className="font-bold text-lg mb-2 flex items-center gap-2"><HelpCircle className="h-5 w-5 text-primary shrink-0" /> {faq.q}</h3>
                <p className="text-muted-foreground">{faq.a}</p>
              </motion.div>
            ))}
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
              Start your free trial
            </Button>
          </Link>
        </motion.div>
      </section>
    </>
  );
}
