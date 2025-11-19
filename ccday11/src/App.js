import React, { useState, useRef, useMemo } from "react";
import BookList from "./components/BookList";
import AuthorInfo from "./components/AuthorInfo";

const BOOKS = [
  { id: 1, title: "Atomic Habits", author: "James Clear", price: 350 },
  { id: 2, title: "Sapiens", author: "Yuval Noah Harari", price: 499 },
  { id: 3, title: "The Alchemist", author: "Paulo Coelho", price: 299 },
];

export default function App() {
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [query, setQuery] = useState("");
  const searchRef = useRef(null);

  // Focus search input using ref
  const focusSearch = () => {
    if (searchRef.current) searchRef.current.focus();
  };

  const filteredBooks = useMemo(() => {
    const q = query.toLowerCase();
    return BOOKS.filter(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div className="container mt-4">
      <h1 className="mb-3">BookVerse</h1>

      <button className="btn btn-primary mb-3" onClick={focusSearch}>
        Focus Search
      </button>

      <input
        ref={searchRef}
        type="text"
        className="form-control mb-4"
        placeholder="Search books..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <div className="row">
        <div className="col-md-7">
          <BookList books={filteredBooks} onSelectAuthor={setSelectedAuthor} />
        </div>

        <div className="col-md-5">
          {selectedAuthor ? (
            <AuthorInfo authorName={selectedAuthor} />
          ) : (
            <p className="text-muted">Select a book to view author details.</p>
          )}
        </div>
      </div>
    </div>
  );
}
