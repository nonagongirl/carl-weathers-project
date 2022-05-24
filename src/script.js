function formatDate(timestamp) {
  let date = new Date(timestamp);
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

  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  let dateNum = date.getDate();
  let month = months[date.getMonth()];
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${dateNum} ${month} at ${hours}:${minutes}`;
}

//to display day names in Forecast
function formatForecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tues", "Weds", "Thurs", "Fri", "Sat"];

  return days[day];
}

//gives homepage some content pre-search
function search(city) {
  let apiKey = "9b385bf584a6637913273ac2cfe59646";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(weatherResult);
}

//for making use my location button work
function myPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "9b385bf584a6637913273ac2cfe59646";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(weatherResult);
}

//for making searchbox work
function searchCity(event) {
  event.preventDefault();
  let searchResult = document.querySelector("#searchbox");
  let cityResult = document.querySelector(".searchedCity");
  cityResult.innerHTML = `${searchResult.value}`;
  let apiKey = "9b385bf584a6637913273ac2cfe59646";
  let units = "metric";
  let apiUrlTwo = `https://api.openweathermap.org/data/2.5/weather?q=${searchResult.value}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrlTwo).then(weatherResult);
}

//to display info for forecast
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#weather-forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Sun", "Mon", "Tues", "Weds", "Thurs", "Fri", "Sat"];
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col">
              <div class="weather-forecast-date">${formatForecastDay(
                forecastDay.dt
              )}</div>
              <img src="http://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }.png" width="35">
              <div class="weather-forecast-temperature"> <span class = "weather-forecast-max">${Math.round(
                forecastDay.temp.max
              )}°C</span> / <span class = "weather-forecast-min">${Math.round(
          forecastDay.temp.min
        )}°C</span></div></div>
              `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

//to gather info for forecast
function getForecast(coordinates) {
  let apiKey = "9b385bf584a6637913273ac2cfe59646";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayForecast);
}

//for updating weather results in site body
function weatherResult(response) {
  tempC = Math.round(response.data.main.temp);
  let weatherDescription = response.data.weather[0].description;
  let city = response.data.name;
  let searchedCity = document.querySelector(".searchedCity");
  searchedCity.innerHTML = city;
  let localTempNum = document.querySelector(".tempNumber");
  localTempNum.innerHTML = `${tempC}°C`;
  let localTempWords = document.querySelector(".weather-desc");
  localTempWords.innerHTML = weatherDescription;
  let weatherIcon = response.data.weather[0].icon;
  let weatherEmoji = document.querySelector("#weatherEmoji");
  weatherEmoji.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`
  );
  let windSpeed = document.querySelector("#wind");
  windSpeed.innerHTML = Math.round(response.data.wind.speed);

  let dateElement = document.querySelector("#date-result");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);

  // to change the Carl photo depending on temperature
  let carlPic = document.querySelector(".carlPic");
  if (tempC < 0) {
    carlPic.setAttribute("src", "media/carlmiffed.jpg");
  } else if (tempC < 10) {
    carlPic.setAttribute("src", "media/carlsmile.jpg");
  } else if (tempC < 20) {
    carlPic.setAttribute("src", "media/carlhappy.jpg");
  } else {
    carlPic.setAttribute("src", "media/carlhot.jpg");
  }
  // NEED TO FIND A WIDER CARL IMAGE SELECTION
  getForecast(response.data.coord);
}

function getPosition(event) {
  event.preventDefault();
  let searchResult = document.querySelector("#searchbox");
  searchResult.value = "";
  navigator.geolocation.getCurrentPosition(myPosition);
}

let tempC = null;

// to make the myPosition function work when I press use my location
let locationButton = document.getElementById("my-location-button");
locationButton.addEventListener("click", getPosition);

// to make the above function work when I press go - nothing in the search box
let searchButton = document.getElementById("go-Button");
searchButton.addEventListener("click", searchCity);

let showCity = document.querySelector(".searching");
showCity.addEventListener("submit", searchCity);

search("london");
