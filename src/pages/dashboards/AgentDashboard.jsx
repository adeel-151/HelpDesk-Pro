import { useAuth } from "@/features/auth/AuthProvider";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Users, Ticket, CheckCircle2, Clock, Activity, FileText } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { collection, query, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";

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
  
  snapshot.forEach((doc) => {
    total++;
    const data = doc.data();
    if (data.status === 'open') open++;
    if (data.status === 'in_progress') inProgress++;
    if (data.status === 'resolved' || data.status === 'closed') resolved++;
    if (!data.assignedTo) unassigned++;
  });

  return { total, open, inProgress, resolved, unassigned };
};

export default function AgentDashboard() {
  const { user, profile, role } = useAuth();

  const { data: stats, isLoading: loading } = useQuery({
    queryKey: ["agentDashboard"],
    queryFn: fetchAgentStats,
    initialData: { total: 0, open: 0, inProgress: 0, resolved: 0, unassigned: 0 },
  });

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  // Chart data
  const activityData = [
    { name: 'Mon', tickets: 12 },
    { name: 'Tue', tickets: 19 },
    { name: 'Wed', tickets: 15 },
    { name: 'Thu', tickets: 22 },
    { name: 'Fri', tickets: 28 },
    { name: 'Sat', tickets: 10 },
    { name: 'Sun', tickets: 5 },
  ];

  const statusData = [
    { name: 'Open', value: stats.open, color: '#f59e0b' },
    { name: 'In Progress', value: stats.inProgress, color: '#3b82f6' },
    { name: 'Resolved', value: stats.resolved, color: '#10b981' },
  ];

  const kpiCards = [
    { label: "Total Tickets", value: stats.total, icon: <Ticket className="h-5 w-5" />, color: "text-foreground", bgColor: "bg-muted/50", subtitle: "+20% from last month" },
    { label: "Unassigned", value: stats.unassigned, icon: <Clock className="h-5 w-5" />, color: "text-amber-500", bgColor: "bg-amber-500/10", subtitle: "Requires immediate triage" },
    { label: "In Progress", value: stats.inProgress, icon: <Activity className="h-5 w-5" />, color: "text-blue-500", bgColor: "bg-blue-500/10", subtitle: "Currently being handled" },
    { label: "Resolved", value: stats.resolved, icon: <CheckCircle2 className="h-5 w-5" />, color: "text-emerald-500", bgColor: "bg-emerald-500/10", subtitle: "Successfully closed" },
  ];

  return (
    <motion.div
      variants={stagger}
      initial="initial"
      animate="animate"
      className="space-y-8 pb-12"
    >
      {/* Welcome & Context */}
      <motion.div variants={fadeUp} className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold mb-3 bg-primary/10 text-primary border-primary/20 uppercase tracking-wider">
            {role} Workspace
          </div>
          <h2 className="text-3xl font-bold tracking-tight">
            {getGreeting()}, {profile?.name?.split(' ')[0] || 'Agent'}
          </h2>
          <p className="text-muted-foreground mt-1">
            Monitor queue health, assign tickets, and analyze support metrics.
          </p>
        </div>
        <div className="flex gap-3">
          {role === 'admin' && (
            <Link to="/admin">
              <Button variant="outline"><Users className="mr-2 h-4 w-4" /> Manage Users</Button>
            </Link>
          )}
          <Link to="/tickets">
            <Button><Ticket className="mr-2 h-4 w-4" /> Open Ticket Queue</Button>
          </Link>
        </div>
      </motion.div>

      {/* KPI Cards */}
      <motion.div variants={fadeUp} className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {kpiCards.map((kpi, i) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: i * 0.1, type: "spring", stiffness: 200 }}
          >
            <Card className="bg-card hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between space-y-0 pb-2">
                  <p className="text-sm font-medium text-muted-foreground">{kpi.label}</p>
                  <div className={`p-2 rounded-lg ${kpi.bgColor}`}>
                    <div className={kpi.color}>{kpi.icon}</div>
                  </div>
                </div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + i * 0.1, type: "spring", stiffness: 200 }}
                  className={`text-3xl font-black ${kpi.color}`}
                >
                  {loading ? "-" : kpi.value}
                </motion.div>
                <p className="text-xs text-muted-foreground mt-1">{kpi.subtitle}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Charts Section */}
      <motion.div variants={fadeUp} className="grid lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <Card className="lg:col-span-2 hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle>Ticket Volume (Last 7 Days)</CardTitle>
            <CardDescription>Number of new tickets created per day.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={activityData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <defs>
                    <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(238, 76%, 60%)" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="hsl(238, 76%, 60%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.5} />
                  <XAxis dataKey="name" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                    itemStyle={{ color: 'var(--foreground)' }}
                  />
                  <Line type="monotone" dataKey="tickets" stroke="var(--primary)" strokeWidth={3} dot={{ r: 5, fill: 'var(--primary)', strokeWidth: 0 }} activeDot={{ r: 7 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Pie Chart */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle>Status Distribution</CardTitle>
            <CardDescription>Current state of all tickets</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center">
            <div className="h-[220px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', borderRadius: '12px' }}
                    itemStyle={{ color: 'var(--foreground)' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 mt-4 w-full">
              {statusData.map((entry, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
                  <span className="text-sm font-medium">{entry.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Tools */}
      <motion.div variants={fadeUp} className="grid md:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-br from-card to-card border-l-4 border-l-emerald-500 hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-emerald-500" />
              Knowledge Base Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm mb-6">
              Keep the self-service portal updated to reduce ticket volume. Add new articles or update existing ones based on recent trends.
            </p>
            <div className="flex gap-3">
              <Link to="/kb/new">
                <Button variant="outline" className="border-emerald-500/20 text-emerald-600 hover:bg-emerald-500/10">Write Article</Button>
              </Link>
              <Link to="/kb">
                <Button variant="ghost">Browse KB</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
