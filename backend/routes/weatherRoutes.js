const express = require("express");
const {
  getCurrentWeather,
  getHistoricalData,
  postWeatherData,
} = require("../controllers/weatherController");

const router = express.Router();

/*
- GET /api/current: Return current weather data for all sensors
- GET /api/history/:sensorId: Return historical data for a specific sensor
- POST /api/data: Accept new weather data from sensors
*/
router.get("/current", getCurrentWeather);
router.get("/history/:sensorId", getHistoricalData);
router.post("/data", postWeatherData);

module.exports = router;
