// Imports
require("dotenv").config({ path: "./config/.env" });
const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const path = require("path");

// Config
const app = express();
const port = process.env.PORT || 4200;

// Middleware
app.use(logger("dev"));
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

// Router
const indexRouter = require("./routes/index");
const weatherRouter = require("./routes/weather");
app.use("/", indexRouter);
app.use("/weather", weatherRouter);

// Listen
app.listen(port, () => {
  console.log("Server listening on port", port);
  console.log("OpenWeatherMap API-Key", process.env.API_KEY);
});

module.exports = app;
