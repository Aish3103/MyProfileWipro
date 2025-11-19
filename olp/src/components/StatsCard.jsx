import React from "react";

const StatsCard = React.memo(function StatsCard({ title, value, lastUpdated }) {
  console.log(`🔄 Re-render: ${title}`);

  return (
    <div className="card p-2 mt-2" style={{fontSize:"0.85rem",maxWidth:"280px"}}>
      <h5>{title}</h5>
      <p>Value: {value}</p>
      <small>Last Updated: {lastUpdated}</small>
    </div>
  );
});

export default StatsCard;
