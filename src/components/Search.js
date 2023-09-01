import styles from "../styles/search.module.css";
import searchIcon from "../assets/search-icon.svg";
import { useState } from "react";
const Search = ({ handleCity }) => {
  const [city, setCity] = useState("");
  const handleBtnClick = () => {
    if (city.length) {
      handleCity(city);
    }
    setCity("");
  };
  return (
    <div className={styles.searchContainer}>
      <h1 className={styles.weatherTitle}>Weather Report</h1>
      <div className={styles.search}>
        <img src={searchIcon} alt="" />
        <input
          onChange={(e) => setCity(e.target.value)}
          placeholder="Search for city"
          type="text"
          value={city}
        />
        <button onClick={handleBtnClick}>Search</button>
      </div>
    </div>
  );
};

export default Search;
