# Weather Dashboard

A full-stack web application that displays current and historical weather data from multiple sensors. The application consists of a React-based frontend and a Node.js/Express backend to manage API requests and interact with a database.

## Features

- **Current Weather Data**: Displays real-time weather information for selected sensors.
- **Historical Data Visualization**: Provides a line chart to visualize historical temperature trends.
- **Sensor Selection**: Users can select different sensors to view respective data.
- **Responsive Design**: Optimized for both desktop and mobile viewing.

## Technologies Used

### Frontend:
- **React**: For building the user interface.
- **Ant Design**: UI components and layout.
- **Chart.js**: Data visualization for historical temperature trends.
- **Axios**: HTTP client for making API requests.

### Backend:
- **Node.js**: Server-side JavaScript runtime.
- **Express.js**: Web framework for building API routes.
- **MongoDB/MySQL**: For storing weather data (can choose based on preference).
- **Mongoose/Sequelize**: Database ORM for interacting with MongoDB/MySQL.

---

## Getting Started

### Prerequisites

- **Node.js**: Make sure you have Node.js installed. You can download it from [Node.js Official Site](https://nodejs.org/).
- **MongoDB/MySQL**: Ensure that you have either MongoDB or MySQL set up depending on which database you're using for weather data storage.

---

## Installation

### 1. Clone the repository:

```bash
git clone <repository-url>
cd weather-dashboard
```

### 2. Setup Frontend

1. **Navigate to the `frontend` directory**:

   ```bash
   cd frontend
   ```

2. **Install frontend dependencies**:

   ```bash
   npm install
   ```

3. **Run the frontend**:

   ```bash
   npm start
   ```

   The React application should now be accessible at `http://localhost:3000`. You will see the current weather data and have the option to view historical data.

### 3. Setup Backend

1. **Open a new terminal** and navigate to the `backend` directory:

   ```bash
   cd backend
   ```

2. **Install backend dependencies**:

   ```bash
   npm install
   ```

3. **Run the backend**:

   ```bash
   node index.js
   ```

   The Express server should now be running at `http://localhost:5000`. It handles API requests for current weather data and historical data of sensors.

---

## Running the Application

### Frontend

- The frontend is served at `http://localhost:3000`, where you can:
  1. View real-time weather data (temperature, humidity, pressure, wind speed).
  2. Select a sensor from the dropdown to visualize historical temperature trends on a line chart.

### Backend

- The backend API runs at `http://localhost:5000`. It provides the following endpoints:
  - `GET /api/current`: Fetches the current weather data for all sensors.
  - `GET /api/history/:sensorId`: Fetches the historical weather data for the selected sensor.

---

## Contributing

Contributions are welcome! Feel free to open issues, propose changes, or submit pull requests.


## Acknowledgements

- **Ant Design**: For UI components.
- **Chart.js**: For charting.
- **Express.js**: For building a robust backend.

