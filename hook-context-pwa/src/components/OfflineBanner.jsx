import React, { useEffect, useState } from "react";

export default function OfflineBanner() {
  const [online, setOnline] = useState(navigator.onLine);

  useEffect(() => {
    function onOnline() { setOnline(true); }
    function onOffline() { setOnline(false); }

    window.addEventListener("online", onOnline);
    window.addEventListener("offline", onOffline);
    return () => {
      window.removeEventListener("online", onOnline);
      window.removeEventListener("offline", onOffline);
    };
  }, []);

  if (online) return null;
  return (
    <div style={{
      background: "#ffcc00",
      color: "#111",
      padding: "6px 12px",
      textAlign: "center",
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 9999
    }}>
      You are offline — some features may be unavailable.
    </div>
  );
}
