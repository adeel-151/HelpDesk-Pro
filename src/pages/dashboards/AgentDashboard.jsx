import { useAuth } from "@/features/auth/AuthProvider";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  const statusData = [
    { name: 'Open', value: stats.open },
    { name: 'In Progress', value: stats.inProgress },
    { name: 'Resolved', value: stats.resolved },
  ].filter(item => item.value > 0);

  const tooltipStyle = {
    backgroundColor: theme === 'dark' ? '#1e1e1e' : '#fff',
    borderColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
    color: theme === 'dark' ? '#fff' : '#000',
    borderRadius: '8px',
    padding: '12px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
  };

  if (loading) {
    return (
      <div className="w-full h-[80vh] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-muted border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <motion.div
      variants={stagger}
      initial="initial"
      animate="animate"
      className="space-y-8 max-w-7xl mx-auto pb-12 pt-8 px-4 sm:px-8"
    >
      {/* Header */}
      <motion.div
        variants={fadeUp}
        className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent rounded-2xl p-8 border border-primary/20 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[80px] rounded-full pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-2">
              {getGreeting()}, {profile?.name?.split(' ')[0] || 'Agent'}!
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Queue health, assignments, and resolution metrics.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/agent/tickets">
              <Button className="rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm">
                <Ticket className="mr-2 h-4 w-4" /> Ticket Queue
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Metrics Grid */}
      <motion.div variants={fadeUp} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Tickets */}
        <Card className="hover:shadow-md transition-shadow group relative overflow-hidden border-border">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors" />
          <CardHeader className="pb-2 flex flex-row items-center justify-between relative z-10">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Incidents</CardTitle>
            <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
              <Ticket className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        
        {/* Unassigned Tickets */}
        <Card className="hover:shadow-md transition-shadow group relative overflow-hidden border-border">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl group-hover:bg-amber-500/10 transition-colors" />
          <CardHeader className="pb-2 flex flex-row items-center justify-between relative z-10">
            <CardTitle className="text-sm font-medium text-amber-600 dark:text-amber-500">Unassigned / Triage</CardTitle>
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-500 flex items-center justify-center">
              <Clock className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl font-bold text-amber-600 dark:text-amber-500">{stats.unassigned}</div>
          </CardContent>
        </Card>
        
        {/* In Progress Tickets */}
        <Card className="hover:shadow-md transition-shadow group relative overflow-hidden border-border">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl group-hover:bg-blue-500/10 transition-colors" />
          <CardHeader className="pb-2 flex flex-row items-center justify-between relative z-10">
            <CardTitle className="text-sm font-medium text-blue-600 dark:text-blue-500">In Progress</CardTitle>
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-500 flex items-center justify-center">
              <Activity className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-500">{stats.inProgress}</div>
          </CardContent>
        </Card>
        
        {/* Resolved Tickets */}
        <Card className="hover:shadow-md transition-shadow group relative overflow-hidden border-border">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/10 transition-colors" />
          <CardHeader className="pb-2 flex flex-row items-center justify-between relative z-10">
            <CardTitle className="text-sm font-medium text-emerald-600 dark:text-emerald-500">Resolved</CardTitle>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-500 flex items-center justify-center">
              <CheckCircle2 className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-500">{stats.resolved}</div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Charts Section */}
      <motion.div variants={fadeUp} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Volume Over Time (Bar Chart) */}
        <Card className="lg:col-span-2 flex flex-col h-full hover:shadow-md transition-shadow border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Activity className="h-5 w-5 text-primary" />
              Incident Volume
            </CardTitle>
            <CardDescription>System incidents over the last 7 days</CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.timeSeriesData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#333' : '#e5e7eb'} vertical={false} />
                  <XAxis 
                    dataKey="shortDate" 
                    stroke={theme === 'dark' ? '#888' : '#666'} 
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis 
                    stroke={theme === 'dark' ? '#888' : '#666'} 
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip 
                    contentStyle={tooltipStyle}
                    cursor={{fill: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}}
                  />
                  <Bar 
                    dataKey="count" 
                    fill="hsl(var(--primary))" 
                    radius={[4, 4, 0, 0]} 
                    name="Tickets"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Status Breakdown (Donut Chart) */}
        <Card className="flex flex-col h-full hover:shadow-md transition-shadow border-border">
          <CardHeader>
            <CardTitle className="text-lg">Status Distribution</CardTitle>
            <CardDescription>Current state of all tickets</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col items-center justify-center">
            <div className="h-[250px] w-full">
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
                      wrapperStyle={{ fontSize: '12px', fontWeight: '500' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="text-sm text-muted-foreground flex items-center justify-center h-full">
                  No data available
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Tools */}
      <motion.div variants={fadeUp} className="grid md:grid-cols-2 gap-6">
        <Card className="hover:shadow-md transition-shadow border-border overflow-hidden relative group">
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl group-hover:bg-emerald-500/20 transition-colors pointer-events-none" />
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <div className="p-2 bg-emerald-500/10 rounded-lg">
                <FileText className="h-5 w-5 text-emerald-500" />
              </div>
              Knowledge Base Management
            </CardTitle>
            <CardDescription>
              Keep the self-service portal updated to reduce ticket volume. Add new articles based on recent trends.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex gap-4">
            <Link to="/agent/kb/new">
              <Button className="rounded-xl bg-emerald-500 text-white hover:bg-emerald-600 shadow-sm border border-emerald-500">
                Write Article
              </Button>
            </Link>
            <Link to="/agent/kb">
              <Button variant="outline" className="rounded-xl">
                Browse KB
              </Button>
            </Link>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
