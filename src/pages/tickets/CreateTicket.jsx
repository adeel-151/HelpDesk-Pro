import { CreateTicketForm } from "@/features/tickets/components/CreateTicketForm";

export default function CreateTicket() {
  return (
    <div className="w-full h-full p-4 sm:p-8 animate-in fade-in duration-500">
      <CreateTicketForm />
    </div>
  );
}
