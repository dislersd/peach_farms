import React, { useState } from "react";

function FarmCard({ farm, searchSingle }) {
  // used to toggle dropdown menu of nearby farms
  const [active, setActive] = useState(false);

  return (
    <div className="farm-card">
      <h2>
        {farm[0]}
        <span role="img" aria-label="farmer">
          🧑‍🌾
        </span>
      </h2>
      <p> {`${farm[1].phone || "no phone"}`} </p>
      <div className="clicker-arrow" onClick={() => setActive(!active)}>
        <span role="img" aria-label="arrow">
          {active ? "🔽" : "▶️"}
        </span>
        {active ? "Click a farm to hop to it" : "Click to see nearby farms"}
      </div>
      <div className={`nearby-farms-list ${active ? "show" : "hide"}`}>
        {/* mapping over farm's list of nearby farms to create unordered list*/}
        {farm[1].closeFarms.map((nearbyFarm) => (
          <ul>
            <li
              onClick={(e) => searchSingle(e)}
              className="nearby-farm"
              key={nearbyFarm}
            >
              {nearbyFarm}
            </li>
          </ul>
        ))}
      </div>
    </div>
  );
}

export default FarmCard;
