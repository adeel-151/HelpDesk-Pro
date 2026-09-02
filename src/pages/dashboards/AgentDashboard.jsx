import { useAuth } from "@/features/auth/AuthProvider";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Users, Ticket, CheckCircle2, Clock, Activity, FileText } from "lucide-react";
import { useEffect, useState } from "react";
import { collection, query, getDocs, orderBy, limit, where } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from "recharts";

export default function AgentDashboard() {
  const { user, profile, role } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    open: 0,
    inProgress: 0,
    resolved: 0,
    unassigned: 0
  });
  
  // Dummy data for charts (in a real app, this would be aggregated from Firestore)
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

  useEffect(() => {
    const fetchStats = async () => {
      try {
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

        setStats({ total, open, inProgress, resolved, unassigned });
      } catch (error) {
        console.error("Error fetching agent stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      
      {/* Welcome & Context */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 mb-3 bg-primary/10 text-primary border-primary/20 uppercase tracking-wider">
            {role} Workspace
          </div>
          <h2 className="text-3xl font-bold tracking-tight">Agent Command Center</h2>
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
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <Card className="bg-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <p className="text-sm font-medium text-muted-foreground">Total Tickets</p>
              <Ticket className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="text-3xl font-black">{loading ? "-" : stats.total}</div>
            <p className="text-xs text-muted-foreground mt-1">+20% from last month</p>
          </CardContent>
        </Card>
        <Card className="bg-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <p className="text-sm font-medium text-muted-foreground">Unassigned</p>
              <Clock className="h-4 w-4 text-amber-500" />
            </div>
            <div className="text-3xl font-black text-amber-500">{loading ? "-" : stats.unassigned}</div>
            <p className="text-xs text-muted-foreground mt-1">Requires immediate triage</p>
          </CardContent>
        </Card>
        <Card className="bg-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <p className="text-sm font-medium text-muted-foreground">In Progress</p>
              <Activity className="h-4 w-4 text-blue-500" />
            </div>
            <div className="text-3xl font-black text-blue-500">{loading ? "-" : stats.inProgress}</div>
            <p className="text-xs text-muted-foreground mt-1">Currently being handled</p>
          </CardContent>
        </Card>
        <Card className="bg-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <p className="text-sm font-medium text-muted-foreground">Resolved</p>
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            </div>
            <div className="text-3xl font-black text-emerald-500">{loading ? "-" : stats.resolved}</div>
            <p className="text-xs text-muted-foreground mt-1">Successfully closed</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid lg:grid-cols-3 gap-6">
        
        {/* Main Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Ticket Volume (Last 7 Days)</CardTitle>
            <CardDescription>Number of new tickets created per day.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={activityData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.5} />
                  <XAxis dataKey="name" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', borderRadius: '8px' }}
                    itemStyle={{ color: 'var(--foreground)' }}
                  />
                  <Line type="monotone" dataKey="tickets" stroke="var(--primary)" strokeWidth={3} dot={{ r: 4, fill: 'var(--primary)', strokeWidth: 0 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Pie Chart */}
        <Card>
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
                    contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', borderRadius: '8px' }}
                    itemStyle={{ color: 'var(--foreground)' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            {/* Custom Legend */}
            <div className="flex flex-wrap justify-center gap-4 mt-4 w-full">
              {statusData.map((entry, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></div>
                  <span className="text-sm font-medium">{entry.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

      </div>

      {/* Quick Tools */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-br from-card to-card border-l-4 border-l-emerald-500">
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
      </div>

    </div>
  );
}
