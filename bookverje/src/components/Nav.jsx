import React from "react";
import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <nav style={{ marginBottom: 16 }}>
      <Link to="/">Home</Link> {" | "}
      <Link to="/add">Add Book</Link>
    </nav>
  );
}
