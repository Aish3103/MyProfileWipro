import { useState } from "react";
import Modal from "./Modal";

export default function PortalDemo() {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-5">
      <h2>Portal Demo</h2>

      <button className="btn btn-warning" onClick={() => setOpen(true)}>
        Open Modal
      </button>

      {open && <Modal onClose={() => setOpen(false)}>Hello from Portal!</Modal>}
    </div>
  );
}
