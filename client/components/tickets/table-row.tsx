import Ticket from "@/lib/types/ticket";
import Link from "next/link";

interface TicketsTableRowProps {
  // The ticket being clicked on
  ticket: Ticket;
  // An event handler for when `ticket` is clicked.
  onTicketClick: (ticket: Ticket) => void;
}

export default function TicketsTableRow({
  ticket,
  onTicketClick,
}: TicketsTableRowProps) {
  // The date the ticket was updated, formatted to a date string.
  const ticketUpdatedAt = new Date(ticket.updatedAt).toDateString();

  // An object containing common tailwind styles.
  const styles = { tableCell: "p-4 text-left text-gray-700", status: "" };
  // Our event handler for when this table row is clicked.
  const handleTicketClick = () => onTicketClick(ticket);

  switch (ticket.status) {
    case "Open":
      styles.status = "text-green-500";
      break;
    case "Active":
      styles.status = "text-blue-500";
      break;
    case "Closed":
      styles.status = "text-red-500";
      break;
    case "Rejected":
      styles.status = "text-purple-500";
      break;
  }

  return (
    // We're passing our event handler here.
    <tr className="hover:bg-gray-200" onClick={handleTicketClick}>
      <td className={`${styles.tableCell} min-w-[5rem]`}>{ticket.priority}</td>
      <td className={`${styles.tableCell} min-w-[5rem] hidden md:block`}>
        {ticket.category}
      </td>
      <td
        className={`${styles.tableCell} min-w-[5rem] truncate whitespace-nowrap overflow-hidden`}
      >
        {ticket.title}
      </td>
      <td className={`${styles.tableCell} hidden md:block`}>
        {ticket.assignedTo ? (
          <Link
            href={`https://mail.google.com/mail/?view=cm&fs=1&to=${ticket.assignedTo}`}
          >
            {ticket.assignedTo}
          </Link>
        ) : (
          <span>Unassigned</span>
        )}
      </td>
      <td className={styles.tableCell}>
        {/* TODO: Change the color of the status text depending on its state.
         *
         * An object named `styles` is defined above for your convenience. Add a `status` key
         * and assign it an empty string (""). Then before rendering anything, use a conditional
         * statement to check the value of `ticket.status`. `styles.status` (AKA, the color of
         * the ticket status label) will depend on the state of the ticket.
         *
         * You have the freedom to select whichever colors you want for the status label.
         */}
        <span className={styles.status}>{ticket.status}</span>
      </td>
      <td className={`${styles.tableCell} min-w-[10rem] hidden sm:block`}>
        {ticketUpdatedAt}
      </td>
    </tr>
  );
}
