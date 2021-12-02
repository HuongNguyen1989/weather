let apiKey = "7e62f7501b593a16608f7f0c6a1d755f";
let time = document.querySelector("#current-time");

let today = new Date();
let options = {
  weekday: "short",
  month: "short",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
};
time.innerHTML = `${today.toLocaleDateString("en-US", options)}`;

//DISPLAY FORCAST
//weather forcast in HTML-muilfy input by JS

function displayForecast(response) {
  let forecastElement = document.querySelector(`#forecast`);
  let forecast = response.data.daily;
  let forecastHTML = `<div class ="row">`;
  forecast.forEach(function (dayForecast, index) {
    if (index < 6) {
      let date = new Date(dayForecast.dt * 1000);
      weekday = date.toLocaleDateString("en-US", { weekday: "short" });
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
          <div class="forecast-day">${weekday}</div>
          <img
          src="http://openweathermap.org/img/wn/${
            dayForecast.weather[0].icon
          }@2x.png"
          alt=""
          width="42">
          <div class="forecast-temp">
          <div>
            <span class="forecast-temp-max"> ${Math.round(
              dayForecast.temp.max
            )}</span>°
          </div>
          <div>
            <span class="forecast-temp-min"> ${Math.round(
              dayForecast.temp.min
            )}</span>°
          </div>
          </div>
    </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  gettempforcast();
}

function getForecast(coord) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon=${coord.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
function showToday(response) {
  let city = document.querySelector("#city-name");
  let icon = document.querySelector("#icon");
  let tempElement = document.querySelector("#today-temp");
  let description = document.querySelector("#today-description");
  let temprange = document.querySelector("#today-temp-range");
  let humd = document.querySelector("#today-humd");
  let wind = document.querySelector("#today-wind");

  celsiustemp = Math.round(response.data.main.temp);

  city.innerHTML = `${response.data.name}, ${response.data.sys.country}`;
  tempElement.innerHTML = Math.round(response.data.main.temp);
  description.innerHTML = response.data.weather[0].main;
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);
  temprange.innerHTML = `🌡 : ${Math.round(
    response.data.main.temp_min
  )}°-${Math.round(response.data.main.temp_max)}°`;
  humd.innerHTML = `💧 : ${response.data.main.humidity}%`;
  wind.innerHTML = `💨: ${response.data.wind.speed}km/h`;

  //response day or night time of city
  let iconsearch = response.data.weather[0].icon;
  changecover(iconsearch.charAt(2));
  // response coord of city
  getForecast(response.data.coord);
}

function citysearch(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showToday);
}

// change background image
function changecover(timesofday) {
  if (timesofday === "d") {
    document.getElementById("cover").style.backgroundImage =
      "url('src/day-cover.jpg')";
  } else {
    document.getElementById("cover").style.backgroundImage =
      "url('src/night-cover.jpeg')";
  }
  fahrenheit.classList.remove("active");
  celsius.classList.add("active");
}

//change temp C to F
let celsiustemp = null;
let cmax = [];
let cmin = [];

function gettempforcast() {
  let tempmax = document.querySelectorAll(".forecast-temp-max");
  let tempmin = document.querySelectorAll(".forecast-temp-min");
  tempmin.forEach(function (item, index) {
    cmin[index] = Number(item.textContent);
  });
  tempmax.forEach(function (item, index) {
    cmax[index] = Number(item.textContent);
  });
}

function changeUnitF(event) {
  event.preventDefault();
  celsius.classList.remove("active");
  fahrenheit.classList.add("active");
  let tempElement = document.querySelector("#today-temp");
  let tempmax = document.querySelectorAll(".forecast-temp-max");
  let tempmin = document.querySelectorAll(".forecast-temp-min");

  tempElement.innerHTML = Math.round((celsiustemp * 9) / 5 + 32);
  tempmax.forEach(function (item, index) {
    item.innerHTML = Math.round((cmax[index] * 9) / 5 + 32);
  });
  tempmin.forEach(function (item, index) {
    item.innerHTML = Math.round((cmin[index] * 9) / 5 + 32);
  });
}

function changeUnitC(event) {
  event.preventDefault();
  fahrenheit.classList.remove("active");
  celsius.classList.add("active");

  let tempElement = document.querySelector("#today-temp");
  let tempmax = document.querySelectorAll(".forecast-temp-max");
  let tempmin = document.querySelectorAll(".forecast-temp-min");

  tempElement.innerHTML = celsiustemp;
  tempmax.forEach(function (item, index) {
    item.innerHTML = cmax[index];
  });
  tempmin.forEach(function (item, index) {
    item.innerHTML = cmin[index];
  });
}

function handlesubmit(event) {
  event.preventDefault();
  let cityinput = document.querySelector("#text-search");
  citysearch(cityinput.value);
}
let form = document.querySelector("#city-search");
form.addEventListener("submit", handlesubmit);

let tempF = document.querySelector("#fahrenheit");
tempF.addEventListener("click", changeUnitF);

let tempC = document.querySelector("#celsius");
tempC.addEventListener("click", changeUnitC);

citysearch("hanoi");
