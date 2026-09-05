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
import { ChevronDown, Users, Ticket, CheckCircle2, AlertCircle, Activity, MoreVertical } from "lucide-react";

const fetchAdminData = async () => {
  const [usersData, metricsData, chartData] = await Promise.all([
    getAllUsers(),
    getSystemMetrics(),
    getAdminChartData()
  ]);
  return { users: usersData, metrics: metricsData, chartData };
};

const PIE_COLORS = ['#4f46e5', '#10b981', '#3b82f6']; // Indigo, Emerald, Blue

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
      toast.success("Role updated successfully");
    } catch (error) {
      toast.error("Failed to update role");
    }
  };

  const getRoleBadge = (role) => {
    switch (role) {
      case "admin": 
        return <span className="inline-flex items-center px-2.5 py-0.5 text-xs font-semibold rounded-full bg-red-500/10 text-red-500 capitalize">{role}</span>;
      case "agent": 
        return <span className="inline-flex items-center px-2.5 py-0.5 text-xs font-semibold rounded-full bg-primary/10 text-primary capitalize">{role}</span>;
      default: 
        return <span className="inline-flex items-center px-2.5 py-0.5 text-xs font-semibold rounded-full bg-muted text-muted-foreground capitalize">{role}</span>;
    }
  };

  if (isLoading) {
    return (
      <div className="w-full h-[80vh] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-muted border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  const tooltipStyle = {
    backgroundColor: theme === 'dark' ? '#1e1e1e' : '#fff',
    borderColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
    color: theme === 'dark' ? '#fff' : '#000',
    borderRadius: '8px',
    padding: '12px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
  };

  return (
    <motion.div
      variants={stagger}
      initial="initial"
      animate="animate"
      className="space-y-8 max-w-7xl mx-auto pb-12 pt-8 px-4 sm:px-8"
    >
      {/* Welcome Banner */}
      <motion.div
        variants={fadeUp}
        className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent rounded-2xl p-8 border border-primary/20 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[80px] rounded-full pointer-events-none" />
        <div className="relative z-10">
          <h2 className="text-3xl font-bold tracking-tight mb-2">
            Welcome to the Command Center
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Monitor system health, manage incidents, and control authorization protocols globally.
          </p>
        </div>
      </motion.div>

      {/* Metrics Grid */}
      <motion.div variants={fadeUp} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Users */}
        <Card className="hover:shadow-md transition-shadow group relative overflow-hidden border-border">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors" />
          <CardHeader className="pb-2 flex flex-row items-center justify-between relative z-10">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Users</CardTitle>
            <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
              <Users className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl font-bold">{metrics?.totalUsers || 0}</div>
          </CardContent>
        </Card>
        
        {/* Total Tickets */}
        <Card className="hover:shadow-md transition-shadow group relative overflow-hidden border-border">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-accent/5 rounded-full blur-2xl group-hover:bg-accent/10 transition-colors" />
          <CardHeader className="pb-2 flex flex-row items-center justify-between relative z-10">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Incidents</CardTitle>
            <div className="w-8 h-8 rounded-lg bg-accent/10 text-accent flex items-center justify-center">
              <Ticket className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl font-bold">{metrics?.totalTickets || 0}</div>
          </CardContent>
        </Card>
        
        {/* Open Tickets */}
        <Card className="hover:shadow-md transition-shadow group relative overflow-hidden border-border">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl group-hover:bg-amber-500/10 transition-colors" />
          <CardHeader className="pb-2 flex flex-row items-center justify-between relative z-10">
            <CardTitle className="text-sm font-medium text-amber-600 dark:text-amber-500">Unresolved</CardTitle>
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-500 flex items-center justify-center">
              <AlertCircle className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl font-bold text-amber-600 dark:text-amber-500">{metrics?.openTickets || 0}</div>
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
            <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-500">{metrics?.resolvedTickets || 0}</div>
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
            <CardDescription>Tickets created over the last 7 days</CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData.timeSeriesData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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

      {/* User Management Table */}
      <motion.div variants={fadeUp}>
        <Card className="hover:shadow-md transition-shadow border-border">
          <CardHeader>
            <CardTitle className="text-lg">Operative Directory</CardTitle>
            <CardDescription>Complete list of registered personnel</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-y bg-muted/50">
                    <th className="px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Email</th>
                    <th className="px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Name</th>
                    <th className="px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Role</th>
                    <th className="px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {users.map((u) => (
                    <tr key={u.uid} className="hover:bg-muted/30 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium">{u.email}</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{u.displayName || "N/A"}</td>
                      <td className="px-6 py-4">{getRoleBadge(u.role)}</td>
                      <td className="px-6 py-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-muted">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="rounded-xl shadow-lg border-border">
                            <DropdownMenuItem className="cursor-pointer rounded-lg text-sm" onClick={() => handleRoleChange(u.uid, "customer")}>
                              Make Customer
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer rounded-lg text-sm" onClick={() => handleRoleChange(u.uid, "agent")}>
                              Make Agent
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer rounded-lg text-sm text-red-600 focus:bg-red-50 focus:text-red-600 dark:focus:bg-red-950/50" onClick={() => handleRoleChange(u.uid, "admin")}>
                              Make Admin
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
    </motion.div>
  );
}
