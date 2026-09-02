import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/features/auth/AuthProvider";
import { getTickets } from "@/features/tickets/services/ticketService";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlusCircle, Search, FilterX } from "lucide-react";

export default function TicketList() {
  const { user, role } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  
  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

  useEffect(() => {
    const fetchTickets = async () => {
      setIsLoading(true);
      try {
        const data = await getTickets(role, user.uid, activeTab);
        setTickets(data);
      } catch (error) {
        console.error("Failed to load tickets", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user && role) {
      fetchTickets();
    }
  }, [user, role, activeTab]);

  const getStatusBadge = (status) => {
    switch (status) {
      case "new":
        return <Badge variant="default" className="bg-blue-500 hover:bg-blue-600">New</Badge>;
      case "open":
        return <Badge variant="default" className="bg-emerald-500 hover:bg-emerald-600">Open</Badge>;
      case "resolved":
        return <Badge variant="secondary">Resolved</Badge>;
      case "closed":
        return <Badge variant="outline">Closed</Badge>;
      default:
        return <Badge variant="outline" className="capitalize">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case "urgent":
      case "high":
        return <Badge variant="destructive" className="capitalize">{priority}</Badge>;
      default:
        return <Badge variant="secondary" className="capitalize">{priority}</Badge>;
    }
  };

  const getSLAIndicator = (slaDate) => {
    if (!slaDate) return <span className="text-muted-foreground">-</span>;
    const now = new Date();
    const date = slaDate.toDate();
    const diffHours = (date - now) / (1000 * 60 * 60);
    
    if (diffHours < 0) {
      return <span className="text-red-500 font-bold flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span> Breached</span>;
    }
    if (diffHours < 24) {
      return <span className="text-amber-500 font-medium">Due in {Math.floor(diffHours)}h</span>;
    }
    return <span className="text-emerald-500">{Math.floor(diffHours/24)}d left</span>;
  };

  const filteredTickets = tickets.filter(t => {
    const matchesSearch = 
      t.title?.toLowerCase().includes(searchQuery.toLowerCase()) || 
      t.subject?.toLowerCase().includes(searchQuery.toLowerCase()) || 
      t.ticketNumber?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description?.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesStatus = statusFilter === "all" || t.status === statusFilter;
    const matchesPriority = priorityFilter === "all" || t.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  const clearFilters = () => {
    setSearchQuery("");
    setStatusFilter("all");
    setPriorityFilter("all");
  };

  const TicketTable = () => (
    <Card>
      <CardHeader>
        <CardTitle>{role === "customer" ? "All Tickets" : `Tickets (${activeTab})`}</CardTitle>
        <CardDescription>
          {role === "customer" ? "A list of all your submitted tickets." : "Manage support requests."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        ) : filteredTickets.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground border border-dashed rounded-lg">
            <div className="flex justify-center mb-4">
              <Search className="h-10 w-10 text-muted-foreground/30" />
            </div>
            {tickets.length === 0 ? (
              <>
                <p>No tickets found in this view.</p>
                {role === "customer" && (
                  <Link to="/tickets/new" className="text-primary hover:underline mt-2 inline-block">
                    Create your first ticket
                  </Link>
                )}
              </>
            ) : (
              <>
                <p>No tickets match your search criteria.</p>
                <Button variant="link" onClick={clearFilters} className="mt-2">
                  Clear Filters
                </Button>
              </>
            )}
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ticket ID</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>SLA</TableHead>
                <TableHead className="text-right">Created</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTickets.map((ticket) => (
                <TableRow key={ticket.id}>
                  <TableCell className="font-medium">
                    <Link to={`/tickets/${ticket.id}`} className="text-primary hover:underline">
                      {ticket.ticketNumber}
                    </Link>
                  </TableCell>
                  <TableCell>{ticket.subject}</TableCell>
                  <TableCell>{getStatusBadge(ticket.status)}</TableCell>
                  <TableCell>{getPriorityBadge(ticket.priority)}</TableCell>
                  <TableCell className="text-xs">{getSLAIndicator(ticket.slaDueDate)}</TableCell>
                  <TableCell className="text-right text-muted-foreground">
                    {ticket.createdAt?.toDate() ? format(ticket.createdAt.toDate(), 'MMM d, yyyy') : "Just now"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="w-full h-full p-4 sm:p-8 animate-in fade-in duration-500">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Tickets</h1>
            <p className="text-muted-foreground">Manage and track support requests.</p>
          </div>
          {role === "customer" && (
            <Link to="/tickets/new">
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                New Ticket
              </Button>
            </Link>
          )}
        </div>

        <div className="flex flex-col md:flex-row gap-4 bg-background p-4 rounded-lg shadow-sm border">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by ticket number, subject, or description..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="pending customer">Pending Customer</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>

            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
              </SelectContent>
            </Select>
            
            {(searchQuery || statusFilter !== "all" || priorityFilter !== "all") && (
              <Button variant="ghost" size="icon" onClick={clearFilters} title="Clear Filters">
                <FilterX className="h-4 w-4 text-muted-foreground" />
              </Button>
            )}
          </div>
        </div>

        {role === "customer" ? (
          <TicketTable />
        ) : (
          <Tabs defaultValue="all" onValueChange={setActiveTab} value={activeTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Tickets</TabsTrigger>
              <TabsTrigger value="unassigned">Unassigned</TabsTrigger>
              <TabsTrigger value="mine">Assigned to Me</TabsTrigger>
            </TabsList>
            <TabsContent value={activeTab}>
              <TicketTable />
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
}
