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
  
  const generateRandomWeatherData = () => {
    weatherData.forEach((sensor) => {
      const temp = Math.floor(Math.random() * 35);
      const humidity = Math.floor(Math.random() * 100);
      const pressure = Math.floor(Math.random() * 50 + 950);
      const wind_kph = Math.floor(Math.random() * 20);
  
      sensor.current = { temp, humidity, pressure, wind_kph };
      sensor.history.push({ ...sensor.current, timestamp: new Date().toISOString() });
    });
  };
  
  setInterval(() => {
    generateRandomWeatherData();
    console.log("Updated weather data.");
  }, 30000);
  
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
    weatherData, // Export weatherData if needed for other modules
  };
  