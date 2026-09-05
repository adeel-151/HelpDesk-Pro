import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/features/auth/AuthProvider";
import { getTicketById, addTicketMessage, assignTicket, updateTicket } from "@/features/tickets/services/ticketService";
import { uploadAttachment } from "@/features/tickets/services/storageService";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
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
        toast.error("TICKET_NOT_FOUND");
        navigate(`/${role}/tickets`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTicket();

    const messagesRef = collection(db, `tickets/${ticketId}/messages`);
    const q = query(messagesRef, orderBy("createdAt", "asc"));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, [ticketId, navigate, role]);

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
      toast.success(isInternal ? "INTERNAL_LOG_RECORDED" : "TRANSMISSION_SENT");
    } catch (error) {
      toast.error("TRANSMISSION_FAILED");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClaimTicket = async () => {
    try {
      await assignTicket(ticketId, user.uid);
      setTicket({ ...ticket, assignedAgentId: user.uid, status: "open" });
      toast.success("TICKET_ASSIGNED");
    } catch (error) {
      toast.error("ASSIGNMENT_FAILED");
    }
  };

  const handleStatusChange = async (newStatus) => {
    try {
      await updateTicket(ticketId, { status: newStatus });
      setTicket({ ...ticket, status: newStatus });
      toast.success(`STATUS_UPDATED_TO_${newStatus.toUpperCase()}`);
    } catch (error) {
      toast.error("STATUS_UPDATE_FAILED");
    }
  };

  if (isLoading) {
    return (
      <div className="w-full h-full p-4 sm:p-8 flex justify-center items-center bg-background">
        <div className="text-[10px] uppercase font-bold tracking-widest animate-pulse">DECRYPTING_TICKET_DATA...</div>
      </div>
    );
  }

  if (!ticket) return null;

  return (
    <div className="w-full h-full p-4 sm:p-8 bg-background">
      <div className="max-w-4xl mx-auto space-y-6">
        
        <Button variant="ghost" onClick={() => navigate(`/${role}/tickets`)} className="mb-4 rounded-none border border-black/20 dark:border-white/20 uppercase tracking-widest text-[10px] font-bold h-10 hover:bg-black/5 dark:hover:bg-white/5">
          <ArrowLeft className="mr-2 h-4 w-4" /> ABORT_VIEW
        </Button>

        {/* Ticket Header Card */}
        <div className="border-2 border-black dark:border-white bg-background flex flex-col relative overflow-hidden">
          <div className="absolute top-0 right-0 p-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-bold">
            // TICKET_{ticket.ticketNumber}
          </div>
          <div className="p-6 border-b-2 border-black dark:border-white bg-black/5 dark:bg-white/5">
            <div className="flex justify-between items-start">
              <div className="pr-12 mt-4">
                <h2 className="text-2xl font-black uppercase tracking-[0.2em]">{ticket.subject}</h2>
              </div>
              <div className="flex flex-col gap-2 items-end mt-4">
                {role !== "customer" && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="h-8 rounded-none border-black/20 dark:border-white/20 uppercase tracking-widest text-[10px] font-bold">
                        <span className="mr-2">{ticket.status}</span>
                        <ChevronDown className="h-3 w-3" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="rounded-none border-2 border-black dark:border-white p-0">
                      <DropdownMenuItem className="cursor-pointer rounded-none text-[10px] font-bold uppercase tracking-widest px-4 py-3 border-b border-black/10 dark:border-white/10" onClick={() => handleStatusChange("open")}>OPEN</DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer rounded-none text-[10px] font-bold uppercase tracking-widest px-4 py-3 border-b border-black/10 dark:border-white/10" onClick={() => handleStatusChange("pending customer")}>PENDING_CUSTOMER</DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer rounded-none text-[10px] font-bold uppercase tracking-widest px-4 py-3 border-b border-black/10 dark:border-white/10" onClick={() => handleStatusChange("resolved")}>RESOLVED</DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer rounded-none text-[10px] font-bold uppercase tracking-widest px-4 py-3" onClick={() => handleStatusChange("closed")}>CLOSED</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
                {role === "customer" && (
                  <div className="px-3 py-1 border border-black/20 dark:border-white/20 text-[10px] font-bold uppercase tracking-widest">
                    {ticket.status}
                  </div>
                )}
                <div className={`px-3 py-1 border text-[10px] font-bold uppercase tracking-widest ${
                  ticket.priority === 'urgent' || ticket.priority === 'high' ? 'border-red-500 text-red-500' : 'border-black/20 dark:border-white/20'
                }`}>
                  PRIORITY: {ticket.priority}
                </div>
                {role !== "customer" && !ticket.assignedAgentId && (
                  <Button size="sm" className="h-8 rounded-none bg-primary text-primary-foreground font-bold uppercase tracking-widest text-[10px]" onClick={handleClaimTicket}>CLAIM_TICKET</Button>
                )}
              </div>
            </div>
          </div>
          <div className="text-sm p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 p-4 border border-black/20 dark:border-white/20">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold mb-1">CATEGORY</p>
                <p className="font-bold text-xs uppercase">{ticket.categoryId}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold mb-1">CREATED</p>
                <p className="font-bold text-xs uppercase">
                  {ticket.createdAt?.toDate() ? format(ticket.createdAt.toDate(), 'yyyy-MM-dd HH:mm') : "N/A"}
                </p>
              </div>
              <div className="col-span-2">
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold mb-1">AUTHOR_ID</p>
                <p className="font-bold text-xs font-mono truncate" title={ticket.customerId}>{ticket.customerId}</p>
              </div>
            </div>
            
            <div className="pt-2">
              <div className="prose prose-sm dark:prose-invert max-w-none break-words font-mono text-sm leading-relaxed border-l-2 border-primary pl-4">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {ticket.description}
                </ReactMarkdown>
              </div>
              
              {ticket.attachments && ticket.attachments.length > 0 && (
                <div className="mt-8 pt-4 border-t border-black/10 dark:border-white/10">
                  <p className="text-[10px] font-bold uppercase tracking-widest mb-2">ATTACHMENTS:</p>
                  <div className="flex flex-col gap-2">
                    {ticket.attachments.map((att, idx) => (
                      <a key={idx} href={att.url} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline font-mono border border-black/10 dark:border-white/10 p-2 block w-fit">
                        [FILE_{idx}] {att.name}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {ticket.slaDueDate && (
              <div className="mt-8 pt-4 border-t border-black/10 dark:border-white/10 flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-widest">SLA_DEADLINE:</span>
                <span className={`text-[10px] font-bold uppercase tracking-widest ${new Date(ticket.slaDueDate.toDate()) < new Date() ? 'text-red-500 animate-pulse' : 'text-emerald-500'}`}>
                  {format(ticket.slaDueDate.toDate(), 'yyyy-MM-dd HH:mm:ss')}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Messages Timeline */}
        <div className="space-y-4 pt-4">
          <h3 className="text-sm font-black uppercase tracking-[0.2em] border-b-2 border-black dark:border-white pb-2 mb-6">COMMUNICATION_LOG</h3>
          
          <div className="space-y-4 mb-8">
            {messages.length === 0 ? (
              <p className="text-center text-[10px] font-bold uppercase tracking-widest text-muted-foreground py-8">NO_TRANSMISSIONS_FOUND.</p>
            ) : (
              messages.filter(msg => msg.visibility !== 'internal' || role !== 'customer').map((msg) => {
                const isCustomer = msg.senderRole === "customer";
                const isInternal = msg.visibility === "internal";
                return (
                  <div key={msg.id} className={`border border-black/20 dark:border-white/20 p-0 ${isInternal ? "border-amber-500 bg-amber-500/5" : "bg-card"}`}>
                    <div className={`p-3 flex flex-row items-center justify-between border-b ${isInternal ? "border-amber-500/20" : "border-black/10 dark:border-white/10"}`}>
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 flex items-center justify-center font-bold text-xs uppercase border ${isInternal ? "border-amber-500 text-amber-500" : "border-black dark:border-white text-foreground"}`}>
                          {msg.senderRole.charAt(0)}
                        </div>
                        <div className="flex flex-col">
                          <span className={`font-bold text-[10px] uppercase tracking-widest ${isInternal ? "text-amber-500" : ""}`}>
                            {msg.senderRole === "customer" ? "CLIENT" : "SUPPORT_OPERATIVE"}
                          </span>
                          <span className="text-[10px] text-muted-foreground font-mono">
                            {msg.createdAt?.toDate() ? format(msg.createdAt.toDate(), 'yyyy-MM-dd HH:mm') : "PROCESSING..."}
                          </span>
                        </div>
                      </div>
                      {isInternal && (
                        <div className="px-2 py-1 bg-amber-500 text-white text-[10px] font-bold uppercase tracking-widest">
                          INTERNAL_ONLY
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <div className="prose prose-sm dark:prose-invert max-w-none break-words font-mono text-sm leading-relaxed">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.body}</ReactMarkdown>
                      </div>
                      {msg.attachments && msg.attachments.length > 0 && (
                        <div className="mt-4 pt-3 border-t border-black/10 dark:border-white/10">
                          <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold mb-2">ATTACHMENTS:</p>
                          <div className="flex flex-wrap gap-2">
                            {msg.attachments.map((att, idx) => (
                              <a 
                                key={idx} 
                                href={att.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-[10px] uppercase font-bold text-primary hover:underline border border-primary/20 px-2 py-1"
                              >
                                {att.name}
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Reply Composer */}
          <div className="border-2 border-black dark:border-white bg-background mt-6">
            <form onSubmit={handleReplySubmit}>
              <div className="p-4 bg-black/5 dark:bg-white/5 border-b-2 border-black dark:border-white">
                <h3 className="text-xs font-black uppercase tracking-[0.2em]">COMPOSE_TRANSMISSION</h3>
              </div>
              <div className="p-6 space-y-4">
                <Textarea 
                  placeholder="ENTER MESSAGE HERE..." 
                  className="min-h-[120px] rounded-none border-black/20 dark:border-white/20 font-mono text-sm uppercase"
                  value={replyBody}
                  onChange={(e) => setReplyBody(e.target.value)}
                  disabled={ticket.status === 'closed'}
                />
                <div className="flex items-center gap-2">
                  <Input 
                    type="file" 
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    disabled={ticket.status === 'closed' || isLoading}
                    className="max-w-[250px] cursor-pointer text-[10px] font-bold uppercase tracking-widest h-10 rounded-none border-black/20 dark:border-white/20 pt-2.5"
                  />
                  {file && <span className="text-[10px] font-bold uppercase tracking-widest text-primary">{file.name}</span>}
                </div>
              </div>
              <div className="flex flex-col sm:flex-row justify-between items-center border-t-2 border-black dark:border-white p-4 bg-black/5 dark:bg-white/5">
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 mb-4 sm:mb-0 w-full">
                  {role !== "customer" && (
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="internal-note" 
                        checked={isInternal}
                        onCheckedChange={setIsInternal}
                        className="rounded-none border-black dark:border-white"
                      />
                      <Label htmlFor="internal-note" className="text-[10px] font-bold uppercase tracking-widest cursor-pointer text-amber-500">
                        INTERNAL_NOTE
                      </Label>
                    </div>
                  )}
                  <p className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">
                    {ticket.status === 'closed' ? "// TICKET_IS_CLOSED" : "// VISIBLE_TO_CLIENT"}
                  </p>
                </div>
                <Button type="submit" disabled={isSubmitting || (!replyBody.trim() && !file) || ticket.status === 'closed'} className="rounded-none bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90 uppercase tracking-widest text-[10px] font-bold h-10 px-8 w-full sm:w-auto">
                  {isSubmitting ? "TRANSMITTING..." : (
                    <>
                      <Send className="mr-2 h-3 w-3" /> {isInternal ? "ADD_INTERNAL_LOG" : "SEND_TRANSMISSION"}
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
