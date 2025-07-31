import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createTicket, getTickets } from "@/lib/api/tickets";
import Ticket from "@/lib/types/ticket";

export const useTicketsQuery = () =>
  useQuery({
    queryKey: ["tickets"],
    retry: 0,
    queryFn: () => getTickets(),
  });

export const useCreateTicketQuery = () => {
  const client = useQueryClient();

  return useMutation<Ticket, Error, Partial<Ticket>>({
    mutationFn: (ticket) => createTicket(ticket),
    onSuccess: () => client.invalidateQueries({ queryKey: ["tickets"] }),
  });
};
