import React from 'react';

export default function BookCard({ book }) {
  return (
    <article className="book-card">
      {book.cover && (
        <img
          src={book.cover}
          alt={book.title}
          className="cover"
        />
      )}

      <div className="book-info">
        <h3 className="book-title">{book.title}</h3>
        <p className="book-author">by {book.author}</p>
        <p className="book-price">₹{book.price.toFixed(2)}</p>
      </div>
    </article>
  );
}
