import React, { useState, useMemo } from 'react';
import BookList from './components/BookList';

// Sample dataset
const SAMPLE_BOOKS = [
  { id: 1, title: 'The Silent Patient', author: 'Alex Michaelides', price: 299.00, cover: '' },
  { id: 2, title: 'Atomic Habits', author: 'James Clear', price: 399.00, cover: '' },
  { id: 3, title: 'The Alchemist', author: 'Paulo Coelho', price: 249.00, cover: '' },
  { id: 4, title: 'Sapiens', author: 'Yuval Noah Harari', price: 499.00, cover: '' },
  { id: 5, title: 'Clean Code', author: 'Robert C. Martin', price: 599.00, cover: '' },
];

export default function App() {
  const [layout, setLayout] = useState('grid');       
  const [query, setQuery] = useState('');            
  const [books] = useState(SAMPLE_BOOKS);

  const filteredBooks = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return books;
    return books.filter(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q)
    );
  }, [books, query]);

  return (
    <main className="app-root">
      <header className="header">
        <h1>BookVerse</h1>
        <p className="subtitle">Welcome — Featured Books</p>
      </header>

      <div className="controls">
        <div className="search">
          <input
            type="text"
            placeholder="Search by title or author..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className="layout-toggle">
          <button
            className={layout === 'grid' ? 'active' : ''}
            onClick={() => setLayout('grid')}
          >
            Grid
          </button>

          <button
            className={layout === 'list' ? 'active' : ''}
            onClick={() => setLayout('list')}
          >
            List
          </button>
        </div>
      </div>

      <BookList books={filteredBooks} layout={layout} />

      <footer className="footer">
        <small>Day 1 — React Basics: Components, Props, State & Search</small>
      </footer>
    </main>
  );
}
