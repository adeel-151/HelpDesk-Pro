import { useAuth } from "@/features/auth/AuthProvider";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PlusCircle, Search, Clock, CheckCircle2, Ticket, ArrowUpRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { motion } from "framer-motion";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const fetchCustomerData = async (userId) => {
  const q = query(
    collection(db, "tickets"),
    where("createdBy", "==", userId),
    orderBy("createdAt", "desc")
  );
  const querySnapshot = await getDocs(q);
  
  let openCount = 0;
  let resolvedCount = 0;
  const tickets = [];

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    if (data.status === "open" || data.status === "in_progress") {
      openCount++;
    } else if (data.status === "resolved" || data.status === "closed") {
      resolvedCount++;
    }
    if (tickets.length < 5) {
      tickets.push({ id: doc.id, ...data });
    }
  });

  return { stats: { open: openCount, resolved: resolvedCount }, recentTickets: tickets };
};

export default function CustomerDashboard() {
  const { user, profile } = useAuth();

  const { data, isLoading: loading } = useQuery({
    queryKey: ["customerDashboard", user?.uid],
    queryFn: () => fetchCustomerData(user.uid),
    enabled: !!user,
  });

  const stats = data?.stats || { open: 0, resolved: 0 };
  const recentTickets = data?.recentTickets || [];

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  return (
    <motion.div
      variants={stagger}
      initial="initial"
      animate="animate"
      className="space-y-8"
    >
      {/* Welcome Banner */}
      <motion.div
        variants={fadeUp}
        className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent rounded-2xl p-8 border border-primary/20 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[80px] rounded-full pointer-events-none" />
        <div className="relative z-10">
          <h2 className="text-3xl font-bold tracking-tight mb-2">
            {getGreeting()}, {profile?.name?.split(' ')[0] || 'Customer'}!
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl">
            How can we help you today? Create a new ticket or search our knowledge base for quick answers.
          </p>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div variants={fadeUp} className="grid md:grid-cols-2 gap-6">
        <Link to="/tickets/new" className="group">
          <div className="bg-card hover:bg-muted/50 border-2 border-transparent hover:border-primary/20 rounded-2xl p-6 transition-all duration-300 h-full flex flex-col items-center justify-center text-center space-y-4 shadow-sm hover:shadow-lg cursor-pointer">
            <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <PlusCircle className="h-8 w-8" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Create New Ticket</h3>
              <p className="text-muted-foreground mt-1">Submit a new request to our support team.</p>
            </div>
          </div>
        </Link>
        <Link to="/kb" className="group">
          <div className="bg-card hover:bg-muted/50 border-2 border-transparent hover:border-emerald-500/20 rounded-2xl p-6 transition-all duration-300 h-full flex flex-col items-center justify-center text-center space-y-4 shadow-sm hover:shadow-lg cursor-pointer">
            <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Search className="h-8 w-8" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Browse Knowledge Base</h3>
              <p className="text-muted-foreground mt-1">Find instant answers to common questions.</p>
            </div>
          </div>
        </Link>
      </motion.div>

      {/* Stats & Recent Tickets */}
      <div className="grid lg:grid-cols-3 gap-6">
        
        {/* Left Col: Stats */}
        <motion.div variants={fadeUp} className="space-y-6">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Open Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-amber-500/10 text-amber-500 rounded-xl flex items-center justify-center">
                  <Clock className="h-6 w-6" />
                </div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                  className="text-4xl font-black"
                >
                  {loading ? "-" : stats.open}
                </motion.div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Resolved</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-500/10 text-emerald-500 rounded-xl flex items-center justify-center">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                  className="text-4xl font-black"
                >
                  {loading ? "-" : stats.resolved}
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Right Col: Recent Tickets */}
        <motion.div variants={fadeUp} className="lg:col-span-2">
          <Card className="flex flex-col h-full">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Tickets</CardTitle>
                <CardDescription>Your latest support requests</CardDescription>
              </div>
              <Link to="/tickets">
                <Button variant="outline" size="sm" className="gap-1">
                  View All <ArrowUpRight className="h-3.5 w-3.5" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="flex-1">
              {loading ? (
                <div className="flex items-center justify-center h-40 text-muted-foreground">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary" />
                </div>
              ) : recentTickets.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-40 text-center space-y-3 bg-muted/20 rounded-xl border border-dashed">
                  <div className="w-14 h-14 bg-muted/50 rounded-full flex items-center justify-center">
                    <Ticket className="h-7 w-7 text-muted-foreground opacity-50" />
                  </div>
                  <p className="text-muted-foreground">You don't have any tickets yet.</p>
                  <Link to="/tickets/new">
                    <Button size="sm" variant="outline">Create your first ticket</Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {recentTickets.map((ticket, i) => (
                    <motion.div
                      key={ticket.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08 }}
                    >
                      <Link to={`/tickets/${ticket.id}`} className="block">
                        <div className="flex items-center justify-between p-4 rounded-xl border bg-card hover:bg-muted/50 transition-all duration-200 hover:shadow-sm">
                          <div className="space-y-1 min-w-0">
                            <h4 className="font-semibold line-clamp-1">{ticket.title}</h4>
                            <div className="flex items-center text-xs text-muted-foreground gap-2">
                              <span className="uppercase font-medium">#{ticket.id.slice(0, 6)}</span>
                              <span>•</span>
                              <span>{new Date(ticket.createdAt?.toDate()).toLocaleDateString()}</span>
                            </div>
                          </div>
                          <div className={`px-3 py-1 rounded-full text-xs font-semibold capitalize shrink-0 ${
                            ticket.status === 'open' ? 'bg-amber-500/10 text-amber-600' :
                            ticket.status === 'in_progress' ? 'bg-blue-500/10 text-blue-600' :
                            'bg-emerald-500/10 text-emerald-600'
                          }`}>
                            {ticket.status.replace('_', ' ')}
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
