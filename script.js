let now = new Date();

let date = document.querySelector(".date");

let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];
let hour = now.getHours();
let minute = now.getMinutes();

date.innerHTML = `${day}, ${hour}:${minute}`;

function showFahrenheit(event) {
  event.preventDefault();
}

function showCelsius(event) {
  event.preventDefault();
}

let fahrenheit = document.querySelector("#fahrenheit-link");
fahrenheit.addEventListener("click", showFahrenheit);

let celsius = document.querySelector("#celsius-link");
celsius.addEventListener("click", showCelsius);

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

function showWeather(response) {
  let temperatureClass = document.querySelector("#temperature");
  let temperature = Math.round(response.data.main.temp);
  temperatureClass.innerHTML = `${temperature}°`;
  let city = document.getElementById("city-name");
  city.innerHTML = response.data.name;

  let weatherText = document.getElementById("weatherIs");
  weatherText.innerHTML = response.data.weather[0].main;
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

let form = document.getElementById("search-form");
form.addEventListener("submit", search);

let currentButton = document
  .querySelector("#currentLocationButton")
  .addEventListener("click", getCurrentLocation);

navigator.geolocation.getCurrentPosition(showPosition);
