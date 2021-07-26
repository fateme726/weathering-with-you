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
function displayforecast() {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Mon", "Thu", "Wed", "Thur", "Fri", "Sat"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
             <div class="col-2">
                <div class="weather-forecast-date">${day}</div>
                <img
                  src="http://openweathermap.org/img/wn/02d@2x.png"
                  width="36"
                />
                <div class="weather-forecast-tempratures">
                  <span class="weather-forecast-tempratures-max"> 18° </span>
                  <span class="weather-forecast-tempratures-min"> 12° </span>
                </div>
            </div>`;
  });

  forecastHTML = forecastHTML + ` </div>`;
  forecastElement.innerHTML = forecastHTML;
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
displayforecast();
