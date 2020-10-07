const api = {
  key: "d63c6d988d5b0ea156065b7a03a830e5",
  base: "https://api.openweathermap.org/data/2.5/",
};

const searchbox = document.querySelector(".search-box");
searchbox.addEventListener("keypress", setQuery);

getResults("Delhi");

function setQuery(evt) {
  if (evt.keyCode == 13) {
    getResults(searchbox.value);
  }
}

function getResults(query) {
  fetch(`${api.base}weather?q=${query}&APPID=${api.key}`)
    .then((weather) => {
      return weather.json();
    })
    .then((res) => displayResults(res))
    .catch((err) => console.log(err));
}

function displayResults(weather) {
  let city = document.getElementsByClassName("city");
  city[0].innerHTML = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector(".location .date");
  date.innerText = dateBuilder(now);

  let up = function updatetime() {
    let T = document.getElementsByClassName("time")[0];
    T.innerText = formatAMPM();
  };
  setInterval(up, 1000);

  let temp = document.querySelector(".current .temp");
  temp.innerHTML = `${Math.round(weather.main.temp - 273.15)}<span>°c</span>`;

  let weather_el = document.querySelector(".current .weather");
  weather_el.innerText = weather.weather[0].main;

  let hilow = document.querySelector(".hi-low");
  hilow.innerText = `${Math.round(
    weather.main.temp_min - 273.15
  )}°c / ${Math.round(weather.main.temp_max - 273.15)}°c`;

  if (weather_el.textContent == "Clear") {
    console.log(weather_el.textContent);
    document.body.style.backgroundImage = "URL('images/clear.gif')";
  } else if (weather_el.textContent == "Haze") {
    document.body.style.backgroundImage = "URL('images/clear.gif')";
  } else if (weather_el.textContent == "Rain") {
    document.body.style.backgroundImage = "URL('images/rain.gif')";
  } else if (weather_el.textContent == "Clouds") {
    document.body.style.backgroundImage = "URL('images/clouds.gif')";
  } else if (weather_el.textContent == "Sunny") {
    document.body.style.backgroundImage = "URL('images/sunny.gif')";
  } else if (weather_el.textContent == "Snow") {
    document.body.style.backgroundImage = "URL('images/snow.gif')";
  } else if (weather_el.textContent == "Thunderstrom") {
    document.body.style.backgroundImage = "URL('images/thunderstrom.gif')";
  } else {
    document.body.style.backgroundImage = "URL('images/bg.jpg')";
  }
}
function formatAMPM() {
  var date = new Date();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();
  var ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + ":" + seconds + " " + ampm;
  return strTime;
}
function dateBuilder(d) {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}