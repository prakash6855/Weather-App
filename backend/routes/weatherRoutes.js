const express = require("express");
const {
  getCurrentWeather,
  getHistoricalData,
  postWeatherData,
} = require("../controllers/weatherController");

const router = express.Router();

router.get("/current", getCurrentWeather);
router.get("/history/:sensorId", getHistoricalData);
router.post("/data", postWeatherData);

module.exports = router;
