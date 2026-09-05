import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { createTicket } from "../services/ticketService";
import { uploadAttachment } from "../services/storageService";
import { useAuth } from "@/features/auth/AuthProvider";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ticketSchema = z.object({
  subject: z.string().min(5, { message: "SUBJECT MUST BE AT LEAST 5 CHARACTERS" }),
  categoryId: z.string({ required_error: "PLEASE SELECT A CATEGORY" }),
  priority: z.string({ required_error: "PLEASE SELECT A PRIORITY" }),
  description: z.string().min(15, { message: "DESCRIPTION MUST BE AT LEAST 15 CHARACTERS" }),
});

export function CreateTicketForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(ticketSchema),
    defaultValues: {
      subject: "",
      categoryId: "",
      priority: "normal",
      description: "",
    },
  });

  const onSubmit = async (values) => {
    setIsLoading(true);
    try {
      let attachments = [];
      
      if (file) {
        const attachmentData = await uploadAttachment(`temp_${user.uid}`, file);
        if (attachmentData) attachments.push(attachmentData);
      }

      await createTicket(values, user.uid, attachments);
      toast.success("TICKET_CREATED_SUCCESSFULLY");
      navigate("/customer/tickets");
    } catch (error) {
      console.error(error);
      toast.error("FAILED_TO_CREATE_TICKET");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 border-2 border-black dark:border-white bg-background">
      <div className="bg-black/5 dark:bg-white/5 border-b-2 border-black dark:border-white p-6 relative">
        <div className="absolute top-0 right-0 p-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-bold">
          // INTAKE_FORM
        </div>
        <h2 className="text-2xl font-black uppercase tracking-[0.2em]">SUBMIT_REQUEST</h2>
        <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1 font-bold">
          PLEASE_PROVIDE_DETAILS_FOR_ASSISTANCE
        </p>
      </div>
      <div className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[10px] uppercase tracking-widest font-bold">SUBJECT</FormLabel>
                  <FormControl>
                    <Input placeholder="BRIEF DESCRIPTION OF THE ISSUE" className="rounded-none border-black/20 dark:border-white/20 uppercase tracking-widest text-[10px] font-bold h-11" {...field} />
                  </FormControl>
                  <FormMessage className="text-[10px] uppercase tracking-widest font-bold" />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[10px] uppercase tracking-widest font-bold">CATEGORY</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="rounded-none border-black/20 dark:border-white/20 h-11 text-[10px] font-bold uppercase tracking-widest">
                          <SelectValue placeholder="SELECT CATEGORY" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="rounded-none border-black/20 dark:border-white/20">
                        <SelectItem value="technical" className="text-[10px] font-bold uppercase tracking-widest rounded-none">TECHNICAL SUPPORT</SelectItem>
                        <SelectItem value="billing" className="text-[10px] font-bold uppercase tracking-widest rounded-none">BILLING & SUBSCRIPTIONS</SelectItem>
                        <SelectItem value="general" className="text-[10px] font-bold uppercase tracking-widest rounded-none">GENERAL INQUIRY</SelectItem>
                        <SelectItem value="feature" className="text-[10px] font-bold uppercase tracking-widest rounded-none">FEATURE REQUEST</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-[10px] uppercase tracking-widest font-bold" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[10px] uppercase tracking-widest font-bold">PRIORITY</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="rounded-none border-black/20 dark:border-white/20 h-11 text-[10px] font-bold uppercase tracking-widest">
                          <SelectValue placeholder="SELECT PRIORITY" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="rounded-none border-black/20 dark:border-white/20">
                        <SelectItem value="low" className="text-[10px] font-bold uppercase tracking-widest rounded-none">LOW</SelectItem>
                        <SelectItem value="normal" className="text-[10px] font-bold uppercase tracking-widest rounded-none">NORMAL</SelectItem>
                        <SelectItem value="high" className="text-[10px] font-bold uppercase tracking-widest rounded-none">HIGH</SelectItem>
                        <SelectItem value="urgent" className="text-[10px] font-bold uppercase tracking-widest rounded-none">URGENT</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-[10px] uppercase tracking-widest font-bold" />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[10px] uppercase tracking-widest font-bold">DESCRIPTION</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="PLEASE DESCRIBE YOUR ISSUE IN DETAIL..." 
                      className="min-h-[150px] rounded-none border-black/20 dark:border-white/20 uppercase tracking-widest text-[10px] font-bold"
                      {...field} 
                    />
                  </FormControl>
                  <p className="text-[10px] text-muted-foreground mt-1 uppercase tracking-widest font-bold">// MARKDOWN_FORMATTING_SUPPORTED</p>
                  <FormMessage className="text-[10px] uppercase tracking-widest font-bold" />
                </FormItem>
              )}
            />

            <FormItem>
              <FormLabel className="text-[10px] uppercase tracking-widest font-bold">ATTACHMENT_OPTIONAL</FormLabel>
              <FormControl>
                <Input 
                  type="file" 
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  disabled={isLoading}
                  className="cursor-pointer rounded-none border-black/20 dark:border-white/20 h-11 text-[10px] font-bold uppercase tracking-widest pt-2.5"
                />
              </FormControl>
              <p className="text-[10px] text-muted-foreground mt-1 uppercase tracking-widest font-bold">// MAX_1_FILE</p>
            </FormItem>
            
            <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4 pt-4 border-t border-black/10 dark:border-white/10">
              <Button type="button" variant="outline" onClick={() => navigate(-1)} className="rounded-none border-black/20 dark:border-white/20 uppercase tracking-widest text-xs font-bold h-12 px-8">
                CANCEL
              </Button>
              <Button type="submit" disabled={isLoading} className="rounded-none bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90 uppercase tracking-widest text-xs font-bold h-12 px-8">
                {isLoading ? "SUBMITTING..." : "SUBMIT_TICKET"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
