const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// In-memory data store
let weatherData = [
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

// Function to generate random weather data
const generateRandomWeatherData = () => {
  weatherData.forEach((sensor) => {
    const temp = Math.floor(Math.random() * 35); // Random temperature between 0 and 34
    const humidity = Math.floor(Math.random() * 100); // Random humidity between 0 and 99
    const pressure = Math.floor(Math.random() * 50 + 950); // Random pressure between 950 and 999
    const wind_kph = Math.floor(Math.random() * 20); // Random wind speed between 0 and 19

    // Update current data
    sensor.current = { temp, humidity, pressure, wind_kph };

    // Store historical data
    sensor.history.push({
      ...sensor.current,
      timestamp: new Date().toISOString(),
    });
  });
};

// Fetch weather data every 30 seconds
setInterval(() => {
  generateRandomWeatherData();
  console.log("Updated weather data.");
  console.log(weatherData);
}, 30000); // Fetch data every 30 seconds

// Get current weather data for all sensors
app.get("/api/current", (req, res) => {
  res.json(
    weatherData.map((sensor) => ({
      sensorId: sensor.sensorId,
      city: sensor.city,
      current: sensor.current,
    }))
  );
});

// Get historical data for a specific sensor
app.get("/api/history/:sensorId", (req, res) => {
  const sensorId = parseInt(req.params.sensorId);
  const sensorData = weatherData.find((sensor) => sensor.sensorId === sensorId);
  if (sensorData) {
    res.json(sensorData.history);
  } else {
    res.status(404).json({ message: "Sensor not found" });
  }
});

// Accept new weather data from sensors
app.post("/api/data", (req, res) => {
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
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
