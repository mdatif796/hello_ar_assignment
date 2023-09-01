const baseUrl = "https://api.weatherapi.com/v1/current.json";
const key = "3c22e7e2ec9940e7a6f145310233108";

export const API_URLS = {
  getWeather: (city) => {
    return `${baseUrl}?key=${key}&q=${city}`;
  },
};
