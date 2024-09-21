// src/Dashboard.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [currentData, setCurrentData] = useState([]);
  const [historicalData, setHistoricalData] = useState([]);
  const [selectedSensor, setSelectedSensor] = useState(1); // Default to the first sensor
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCurrentData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/current");
        setCurrentData(response.data);
      } catch (error) {
        console.error("Error fetching current data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentData();
  }, []);

  useEffect(() => {
    const fetchHistoricalData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/history/${selectedSensor}`
        );
        setHistoricalData(response.data);
      } catch (error) {
        console.error("Error fetching historical data:", error);
      }
    };

    fetchHistoricalData();
  }, [selectedSensor]);

  const handleSensorChange = (event) => {
    setSelectedSensor(parseInt(event.target.value));
  };

  const chartData = {
    labels: historicalData.map((data) => data.timestamp),
    datasets: [
      {
        label: "Temperature (°C)",
        data: historicalData.map((data) => data.temp),
        fill: false,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  };

  return (
    <div>
      <h1>Weather Dashboard</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h2>Current Weather</h2>
          {currentData.map((sensor) => (
            <div key={sensor.sensorId}>
              <h3>{sensor.city}</h3>
              <p>Temperature: {sensor.current.temp} °C</p>
              <p>Humidity: {sensor.current.humidity} %</p>
              <p>Pressure: {sensor.current.pressure} hPa</p>
              <p>Wind Speed: {sensor.current.wind_kph} kph</p>
            </div>
          ))}
          <h2>Historical Data</h2>
          <label>
            Select Sensor:
            <select value={selectedSensor} onChange={handleSensorChange}>
              {currentData.map((sensor) => (
                <option key={sensor.sensorId} value={sensor.sensorId}>
                  {sensor.city}
                </option>
              ))}
            </select>
          </label>
          <Line data={chartData} />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
