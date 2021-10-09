const express = require("express");
const https = require("https");
const router = express.Router();

// Middleware
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

const responseBody = require("../models/responseBody");

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
        res.send(responseBody(location, weatherData));
      });
    } else {
      res.send({ data: "0" });
    }
  });
});

module.exports = router;
