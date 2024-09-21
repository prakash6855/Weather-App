const express = require("express");
const cors = require("cors");
const weatherRoutes = require("./routes/weatherRoutes");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Use the weather routes
app.use("/api", weatherRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
