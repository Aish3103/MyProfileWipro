import React, { Suspense, lazy, useState } from "react";
import ThemeToggle from "./components/ThemeToggle";
import OfflineBanner from "./components/OfflineBanner";
import WorkoutTracker from "./components/WorkoutTracker";
import ProductsPage from "./components/ProductsPage";
import "bootstrap/dist/css/bootstrap.min.css";

const CourseDetails = lazy(() => import("./components/CourseDetails"));
const InstructorProfile = lazy(() => import("./components/InstructorProfile"));

export default function App() {
  const [view, setView] = useState("");

  return (
    <>
      <OfflineBanner />
      <div className="container mt-4" style={{ maxWidth: 1200 }}>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2>Day 15 — Hooks & State Management</h2>
          <div className="d-flex align-items-center gap-2">
            <ThemeToggle />
          </div>
        </div>

        <div className="row">
          {/* Left column */}
          <div className="col-md-6">
            <h5>Lazy Loaded Modules</h5>
            <div className="mb-2">
              <button className="btn btn-primary me-2" onClick={() => setView("course")}>Course Details</button>
              <button className="btn btn-secondary" onClick={() => setView("instructor")}>Instructor</button>
            </div>
            <Suspense fallback={<div className="spinner-border text-primary" />}>
              {view === "course" && <CourseDetails />}
              {view === "instructor" && <InstructorProfile />}
            </Suspense>

            <WorkoutTracker />
          </div>

          {/* Right column */}
          <div className="col-md-6">
            <ProductsPage />
          </div>
        </div>
      </div>
    </>
  );
}
