import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/features/auth/AuthProvider";
import { getTicketById, addTicketMessage } from "@/features/tickets/services/ticketService";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { ArrowLeft, Send } from "lucide-react";

export default function TicketDetail() {
  const { ticketId } = useParams();
  const navigate = useNavigate();
  const { user, role } = useAuth();
  
  const [ticket, setTicket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [replyBody, setReplyBody] = useState("");
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
    if (!replyBody.trim()) return;

    setIsSubmitting(true);
    try {
      // Agents can optionally send internal notes, but keeping it simple for MVP: all public
      await addTicketMessage(ticketId, user.uid, role, replyBody, false);
      setReplyBody("");
      toast.success("Reply sent");
    } catch (error) {
      toast.error("Failed to send reply");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-muted/20 p-8 max-w-4xl mx-auto space-y-6">
        <Skeleton className="h-8 w-24" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (!ticket) return null;

  return (
    <div className="min-h-screen bg-muted/20 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        
        <Button variant="ghost" onClick={() => navigate("/tickets")} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Tickets
        </Button>

        {/* Ticket Header Card */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardDescription>Ticket {ticket.ticketNumber}</CardDescription>
                <CardTitle className="text-2xl mt-1">{ticket.subject}</CardTitle>
              </div>
              <div className="flex gap-2">
                <Badge variant="outline" className="capitalize">{ticket.status}</Badge>
                <Badge variant="secondary" className="capitalize">{ticket.priority}</Badge>
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
            
            <div className="prose prose-sm max-w-none">
              <p className="whitespace-pre-wrap">{ticket.description}</p>
            </div>
          </CardContent>
        </Card>

        {/* Messages Timeline */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Conversation</h3>
          
          <div className="space-y-4 mb-8">
            {messages.length === 0 ? (
              <p className="text-center text-muted-foreground py-8 italic">No replies yet.</p>
            ) : (
              messages.map((msg) => {
                const isCustomer = msg.senderRole === "customer";
                return (
                  <Card key={msg.id} className={`${isCustomer ? 'bg-background' : 'bg-primary/5 border-primary/20'}`}>
                    <CardHeader className="py-3 px-4 flex flex-row items-center justify-between space-y-0 border-b">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm capitalize">
                          {msg.senderRole}
                        </span>
                        {msg.visibility === "internal" && (
                          <Badge variant="destructive" className="text-[10px] h-4">Internal Note</Badge>
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {msg.createdAt?.toDate() ? format(msg.createdAt.toDate(), 'MMM d, h:mm a') : "Just now"}
                      </span>
                    </CardHeader>
                    <CardContent className="py-4 px-4">
                      <p className="whitespace-pre-wrap text-sm">{msg.body}</p>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </div>

          {/* Reply Composer */}
          <Card>
            <form onSubmit={handleReplySubmit}>
              <CardHeader className="py-4">
                <CardTitle className="text-lg">Add a Reply</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea 
                  placeholder="Type your message here..." 
                  className="min-h-[100px]"
                  value={replyBody}
                  onChange={(e) => setReplyBody(e.target.value)}
                  disabled={ticket.status === 'closed'}
                />
              </CardContent>
              <CardFooter className="flex justify-between border-t py-4">
                <p className="text-xs text-muted-foreground">
                  {ticket.status === 'closed' ? "This ticket is closed." : "Replies are visible to the customer."}
                </p>
                <Button type="submit" disabled={isSubmitting || !replyBody.trim() || ticket.status === 'closed'}>
                  {isSubmitting ? "Sending..." : (
                    <>
                      <Send className="mr-2 h-4 w-4" /> Send Reply
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
