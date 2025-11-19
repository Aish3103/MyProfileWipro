import React from 'react';
import BookCard from './BookCard';

export default function BookList({ books, layout }) {
  return (
    <section className={`book-list ${layout}`}>
      {books.length === 0 ? (
        <p className="empty">No books found.</p>
      ) : (
        books.map((b) => <BookCard key={b.id} book={b} />)
      )}
    </section>
  );
}
