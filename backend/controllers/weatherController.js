const axios = require("axios");
const API_KEY = "fdc33007428f499db1c101209242109"; // Your WeatherAPI key

const weatherData = [
  {
    sensorId: 1,
    city: "London",
    history: [],
    current: {
      temp: 0,
      humidity: 0,
      pressure: 0,
      wind_kph: 0,
    },
  },
  {
    sensorId: 2,
    city: "New York",
    history: [],
    current: {
      temp: 0,
      humidity: 0,
      pressure: 0,
      wind_kph: 0,
    },
  },
  {
    sensorId: 3,
    city: "Tokyo",
    history: [],
    current: {
      temp: 0,
      humidity: 0,
      pressure: 0,
      wind_kph: 0,
    },
  },
];

// Function to fetch real weather data from the WeatherAPI
const fetchWeatherForCity = async (city) => {
  const url = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`;
  try {
    const response = await axios.get(url);
    const weather = response.data.current;
    return {
      temp: weather.temp_c,
      humidity: weather.humidity,
      pressure: weather.pressure_mb,
      wind_kph: weather.wind_kph,
    };
  } catch (error) {
    console.error(`Error fetching weather for ${city}: `, error);
    return null; // Return null in case of an error to handle it safely
  }
};

// Function to update weather data for all cities
const generateRealWeatherData = async () => {
  for (const sensor of weatherData) {
    const weather = await fetchWeatherForCity(sensor.city);
    if (weather) {
      sensor.current = weather;
      sensor.history.push({
        ...sensor.current,
        timestamp: new Date().toISOString(),
      });
    }
  }
  console.log("Weather data updated successfully.");
};

// Set interval to update weather data every 5 minutes
setInterval(() => {
  generateRealWeatherData();
}, 1000); // Update every 1 second

// Express routes to handle API requests
const getCurrentWeather = (req, res) => {
  res.json(
    weatherData.map((sensor) => ({
      sensorId: sensor.sensorId,
      city: sensor.city,
      current: sensor.current,
    }))
  );
};

const getHistoricalData = (req, res) => {
  const sensorId = parseInt(req.params.sensorId);
  const sensorData = weatherData.find((sensor) => sensor.sensorId === sensorId);
  if (sensorData) {
    res.json(sensorData.history);
  } else {
    res.status(404).json({ message: "Sensor not found" });
  }
};

const postWeatherData = (req, res) => {
  const { sensorId, temp, humidity, pressure, wind_kph } = req.body;
  const sensorData = weatherData.find((sensor) => sensor.sensorId === sensorId);
  if (sensorData) {
    sensorData.current = { temp, humidity, pressure, wind_kph };
    sensorData.history.push({
      temp,
      humidity,
      pressure,
      wind_kph,
      timestamp: new Date().toISOString(),
    });
    res.status(200).json(sensorData);
  } else {
    res.status(404).json({ message: "Sensor not found" });
  }
};

module.exports = {
  getCurrentWeather,
  getHistoricalData,
  postWeatherData,
  weatherData,
};
