import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StoreProvider } from "./contexts/StoreContext";
import createBookStore from "./flux/BookStore";
import Home from "./components/Home";
import AddBookForm from "./components/AddBookForm";
import Nav from "./components/Nav";

// create store instances here (DI: we can inject different ones in tests)
const bookStore = createBookStore([
  // optional initial seed
  { id: "seed1", title: "kuch bhi", author: "aishwarya", price: 100 },
]);

export default function App() {
  return (
    <StoreProvider stores={{ bookStore }}>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddBookForm />} />
        </Routes>
      </BrowserRouter>
    </StoreProvider>
  );
}
