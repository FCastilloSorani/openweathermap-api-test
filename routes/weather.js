const express = require("express");
const https = require("https");
const router = express.Router();

// Middleware
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// API URL
const baseURL = "https://api.openweathermap.org/data/2.5/weather?q=";
const location = "Salta,ar";
const apiId = process.env.API_KEY;
const lang = "es";
const units = "metric";

router.get("/", (req, res) => {
  const url = `${baseURL}${location}&appid=${apiId}&lang=${lang}&units=${units}`;
  https.get(url, (response) => {
    if (response.statusCode === 200) {
      response.on("data", (data) => {
        const weatherData = JSON.parse(data);
        const sunrise = new Date(weatherData["sys"]["sunrise"] * 1000);
        const sunset = new Date(weatherData["sys"]["sunset"] * 1000);
        res.send({
          weather: {
            main: weatherData["weather"][0]["main"],
            description: String(weatherData["weather"][0]["description"]),
          },
          temps: {
            temp: weatherData["main"]["temp"],
            temp_min: weatherData["main"]["temp_min"],
            temp_max: weatherData["main"]["temp_max"],
            feels_like: weatherData["main"]["feels_like"],
          },
          humidity: weatherData["main"]["humidity"],
          info: {
            sunrise: sunrise.toLocaleTimeString("es-AR"),
            sunset: sunset.toLocaleTimeString("es-AR"),
          },
        });
      });
    } else {
      res.send({ data: "0" });
    }
  });
});

module.exports = router;
