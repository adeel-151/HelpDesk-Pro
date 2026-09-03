import { useState } from "react";
import { getAllUsers, updateUserRole, getSystemMetrics, getAdminChartData } from "@/features/admin/services/adminService";
import { toast } from "sonner";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { useTheme } from "next-themes";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown, Users, Ticket, CheckCircle2, AlertCircle, Activity } from "lucide-react";

const fetchAdminData = async () => {
  const [usersData, metricsData, chartData] = await Promise.all([
    getAllUsers(),
    getSystemMetrics(),
    getAdminChartData()
  ]);
  return { users: usersData, metrics: metricsData, chartData };
};

const PIE_COLORS = ['#4f46e5', '#10b981', '#3b82f6']; // Indigo, Emerald, Blue

export default function AdminDashboard() {
  const queryClient = useQueryClient();
  const { theme } = useTheme();

  const { data, isLoading } = useQuery({
    queryKey: ["adminDashboard"],
    queryFn: fetchAdminData,
  });

  const users = data?.users || [];
  const metrics = data?.metrics || null;
  const chartData = data?.chartData || { statusData: [], timeSeriesData: [] };

  const handleRoleChange = async (userId, newRole) => {
    try {
      await updateUserRole(userId, newRole);
      queryClient.invalidateQueries({ queryKey: ["adminDashboard"] });
      toast.success("ROLE UPDATED SUCCESSFULLY");
    } catch (error) {
      toast.error("FAILED TO UPDATE ROLE");
    }
  };

  const getRoleBadge = (role) => {
    switch (role) {
      case "admin": 
        return <span className="inline-flex items-center px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest bg-red-500/10 text-red-500 border border-red-500/20">{role}</span>;
      case "agent": 
        return <span className="inline-flex items-center px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest bg-primary/10 text-primary border border-primary/20">{role}</span>;
      default: 
        return <span className="inline-flex items-center px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest bg-black/10 dark:bg-white/10 text-black dark:text-white border border-black/20 dark:border-white/20">{role}</span>;
    }
  };

  if (isLoading) {
    return (
      <div className="w-full h-full p-4 sm:p-8 flex items-center justify-center bg-white dark:bg-black">
        <div className="w-16 h-16 border-4 border-black/10 dark:border-white/10 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  const tooltipStyle = {
    backgroundColor: theme === 'dark' ? '#000' : '#fff',
    borderColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
    color: theme === 'dark' ? '#fff' : '#000',
    borderRadius: '0px',
    padding: '12px',
    boxShadow: '0 0 20px rgba(0,0,0,0.2)'
  };

  return (
    <div className="w-full min-h-screen p-4 sm:p-8 bg-white dark:bg-black text-black dark:text-white transition-colors duration-500 animate-in fade-in">
      <div className="max-w-7xl mx-auto space-y-8 pb-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-black/10 dark:border-white/10 pb-6">
          <div>
            <div className="inline-flex items-center px-3 py-1 text-[10px] font-bold transition-colors mb-4 bg-red-500 text-white uppercase tracking-[0.2em] shadow-[0_0_15px_rgba(239,68,68,0.5)]">
              // SYSTEM.ADMIN
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-[0.2em] uppercase">COMMAND CENTER</h1>
            <p className="text-black/50 dark:text-white/50 mt-2 text-xs font-bold tracking-widest uppercase">
              Global system monitoring and user authorization protocols.
            </p>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Users */}
          <div className="bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 p-6 flex flex-col relative overflow-hidden group hover:border-black/30 dark:hover:border-white/30 transition-colors">
            <div className="absolute -right-6 -top-6 w-24 h-24 bg-black/5 dark:bg-white/5 rounded-full blur-2xl group-hover:bg-primary/20 transition-colors" />
            <div className="flex items-center justify-between mb-4 relative z-10">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-black/60 dark:text-white/60">ACTIVE USERS</h3>
              <Users className="h-4 w-4 text-black/40 dark:text-white/40" />
            </div>
            <div className="text-4xl font-black tracking-widest relative z-10">{metrics?.totalUsers || 0}</div>
          </div>
          
          {/* Total Tickets */}
          <div className="bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 p-6 flex flex-col relative overflow-hidden group hover:border-black/30 dark:hover:border-white/30 transition-colors">
            <div className="absolute -right-6 -top-6 w-24 h-24 bg-black/5 dark:bg-white/5 rounded-full blur-2xl group-hover:bg-accent/20 transition-colors" />
            <div className="flex items-center justify-between mb-4 relative z-10">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-black/60 dark:text-white/60">TOTAL INCIDENTS</h3>
              <Ticket className="h-4 w-4 text-black/40 dark:text-white/40" />
            </div>
            <div className="text-4xl font-black tracking-widest relative z-10">{metrics?.totalTickets || 0}</div>
          </div>
          
          {/* Open Tickets */}
          <div className="bg-amber-500/10 border border-amber-500/20 p-6 flex flex-col relative overflow-hidden group hover:border-amber-500/40 transition-colors">
            <div className="absolute -right-6 -top-6 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/30 transition-colors" />
            <div className="flex items-center justify-between mb-4 relative z-10">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">UNRESOLVED</h3>
              <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            </div>
            <div className="text-4xl font-black tracking-widest text-amber-600 dark:text-amber-400 relative z-10">{metrics?.openTickets || 0}</div>
          </div>
          
          {/* Resolved Tickets */}
          <div className="bg-emerald-500/10 border border-emerald-500/20 p-6 flex flex-col relative overflow-hidden group hover:border-emerald-500/40 transition-colors">
            <div className="absolute -right-6 -top-6 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/30 transition-colors" />
            <div className="flex items-center justify-between mb-4 relative z-10">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">RESOLVED</h3>
              <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div className="text-4xl font-black tracking-widest text-emerald-600 dark:text-emerald-400 relative z-10">{metrics?.resolvedTickets || 0}</div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Volume Over Time (Bar Chart) */}
          <div className="lg:col-span-2 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 p-6 flex flex-col">
            <div className="flex items-center gap-3 mb-8">
              <Activity className="h-5 w-5 text-primary" />
              <h2 className="text-sm font-bold uppercase tracking-widest">INCIDENT VOLUME (LAST 7 DAYS)</h2>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData.timeSeriesData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
              {chartData.statusData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData.statusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={5}
                      dataKey="value"
                      stroke="none"
                    >
                      {chartData.statusData.map((entry, index) => (
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

        {/* User Management Table */}
        <div className="bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex flex-col">
          <div className="p-6 border-b border-black/10 dark:border-white/10">
            <h2 className="text-sm font-bold uppercase tracking-widest">OPERATIVE DIRECTORY</h2>
            <p className="text-xs text-black/50 dark:text-white/50 mt-1 uppercase tracking-widest">Complete list of registered personnel</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5">
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-black/50 dark:text-white/50">EMAIL</th>
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-black/50 dark:text-white/50">NAME</th>
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-black/50 dark:text-white/50">AUTHORIZATION</th>
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-black/50 dark:text-white/50 text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/10 dark:divide-white/10">
                {users.map((u) => (
                  <tr key={u.uid} className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 text-sm font-bold">{u.email}</td>
                    <td className="px-6 py-4 text-sm text-black/70 dark:text-white/70">{u.displayName || "N/A"}</td>
                    <td className="px-6 py-4">{getRoleBadge(u.role)}</td>
                    <td className="px-6 py-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm" className="h-8 rounded-none bg-transparent border-black/20 dark:border-white/20 text-xs font-bold uppercase tracking-widest hover:bg-black/10 dark:hover:bg-white/10 hover:text-black dark:hover:text-white">
                            MODIFY <ChevronDown className="ml-2 h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="rounded-none border-black/20 dark:border-white/20 bg-white dark:bg-black">
                          <DropdownMenuItem className="text-xs font-bold uppercase tracking-widest focus:bg-black/10 dark:focus:bg-white/10 cursor-pointer" onClick={() => handleRoleChange(u.uid, "customer")}>
                            ASSIGN CUSTOMER
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-xs font-bold uppercase tracking-widest focus:bg-black/10 dark:focus:bg-white/10 cursor-pointer" onClick={() => handleRoleChange(u.uid, "agent")}>
                            ASSIGN AGENT
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-xs font-bold uppercase tracking-widest focus:bg-red-500/20 text-red-600 dark:text-red-400 cursor-pointer" onClick={() => handleRoleChange(u.uid, "admin")}>
                            ASSIGN ADMIN
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
    </div>
  );
}
