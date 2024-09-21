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
import { Layout, Card, Select, Spin, Typography } from "antd";

const { Header, Content } = Layout;
const { Option } = Select;
const { Title: AntTitle, Text } = Typography;

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
  const [selectedSensor, setSelectedSensor] = useState(1);
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

  const handleSensorChange = (value) => {
    setSelectedSensor(value);
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
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ background: "#fff", padding: 0 }}>
        <AntTitle level={2} style={{ textAlign: "center" }}>
          Weather Dashboard
        </AntTitle>
      </Header>
      <Content style={{ padding: "20px" }}>
        {loading ? (
          <Spin size="large" />
        ) : (
          <div>
            <AntTitle level={3}>Current Weather</AntTitle>
            <div style={{ display: "flex", gap: "20px" }}>
              {currentData.map((sensor) => (
                <Card
                  key={sensor.sensorId}
                  title={sensor.city}
                  style={{ width: 300 }}
                >
                  <Text>Temperature: {sensor.current.temp} °C</Text>
                  <br />
                  <Text>Humidity: {sensor.current.humidity} %</Text>
                  <br />
                  <Text>Pressure: {sensor.current.pressure} hPa</Text>
                  <br />
                  <Text>Wind Speed: {sensor.current.wind_kph} kph</Text>
                </Card>
              ))}
            </div>
            <AntTitle level={3}>Historical Data</AntTitle>
            <label>
              Select Sensor:
              <Select
                defaultValue={selectedSensor}
                style={{ width: 200, marginLeft: 10 }}
                onChange={handleSensorChange}
              >
                {currentData.map((sensor) => (
                  <Option key={sensor.sensorId} value={sensor.sensorId}>
                    {sensor.city}
                  </Option>
                ))}
              </Select>
            </label>
            <Line data={chartData} />
          </div>
        )}
      </Content>
    </Layout>
  );
};

export default Dashboard;
