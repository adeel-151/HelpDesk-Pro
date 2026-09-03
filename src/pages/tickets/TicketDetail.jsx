import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/features/auth/AuthProvider";
import { getTicketById, addTicketMessage, assignTicket, updateTicket } from "@/features/tickets/services/ticketService";
import { uploadAttachment } from "@/features/tickets/services/storageService";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Skeleton } from "@/components/ui/skeleton";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { ArrowLeft, Send, ChevronDown } from "lucide-react";

export default function TicketDetail() {
  const { ticketId } = useParams();
  const navigate = useNavigate();
  const { user, role } = useAuth();
  
  const [ticket, setTicket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [replyBody, setReplyBody] = useState("");
  const [isInternal, setIsInternal] = useState(false);
  const [file, setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const data = await getTicketById(ticketId);
        setTicket(data);
      } catch (error) {
        toast.error("Ticket not found");
        navigate("/tickets");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTicket();

    // Subscribe to messages real-time
    const messagesRef = collection(db, `tickets/${ticketId}/messages`);
    const q = query(messagesRef, orderBy("createdAt", "asc"));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, [ticketId, navigate]);

  const handleReplySubmit = async (e) => {
    e.preventDefault();
    if (!replyBody.trim() && !file) return;

    setIsSubmitting(true);
    try {
      let attachments = [];
      if (file) {
        const attachmentData = await uploadAttachment(ticketId, file);
        if (attachmentData) attachments.push(attachmentData);
      }

      await addTicketMessage(ticketId, user.uid, role, replyBody, isInternal, attachments);
      setReplyBody("");
      setFile(null);
      setIsInternal(false);
      toast.success(isInternal ? "Internal note added" : "Reply sent");
    } catch (error) {
      toast.error("Failed to send reply");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClaimTicket = async () => {
    try {
      await assignTicket(ticketId, user.uid);
      setTicket({ ...ticket, assignedAgentId: user.uid, status: "open" });
      toast.success("Ticket claimed");
    } catch (error) {
      toast.error("Failed to claim ticket");
    }
  };

  const handleStatusChange = async (newStatus) => {
    try {
      await updateTicket(ticketId, { status: newStatus });
      setTicket({ ...ticket, status: newStatus });
      toast.success(`Status changed to ${newStatus}`);
    } catch (error) {
      toast.error("Failed to change status");
    }
  };

  if (isLoading) {
    return (
      <div className="w-full h-full p-4 sm:p-8 animate-in fade-in duration-500 flex justify-center items-center">
        <Skeleton className="h-8 w-24" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (!ticket) return null;

  return (
    <div className="w-full h-full p-4 sm:p-8 animate-in fade-in duration-500">
      <div className="max-w-4xl mx-auto space-y-6">
        
        <Button variant="ghost" onClick={() => navigate("/tickets")} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Tickets
        </Button>

        {/* Ticket Header Card */}
        <Card className="border-border/50 shadow-sm overflow-hidden bg-card/40 backdrop-blur-md">
          <CardHeader className="bg-card/50 border-b">
            <div className="flex justify-between items-start">
              <div>
                <CardDescription>Ticket {ticket.ticketNumber}</CardDescription>
                <CardTitle className="text-2xl mt-1">{ticket.subject}</CardTitle>
              </div>
              <div className="flex gap-2 items-center">
                {role !== "customer" && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="h-7 text-xs">
                        <span className="capitalize">{ticket.status}</span>
                        <ChevronDown className="ml-1 h-3 w-3" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => handleStatusChange("open")}>Open</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleStatusChange("pending customer")}>Pending Customer</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleStatusChange("resolved")}>Resolved</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleStatusChange("closed")}>Closed</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
                {role === "customer" && (
                  <Badge variant="outline" className="capitalize">{ticket.status}</Badge>
                )}
                <Badge variant="secondary" className="capitalize">{ticket.priority}</Badge>
                {role !== "customer" && !ticket.assignedAgentId && (
                  <Button size="sm" className="h-7 text-xs" onClick={handleClaimTicket}>Claim</Button>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent className="text-sm">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 p-4 bg-muted/50 rounded-lg">
              <div>
                <p className="text-muted-foreground mb-1">Category</p>
                <p className="font-medium capitalize">{ticket.categoryId}</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">Created</p>
                <p className="font-medium">
                  {ticket.createdAt?.toDate() ? format(ticket.createdAt.toDate(), 'MMM d, yyyy') : "N/A"}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">Customer ID</p>
                <p className="font-medium truncate" title={ticket.customerId}>{ticket.customerId}</p>
              </div>
            </div>
            
            <CardContent className="pt-6">
              <div className="prose prose-sm dark:prose-invert max-w-none break-words">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {ticket.description}
                </ReactMarkdown>
              </div>
              
              {ticket.attachments && ticket.attachments.length > 0 && (
                <div className="mt-4 pt-4 border-t">
                  <p className="font-semibold mb-2">Attachments:</p>
                  <ul className="list-disc pl-5">
                    {ticket.attachments.map((att, idx) => (
                      <li key={idx}>
                        <a href={att.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                          {att.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
            {ticket.slaDueDate && (
              <div className="mt-4 pt-4 border-t flex items-center justify-between">
                <span className="text-sm font-medium">SLA Deadline:</span>
                <span className={`text-sm font-medium ${new Date(ticket.slaDueDate.toDate()) < new Date() ? 'text-red-600' : 'text-emerald-600'}`}>
                  {format(ticket.slaDueDate.toDate(), 'PPP p')}
                </span>
              </div>
            )}
          </CardContent>
        </Card>

          {/* Messages Timeline */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Conversation</h3>
            
            <div className="space-y-4 mb-8">
              {messages.length === 0 ? (
                <p className="text-center text-muted-foreground py-8 italic">No replies yet.</p>
              ) : (
                messages.filter(msg => msg.visibility !== 'internal' || role !== 'customer').map((msg) => {
                  const isCustomer = msg.senderRole === "customer";
                  return (
                    <Card key={msg.id} className={`border-border/50 shadow-sm ${msg.isInternal ? "border-amber-500/30 bg-amber-500/10 backdrop-blur-md" : "bg-card/60 backdrop-blur-md"}`}>
                      <CardHeader className="py-4 px-4 pb-2 flex flex-row space-y-0 items-start justify-between border-b border-border/5">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="text-xs">
                              {msg.senderRole.charAt(0).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col">
                            <span className="font-semibold text-sm capitalize">
                              {msg.senderRole === "customer" ? "Customer" : "Support Agent"}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {msg.createdAt?.toDate() ? format(msg.createdAt.toDate(), 'PPp') : "Just now"}
                            </span>
                          </div>
                        </div>
                        {msg.visibility === "internal" && (
                          <Badge variant="destructive" className="text-[10px] h-4">Internal Note</Badge>
                        )}
                      </CardHeader>
                      <CardContent className="py-4 px-4">
                        <div className="prose prose-sm dark:prose-invert max-w-none break-words">
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.body}</ReactMarkdown>
                        </div>
                        {msg.attachments && msg.attachments.length > 0 && (
                          <div className="mt-3 pt-3 border-t border-muted">
                            <p className="text-xs text-muted-foreground mb-1">Attachments:</p>
                            <div className="flex flex-wrap gap-2">
                              {msg.attachments.map((att, idx) => (
                                <a 
                                  key={idx} 
                                  href={att.url} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-xs text-blue-500 hover:underline bg-blue-50 px-2 py-1 rounded border"
                                >
                                  📎 {att.name}
                                </a>
                              ))}
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })
              )}
            </div>

          {/* Reply Composer */}
          <Card className="border-border/50 shadow-sm overflow-hidden bg-card/40 backdrop-blur-md mt-6">
            <form onSubmit={handleReplySubmit}>
              <CardHeader className="py-4 bg-card/50 border-b">
                <CardTitle className="text-lg">Add a Reply</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea 
                  placeholder="Type your message here..." 
                  className="min-h-[100px]"
                  value={replyBody}
                  onChange={(e) => setReplyBody(e.target.value)}
                  disabled={ticket.status === 'closed'}
                />
                <div className="flex items-center gap-2">
                  <Input 
                    type="file" 
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    disabled={ticket.status === 'closed' || isLoading}
                    className="max-w-[250px] cursor-pointer text-xs h-8"
                  />
                  {file && <span className="text-xs text-muted-foreground">{file.name}</span>}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between items-center border-t py-4">
                <div className="flex items-center space-x-2">
                  {role !== "customer" && (
                    <div className="flex items-center space-x-2 mr-4">
                      <Checkbox 
                        id="internal-note" 
                        checked={isInternal}
                        onCheckedChange={setIsInternal}
                      />
                      <Label htmlFor="internal-note" className="text-sm cursor-pointer">
                        Internal Note
                      </Label>
                    </div>
                  )}
                  <p className="text-xs text-muted-foreground">
                    {ticket.status === 'closed' ? "This ticket is closed." : "Replies are visible to the customer."}
                  </p>
                </div>
                <Button type="submit" disabled={isSubmitting || !replyBody.trim() || ticket.status === 'closed'}>
                  {isSubmitting ? "Sending..." : (
                    <>
                      <Send className="mr-2 h-4 w-4" /> {isInternal ? "Add Note" : "Send Reply"}
                    </>
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>

      </div>
    </div>
  );
}
