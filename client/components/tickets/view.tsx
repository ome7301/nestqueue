import Ticket from "@/lib/types/ticket";
import Button from "../ui/button";

interface TicketViewProps {
  ticket?: Ticket;
  onDismiss: () => void;
}

export default function TicketView({ ticket, onDismiss }: TicketViewProps) {
  if (!ticket) {
    return <div>Loading...</div>;
  }

  const createdOn = new Date(ticket.createdOn).toDateString();
  const updatedAt = new Date(ticket.updatedAt).toDateString();

  return (
    <div className="flex flex-col gap-2 m-2">
      <p className="rounded-2xl bg-black p-2 text-2xl font-bold text-white">
        Client Ticket
      </p>
      <div className="">
        <p className="font-bold">Description:</p>
        <p>{ticket.description}</p>
      </div>
      <div className="flex items-center gap-2">
        <p className="font-bold">Category:</p>
        <p>{ticket.category}</p>
      </div>
      <div className="flex items-center gap-2">
        <p className="font-bold">Site:</p>
        <p>{ticket.site}</p>
      </div>

      {ticket.assignedTo ? (
        <p>Assigned to {ticket.assignedTo}</p>
      ) : (
        <p>Unassigned</p>
      )}

      <p className="text">Created by {ticket.createdBy}</p>
      <p className="text">Created on {createdOn}</p>
      <p className="text">Last modified on {updatedAt}</p>

      <Button
        className="rounded-2xl bg-black p-2 text-2xl font-bold text-white"
        onClick={onDismiss}
      >
        Close
      </Button>
    </div>
  );
}
