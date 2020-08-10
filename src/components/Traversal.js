import React, { useState, useEffect, useReducer } from "react";
import "../styles/traversal.css";
import data from "../farm_graph.json";

function Traversal() {
  const [farm, setFarm] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      startFarm: "Karabin Farms",
      endFarm: "",
    }
  );

  const [farms, setFarms] = useState(data);
  const [currentFarm, setCurrentFarm] = useState("Karabin Farms");
  const [travelPath, setTravelPath] = useState([]);

  return (
    <>
      <div className="trav-wrapper">
        Current:
        <p style={{ borderBottom: "1px solid black" }}>{currentFarm}</p>
        Travel Path:
        <div style={{ borderBottom: "1px solid black" }}>
          {travelPath.map((farm) => (
            <p key={farm}>{farm}</p>
          ))}
        </div>
        <label>starting farm</label>
        <select
          name="startFarm"
          value={farm.startFarm}
          onChange={(e) => handleChange(e)}
        >
          {Object.keys(farms).map((farm) => (
            <option key={farm} value={farm}>
              {farm}
            </option>
          ))}
        </select>
        <label>destination farm</label>
        <select
          name="endFarm"
          value={farm.endFarm}
          onChange={(e) => handleChange(e)}
        >
          {Object.keys(farms).map((farm) => (
            <option key={farm} value={farm}>
              {farm}
            </option>
          ))}
        </select>
        <button onClick={traverse}> start traversal </button>
      </div>
    </>
  );

  function handleChange(e) {
    const { name, value } = e.target;
    setFarm({ [name]: value });
  }

  function traverse() {
    console.log("go");
    let visited = new Set();
    let q = [];
    q.push([farm.startFarm]);
    while (q.length > 0) {
      let path = q.shift();
      let vertex = path[path.length - 1];
      if (vertex == farm.endFarm) {
        setTravelPath(path);
        return;
      }
      if (!visited.has(vertex)) {
        visited.add(vertex);
        for (let neighbor of farms[vertex].closeFarms) {
          let newPath = [...path];
          newPath.push(neighbor);
          q.push(newPath);
        }
      }
    }
    console.log("hello");
    return;
  }

  // function traverse () {
  //   let last = farms[currentFarm].closeFarms.length - 1;
  //   while (farms[currentFarm].closeFarms.length > 0) {
  //     setCurrentFarm(farms[currentFarm].closeFarms[last]);
  //     setFarms({...farms, currentFarm: {...currentFarm, closeFarms: farms[currentFarm].closeFarms.filter(farm => farm !== currentFarm)}})
  //     traverse(currentFarm);
  //   }
  //   setTravelPath([...travelPath, currentFarm])
  // }
}

export default Traversal;
