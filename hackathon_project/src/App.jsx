import React, { useState } from "react";
import Map from "./components/Map";

const App = () => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can add any form validation here if needed
  };

  return (
    <div>
      <h1> Maps Directions </h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="origin">From:</label>
          <input
            type="text"
            id="origin"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            placeholder="Enter starting location"
            required
          />
        </div>
        <div>
          <label htmlFor="destination">To:</label>
          <input
            type="text"
            id="destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Enter destination"
            required
          />
        </div>
        <button type="submit">Get Directions</button>
      </form>
      <Map origin={origin} destination={destination} />
    </div>
  );
};

export default App;
