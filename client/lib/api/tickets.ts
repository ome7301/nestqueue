import client from "./client";
import Ticket from "@/lib/types/ticket";

export async function getTickets() {
  interface response {
    count: number;
    tickets: Ticket[];
  }
  const { data } = await client.get<response>("/tickets");
  return data.tickets;
}

export async function createTicket(ticket: Partial<Ticket>) {
  const { data } = await client.post<Ticket>("/tickets");
  return data;
}
