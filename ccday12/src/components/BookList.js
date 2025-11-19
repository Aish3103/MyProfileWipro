import React, { useState } from "react";
import BookCard from "./BookCard";

export default function BookList({ books, searchRef }) {
  const [view, setView] = useState("grid");
  const [search, setSearch] = useState("");

  const filtered = books.filter(b =>
    b.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <input
        ref={searchRef}
        type="text"
        placeholder="Search books..."
        className="form-control mb-3"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      <button
        className="btn btn-outline-dark mb-3"
        onClick={() => setView(view === "grid" ? "list" : "grid")}
      >
        Toggle View ({view})
      </button>

      <div className={view === "grid" ? "row" : ""}>
        {filtered.map(book => (
          <div key={book.id} className={view === "grid" ? "col-md-4" : ""}>
            <BookCard book={book} />
          </div>
        ))}
      </div>
    </div>
  );
}
