import { useState } from "react";
import Search from "./Search";
import Weather from "./Weather";

function App() {
  const [currentCity, setCurrentCity] = useState("");
  const handleCity = (city) => {
    setCurrentCity(city);
  };
  return (
    <div style={{ width: "100vw" }}>
      <Search handleCity={handleCity} />
      {currentCity.length ? <Weather city={currentCity} /> : ""}
    </div>
  );
}

export default App;
