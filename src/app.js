function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayforecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
             <div class="col-2">
                <div class="weather-forecast-date">${formatDay(
                  forecastDay.dt
                )}</div>
               
                <img
                  src="http://openweathermap.org/img/wn/${
                    forecastDay.weather[0].icon
                  }@2x.png"
                />
                <div class="weather-forecast-tempratures">
                  <span class="weather-forecast-tempratures-max"> ${Math.round(
                    forecastDay.temp.max
                  )} ° </span>
                  <span class="weather-forecast-tempratures-min"> ${Math.round(
                    forecastDay.temp.min
                  )} ° </span>
                </div>
            </div>`;
    }
  });

  forecastHTML = forecastHTML + ` </div>`;
  forecastElement.innerHTML = forecastHTML;
}
function getforecast(coordinates) {
  console.log(coordinates);
  let apiKey = "b6d73f272b32c7eb8715d70996cfa1dc";
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiURL).then(displayforecast);
}

function displayTemprature(response) {
  let tempratureElement = document.querySelector("#temprature");
  tempratureElement.innerHTML = Math.round(response.data.main.temp);
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = response.data.wind.speed;
  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  celiciusTemprature = response.data.main.temp;

  getforecast(response.data.coord);
}
function search(city) {
  let apiKey = "b6d73f272b32c7eb8715d70996cfa1dc";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric `;
  axios.get(apiURL).then(displayTemprature);
}
function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function showFahrenheitTemprature(event) {
  event.preventDefault();
  celiciusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemprature = (celiciusTemprature * 9) / 5 + 32;
  let tempratureElement = document.querySelector("#temprature");
  tempratureElement.innerHTML = Math.round(fahrenheitTemprature);
}

function showceliciusTemprature(event) {
  celiciusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  event.preventDefault();
  let tempratureElement = document.querySelector("#temprature");
  tempratureElement.innerHTML = Math.round(celiciusTemprature);
}
let celiciusTemprature = null;
search("tehran");
let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemprature);

let celiciusLink = document.querySelector("#celicius-link");
celiciusLink.addEventListener("click", showceliciusTemprature);
