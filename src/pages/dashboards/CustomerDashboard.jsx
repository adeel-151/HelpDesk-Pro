import { useAuth } from "@/features/auth/AuthProvider";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PlusCircle, Search, Clock, CheckCircle2, Ticket, ArrowUpRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase/config";

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

  if (loading) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-background">
        <div className="text-xs font-bold uppercase tracking-[0.2em] animate-pulse">
          INITIALIZING_CLIENT_PORTAL...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12 pt-8 px-4 sm:px-8 bg-background">
      {/* Welcome Banner */}
      <div className="border-2 border-black dark:border-white p-8 relative overflow-hidden bg-white/5 dark:bg-black/5 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="absolute top-0 right-0 p-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-bold">
          // CLIENT_PORTAL
        </div>
        <div className="relative z-10">
          <h2 className="text-3xl md:text-5xl font-black tracking-[0.2em] uppercase mb-4 text-foreground">
            WELCOME, {profile?.name?.split(' ')[0] || 'CUSTOMER'}
          </h2>
          <p className="text-muted-foreground text-xs font-bold uppercase tracking-widest max-w-2xl leading-loose">
            Access support channels, track incidents, and browse the knowledge base.
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-6">
        <Link to="/customer/tickets/new" className="group">
          <div className="bg-card border-2 border-black/20 dark:border-white/20 hover:border-primary rounded-none p-6 transition-colors h-full flex flex-col items-center justify-center text-center space-y-4 cursor-pointer">
            <div className="w-16 h-16 bg-primary text-primary-foreground flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <PlusCircle className="h-8 w-8" />
            </div>
            <div>
              <h3 className="text-sm font-bold uppercase tracking-[0.2em]">CREATE_NEW_TICKET</h3>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground mt-2 leading-relaxed">Submit a new request to our support team.</p>
            </div>
          </div>
        </Link>
        <Link to="/customer/kb" className="group">
          <div className="bg-card border-2 border-black/20 dark:border-white/20 hover:border-emerald-500 rounded-none p-6 transition-colors h-full flex flex-col items-center justify-center text-center space-y-4 cursor-pointer">
            <div className="w-16 h-16 bg-emerald-500 text-white flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Search className="h-8 w-8" />
            </div>
            <div>
              <h3 className="text-sm font-bold uppercase tracking-[0.2em]">KNOWLEDGE_BASE</h3>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground mt-2 leading-relaxed">Find instant answers to common questions.</p>
            </div>
          </div>
        </Link>
      </div>

      {/* Stats & Recent Tickets */}
      <div className="grid lg:grid-cols-3 gap-6">
        
        {/* Left Col: Stats */}
        <div className="space-y-6">
          <div className="border border-black/20 dark:border-white/20 bg-card p-6 flex flex-col relative group hover:border-amber-500 transition-colors">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-500">OPEN_REQUESTS</h3>
              <Clock className="h-4 w-4 text-amber-500" />
            </div>
            <div className="text-4xl font-black tracking-tighter mt-auto text-amber-500">{stats.open}</div>
          </div>
          
          <div className="border border-black/20 dark:border-white/20 bg-card p-6 flex flex-col relative group hover:border-emerald-500 transition-colors">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-500">RESOLVED</h3>
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            </div>
            <div className="text-4xl font-black tracking-tighter mt-auto text-emerald-500">{stats.resolved}</div>
          </div>
        </div>

        {/* Right Col: Recent Tickets */}
        <div className="lg:col-span-2 border border-black/20 dark:border-white/20 bg-card flex flex-col">
          <div className="p-6 border-b border-black/20 dark:border-white/20 flex flex-row items-center justify-between bg-black/5 dark:bg-white/5">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.2em]">RECENT_TICKETS</h3>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">LATEST_SUPPORT_REQUESTS</p>
            </div>
            <Link to="/customer/tickets">
              <Button variant="outline" size="sm" className="gap-1 rounded-none border-black/20 dark:border-white/20 uppercase tracking-widest text-[10px] font-bold">
                VIEW_ALL <ArrowUpRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>
          
          <div className="flex-1 p-6">
            {recentTickets.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-40 text-center space-y-3 bg-muted/20 border border-dashed border-black/20 dark:border-white/20">
                <div className="w-12 h-12 flex items-center justify-center">
                  <Ticket className="h-6 w-6 text-muted-foreground opacity-50" />
                </div>
                <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">NO_TICKETS_FOUND</p>
                <Link to="/customer/tickets/new">
                  <Button size="sm" variant="outline" className="rounded-none border-black/20 dark:border-white/20 uppercase tracking-widest text-[10px] font-bold">CREATE_FIRST_TICKET</Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {recentTickets.map((ticket, i) => (
                  <Link key={ticket.id} to={`/customer/tickets/${ticket.id}`} className="block">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-black/20 dark:border-white/20 bg-card hover:border-primary transition-colors group">
                      <div className="space-y-2 min-w-0">
                        <h4 className="font-bold text-xs uppercase tracking-wider line-clamp-1">{ticket.title}</h4>
                        <div className="flex items-center text-[10px] font-bold uppercase tracking-widest text-muted-foreground gap-2">
                          <span className="text-primary">#{ticket.id.slice(0, 6)}</span>
                          <span>//</span>
                          <span>{new Date(ticket.createdAt?.toDate()).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className={`mt-4 sm:mt-0 px-3 py-1 text-[10px] font-bold uppercase tracking-widest shrink-0 border ${
                        ticket.status === 'open' ? 'border-amber-500 text-amber-500' :
                        ticket.status === 'in_progress' ? 'border-blue-500 text-blue-500' :
                        'border-emerald-500 text-emerald-500'
                      }`}>
                        {ticket.status.replace('_', ' ')}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
