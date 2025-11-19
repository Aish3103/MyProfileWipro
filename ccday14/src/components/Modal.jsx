import React from "react";
import ReactDOM from "react-dom";
import { motion } from "framer-motion";

export default function Modal({ children, onClose }) {
  return ReactDOM.createPortal(
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="modal-backdrop"
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0, bottom: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <div className="bg-white p-4 rounded">
        {children}
        <button className="btn btn-danger mt-3" onClick={onClose}>
          Close
        </button>
      </div>
    </motion.div>,
    document.getElementById("modal-root")
  );
}
