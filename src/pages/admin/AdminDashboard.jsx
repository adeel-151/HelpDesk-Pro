import { useState } from "react";
import { getAllUsers, updateUserRole, getSystemMetrics, getAdminChartData } from "@/features/admin/services/adminService";
import { toast } from "sonner";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Users, Ticket, CheckCircle2, AlertCircle, Activity, MoreVertical } from "lucide-react";

const fetchAdminData = async () => {
  const [usersData, metricsData, chartData] = await Promise.all([
    getAllUsers(),
    getSystemMetrics(),
    getAdminChartData()
  ]);
  return { users: usersData, metrics: metricsData, chartData };
};

const PIE_COLORS = ['#000', '#666', '#ccc']; // Monochrome for cyber theme

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
    <div className="space-y-6 sm:space-y-8 max-w-7xl mx-auto pb-12 pt-4 sm:pt-8 px-3 sm:px-4 md:px-8 bg-background">
      {/* Welcome Banner */}
      <div className="border-2 border-black dark:border-white p-4 sm:p-8 relative overflow-hidden bg-white/5 dark:bg-black/5">
        <div className="absolute top-0 right-0 p-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-bold">
          // GLOBAL_COMMAND_CENTER
        </div>
        <div className="relative z-10">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-black tracking-[0.1em] sm:tracking-[0.2em] uppercase mb-4 text-foreground">
            SYSTEM_OVERVIEW
          </h2>
          <p className="text-muted-foreground text-xs font-bold uppercase tracking-widest max-w-2xl leading-loose">
            Monitor system health, manage incidents, and control authorization protocols globally. ALL ACTIONS ARE LOGGED.
          </p>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        {/* Total Users */}
        <div className="border border-black/20 dark:border-white/20 bg-card p-6 flex flex-col relative group hover:border-primary transition-colors">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Active_Users</h3>
            <Users className="h-4 w-4 text-primary" />
          </div>
          <div className="text-2xl sm:text-4xl font-black tracking-tighter mt-auto">{metrics?.totalUsers || 0}</div>
        </div>
        
        {/* Total Tickets */}
        <div className="border border-black/20 dark:border-white/20 bg-card p-6 flex flex-col relative group hover:border-primary transition-colors">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Total_Incidents</h3>
            <Ticket className="h-4 w-4 text-primary" />
          </div>
          <div className="text-2xl sm:text-4xl font-black tracking-tighter mt-auto">{metrics?.totalTickets || 0}</div>
        </div>
        
        {/* Open Tickets */}
        <div className="border border-black/20 dark:border-white/20 bg-card p-6 flex flex-col relative group hover:border-amber-500 transition-colors">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-500">Unresolved</h3>
            <AlertCircle className="h-4 w-4 text-amber-500" />
          </div>
          <div className="text-2xl sm:text-4xl font-black tracking-tighter mt-auto text-amber-500">{metrics?.openTickets || 0}</div>
        </div>
        
        {/* Resolved Tickets */}
        <div className="border border-black/20 dark:border-white/20 bg-card p-6 flex flex-col relative group hover:border-emerald-500 transition-colors">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-500">Resolved</h3>
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
          </div>
          <div className="text-2xl sm:text-4xl font-black tracking-tighter mt-auto text-emerald-500">{metrics?.resolvedTickets || 0}</div>
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
          <div className="h-[250px] sm:h-[300px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData.timeSeriesData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
          <div className="h-[250px] sm:h-[300px] w-full flex items-center justify-center">
            {chartData.statusData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData.statusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                    stroke={theme === 'dark' ? '#000' : '#fff'}
                    strokeWidth={2}
                  >
                    {chartData.statusData.map((entry, index) => (
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

      {/* User Management Table */}
      <div className="border border-black/20 dark:border-white/20">
        <div className="p-6 border-b border-black/20 dark:border-white/20 flex justify-between items-center bg-black/5 dark:bg-white/5">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em]">OPERATIVE_DIRECTORY</h3>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">PERSONNEL_DATABASE</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-black/20 dark:border-white/20 bg-background">
                <th className="px-6 py-4 text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">Email</th>
                <th className="px-6 py-4 text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">Name</th>
                <th className="px-6 py-4 text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">Role</th>
                <th className="px-6 py-4 text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/10 dark:divide-white/10">
              {users.map((u) => (
                <tr key={u.uid} className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors group">
                  <td className="px-6 py-4 text-xs font-bold uppercase tracking-wider">{u.email}</td>
                  <td className="px-6 py-4 text-xs uppercase tracking-wider text-muted-foreground">{u.displayName || "UNKNOWN"}</td>
                  <td className="px-6 py-4">{getRoleBadge(u.role)}</td>
                  <td className="px-6 py-4 text-right">
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
