import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/features/auth/AuthProvider";
import { getTickets } from "@/features/tickets/services/ticketService";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
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
        return <span className="px-2 py-1 text-[10px] font-bold rounded-none bg-blue-500 text-white uppercase tracking-widest border border-blue-500">[{status}]</span>;
      case "open":
        return <span className="px-2 py-1 text-[10px] font-bold rounded-none bg-amber-500 text-white uppercase tracking-widest border border-amber-500">[{status}]</span>;
      case "resolved":
        return <span className="px-2 py-1 text-[10px] font-bold rounded-none bg-emerald-500 text-white uppercase tracking-widest border border-emerald-500">[{status}]</span>;
      case "closed":
        return <span className="px-2 py-1 text-[10px] font-bold rounded-none bg-transparent text-foreground uppercase tracking-widest border border-black/20 dark:border-white/20">[{status}]</span>;
      default:
        return <span className="px-2 py-1 text-[10px] font-bold rounded-none bg-transparent text-foreground uppercase tracking-widest border border-black/20 dark:border-white/20">[{status}]</span>;
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case "urgent":
      case "high":
        return <span className="px-2 py-1 text-[10px] font-bold rounded-none bg-red-500 text-white uppercase tracking-widest border border-red-500">[{priority}]</span>;
      default:
        return <span className="px-2 py-1 text-[10px] font-bold rounded-none bg-transparent text-foreground uppercase tracking-widest border border-black/20 dark:border-white/20">[{priority}]</span>;
    }
  };

  const getSLAIndicator = (slaDate) => {
    if (!slaDate) return <span className="text-muted-foreground">-</span>;
    const now = new Date();
    const date = slaDate.toDate();
    const diffHours = (date - now) / (1000 * 60 * 60);
    
    if (diffHours < 0) {
      return <span className="text-red-500 font-bold flex items-center gap-1"><span className="w-1.5 h-1.5 bg-red-500 animate-pulse"></span> BREACHED</span>;
    }
    if (diffHours < 24) {
      return <span className="text-amber-500 font-bold">DUE_{Math.floor(diffHours)}H</span>;
    }
    return <span className="text-emerald-500 font-bold">{Math.floor(diffHours/24)}D_LEFT</span>;
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
    <div className="border border-black/20 dark:border-white/20 bg-card">
      <div className="bg-black/5 dark:bg-white/5 border-b border-black/20 dark:border-white/20 p-6">
        <h3 className="text-sm font-bold uppercase tracking-[0.2em]">
          {role === "customer" ? "ALL_TICKETS" : `TICKETS_(${activeTab.toUpperCase()})`}
        </h3>
        <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">
          {role === "customer" ? "LIST_OF_SUBMITTED_REQUESTS" : "MANAGE_SUPPORT_REQUESTS"}
        </p>
      </div>
      <div className="p-0">
        {isLoading ? (
          <div className="space-y-2 p-6">
            <Skeleton className="h-10 w-full rounded-none" />
            <Skeleton className="h-12 w-full rounded-none" />
            <Skeleton className="h-12 w-full rounded-none" />
          </div>
        ) : filteredTickets.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground border-t border-dashed border-black/20 dark:border-white/20">
            <div className="flex justify-center mb-4">
              <Search className="h-10 w-10 text-muted-foreground/30" />
            </div>
            {tickets.length === 0 ? (
              <>
                <p className="text-[10px] uppercase font-bold tracking-widest">NO_TICKETS_FOUND_IN_VIEW</p>
                {role === "customer" && (
                  <Link to={`/${role}/tickets/new`} className="text-primary hover:underline mt-2 inline-block text-[10px] font-bold uppercase tracking-widest">
                    CREATE_FIRST_TICKET
                  </Link>
                )}
              </>
            ) : (
              <>
                <p className="text-[10px] uppercase font-bold tracking-widest">NO_TICKETS_MATCH_CRITERIA</p>
                <Button variant="link" onClick={clearFilters} className="mt-2 rounded-none uppercase tracking-widest text-[10px] font-bold">
                  CLEAR_FILTERS
                </Button>
              </>
            )}
          </div>
        ) : (
          <Table>
            <TableHeader className="bg-background">
              <TableRow className="border-b border-black/20 dark:border-white/20">
                <TableHead className="text-[10px] font-bold uppercase tracking-[0.2em]">Ticket_ID</TableHead>
                <TableHead className="text-[10px] font-bold uppercase tracking-[0.2em]">Subject</TableHead>
                <TableHead className="text-[10px] font-bold uppercase tracking-[0.2em]">Status</TableHead>
                <TableHead className="text-[10px] font-bold uppercase tracking-[0.2em]">Priority</TableHead>
                <TableHead className="text-[10px] font-bold uppercase tracking-[0.2em]">SLA</TableHead>
                <TableHead className="text-right text-[10px] font-bold uppercase tracking-[0.2em]">Created</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-black/10 dark:divide-white/10">
              {filteredTickets.map((ticket) => (
                <TableRow key={ticket.id} className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors border-none">
                  <TableCell className="font-bold text-xs uppercase tracking-wider">
                    <Link to={`/${role}/tickets/${ticket.id}`} className="text-primary hover:underline">
                      {ticket.ticketNumber}
                    </Link>
                  </TableCell>
                  <TableCell className="text-xs uppercase tracking-wider">{ticket.subject}</TableCell>
                  <TableCell>{getStatusBadge(ticket.status)}</TableCell>
                  <TableCell>{getPriorityBadge(ticket.priority)}</TableCell>
                  <TableCell className="text-[10px] uppercase tracking-widest">{getSLAIndicator(ticket.slaDueDate)}</TableCell>
                  <TableCell className="text-right text-[10px] uppercase tracking-widest font-bold text-muted-foreground">
                    {ticket.createdAt?.toDate() ? format(ticket.createdAt.toDate(), 'MMM d, yyyy') : "JUST_NOW"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );

  return (
    <div className="w-full h-full p-4 sm:p-8 bg-background">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b-2 border-black dark:border-white pb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-black tracking-[0.2em] uppercase">TICKET_QUEUE</h1>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-2 font-bold">
              // MANAGE_AND_TRACK_SUPPORT_REQUESTS
            </p>
          </div>
          {role === "customer" && (
            <Link to="/customer/tickets/new" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto rounded-none bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90 font-bold uppercase tracking-widest text-xs">
                <PlusCircle className="mr-2 h-4 w-4" /> NEW_TICKET
              </Button>
            </Link>
          )}
        </div>

        <div className="flex flex-col md:flex-row gap-4 bg-white/5 dark:bg-black/5 p-4 border border-black/20 dark:border-white/20">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="SEARCH BY TICKET NUMBER, SUBJECT, OR DESCRIPTION..."
              className="pl-9 rounded-none border-black/20 dark:border-white/20 bg-background uppercase tracking-widest text-xs h-11"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[160px] rounded-none border-black/20 dark:border-white/20 h-11 uppercase tracking-widest text-[10px] font-bold">
                <SelectValue placeholder="STATUS" />
              </SelectTrigger>
              <SelectContent className="rounded-none border-black/20 dark:border-white/20">
                <SelectItem value="all" className="uppercase tracking-widest text-[10px] font-bold rounded-none">ALL_STATUSES</SelectItem>
                <SelectItem value="new" className="uppercase tracking-widest text-[10px] font-bold rounded-none">NEW</SelectItem>
                <SelectItem value="open" className="uppercase tracking-widest text-[10px] font-bold rounded-none">OPEN</SelectItem>
                <SelectItem value="pending customer" className="uppercase tracking-widest text-[10px] font-bold rounded-none">PENDING_CUSTOMER</SelectItem>
                <SelectItem value="resolved" className="uppercase tracking-widest text-[10px] font-bold rounded-none">RESOLVED</SelectItem>
                <SelectItem value="closed" className="uppercase tracking-widest text-[10px] font-bold rounded-none">CLOSED</SelectItem>
              </SelectContent>
            </Select>

            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-full sm:w-[160px] rounded-none border-black/20 dark:border-white/20 h-11 uppercase tracking-widest text-[10px] font-bold">
                <SelectValue placeholder="PRIORITY" />
              </SelectTrigger>
              <SelectContent className="rounded-none border-black/20 dark:border-white/20">
                <SelectItem value="all" className="uppercase tracking-widest text-[10px] font-bold rounded-none">ALL_PRIORITIES</SelectItem>
                <SelectItem value="low" className="uppercase tracking-widest text-[10px] font-bold rounded-none">LOW</SelectItem>
                <SelectItem value="medium" className="uppercase tracking-widest text-[10px] font-bold rounded-none">MEDIUM</SelectItem>
                <SelectItem value="high" className="uppercase tracking-widest text-[10px] font-bold rounded-none">HIGH</SelectItem>
                <SelectItem value="urgent" className="uppercase tracking-widest text-[10px] font-bold rounded-none">URGENT</SelectItem>
              </SelectContent>
            </Select>
            
            {(searchQuery || statusFilter !== "all" || priorityFilter !== "all") && (
              <Button variant="ghost" size="icon" onClick={clearFilters} title="Clear Filters" className="rounded-none h-11 w-11 hover:bg-black/5 dark:hover:bg-white/5">
                <FilterX className="h-4 w-4 text-muted-foreground" />
              </Button>
            )}
          </div>
        </div>

        {role === "customer" ? (
          <TicketTable />
        ) : (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-1 p-1 bg-black/5 dark:bg-white/5 border border-black/20 dark:border-white/20 w-fit">
              <button 
                onClick={() => setActiveTab("all")}
                className={`px-4 py-2 text-[10px] font-bold uppercase tracking-widest transition-colors ${activeTab === "all" ? "bg-black text-white dark:bg-white dark:text-black" : "text-muted-foreground hover:bg-black/10 dark:hover:bg-white/10"}`}
              >
                ALL_TICKETS
              </button>
              <button 
                onClick={() => setActiveTab("unassigned")}
                className={`px-4 py-2 text-[10px] font-bold uppercase tracking-widest transition-colors ${activeTab === "unassigned" ? "bg-black text-white dark:bg-white dark:text-black" : "text-muted-foreground hover:bg-black/10 dark:hover:bg-white/10"}`}
              >
                UNASSIGNED
              </button>
              <button 
                onClick={() => setActiveTab("mine")}
                className={`px-4 py-2 text-[10px] font-bold uppercase tracking-widest transition-colors ${activeTab === "mine" ? "bg-black text-white dark:bg-white dark:text-black" : "text-muted-foreground hover:bg-black/10 dark:hover:bg-white/10"}`}
              >
                ASSIGNED_TO_ME
              </button>
            </div>
            <TicketTable />
          </div>
        )}
      </div>
    </div>
  );
}
