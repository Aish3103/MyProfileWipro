import React from "react";
import BookCard from "./BookCard";

export default function BookList({ books, onSelectAuthor }) {
  return (
    <div>
      {books.map((b) => (
        <BookCard key={b.id} book={b} onSelectAuthor={onSelectAuthor} />
      ))}
    </div>
  );
}
