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
    <div className="">
      <p className="rounded-2xl bg-black p-2 text-2xl font-bold text-white">
        Client Ticket
      </p>
      <p className="text-red-500">{ticket.title}</p>
      <p className="text-orange-500">{ticket.priority}</p>
      <p className="text-yellow-400">{ticket.description}</p>
      <p className="text-green-500">{ticket.category}</p>
      <p className="text-blue-500">{ticket.site}</p>

      {ticket.assignedTo ? (
        <p className="text-indigo-600">Assigned to {ticket.assignedTo}</p>
      ) : (
        <p className="text-indigo-600">Unassigned</p>
      )}

      <p className="text-violet-600">Created by {ticket.createdBy}</p>
      <p className="text-purple-800">Created on {createdOn}</p>
      <p className="text-pink-800">Last modified on {updatedAt}</p>

      <Button
        className="rounded-sm bg-amber-400 p-2 text-2xl text-white"
        onClick={onDismiss}
      >
        Close
      </Button>
    </div>
  );
}
