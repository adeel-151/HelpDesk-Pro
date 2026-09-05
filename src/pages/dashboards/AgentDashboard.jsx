import { useAuth } from "@/features/auth/AuthProvider";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Users, Ticket, CheckCircle2, Clock, Activity, FileText } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { collection, query, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";
import { useTheme } from "next-themes";

const fetchAgentStats = async () => {
  const q = query(collection(db, "tickets"));
  const snapshot = await getDocs(q);
  
  let total = 0, open = 0, inProgress = 0, resolved = 0, unassigned = 0;
  
  const tickets = [];
  snapshot.forEach((doc) => {
    total++;
    const data = doc.data();
    tickets.push(data);
    if (data.status === 'open' || data.status === 'new') open++;
    if (data.status === 'in_progress' || data.status === 'pending customer') inProgress++;
    if (data.status === 'resolved' || data.status === 'closed') resolved++;
    if (!data.assignedAgentId) unassigned++;
  });

  // Time Series logic (last 7 days)
  const last7Days = Array.from({length: 7}, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    return {
      date: d.toISOString().split('T')[0],
      shortDate: d.toLocaleDateString('en-US', { weekday: 'short', month: 'numeric', day: 'numeric' }),
      count: 0
    };
  }).reverse();

  tickets.forEach(ticket => {
    if (ticket.createdAt && ticket.createdAt.toDate) {
      const ticketDate = ticket.createdAt.toDate().toISOString().split('T')[0];
      const dayMatch = last7Days.find(d => d.date === ticketDate);
      if (dayMatch) {
        dayMatch.count++;
      }
    }
  });

  return { total, open, inProgress, resolved, unassigned, timeSeriesData: last7Days };
};

const PIE_COLORS = ['#4f46e5', '#3b82f6', '#10b981']; 

export default function AgentDashboard() {
  const { profile, role } = useAuth();
  const { theme } = useTheme();

  const { data: stats, isLoading: loading } = useQuery({
    queryKey: ["agentDashboard"],
    queryFn: fetchAgentStats,
    initialData: { total: 0, open: 0, inProgress: 0, resolved: 0, unassigned: 0, timeSeriesData: [] },
  });

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "MORNING";
    if (hour < 17) return "AFTERNOON";
    return "EVENING";
  };

  const statusData = [
    { name: 'Open', value: stats.open },
    { name: 'In Progress', value: stats.inProgress },
    { name: 'Resolved', value: stats.resolved },
  ].filter(item => item.value > 0);

  const tooltipStyle = {
    backgroundColor: theme === 'dark' ? '#000' : '#fff',
    borderColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
    color: theme === 'dark' ? '#fff' : '#000',
    borderRadius: '0px',
    padding: '12px',
    boxShadow: '0 0 20px rgba(0,0,0,0.2)'
  };

  if (loading) {
    return (
      <div className="w-full h-full p-4 sm:p-8 flex items-center justify-center bg-white dark:bg-black">
        <div className="w-16 h-16 border-4 border-black/10 dark:border-white/10 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen p-4 sm:p-8 bg-white dark:bg-black text-black dark:text-white transition-colors duration-500 animate-in fade-in">
      <div className="max-w-7xl mx-auto space-y-8 pb-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-black/10 dark:border-white/10 pb-6">
          <div>
            <div className="inline-flex items-center px-3 py-1 text-[10px] font-bold transition-colors mb-4 bg-primary/10 text-primary uppercase tracking-[0.2em] border border-primary/20">
              // OPERATIVE.WORKSPACE
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-[0.2em] uppercase">
              {getGreeting()}, {profile?.name?.split(' ')[0] || 'AGENT'}
            </h1>
            <p className="text-black/50 dark:text-white/50 mt-2 text-xs font-bold tracking-widest uppercase">
              Queue health, assignments, and resolution metrics.
            </p>
          </div>
          <div className="flex gap-3">
            {role === 'admin' && (
              <Link to="/admin">
                <Button variant="outline" className="h-10 rounded-none bg-transparent border-black/20 dark:border-white/20 text-xs font-bold uppercase tracking-widest hover:bg-black/10 dark:hover:bg-white/10 text-black dark:text-white">
                  <Users className="mr-2 h-4 w-4" /> USER MANAGEMENT
                </Button>
              </Link>
            )}
            <Link to="/tickets">
              <Button className="h-10 rounded-none bg-primary text-white hover:bg-primary/90 text-xs font-bold uppercase tracking-widest shadow-[0_0_15px_rgba(79,70,229,0.4)]">
                <Ticket className="mr-2 h-4 w-4" /> TICKET QUEUE
              </Button>
            </Link>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Tickets */}
          <div className="bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 p-6 flex flex-col relative overflow-hidden group hover:border-black/30 dark:hover:border-white/30 transition-colors">
            <div className="absolute -right-6 -top-6 w-24 h-24 bg-black/5 dark:bg-white/5 rounded-full blur-2xl group-hover:bg-primary/20 transition-colors" />
            <div className="flex items-center justify-between mb-4 relative z-10">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-black/60 dark:text-white/60">TOTAL INCIDENTS</h3>
              <Ticket className="h-4 w-4 text-black/40 dark:text-white/40" />
            </div>
            <div className="text-4xl font-black tracking-widest relative z-10">{stats.total}</div>
          </div>
          
          {/* Unassigned Tickets */}
          <div className="bg-amber-500/10 border border-amber-500/20 p-6 flex flex-col relative overflow-hidden group hover:border-amber-500/40 transition-colors">
            <div className="absolute -right-6 -top-6 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/30 transition-colors" />
            <div className="flex items-center justify-between mb-4 relative z-10">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">UNASSIGNED / TRIAGE</h3>
              <Clock className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            </div>
            <div className="text-4xl font-black tracking-widest text-amber-600 dark:text-amber-400 relative z-10">{stats.unassigned}</div>
          </div>
          
          {/* In Progress Tickets */}
          <div className="bg-blue-500/10 border border-blue-500/20 p-6 flex flex-col relative overflow-hidden group hover:border-blue-500/40 transition-colors">
            <div className="absolute -right-6 -top-6 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/30 transition-colors" />
            <div className="flex items-center justify-between mb-4 relative z-10">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">IN PROGRESS</h3>
              <Activity className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="text-4xl font-black tracking-widest text-blue-600 dark:text-blue-400 relative z-10">{stats.inProgress}</div>
          </div>
          
          {/* Resolved Tickets */}
          <div className="bg-emerald-500/10 border border-emerald-500/20 p-6 flex flex-col relative overflow-hidden group hover:border-emerald-500/40 transition-colors">
            <div className="absolute -right-6 -top-6 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/30 transition-colors" />
            <div className="flex items-center justify-between mb-4 relative z-10">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">RESOLVED</h3>
              <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div className="text-4xl font-black tracking-widest text-emerald-600 dark:text-emerald-400 relative z-10">{stats.resolved}</div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Volume Over Time (Bar Chart) */}
          <div className="lg:col-span-2 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 p-6 flex flex-col">
            <div className="flex items-center gap-3 mb-8">
              <Activity className="h-5 w-5 text-primary" />
              <h2 className="text-sm font-bold uppercase tracking-widest">SYSTEM INCIDENTS (LAST 7 DAYS)</h2>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.timeSeriesData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#333' : '#e5e7eb'} vertical={false} />
                  <XAxis 
                    dataKey="shortDate" 
                    stroke={theme === 'dark' ? '#888' : '#666'} 
                    fontSize={10}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis 
                    stroke={theme === 'dark' ? '#888' : '#666'} 
                    fontSize={10}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip 
                    contentStyle={tooltipStyle}
                    cursor={{fill: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}}
                  />
                  <Bar 
                    dataKey="count" 
                    fill="#4f46e5" 
                    radius={[4, 4, 0, 0]} 
                    name="Tickets"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Status Breakdown (Donut Chart) */}
          <div className="bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 p-6 flex flex-col">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-2 h-2 bg-accent" />
              <h2 className="text-sm font-bold uppercase tracking-widest">STATUS DISTRIBUTION</h2>
            </div>
            <div className="h-[300px] w-full flex items-center justify-center">
              {statusData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={5}
                      dataKey="value"
                      stroke="none"
                    >
                      {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={tooltipStyle} />
                    <Legend 
                      verticalAlign="bottom" 
                      height={36} 
                      iconType="circle"
                      wrapperStyle={{ fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="text-xs text-black/40 dark:text-white/40 uppercase tracking-widest font-bold">
                  NO DATA AVAILABLE
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Tools */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 border-l-4 border-l-emerald-500 p-6 flex flex-col relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
            <h2 className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest mb-4 text-black dark:text-white">
              <FileText className="h-4 w-4 text-emerald-500" />
              KNOWLEDGE BASE MANAGEMENT
            </h2>
            <p className="text-black/50 dark:text-white/50 text-xs tracking-widest uppercase leading-relaxed mb-6 font-bold">
              Keep the self-service portal updated to reduce ticket volume. Add new articles based on recent trends.
            </p>
            <div className="flex gap-4 mt-auto">
              <Link to="/kb/new">
                <Button className="h-10 rounded-none bg-emerald-500 text-white hover:bg-emerald-600 text-[10px] font-bold uppercase tracking-widest shadow-[0_0_15px_rgba(16,185,129,0.3)] border border-emerald-500">
                  WRITE ARTICLE
                </Button>
              </Link>
              <Link to="/kb">
                <Button variant="outline" className="h-10 rounded-none bg-transparent border-black/20 dark:border-white/20 hover:bg-black/10 dark:hover:bg-white/10 text-[10px] font-bold uppercase tracking-widest text-black dark:text-white">
                  BROWSE KB
                </Button>
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
