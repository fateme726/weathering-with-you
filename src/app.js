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
}

let apiKey = "b6d73f272b32c7eb8715d70996cfa1dc";
let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=Berlin&appid=${apiKey}&units=metric `;
axios.get(apiURL).then(displayTemprature);
