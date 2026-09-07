import { useState, useEffect } from "react";
import { updateUserRole } from "@/features/admin/services/adminService";
import { toast } from "sonner";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { useTheme } from "next-themes";
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase/config";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Users, Ticket, CheckCircle2, AlertCircle, Activity, MoreVertical } from "lucide-react";

const PIE_COLORS = ['#000', '#666', '#ccc']; // Monochrome for cyber theme

export default function AdminDashboard() {
  const { theme } = useTheme();

  const [users, setUsers] = useState([]);
  const [metrics, setMetrics] = useState({ totalUsers: 0, totalTickets: 0, openTickets: 0, resolvedTickets: 0 });
  const [chartData, setChartData] = useState({ statusData: [], timeSeriesData: [] });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Users Realtime Listener
    const usersUnsub = onSnapshot(collection(db, "users"), (snapshot) => {
      const usersData = snapshot.docs.map(doc => ({ uid: doc.id, ...doc.data() }));
      setUsers(usersData);
      setMetrics(prev => ({ ...prev, totalUsers: snapshot.size }));
    });

    // Tickets Realtime Listener
    const ticketsUnsub = onSnapshot(collection(db, "tickets"), (snapshot) => {
      const tickets = snapshot.docs.map(doc => doc.data());
      
      let openTickets = 0;
      let resolvedTickets = 0;
      const statusCounts = {};

      tickets.forEach(ticket => {
        const status = ticket.status || 'unknown';
        statusCounts[status] = (statusCounts[status] || 0) + 1;
        if (["new", "open", "pending customer"].includes(status)) openTickets++;
        if (status === "resolved") resolvedTickets++;
      });

      setMetrics(prev => ({ ...prev, totalTickets: snapshot.size, openTickets, resolvedTickets }));

      // Chart Data
      const statusData = [
        { name: 'New/Open', value: (statusCounts['new'] || 0) + (statusCounts['open'] || 0) + (statusCounts['pending customer'] || 0) },
        { name: 'Resolved', value: statusCounts['resolved'] || 0 },
        { name: 'Closed', value: statusCounts['closed'] || 0 }
      ].filter(item => item.value > 0);

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

      setChartData({ statusData, timeSeriesData: last7Days });
      setIsLoading(false);
    });

    return () => {
      usersUnsub();
      ticketsUnsub();
    };
  }, []);

  const handleRoleChange = async (userId, newRole) => {
    try {
      await updateUserRole(userId, newRole);
      // Removed queryClient.invalidateQueries since we now use realtime onSnapshot
      toast.success("ROLE_UPDATED_SUCCESSFULLY");
    } catch (error) {
      toast.error("FAILED_TO_UPDATE_ROLE");
    }
  };

  const getRoleBadge = (role) => {
    switch (role) {
      case "admin": 
        return <span className="inline-flex items-center px-2 py-1 text-[10px] font-bold rounded-none bg-red-500 text-white uppercase tracking-widest border border-red-500">[{role}]</span>;
      case "agent": 
        return <span className="inline-flex items-center px-2 py-1 text-[10px] font-bold rounded-none bg-primary text-primary-foreground uppercase tracking-widest border border-primary">[{role}]</span>;
      default: 
        return <span className="inline-flex items-center px-2 py-1 text-[10px] font-bold rounded-none bg-transparent text-foreground uppercase tracking-widest border border-black/20 dark:border-white/20">[{role}]</span>;
    }
  };

  if (isLoading) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-background">
        <div className="text-xs font-bold uppercase tracking-[0.2em] animate-pulse">
          INITIALIZING_SYSTEM_METRICS...
        </div>
      </div>
    );
  }

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

  return (
    <div className="space-y-6 sm:space-y-8 max-w-7xl mx-auto pb-12 pt-4 sm:pt-8 px-3 sm:px-4 md:px-8 bg-background w-full">
      {/* Welcome Banner */}
      <div className="border-2 border-black dark:border-white p-4 sm:p-8 relative overflow-hidden bg-white/5 dark:bg-black/5">
        <div className="absolute top-0 right-0 p-2 text-[8px] sm:text-[10px] uppercase tracking-widest sm:tracking-[0.2em] text-muted-foreground font-bold">
          // GLOBAL_COMMAND_CENTER
        </div>
        <div className="relative z-10 mt-2 sm:mt-0">
          <h2 className="text-xl sm:text-3xl md:text-5xl font-black tracking-wider sm:tracking-[0.2em] uppercase mb-2 sm:mb-4 text-foreground break-all sm:break-words">
            SYSTEM_OVERVIEW
          </h2>
          <p className="text-muted-foreground text-[10px] sm:text-xs font-bold uppercase tracking-wider sm:tracking-widest max-w-2xl leading-relaxed sm:leading-loose">
            Monitor system health, manage incidents, and control authorization protocols globally. ALL ACTIONS ARE LOGGED.
          </p>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Total Users */}
        <div className="border border-black/20 dark:border-white/20 bg-card p-4 sm:p-6 flex flex-col relative group hover:border-primary transition-colors">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-[10px] font-bold uppercase tracking-wider sm:tracking-[0.2em] text-muted-foreground break-all">Active_Users</h3>
            <Users className="h-4 w-4 text-primary shrink-0 ml-2" />
          </div>
          <div className="text-2xl sm:text-4xl font-black tracking-tighter mt-auto">{metrics?.totalUsers || 0}</div>
        </div>
        
        {/* Total Tickets */}
        <div className="border border-black/20 dark:border-white/20 bg-card p-4 sm:p-6 flex flex-col relative group hover:border-primary transition-colors">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-[10px] font-bold uppercase tracking-wider sm:tracking-[0.2em] text-muted-foreground break-all">Total_Incidents</h3>
            <Ticket className="h-4 w-4 text-primary shrink-0 ml-2" />
          </div>
          <div className="text-2xl sm:text-4xl font-black tracking-tighter mt-auto">{metrics?.totalTickets || 0}</div>
        </div>
        
        {/* Open Tickets */}
        <div className="border border-black/20 dark:border-white/20 bg-card p-4 sm:p-6 flex flex-col relative group hover:border-amber-500 transition-colors">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-[10px] font-bold uppercase tracking-wider sm:tracking-[0.2em] text-amber-500 break-all">Unresolved</h3>
            <AlertCircle className="h-4 w-4 text-amber-500 shrink-0 ml-2" />
          </div>
          <div className="text-2xl sm:text-4xl font-black tracking-tighter mt-auto text-amber-500">{metrics?.openTickets || 0}</div>
        </div>
        
        {/* Resolved Tickets */}
        <div className="border border-black/20 dark:border-white/20 bg-card p-4 sm:p-6 flex flex-col relative group hover:border-emerald-500 transition-colors">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-[10px] font-bold uppercase tracking-wider sm:tracking-[0.2em] text-emerald-500 break-all">Resolved</h3>
            <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 ml-2" />
          </div>
          <div className="text-2xl sm:text-4xl font-black tracking-tighter mt-auto text-emerald-500">{metrics?.resolvedTickets || 0}</div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Volume Over Time (Bar Chart) */}
        <div className="lg:col-span-2 border border-black/20 dark:border-white/20 p-4 sm:p-6 flex flex-col min-w-0 w-full overflow-hidden">
          <div className="mb-4 sm:mb-6 flex justify-between items-center border-b border-black/10 dark:border-white/10 pb-4">
            <div className="w-full">
              <h3 className="text-[10px] sm:text-xs font-bold uppercase tracking-wider sm:tracking-[0.2em] flex items-center gap-2 break-all sm:break-words">
                <Activity className="h-4 w-4 text-primary shrink-0" /> INCIDENT_VOLUME
              </h3>
              <p className="text-[8px] sm:text-[10px] text-muted-foreground uppercase tracking-widest mt-1">LAST_7_DAYS</p>
            </div>
          </div>
          <div className="h-[200px] sm:h-[300px] w-full mt-2 sm:mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData.timeSeriesData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'} vertical={false} />
                <XAxis 
                  dataKey="shortDate" 
                  stroke={theme === 'dark' ? '#fff' : '#000'} 
                  fontSize={8}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  stroke={theme === 'dark' ? '#fff' : '#000'} 
                  fontSize={8}
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
                  radius={[0, 0, 0, 0]} 
                  name="INCIDENTS"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Status Breakdown (Donut Chart) */}
        <div className="border border-black/20 dark:border-white/20 p-4 sm:p-6 flex flex-col min-w-0 w-full overflow-hidden">
          <div className="mb-4 sm:mb-6 flex justify-between items-center border-b border-black/10 dark:border-white/10 pb-4">
            <div className="w-full">
              <h3 className="text-[10px] sm:text-xs font-bold uppercase tracking-wider sm:tracking-[0.2em] break-all sm:break-words">STATUS_DISTRIBUTION</h3>
              <p className="text-[8px] sm:text-[10px] text-muted-foreground uppercase tracking-widest mt-1">CURRENT_STATE</p>
            </div>
          </div>
          <div className="h-[200px] sm:h-[300px] w-full flex items-center justify-center">
            {chartData.statusData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                  <Pie
                    data={chartData.statusData}
                    cx="50%"
                    cy="50%"
                    innerRadius="50%"
                    outerRadius="80%"
                    paddingAngle={2}
                    dataKey="value"
                    stroke={theme === 'dark' ? '#000' : '#fff'}
                    strokeWidth={2}
                  >
                    {chartData.statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={['#4f46e5', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'][index % 5]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={tooltipStyle} />
                  <Legend 
                    verticalAlign="bottom" 
                    height={36} 
                    iconType="square"
                    wrapperStyle={{ fontSize: '8px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground flex items-center justify-center h-full break-words text-center px-4">
                NO_DATA_AVAILABLE
              </div>
            )}
          </div>
        </div>
      </div>

      {/* User Management Table */}
      <div className="border border-black/20 dark:border-white/20 w-full overflow-hidden flex flex-col">
        <div className="p-4 sm:p-6 border-b border-black/20 dark:border-white/20 flex justify-between items-center bg-black/5 dark:bg-white/5">
          <div className="w-full">
            <h3 className="text-[10px] sm:text-xs font-bold uppercase tracking-wider sm:tracking-[0.2em] break-all sm:break-words">OPERATIVE_DIRECTORY</h3>
            <p className="text-[8px] sm:text-[10px] text-muted-foreground uppercase tracking-widest mt-1 break-all sm:break-words">PERSONNEL_DATABASE</p>
          </div>
        </div>
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[500px]">
            <thead>
              <tr className="border-b border-black/20 dark:border-white/20 bg-background">
                <th className="px-3 sm:px-6 py-3 sm:py-4 text-[10px] font-bold text-muted-foreground uppercase tracking-wider sm:tracking-[0.2em]">Email</th>
                <th className="px-3 sm:px-6 py-3 sm:py-4 text-[10px] font-bold text-muted-foreground uppercase tracking-wider sm:tracking-[0.2em]">Name</th>
                <th className="px-3 sm:px-6 py-3 sm:py-4 text-[10px] font-bold text-muted-foreground uppercase tracking-wider sm:tracking-[0.2em]">Role</th>
                <th className="px-3 sm:px-6 py-3 sm:py-4 text-[10px] font-bold text-muted-foreground uppercase tracking-wider sm:tracking-[0.2em] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/10 dark:divide-white/10">
              {users.map((u) => (
                <tr key={u.uid} className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors group">
                  <td className="px-3 sm:px-6 py-3 sm:py-4 text-[10px] sm:text-xs font-bold uppercase tracking-wider break-all">{u.email}</td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4 text-[10px] sm:text-xs uppercase tracking-wider text-muted-foreground">{u.displayName || "UNKNOWN"}</td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4">{getRoleBadge(u.role)}</td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-none border border-transparent group-hover:border-black/20 dark:group-hover:border-white/20">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="rounded-none border-2 border-black dark:border-white p-0">
                        <DropdownMenuItem className="cursor-pointer rounded-none text-[10px] font-bold uppercase tracking-widest px-4 py-3 border-b border-black/10 dark:border-white/10" onClick={() => handleRoleChange(u.uid, "customer")}>
                          ASSIGN_CUSTOMER
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer rounded-none text-[10px] font-bold uppercase tracking-widest px-4 py-3 border-b border-black/10 dark:border-white/10" onClick={() => handleRoleChange(u.uid, "agent")}>
                          ASSIGN_AGENT
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer rounded-none text-[10px] font-bold uppercase tracking-widest px-4 py-3 text-red-500 hover:bg-red-500 hover:text-white" onClick={() => handleRoleChange(u.uid, "admin")}>
                          ASSIGN_ADMIN
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
    </div>
  );
}
