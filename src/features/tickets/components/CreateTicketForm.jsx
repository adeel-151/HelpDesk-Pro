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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ticketSchema = z.object({
  subject: z.string().min(5, { message: "Subject must be at least 5 characters" }),
  categoryId: z.string({ required_error: "Please select a category" }),
  priority: z.string({ required_error: "Please select a priority" }),
  description: z.string().min(15, { message: "Description must be at least 15 characters" }),
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
      
      // Temporary ID or we can just pass a temp ID to storage since the ticket isn't created yet,
      // Or better, we upload first with user ID and timestamp to guarantee uniqueness.
      if (file) {
        const attachmentData = await uploadAttachment(`temp_${user.uid}`, file);
        if (attachmentData) attachments.push(attachmentData);
      }

      await createTicket(values, user.uid, attachments);
      toast.success("Ticket created successfully!");
      navigate("/tickets");
    } catch (error) {
      console.error(error);
      toast.error("Failed to create ticket.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto mt-8">
      <CardHeader>
        <CardTitle className="text-2xl">Submit a Support Ticket</CardTitle>
        <CardDescription>
          Please provide as much detail as possible so we can best assist you.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject</FormLabel>
                  <FormControl>
                    <Input placeholder="Brief description of the issue" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="technical">Technical Support</SelectItem>
                        <SelectItem value="billing">Billing & Subscriptions</SelectItem>
                        <SelectItem value="general">General Inquiry</SelectItem>
                        <SelectItem value="feature">Feature Request</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Priority</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="normal">Normal</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Please describe your issue in detail..." 
                      className="min-h-[120px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormItem>
              <FormLabel>Attachment (Optional)</FormLabel>
              <FormControl>
                <Input 
                  type="file" 
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  disabled={isLoading}
                  className="cursor-pointer"
                />
              </FormControl>
              <p className="text-xs text-muted-foreground mt-1">Upload a screenshot or document (Max 1 file)</p>
            </FormItem>
            
            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline" onClick={() => navigate(-1)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Submitting..." : "Submit Ticket"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
