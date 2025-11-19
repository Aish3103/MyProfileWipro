// src/App.js
import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import BookDetails from './pages/BookDetails';
import FadeRouteWrapper from './components/FadeRouteWrapper';

export default function App() {
  const location = useLocation();

  return (
    <div className="app-root container mt-4">
      <h1>BookVerse</h1>
      <FadeRouteWrapper location={location}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/book/:id" element={<BookDetails />} />
          <Route path="*" element={<div>Not Found</div>} />
        </Routes>
      </FadeRouteWrapper>
    </div>
  );
}
