// src/components/BookList.js
import React from 'react';
import BookCard from './BookCard';

export default function BookList({ books }) {
  return (
    <div>
      {books.length === 0 ? (
        <div className="alert alert-warning">No books found.</div>
      ) : (
        books.map(b => <BookCard key={b.id} book={b} />)
      )}
    </div>
  );
}
