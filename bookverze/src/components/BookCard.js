import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function BookCard({ book }) {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">{book.title}</h5>
        <p className="card-text text-muted">by {book.author}</p>
        <p className="card-text">₹{book.price}</p>
        <Link to={`/book/${book.id}`} className="btn btn-primary btn-sm">View Details</Link>
      </div>
    </div>
  );
}

BookCard.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    author: PropTypes.string,
    price: PropTypes.number
  }).isRequired
};
