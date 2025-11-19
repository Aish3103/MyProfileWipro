import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <button className="btn btn-sm btn-outline-primary" onClick={toggleTheme}>
      Theme: {theme === "light" ? "Light" : "Dark"}
    </button>
  );
}
