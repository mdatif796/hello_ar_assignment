import { useEffect, useState } from "react";
import styles from "../styles/weather.module.css";
import { API_URLS } from "../utils/constants";
import Humidity from "../assets/humidity-icon.svg";
import Wind from "../assets/wind-icon.svg";
import Pressure from "../assets/pressure-icon.svg";
import Globe from "./Globe";

const Weather = ({ city }) => {
  const [cityWeather, setCityWeather] = useState({});
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    const setWeather = async () => {
      setIsError(false);
      let response = await fetch(API_URLS.getWeather(city), {
        method: "GET",
      });
      response = await response.json();
      //   console.log("response: ", response);
      if (response.error) {
        setIsError(true);
      }
      setCityWeather(response);
    };
    setWeather();
  }, [city]);
  return (
    <div className={styles.weatherContainer}>
      {isError ? (
        <h1>{cityWeather.error?.message}</h1>
      ) : (
        <>
          <h3>Current Weather</h3>
          <div className={styles.weatherContent}>
            <div className={styles.leftDiv}>
              <p className={styles.cityName}>
                {cityWeather.location?.name}, {cityWeather.location?.country}
              </p>
              <div className={styles.tempContainer}>
                <img
                  className={styles.weatherImg}
                  src={cityWeather.current?.condition.icon}
                  alt=""
                />
                <h1 className={styles.temperature}>
                  {cityWeather.current?.temp_c}
                  <sup
                    style={{
                      marginLeft: "5px",
                      marginTop: "-60px",
                      fontSize: "3rem",
                    }}
                  >
                    o
                  </sup>
                </h1>
              </div>
              <p className={styles.cityName}>
                {cityWeather.current?.condition.text.toLowerCase()}
              </p>
            </div>
            <div className={styles.rightDiv}>
              <p className={styles.feelPara}>
                Feels like {cityWeather.current?.feelslike_c}
                <sup>o</sup>
              </p>
              <div>
                <img src={Humidity} alt="" />
                <span>Humidity</span>
                <span>{cityWeather.current?.humidity + "%"}</span>
              </div>
              <div>
                <img src={Wind} alt="" />
                <span>Wind</span>
                <span>{cityWeather.current?.wind_kph + "kph"}</span>
              </div>
              <div>
                <img src={Pressure} alt="" />
                <span>Pressure</span>
                <span>{cityWeather.current?.pressure_mb + "hPa"}</span>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "-50px",
              }}
            >
              <Globe />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Weather;
