import { useAuth } from "@/features/auth/AuthProvider";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Ticket, CheckCircle2, Clock, Activity, FileText } from "lucide-react";
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
import { motion } from "framer-motion";

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

export default function AgentDashboard() {
  const { profile, role } = useAuth();
  const { theme } = useTheme();

  const { data: stats, isLoading: loading } = useQuery({
    queryKey: ["agentDashboard"],
    queryFn: fetchAgentStats,
    initialData: { total: 0, open: 0, inProgress: 0, resolved: 0, unassigned: 0, timeSeriesData: [] },
  });

  const statusData = [
    { name: 'Open', value: stats.open },
    { name: 'In Progress', value: stats.inProgress },
    { name: 'Resolved', value: stats.resolved },
  ].filter(item => item.value > 0);

  const tooltipStyle = {
    backgroundColor: theme === 'dark' ? '#000' : '#fff',
    borderColor: theme === 'dark' ? '#fff' : '#000',
    color: theme === 'dark' ? '#fff' : '#000',
    borderRadius: '0px',
    padding: '12px',
    border: '2px solid',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    fontSize: '10px',
    fontWeight: 'bold'
  };

  if (loading) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-background">
        <div className="text-xs font-bold uppercase tracking-[0.2em] animate-pulse">
          INITIALIZING_AGENT_DASHBOARD...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12 pt-8 px-4 sm:px-8 bg-background">
      {/* Header */}
      <div className="border-2 border-black dark:border-white p-8 relative overflow-hidden bg-white/5 dark:bg-black/5 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="absolute top-0 right-0 p-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-bold">
          // OPERATIVE_WORKSPACE
        </div>
        <div className="relative z-10">
          <h2 className="text-3xl md:text-5xl font-black tracking-[0.2em] uppercase mb-4 text-foreground">
            WELCOME, {profile?.name?.split(' ')[0] || 'AGENT'}
          </h2>
          <p className="text-muted-foreground text-xs font-bold uppercase tracking-widest max-w-2xl leading-loose">
            Queue health, assignments, and resolution metrics. ALL COMMUNIQUÉS ARE LOGGED.
          </p>
        </div>
        <div className="relative z-10 w-full md:w-auto">
          <Link to="/agent/tickets" className="block w-full">
            <Button className="w-full md:w-auto rounded-none bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90 font-bold uppercase tracking-widest text-xs h-12 px-6">
              <Ticket className="mr-2 h-4 w-4" /> ACCESS_QUEUE
            </Button>
          </Link>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Tickets */}
        <div className="border border-black/20 dark:border-white/20 bg-card p-6 flex flex-col relative group hover:border-primary transition-colors">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">TOTAL_INCIDENTS</h3>
            <Ticket className="h-4 w-4 text-primary" />
          </div>
          <div className="text-4xl font-black tracking-tighter mt-auto">{stats.total}</div>
        </div>
        
        {/* Unassigned Tickets */}
        <div className="border border-black/20 dark:border-white/20 bg-card p-6 flex flex-col relative group hover:border-amber-500 transition-colors">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-500">UNASSIGNED_TRIAGE</h3>
            <Clock className="h-4 w-4 text-amber-500" />
          </div>
          <div className="text-4xl font-black tracking-tighter mt-auto text-amber-500">{stats.unassigned}</div>
        </div>
        
        {/* In Progress Tickets */}
        <div className="border border-black/20 dark:border-white/20 bg-card p-6 flex flex-col relative group hover:border-blue-500 transition-colors">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-500">IN_PROGRESS</h3>
            <Activity className="h-4 w-4 text-blue-500" />
          </div>
          <div className="text-4xl font-black tracking-tighter mt-auto text-blue-500">{stats.inProgress}</div>
        </div>
        
        {/* Resolved Tickets */}
        <div className="border border-black/20 dark:border-white/20 bg-card p-6 flex flex-col relative group hover:border-emerald-500 transition-colors">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-500">RESOLVED</h3>
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
          </div>
          <div className="text-4xl font-black tracking-tighter mt-auto text-emerald-500">{stats.resolved}</div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Volume Over Time (Bar Chart) */}
        <div className="lg:col-span-2 border border-black/20 dark:border-white/20 p-6 flex flex-col">
          <div className="mb-6 flex justify-between items-center border-b border-black/10 dark:border-white/10 pb-4">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] flex items-center gap-2">
                <Activity className="h-4 w-4 text-primary" /> INCIDENT_VOLUME
              </h3>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">LAST_7_DAYS</p>
            </div>
          </div>
          <div className="h-[300px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.timeSeriesData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'} vertical={false} />
                <XAxis 
                  dataKey="shortDate" 
                  stroke={theme === 'dark' ? '#fff' : '#000'} 
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  stroke={theme === 'dark' ? '#fff' : '#000'} 
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
                  fill={theme === 'dark' ? '#fff' : '#000'} 
                  radius={[0, 0, 0, 0]} 
                  name="INCIDENTS"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Status Breakdown (Donut Chart) */}
        <div className="border border-black/20 dark:border-white/20 p-6 flex flex-col">
          <div className="mb-6 flex justify-between items-center border-b border-black/10 dark:border-white/10 pb-4">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.2em]">STATUS_DISTRIBUTION</h3>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">CURRENT_STATE</p>
            </div>
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
                    paddingAngle={2}
                    dataKey="value"
                    stroke={theme === 'dark' ? '#000' : '#fff'}
                    strokeWidth={2}
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={theme === 'dark' ? ['#fff', '#999', '#444'][index % 3] : ['#000', '#666', '#ccc'][index % 3]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={tooltipStyle} />
                  <Legend 
                    verticalAlign="bottom" 
                    height={36} 
                    iconType="square"
                    wrapperStyle={{ fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground flex items-center justify-center h-full">
                NO_DATA_AVAILABLE
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Tools */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="border border-black/20 dark:border-white/20 p-6 flex flex-col group hover:border-emerald-500 transition-colors">
          <div className="mb-4">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] flex items-center gap-2">
              <FileText className="h-4 w-4 text-emerald-500" /> KB_MANAGEMENT
            </h3>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-2 leading-relaxed">
              Keep the self-service portal updated to reduce ticket volume. Add new articles based on recent trends.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 mt-auto pt-4">
            <Link to="/agent/kb/new">
              <Button className="rounded-none bg-emerald-500 text-white hover:bg-emerald-600 font-bold uppercase tracking-widest text-xs h-10 px-4 border border-emerald-500">
                WRITE_ARTICLE
              </Button>
            </Link>
            <Link to="/agent/kb">
              <Button variant="outline" className="rounded-none border-black/20 dark:border-white/20 hover:border-black/50 dark:hover:border-white/50 font-bold uppercase tracking-widest text-xs h-10 px-4">
                BROWSE_KB
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
