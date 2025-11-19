import React, { useState, useRef, useEffect } from "react";
import useTimer from "./useTimer";

export default function WorkoutTracker() {
  const [sets, setSets] = useState(0);
  const [restSeconds, setRestSeconds] = useState(60);
  const { seconds, start, stop, reset } = useTimer(0);
  const [isResting, setIsResting] = useState(false);

  // when starting rest, reset timer to 0 and start
  useEffect(() => {
    if (isResting) {
      reset(0);
      start();
    } else {
      stop();
    }
    // cleanup handled by hook
  }, [isResting]);

  // auto-stop when restSeconds reached
  useEffect(() => {
    if (isResting && seconds >= restSeconds) {
      stop();
      setIsResting(false);
      setSets(prev => prev + 1); // after rest is over, count set completed
    }
  }, [seconds, isResting, restSeconds]);

  return (
    <div className="card p-3 mt-3">
      <h4>Workout Tracker</h4>
      <p>Sets completed: <strong>{sets}</strong></p>

      <div className="mb-2">
        <label className="form-label">Rest duration (seconds)</label>
        <input
          type="number"
          value={restSeconds}
          onChange={(e) => setRestSeconds(Number(e.target.value))}
          className="form-control"
          min={5}
        />
      </div>

      <div className="d-flex gap-2 mb-2">
        <button className="btn btn-success" onClick={() => setIsResting(true)}>
          Start Rest
        </button>
        <button className="btn btn-secondary" onClick={() => { reset(0); setIsResting(false); }}>
          Cancel
        </button>
      </div>

      <div>
        <p>Rest timer: <strong>{seconds}s</strong></p>
        <small className="text-muted">Timer uses useEffect + useRef and cleans up automatically.</small>
      </div>
    </div>
  );
}
