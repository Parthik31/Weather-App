import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getWeather = async () => {
    if (!city) {
      setError("Please enter a city name");
      return;
    }
    setLoading(true);
    setError("");

    try {
      // Live API endpoints (replace with your own backend URLs)
      const res = await axios.get(`http://localhost:5000/weather/${city}`);
      setWeather(res.data);

      const forecastRes = await axios.get(`http://localhost:5000/forecast/${city}`);
      setForecast(forecastRes.data);
    } catch (err) {
      // Mock fallback
      const mockWeatherData = {
        name: city,
        main: {
          temp: Math.round(Math.random() * 30 + 10),
          humidity: Math.round(Math.random() * 50 + 30),
          feels_like: Math.round(Math.random() * 30 + 10),
        },
        wind: { speed: (Math.random() * 10).toFixed(1) },
        weather: [
          {
            description: ["sunny", "cloudy", "rainy", "stormy"][Math.floor(Math.random() * 4)],
          },
        ],
      };
      setWeather(mockWeatherData);

      const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
      const mockForecast = days.map((day) => ({
        day,
        temp: Math.round(Math.random() * 30 + 10),
        description: ["sunny", "cloudy", "rainy", "stormy"][Math.floor(Math.random() * 4)],
      }));
      setForecast(mockForecast);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") getWeather();
  };

  const getWeatherIcon = (condition) => {
    condition = condition.toLowerCase();
    if (condition.includes("cloud")) return "☁️";
    if (condition.includes("rain")) return "🌧️";
    if (condition.includes("sun") || condition.includes("clear")) return "☀️";
    if (condition.includes("snow")) return "❄️";
    if (condition.includes("storm")) return "⛈️";
    return "🌤️";
  };

  return (
    <div className="page">
      {/* HEADER */}
      <header className="header">
        <h1>🌦️ WEATHER HUB</h1>
      </header>

      {/* MAIN */}
      <main className="main-content">
        <div className="input-group">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter city name..."
          />
          <button onClick={getWeather}>{loading ? "Loading..." : "Get Weather"}</button>
        </div>

        {loading && <p className="loading">Loading weather data...</p>}
        {error && <p className="error">{error}</p>}

        {weather && (
          <div className="weather-card">
            <h2>{weather.name}</h2>
            <div className="weather-icon">
              {getWeatherIcon(weather.weather[0].description)}
            </div>
            <div className="temp">{weather.main.temp}°C</div>
            <div className="condition">{weather.weather[0].description}</div>
            <p>Feels like: {weather.main.feels_like}°C</p>
            <p>Humidity: {weather.main.humidity}%</p>
            <p>Wind Speed: {weather.wind.speed} m/s</p>
          </div>
        )}

        {forecast.length > 0 && (
          <div className="forecast">
            <h3>5-Day Forecast</h3>
            <div className="forecast-cards">
              {forecast.map((dayData, i) => (
                <div key={i} className="forecast-card">
                  <p className="forecast-day">{dayData.day}</p>
                  <div className="forecast-icon">
                    {getWeatherIcon(dayData.description)}
                  </div>
                  <p className="forecast-temp">{dayData.temp}°C</p>
                  <p className="forecast-desc">{dayData.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <p>© 2025 WEATHER HUB – All Rights Reserved</p>
      </footer>
    </div>
  );
}

export default App;   