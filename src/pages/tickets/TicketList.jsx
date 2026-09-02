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
import { PlusCircle } from "lucide-react";

export default function TicketList() {
  const { user, role } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");

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
        ) : tickets.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <p>No tickets found.</p>
            {role === "customer" && (
              <Link to="/tickets/new" className="text-primary hover:underline mt-2 inline-block">
                Create your first ticket
              </Link>
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
                <TableHead className="text-right">Created</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tickets.map((ticket) => (
                <TableRow key={ticket.id}>
                  <TableCell className="font-medium">
                    <Link to={`/tickets/${ticket.id}`} className="text-primary hover:underline">
                      {ticket.ticketNumber}
                    </Link>
                  </TableCell>
                  <TableCell>{ticket.subject}</TableCell>
                  <TableCell>{getStatusBadge(ticket.status)}</TableCell>
                  <TableCell>{getPriorityBadge(ticket.priority)}</TableCell>
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
    <div className="min-h-screen bg-muted/20 p-8">
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
