import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import BookList from "../components/BookList";
import withLoader from "../components/withLoader";
import RenderInfo from "../components/RenderInfo";

const BookListWithLoader = withLoader(BookList);

export default function HomePage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchRef = useRef(null);

  useEffect(() => {
    axios.get("http://localhost:3001/books").then(res => {
      setBooks(res.data);
      setLoading(false);
    });
  }, []);

  const focusSearch = () => {
    searchRef.current.focus();
  };

  return (
    <div className="container mt-4 fade">
      <RenderInfo render={() => <h2>📚 Welcome to BookVerse!</h2>} />

      <button className="btn btn-secondary mb-3" onClick={focusSearch}>
        Focus Search
      </button>

      <BookListWithLoader
        loading={loading}
        books={books}
        searchRef={searchRef}
      />
    </div>
  );
}
