let options = {
  weekday: "short",
  month: "short",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
};
let today = new Date();
let time = document.querySelector("#current-time");
time.innerHTML = `${today.toLocaleDateString("en-US", options)}`;

//challenge 2
let cityinput = document.querySelector("#text-search");

function showToday(response) {
  console.log(response);
  let city = response.data.name;
  let country = response.data.sys.country;
  document.querySelector("#city-name").innerHTML = `${city}, ${country}`;

  let temperature = Math.round(response.data.main.temp);
  let tempsearch = document.querySelector("#today-temp");
  tempsearch.innerHTML = temperature;
  console.log(temperature);

  let description = response.data.weather[0].description;
  document.querySelector("#today-description").innerHTML = description;
  console.log(document.querySelector("#today-description"));

  let icon = response.data.weather[0].icon;
  let iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;

  document.querySelector("#today-icon").innerHTML = `<img src ="${iconUrl}">`;
  console.log(document.querySelector("#today-icon"));

  let tempmax = Math.round(response.data.main.temp_max);
  let tempmin = Math.round(response.data.main.temp_min);
  document.querySelector(
    "#today-temp-range"
  ).innerHTML = `🌡 : ${tempmin}°-${tempmax}°`;
  console.log(document.querySelector("#today-temp-range"));

  let humd = response.data.main.humidity;
  document.querySelector("#today-humd").innerHTML = `💧 : ${humd}%rh`;
  console.log(document.querySelector("#today-humd"));

  let wind = response.data.wind.speed;
  document.querySelector("#today-wind").innerHTML = `💨: ${wind}km/h`;
  console.log(document.querySelector("#today-wind"));
}
function citysearch(event) {
  event.preventDefault();
  let cityname = cityinput.value;
  let apiKey = "7e62f7501b593a16608f7f0c6a1d755f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showToday);
}
let form = document.querySelector("#city-search");
form.addEventListener("submit", citysearch);

///Current search weather
function showCurrentToday(response) {
  console.log(response);
  let city = response.data.list[0].name;
  let country = response.data.list[0].sys.country;
  document.querySelector("#city-name").innerHTML = `${city}, ${country}`;

  let temperature = Math.round(response.data.list[0].main.temp);
  let tempsearch = document.querySelector("#today-temp");
  tempsearch.innerHTML = temperature;
  console.log(temperature);

  let description = response.data.list[0].weather[0].description;
  document.querySelector("#today-description").innerHTML = description;
  console.log(document.querySelector("#today-description"));

  let icon = response.data.list[0].weather[0].icon;
  let iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;

  document.querySelector("#today-icon").innerHTML = `<img src ="${iconUrl}">`;
  console.log(document.querySelector("#today-icon"));

  let tempmax = Math.round(response.data.list[0].main.temp_max);
  let tempmin = Math.round(response.data.list[0].main.temp_min);
  document.querySelector(
    "#today-temp-range"
  ).innerHTML = `🌡 : ${tempmin}°-${tempmax}°`;
  console.log(document.querySelector("#today-temp-range"));

  let humd = response.data.list[0].main.humidity;
  document.querySelector("#today-humd").innerHTML = `💧 : ${humd}%rh`;
  console.log(document.querySelector("#today-humd"));

  let wind = response.data.list[0].wind.speed;
  document.querySelector("#today-wind").innerHTML = `💨: ${wind}km/h`;
  console.log(document.querySelector("#today-wind"));
}
function showPosition(position) {
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);
  let lon = position.coords.longitude;
  let lat = position.coords.latitude;
  let currentUrl = `https://api.openweathermap.org/data/2.5/find?lat=${lat}&lon=${lon}&cnt=1&appid=7e62f7501b593a16608f7f0c6a1d755f&units=metric`;
  axios.get(currentUrl).then(showCurrentToday);
}
function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("button");
button.addEventListener("click", getPosition);

//challenge 3
let temperature = document.querySelector("#today-temp");
let temperatureF = Math.round((temperature.textContent * 9) / 5 + 32);
function changeUnitF(event) {
  event.preventDefault();
  temperature.innerHTML = temperatureF;
}
function changeUnitC(event) {
  event.preventDefault();
  temperature.innerHTML = Math.round(((temperatureF - 32) * 5) / 9);
}
let tempC = document.querySelector("#celsius");
let tempF = document.querySelector("#fahrenheit");

tempF.addEventListener("click", changeUnitF);
tempC.addEventListener("click", changeUnitC);

//homework week 05 API
