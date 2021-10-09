const responseBody = (_location, _weatherData) => {
  const sunrise = new Date(_weatherData["sys"]["sunrise"] * 1000);
  const sunset = new Date(_weatherData["sys"]["sunset"] * 1000);
  return {
    location: _location,
    weather: {
      main: _weatherData["weather"][0]["main"],
      description: String(_weatherData["weather"][0]["description"]),
    },
    temps: {
      temp: _weatherData["main"]["temp"],
      temp_min: _weatherData["main"]["temp_min"],
      temp_max: _weatherData["main"]["temp_max"],
      feels_like: _weatherData["main"]["feels_like"],
    },
    humidity: _weatherData["main"]["humidity"],
    info: {
      sunrise: sunrise.toLocaleTimeString("es-AR"),
      sunset: sunset.toLocaleTimeString("es-AR"),
    },
  };
};

module.exports = responseBody;