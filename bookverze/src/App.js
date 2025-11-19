import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BookDetails from "./pages/BookDetails";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/book/:id" element={<BookDetails />} />
      </Routes>
  );
}

export default App;
