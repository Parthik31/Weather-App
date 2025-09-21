import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());

const PORT = 5000;
const API_KEY = process.env.WEATHER_KEY;

app.get("/weather/:city", async (req, res) => {
  const city = req.params.city;
  console.log("Fetching weather for:", city); // <- debug line
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    console.log("API Response:", response.data); // <- debug line
    res.json(response.data);
  } catch (err) {
    console.error(err.response ? err.response.data : err.message);
    res.status(404).json({ error: "City not found" });
  }
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
