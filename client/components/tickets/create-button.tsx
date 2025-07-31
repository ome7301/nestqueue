import { useState } from "react";
import Button from "../ui/button";
import Modal from "../ui/modal";
import CreateTicketForm from "./create-form";
import { Ticket } from "lucide-react";

export default function CreateTicketButton() {
  const [active, setActive] = useState(false);

  const handleClick = () => setActive(true);
  const handleDimiss = () => setActive(false);

  return (
    <>
      <Button onClick={handleClick}>New Ticket</Button>

      <Modal active={active}>
        <CreateTicketForm onDismiss={handleDimiss} />
      </Modal>
    </>
  );
}
