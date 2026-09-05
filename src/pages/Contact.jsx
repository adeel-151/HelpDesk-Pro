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
      <section className="py-24 md:py-32 bg-white dark:bg-black text-black dark:text-white relative overflow-hidden border-b border-black/10 dark:border-white/10">
        <div className="absolute top-0 right-0 -mr-40 -mt-40 w-[600px] h-[600px] bg-primary/20 blur-[150px] rounded-full" />
        <div className="absolute bottom-0 left-0 -ml-40 -mb-40 w-[600px] h-[600px] bg-accent/20 blur-[150px] rounded-full" />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="container mx-auto px-4 text-center relative z-10"
        >
          <div className="inline-flex items-center border border-black/20 dark:border-white/20 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-black/50 dark:text-white/50 mb-8 bg-black/5 dark:bg-white/5">
            // SYSTEM.COMMUNICATIONS
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-7xl font-black tracking-[0.1em] sm:tracking-[0.2em] uppercase mb-6 drop-shadow-[0_0_20px_rgba(0,0,0,0.1)] dark:drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
            INITIATE CONTACT
          </h1>
          <p className="text-xs md:text-sm text-black/50 dark:text-white/50 uppercase tracking-[0.2em] max-w-2xl mx-auto font-bold leading-relaxed">
            Whether you have a question about features, trials, pricing, or need a demo, our operatives are standing by to assist.
          </p>
        </motion.div>
      </section>

      {/* Contact Methods Grid */}
      <section className="py-16 bg-white dark:bg-black relative -mt-8 z-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 items-stretch"
          >
            {[
              { icon: <MessageSquare className="h-6 w-6" />, color: "border-primary text-primary shadow-[0_0_15px_rgba(79,70,229,0.3)]", title: "SALES CHANNEL", desc: "Speak to our team about custom plans or enterprise deals.", link: "sales@helpdeskpro.com", linkColor: "text-primary" },
              { icon: <LifeBuoy className="h-6 w-6" />, color: "border-accent text-accent shadow-[0_0_15px_rgba(168,85,247,0.3)]", title: "SUPPORT LINK", desc: "Need technical help? We're here to assist you 24/7.", link: "support@helpdeskpro.com", linkColor: "text-accent" },
              { icon: <MapPin className="h-6 w-6" />, color: "border-black/50 dark:border-white/50 text-black dark:text-white shadow-[0_0_15px_rgba(0,0,0,0.1)] dark:shadow-[0_0_15px_rgba(255,255,255,0.1)]", title: "HQ COORDINATES", desc: "Visit our global headquarters in San Francisco.", link: "100 Market St, SF, CA", linkColor: "text-black dark:text-white" },
            ].map((card) => (
              <motion.div key={card.title} variants={fadeUp} transition={{ duration: 0.4 }} className="bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 p-8 hover:border-black/30 dark:hover:border-white/30 transition-all duration-300 text-center group">
                <div className={`w-14 h-14 border ${card.color} flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform bg-white dark:bg-black`}>
                  {card.icon}
                </div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-black dark:text-white mb-3">{card.title}</h3>
                <p className="text-xs text-black/50 dark:text-white/50 uppercase tracking-widest mb-6 leading-relaxed">{card.desc}</p>
                <p className={`text-xs font-bold uppercase tracking-widest ${card.linkColor}`}>{card.link}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-24 bg-white dark:bg-black border-t border-b border-black/10 dark:border-white/10">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 p-8 md:p-12 relative overflow-hidden"
          >
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/20 rounded-full blur-[40px]" />
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-accent/20 rounded-full blur-[40px]" />

            <div className="relative z-10">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-center py-16"
                >
                  <div className="w-20 h-20 border border-primary text-primary flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(79,70,229,0.3)] bg-white dark:bg-black">
                    <CheckCircle2 className="h-10 w-10" />
                  </div>
                  <h3 className="text-2xl font-black uppercase tracking-[0.2em] text-black dark:text-white mb-4">TRANSMISSION SENT</h3>
                  <p className="text-xs text-black/50 dark:text-white/50 uppercase tracking-widest mb-8 max-w-md mx-auto leading-relaxed">
                    Data packet received. Our team will decrypt and respond within 24 hours.
                  </p>
                  <Button onClick={() => setIsSubmitted(false)} variant="outline" className="h-12 px-8 rounded-none text-xs font-bold uppercase tracking-widest bg-transparent text-black dark:text-white border-black/20 dark:border-white/20 hover:bg-black/10 dark:hover:bg-white/10">
                    TRANSMIT ANOTHER
                  </Button>
                </motion.div>
              ) : (
                <>
                  <div className="text-center mb-10">
                    <h2 className="text-2xl font-black uppercase tracking-[0.2em] text-black dark:text-white mb-4">COMMS UPLINK</h2>
                    <p className="text-xs text-black/50 dark:text-white/50 uppercase tracking-widest">Provide your parameters below to establish a connection.</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-black/70 dark:text-white/70">DESIGNATION (FIRST)</label>
                        <input required type="text" className="w-full bg-white dark:bg-black border border-black/10 dark:border-white/10 text-black dark:text-white rounded-none px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-black/20 dark:placeholder:text-white/20" placeholder="Jane" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-black/70 dark:text-white/70">DESIGNATION (LAST)</label>
                        <input required type="text" className="w-full bg-white dark:bg-black border border-black/10 dark:border-white/10 text-black dark:text-white rounded-none px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-black/20 dark:placeholder:text-white/20" placeholder="Doe" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-black/70 dark:text-white/70">COMMS VECTOR (EMAIL)</label>
                      <input required type="email" className="w-full bg-white dark:bg-black border border-black/10 dark:border-white/10 text-black dark:text-white rounded-none px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-black/20 dark:placeholder:text-white/20" placeholder="jane@company.com" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-black/70 dark:text-white/70">TOPIC CLASSIFICATION</label>
                      <select required className="w-full bg-white dark:bg-black border border-black/10 dark:border-white/10 text-black dark:text-white rounded-none px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all appearance-none">
                        <option value="" className="bg-white dark:bg-black text-black/50 dark:text-white/50">SELECT A PARAMETER...</option>
                        <option value="sales" className="bg-white dark:bg-black">SALES INQUIRY</option>
                        <option value="support" className="bg-white dark:bg-black">TECHNICAL SUPPORT</option>
                        <option value="billing" className="bg-white dark:bg-black">BILLING QUESTION</option>
                        <option value="other" className="bg-white dark:bg-black">OTHER</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-black/70 dark:text-white/70">PAYLOAD (MESSAGE)</label>
                      <textarea required rows={5} className="w-full bg-white dark:bg-black border border-black/10 dark:border-white/10 text-black dark:text-white rounded-none px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none placeholder:text-black/20 dark:placeholder:text-white/20" placeholder="How can we assist your operation?" />
                    </div>
                    <Button type="submit" disabled={isSubmitting} className="w-full h-14 rounded-none text-xs font-bold uppercase tracking-widest bg-primary text-white hover:bg-primary/90 shadow-[0_0_20px_rgba(79,70,229,0.4)] transition-all">
                      {isSubmitting ? "TRANSMITTING..." : (
                        <>
                          SEND TRANSMISSION <Send className="ml-3 h-4 w-4" />
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
