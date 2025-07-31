"use client";

import { useTicketsQuery } from "@/lib/hooks/queries/ticket";
import ticket from "@/lib/types/ticket";
import TicketsTable from "@/components/tickets/table";
import { Ticket, Tickets } from "lucide-react";
import CreateTicketButton from "@/components/tickets/create-button";

export default function Home() {
  const { data: tickets, error: ticketsQueryError } = useTicketsQuery();
  if (ticketsQueryError) {
    return <div>Failed to load tickets.</div>;
  }
  if (!tickets) {
    return <div>Loading tickets....</div>;
  }

  return (
    <>
      <div className="flex justify-end m-3">
        <CreateTicketButton />
      </div>
      <TicketsTable tickets={tickets} />
    </>
  );
}
