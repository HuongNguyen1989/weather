let celsiustemp = null;
let cmax = [];
let cmin = [];

function init() {
  addEventHandlers();

  // Display current time
  const timeElement = document.querySelector("#current-time");
  timeElement.innerHTML = convertDateToString(new Date());

  // Display current weather
  displayWeatherOfCity('Hanoi');
}

/**
 * Display forecast data to document
 * @param {Weather} response 
 */
function displayForecast(response) {
  const forecastElement = document.querySelector(`#forecast`);
  const forecast = response.daily;
  let forecastHTML = `<div class ="row">`;
  forecast.forEach(function (dayForecast, index) {
    if (index < 6) {
      let date = new Date(dayForecast.dt * 1000);
      const weekday = date.toLocaleDateString("en-US", { weekday: "short" });
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
  
  const tempmax = document.querySelectorAll(".forecast-temp-max");
  const tempmin = document.querySelectorAll(".forecast-temp-min");
  tempmin.forEach(function (item, index) {
    cmin[index] = Number(item.textContent);
  });
  tempmax.forEach(function (item, index) {
    cmax[index] = Number(item.textContent);
  });
}

/**
 * Display today weather data to document
 * @param {City} response 
 */
function showToday(response) {
  const city = document.querySelector("#city-name");
  const icon = document.querySelector("#icon");
  const tempElement = document.querySelector("#today-temp");
  const description = document.querySelector("#today-description");
  const temprange = document.querySelector("#today-temp-range");
  const humd = document.querySelector("#today-humd");
  const wind = document.querySelector("#today-wind");

  celsiustemp = Math.round(response.main.temp);

  city.innerHTML = `${response.name}, ${response.sys.country}`;
  tempElement.innerHTML = Math.round(response.main.temp);
  description.innerHTML = response.weather[0].main;
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.weather[0].description);
  temprange.innerHTML = `🌡 : ${Math.round(
    response.main.temp_min
  )}°-${Math.round(response.main.temp_max)}°`;
  humd.innerHTML = `💧 : ${response.main.humidity}%`;
  wind.innerHTML = `💨: ${response.wind.speed}km/h`;

  //response day or night time of city
  let iconsearch = response.weather[0].icon;
  changecover(iconsearch.charAt(2));
}

// change background image
function changecover(timesofday) {
  if (timesofday === "d") {
    document.getElementById("cover").style.backgroundImage =
      "url('resources/images/day-cover.jpg')";
  } else {
    document.getElementById("cover").style.backgroundImage =
      "url('resources/images/night-cover.jpeg')";
  }
  fahrenheit.classList.remove("active");
  celsius.classList.add("active");
}

function changeUnitF(event) {
  event.preventDefault();
  celsius.classList.remove("active");
  fahrenheit.classList.add("active");
  const tempElement = document.querySelector("#today-temp");
  const tempmax = document.querySelectorAll(".forecast-temp-max");
  const tempmin = document.querySelectorAll(".forecast-temp-min");

  tempElement.innerHTML = Math.round(convertCtoF(celsiustemp));
  tempmax.forEach(function (item, index) {
    item.innerHTML = Math.round(convertCtoF(cmax[index]));
  });
  tempmin.forEach(function (item, index) {
    item.innerHTML = Math.round(convertCtoF(cmin[index]));
  });
}

function changeUnitC(event) {
  event.preventDefault();
  fahrenheit.classList.remove("active");
  celsius.classList.add("active");

  const tempElement = document.querySelector("#today-temp");
  const tempmax = document.querySelectorAll(".forecast-temp-max");
  const tempmin = document.querySelectorAll(".forecast-temp-min");

  tempElement.innerHTML = celsiustemp;
  tempmax.forEach(function (item, index) {
    item.innerHTML = cmax[index];
  });
  tempmin.forEach(function (item, index) {
    item.innerHTML = cmin[index];
  });
}

function addEventHandlers() {
  function handlesubmit(event) {
    event.preventDefault();
    const cityinput = document.querySelector("#text-search");
    displayWeatherOfCity(cityinput.value);
  }

  const form = document.querySelector("#city-search");
  form.addEventListener("submit", handlesubmit);
  
  const tempF = document.querySelector("#fahrenheit");
  tempF.addEventListener("click", changeUnitF);
  
  const tempC = document.querySelector("#celsius");
  tempC.addEventListener("click", changeUnitC);
}

function displayWeatherOfCity(city) {
  getCityByName(city)
    .then(function (cityData) {
      showToday(cityData);
      return getForecastByLocation(cityData.coord);
    })
    .then(displayForecast);
}

init();
