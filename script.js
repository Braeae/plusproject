let now = new Date();

let date = document.querySelector(".date");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hour = now.getHours();
let minute = now.getMinutes();

date.innerHTML = `${day}, ${hour}:${minute}`;

function search(event) {
  event.preventDefault();
  let city = document.getElementById("city-name");
  let input = document.getElementById("search-form-input");
  city.innerHTML = input.value;

  searchCity(input.value);
}

function searchCity(city) {
  let apiKey = "48db8e1b879f986b02bee0e6485f578d";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#weekDays");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `

          <div class="col-md-2" id="weekDays">
          <p class="weather-forecast-date">${formatDay(
            forecastDay.dt
          )} <br />  <span class="weather-forecast-temperature-max"> ${Math.round(
          forecastDay.temp.max
        )}° </span>
          <span class="weather-forecast-temperature-min"> ${Math.round(
            forecastDay.temp.min
          )}° </span> </p>
          <img
            src="img/sunny.png"
            alt="sunny"
            class="weatherImg"
            width="60px"
          />
        </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showWeather(response) {
  console.log(response.data);
  let temperature = document.querySelector("#temperature");
  let city = document.getElementById("city-name");
  let weatherText = document.getElementById("weatherIs");
  let humidity = document.getElementById("humidity");
  let windSpeed = document.getElementById("wind");
  let feelsLike = document.getElementById("feels");
  let weatherImage = document.querySelector("#mainImg");
  let partlySunny = document.querySelector("#sunnyWindy");

  celsiusTemperature = response.data.main.temp;

  temperature.innerHTML = Math.round(celsiusTemperature);
  city.innerHTML = response.data.name;

  weatherText.innerHTML = response.data.weather[0].main;
  humidity.innerHTML = response.data.main.humidity;
  windSpeed.innerHTML = response.data.wind.speed;
  feelsLike.innerHTML = Math.round(response.data.main.feels_like);

  if (temperature.innerHTML < 15 || weatherText.innerHTML === "Clouds") {
    weatherImage.src = "img/cloud.png";
  } else {
    weatherImage.src = "img/sunny.png";
  }

  if (temperature.innerHTML < 15 && weatherText.innerHTML === "Rain") {
    weatherImage.src = "img/rain.png";
  }
  if (temperature.innerHTML > 15 && weatherText.innerHTML === "Clear") {
    weatherImage.src = "img/sunny.png";
  }
  if (temperature.innerHTML < 0 || weatherText.innerHTML === "Snow") {
    weatherImage.src = "img/snow.png";
  }

  getForecast(response.data.coord);
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "48db8e1b879f986b02bee0e6485f578d";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showFahrenheit(event) {
  event.preventDefault();

  let temperature = document.querySelector("#temperature");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperature.innerHTML = Math.round(fahrenheitTemperature);
}

function showCelsius(event) {
  event.preventDefault();

  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let form = document.getElementById("search-form");
form.addEventListener("submit", search);

let celsiusLink = document.querySelector("#celsiusLink");

celsiusLink.addEventListener("click", showCelsius);

let fahrenheitLink = document.querySelector("#fahrenheitLink");

fahrenheitLink.addEventListener("click", showFahrenheit);

let currentButton = document
  .querySelector("#currentLocationButton")
  .addEventListener("click", getCurrentLocation);

navigator.geolocation.getCurrentPosition(showPosition);

searchCity("Amsterdam");
