import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LifeBuoy, Mail, MessageSquare, MapPin, Send, CheckCircle2 } from "lucide-react";
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

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <>
      {/* Contact Hero */}
      <section className="py-24 bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-40 -mt-40 w-[600px] h-[600px] bg-primary/20 blur-[150px] rounded-full" />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="container mx-auto px-4 text-center relative z-10"
        >
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 drop-shadow-lg">
            Get in touch
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
            Whether you have a question about features, trials, pricing, need a demo, or anything else, our team is ready to answer all your questions.
          </p>
        </motion.div>
      </section>

      {/* Contact Methods Grid */}
      <section className="py-16 bg-background relative -mt-8 z-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-6 items-stretch"
          >
            {[
              { icon: <MessageSquare className="h-6 w-6" />, color: "bg-primary/10 text-primary", title: "Chat to Sales", desc: "Speak to our friendly team about custom plans or enterprise deals.", link: "sales@helpdeskpro.com", linkColor: "text-primary" },
              { icon: <LifeBuoy className="h-6 w-6" />, color: "bg-emerald-500/10 text-emerald-500", title: "Support", desc: "Need technical help? We're here to assist you 24/7.", link: "support@helpdeskpro.com", linkColor: "text-emerald-600" },
              { icon: <MapPin className="h-6 w-6" />, color: "bg-violet-500/10 text-violet-500", title: "Visit Us", desc: "Visit our headquarters in San Francisco.", link: "100 Market St, SF, CA", linkColor: "text-violet-600" },
            ].map((card) => (
              <motion.div key={card.title} variants={fadeUp} transition={{ duration: 0.4 }} className="bg-background border rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 text-center group">
                <div className={`w-14 h-14 ${card.color} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform`}>
                  {card.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{card.title}</h3>
                <p className="text-muted-foreground text-sm mb-6">{card.desc}</p>
                <p className={`font-semibold ${card.linkColor}`}>{card.link}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-24 bg-muted/20 border-t">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-background border rounded-2xl p-8 md:p-12 shadow-xl relative overflow-hidden"
          >
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 rounded-full blur-[40px]" />
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-emerald-500/10 rounded-full blur-[40px]" />

            <div className="relative z-10">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-center py-16"
                >
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
                </motion.div>
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
                        <input required type="text" className="w-full bg-background border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" placeholder="Jane" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Last Name</label>
                        <input required type="text" className="w-full bg-background border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" placeholder="Doe" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email Address</label>
                      <input required type="email" className="w-full bg-background border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" placeholder="jane@company.com" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Subject</label>
                      <select required className="w-full bg-background border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all">
                        <option value="">Select a topic...</option>
                        <option value="sales">Sales Inquiry</option>
                        <option value="support">Technical Support</option>
                        <option value="billing">Billing Question</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Message</label>
                      <textarea required rows={5} className="w-full bg-background border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none" placeholder="How can we help you?" />
                    </div>
                    <Button type="submit" disabled={isSubmitting} className="w-full h-14 text-lg rounded-xl">
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
          </motion.div>
        </div>
      </section>
    </>
  );
}
