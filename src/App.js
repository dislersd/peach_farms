import React, { useState } from "react";
import "./styles.css";
import "./farms.css";
// farm_graph.json is created from my javascript code hosted here https://github.com/dislersd/api_data_fetch_and_manipulate
import data from "./farm_graph.json";
import FarmList from "./components/FarmList";

export default function App() {
  // state to hold farm data (gettinga all the entries from json object and turning into array with Object.entries)
  const [farms] = useState(Object.entries(data));
  // input is for search bar
  const [input, setInput] = useState("");

  // ternary that says if there is NO input return normal list of farms otherwise return filtered list
  const result = !input
    ? farms
    : [...farms.filter((farm) => farm[0].toLowerCase().startsWith(input))];

  // sets the input when you type in the search bar
  function handleChange(e) {
    setInput(e.target.value.toLowerCase());
  }

  // when you click on a nearby farm it will set input state to that farm name
  function searchSingleFarm(e) {
    setInput(e.target.textContent.toLowerCase());
  }

  return (
    <div className="App">
      <h1 onClick={() => setInput("")}>
        Hello Peach Farms{" "}
        <span role="img" aria-label="peach">
          🍑
        </span>
      </h1>
      <label> Search Farms </label>
      <input
        name="farm-name"
        className="search-input"
        type="text"
        placeholder="farm name..."
        value={input}
        onChange={(e) => handleChange(e)}
      />
      {/* passing down result prop into farmlist - result is either all farms or the filtered farms 
        - also passing "searchSingleFarm" function down */}
      <FarmList farms={result} searchSingle={searchSingleFarm} />
    </div>
  );
}
