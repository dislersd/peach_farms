import React from "react";
import FarmCard from "./FarmCard";

function FarmList({ farms, searchSingle }) {
  return (
    <div className="list-container">
      {farms.map((farm) => (
        // each farm looks like [["farm name"], [{phone: phone number, closeFarms: [nearby farms array] }]
        <FarmCard key={farm[0]} farm={farm} searchSingle={searchSingle} />
      ))}
    </div>
  );
}

export default FarmList;
