let time = document.querySelector("#current-time");
let temperature = document.querySelector("#today-temp");
let today = new Date();
let options = {
  weekday: "short",
  month: "short",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
};
time.innerHTML = `${today.toLocaleDateString("en-US", options)}`;

function showToday(response) {
  console.log(response);
  let city = document.querySelector("#city-name");
  let icon = document.querySelector("#today-icon");

  let description = document.querySelector("#today-description");
  let temprange = document.querySelector("#today-temp-range");
  let humd = document.querySelector("#today-humd");
  let wind = document.querySelector("#today-wind");

  celsiustemperature = Math.round(response.data.main.temp);

  city.innerHTML = `${response.data.name}, ${response.data.sys.country}`;
  temperature.innerHTML = Math.round(response.data.main.temp);
  description.innerHTML = response.data.weather[0].main;
  icon.innerHTML = `<img src ="${`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`}">`; //icon
  temprange.innerHTML = `🌡 : ${Math.round(
    response.data.main.temp_min
  )}°-${Math.round(response.data.main.temp_max)}°`;
  humd.innerHTML = `💧 : ${response.data.main.humidity}%`;
  wind.innerHTML = `💨: ${response.data.wind.speed}km/h`;

  let iconsearch = response.data.weather[0].icon;
  changecover(iconsearch.charAt(2));
}

function citysearch(city) {
  let apiKey = "7e62f7501b593a16608f7f0c6a1d755f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showToday);
}
function handlesubmit(event) {
  event.preventDefault();
  let cityinput = document.querySelector("#text-search");
  citysearch(cityinput.value);
}
let form = document.querySelector("#city-search");
form.addEventListener("submit", handlesubmit);

citysearch("hanoi");

//change temp C to F
celsiustemperature = null;
let tempF = document.querySelector("#fahrenheit");
let tempC = document.querySelector("#celsius");

function changeUnitF(event) {
  event.preventDefault();
  celsius.classList.remove("active");
  fahrenheit.classList.add("active");
  temperature.innerHTML = Math.round((temperature.textContent * 9) / 5 + 32);
}

function changeUnitC(event) {
  event.preventDefault();
  fahrenheit.classList.remove("active");
  celsius.classList.add("active");
  temperature.innerHTML = celsiustemperature;
}
tempF.addEventListener("click", changeUnitF);
tempC.addEventListener("click", changeUnitC);

// change backgound image
function changecover(timesofday) {
  if (timesofday === "d") {
    document.getElementById("cover").style.backgroundImage =
      "url('src/day-cover.jpg')";
  } else {
    document.getElementById("cover").style.backgroundImage =
      "url('src/night-cover.jpg')";
  }
}
