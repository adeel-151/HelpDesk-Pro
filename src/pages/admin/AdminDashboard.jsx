import { useEffect, useState } from "react";
import { getAllUsers, updateUserRole, getSystemMetrics } from "@/features/admin/services/adminService";
import { toast } from "sonner";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown, Users, Ticket, CheckCircle2, AlertCircle } from "lucide-react";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [metrics, setMetrics] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [usersData, metricsData] = await Promise.all([
        getAllUsers(),
        getSystemMetrics()
      ]);
      setUsers(usersData);
      setMetrics(metricsData);
    } catch (error) {
      toast.error("Failed to load admin data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRoleChange = async (userId, newRole) => {
    try {
      await updateUserRole(userId, newRole);
      setUsers(users.map(u => u.uid === userId ? { ...u, role: newRole } : u));
      toast.success("Role updated successfully");
    } catch (error) {
      toast.error("Failed to update role");
    }
  };

  const getRoleBadge = (role) => {
    switch (role) {
      case "admin": return <Badge variant="destructive" className="capitalize">{role}</Badge>;
      case "agent": return <Badge variant="default" className="capitalize bg-indigo-500 hover:bg-indigo-600">{role}</Badge>;
      default: return <Badge variant="secondary" className="capitalize">{role}</Badge>;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-muted/20 p-8">
        <div className="max-w-6xl mx-auto space-y-6">
          <Skeleton className="h-10 w-48" />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
          <Skeleton className="h-96 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/20 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage platform users and view system metrics.</p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics?.totalUsers || 0}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Tickets</CardTitle>
              <Ticket className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics?.totalTickets || 0}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Open / Pending</CardTitle>
              <AlertCircle className="h-4 w-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-600">{metrics?.openTickets || 0}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Resolved Tickets</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-600">{metrics?.resolvedTickets || 0}</div>
            </CardContent>
          </Card>
        </div>

        {/* User Management Table */}
        <Card>
          <CardHeader>
            <CardTitle>User Management</CardTitle>
            <CardDescription>View all registered users and assign roles.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((u) => (
                  <TableRow key={u.uid}>
                    <TableCell className="font-medium">{u.email}</TableCell>
                    <TableCell>{u.displayName || "N/A"}</TableCell>
                    <TableCell>{getRoleBadge(u.role)}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm" className="h-8">
                            Change Role <ChevronDown className="ml-2 h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleRoleChange(u.uid, "customer")}>
                            Make Customer
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleRoleChange(u.uid, "agent")}>
                            Make Agent
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleRoleChange(u.uid, "admin")}>
                            Make Admin
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
      </div>
    </div>
  );
}
