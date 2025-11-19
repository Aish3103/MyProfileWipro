import React, { useEffect, useState } from "react";
import { useStores } from "../contexts/StoreContext";

export default function Home() {
  const { bookStore } = useStores();
  const [books, setBooks] = useState(bookStore.getBooks());

  useEffect(() => {
    // On mount, subscribe
    function onChange() {
      setBooks(bookStore.getBooks());
    }
    bookStore.addChangeListener(onChange);

    // ensure we initialize from store
    setBooks(bookStore.getBooks());

    return () => {
      bookStore.removeChangeListener(onChange);
    };
  }, [bookStore]);

  return (
     <div>
      <h1>BookVerje</h1>
      <p>SPA: adding books updates this list without reloading.</p>
      <ul>
        {books.length === 0 && <li>No books yet</li>}
        {books.map((b) => (
          <li key={b.id}>
            <strong>{b.title}</strong> — {b.author} — {b.price}
          </li>
        ))}
      </ul>
    </div>
  );
}
