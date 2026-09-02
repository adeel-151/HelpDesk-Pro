import { useAuth } from "@/features/auth/AuthProvider";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PlusCircle, Search, Clock, CheckCircle2, Ticket } from "lucide-react";
import { useEffect, useState } from "react";
import { collection, query, where, getDocs, limit, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase/config";

export default function CustomerDashboard() {
  const { user, profile } = useAuth();
  const [stats, setStats] = useState({ open: 0, resolved: 0 });
  const [recentTickets, setRecentTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchCustomerData = async () => {
      try {
        const q = query(
          collection(db, "tickets"),
          where("createdBy", "==", user.uid),
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

        setStats({ open: openCount, resolved: resolvedCount });
        setRecentTickets(tickets);
      } catch (error) {
        console.error("Error fetching customer dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerData();
  }, [user]);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent rounded-2xl p-8 border border-primary/20">
        <h2 className="text-3xl font-bold tracking-tight mb-2">Welcome back, {profile?.name?.split(' ')[0] || 'Customer'}!</h2>
        <p className="text-muted-foreground text-lg max-w-2xl">
          How can we help you today? Create a new ticket or search our knowledge base for quick answers.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-6">
        <Link to="/tickets/new" className="group">
          <div className="bg-card hover:bg-muted/50 border-2 border-transparent hover:border-primary/20 rounded-2xl p-6 transition-all h-full flex flex-col items-center justify-center text-center space-y-4 shadow-sm hover:shadow-md cursor-pointer">
            <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
              <PlusCircle className="h-8 w-8" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Create New Ticket</h3>
              <p className="text-muted-foreground mt-1">Submit a new request to our support team.</p>
            </div>
          </div>
        </Link>
        <Link to="/kb" className="group">
          <div className="bg-card hover:bg-muted/50 border-2 border-transparent hover:border-emerald-500/20 rounded-2xl p-6 transition-all h-full flex flex-col items-center justify-center text-center space-y-4 shadow-sm hover:shadow-md cursor-pointer">
            <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
              <Search className="h-8 w-8" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Browse Knowledge Base</h3>
              <p className="text-muted-foreground mt-1">Find instant answers to common questions.</p>
            </div>
          </div>
        </Link>
      </div>

      {/* Stats & Recent Tickets */}
      <div className="grid lg:grid-cols-3 gap-6">
        
        {/* Left Col: Stats */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Open Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-amber-500/10 text-amber-500 rounded-xl flex items-center justify-center">
                  <Clock className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-4xl font-black">{loading ? "-" : stats.open}</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Resolved</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-500/10 text-emerald-500 rounded-xl flex items-center justify-center">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-4xl font-black">{loading ? "-" : stats.resolved}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Col: Recent Tickets */}
        <Card className="lg:col-span-2 flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Tickets</CardTitle>
              <CardDescription>Your latest support requests</CardDescription>
            </div>
            <Link to="/tickets">
              <Button variant="outline" size="sm">View All</Button>
            </Link>
          </CardHeader>
          <CardContent className="flex-1">
            {loading ? (
              <div className="flex items-center justify-center h-40 text-muted-foreground">Loading tickets...</div>
            ) : recentTickets.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-40 text-center space-y-3 bg-muted/20 rounded-lg border border-dashed">
                <Ticket className="h-8 w-8 text-muted-foreground opacity-50" />
                <p className="text-muted-foreground">You don't have any tickets yet.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {recentTickets.map(ticket => (
                  <Link key={ticket.id} to={`/tickets/${ticket.id}`} className="block">
                    <div className="flex items-center justify-between p-4 rounded-xl border bg-card hover:bg-muted/50 transition-colors">
                      <div className="space-y-1">
                        <h4 className="font-semibold line-clamp-1">{ticket.title}</h4>
                        <div className="flex items-center text-xs text-muted-foreground gap-2">
                          <span className="uppercase font-medium">#{ticket.id.slice(0, 6)}</span>
                          <span>•</span>
                          <span>{new Date(ticket.createdAt?.toDate()).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                        ticket.status === 'open' ? 'bg-amber-500/10 text-amber-600' :
                        ticket.status === 'in_progress' ? 'bg-blue-500/10 text-blue-600' :
                        'bg-emerald-500/10 text-emerald-600'
                      }`}>
                        {ticket.status.replace('_', ' ')}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
        
      </div>
    </div>
  );
}
