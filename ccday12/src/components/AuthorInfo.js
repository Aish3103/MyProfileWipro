import React, { Component } from "react";

export default class AuthorInfo extends Component {
  componentDidMount() {
    console.log("AuthorInfo mounted.");
  }

  render() {
    const { book } = this.props;

    if (!book) return null;

    return (
      <div className="card p-4">
        <h2>{book.title}</h2>
        <h5 className="text-muted">by {book.author}</h5>

        <hr />

        <h6>💰 Price:</h6>
        <p>${book.price}</p>

        <h6>📘 About the Book / Author:</h6>
        <p>{book.bio}</p>

        <h6>🔥 Top Books by {book.author}:</h6>

        {book.topBooks && book.topBooks.length > 0 ? (
          <ul>
            {book.topBooks.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        ) : (
          <p>No top books listed.</p>
        )}
      </div>
    );
  }
}
