import React from "react";
import PropTypes from "prop-types";

export default function BookCard({ book, onSelectAuthor }) {
  return (
    <div className="card mb-3 shadow-sm p-3 book-card"
         onClick={() => onSelectAuthor(book.author)}
         style={{ cursor: "pointer" }}
    >
      <h5 className="fw-bold">{book.title}</h5>
      <p className="text-muted mb-1">by {book.author}</p>
      <p className="fw-semibold">₹{book.price}</p>
    </div>
  );
}

BookCard.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    author: PropTypes.string,
    price: PropTypes.number
  }),
  onSelectAuthor: PropTypes.func
};
