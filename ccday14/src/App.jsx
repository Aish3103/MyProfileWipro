import React, { Suspense, lazy, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

// Components
import StatsCard from "./components/StatsCard";
import ErrorBoundary from "./components/ErrorBoundary";
import BrokenProductCard from "./components/BrokenProductCard";
import PortalDemo from "./components/PortalDemo";

// Lazy Loaded Components
const CourseDetails = lazy(() => import("./components/CourseDetails"));
const InstructorProfile = lazy(() => import("./components/InstructorProfile"));

// Pure Component Demo
function PureDemo() {
  const [stats, setStats] = useState([
    { title: "Users", value: 100, lastUpdated: "now" },
    { title: "Sales", value: 50, lastUpdated: "today" },
    { title: "Visitors", value: 500, lastUpdated: "today" }
  ]);

  const updateSecondCard = () => {
    setStats(prev =>
      prev.map((card, i) =>
        i === 1 ? { ...card, value: card.value + 1 } : card
      )
    );
  };

  return (
    <div className="mt-4">
      <h3>Pure Component Demo</h3>

      <button className="btn btn-info mb-3" onClick={updateSecondCard}>
        Simulate Update (Sales Only)
      </button>

      {stats.map(s => (
        <StatsCard key={s.title} {...s} />
      ))}
    </div>
  );
}

export default function App() {
  const [view, setView] = useState("");
  const [showBroken, setShowBroken] = useState(false);

  return (
    <div className="container mt-4" style={{ maxWidth: "1200px" }}>
      <h1 className="text-center mb-4">Day 14 — Advanced React Concepts</h1>

      <div className="row">

        {/* LEFT SIDE -------------------------------- */}
        <div className="col-md-6">
          <h3>Lazy Loading</h3>

          <button
            className="btn btn-primary me-2 mb-2"
            onClick={() => setView("course")}
          >
            View Course Details
          </button>

          <button
            className="btn btn-secondary mb-3"
            onClick={() => setView("instructor")}
          >
            View Instructor Profile
          </button>

          <Suspense
            fallback={
              <div className="spinner-border text-primary mt-3">
                Loading...
              </div>
            }
          >
            {view === "course" && <CourseDetails />}
            {view === "instructor" && <InstructorProfile />}
          </Suspense>

          {/* Pure Demo */}
          <PureDemo />
        </div>

        {/* RIGHT SIDE -------------------------------- */}
        <div className="col-md-6">
          <h3>Error Boundary</h3>

          <button
            className="btn btn-outline-danger mb-3"
            onClick={() => setShowBroken(!showBroken)}
          >
            {showBroken ? "Hide Broken Component" : "Show Broken Component"}
          </button>

          <ErrorBoundary>
            {showBroken && <BrokenProductCard />}
          </ErrorBoundary>

          {/* Portal Demo */}
          <PortalDemo />
        </div>

      </div>
    </div>
  );
}