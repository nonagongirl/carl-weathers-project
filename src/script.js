//current date and time
let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

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
let month = months[now.getMonth()];
let hours = now.getHours();
let minutes = now.getMinutes();
let date = now.getDate();

hours = hours < 10 ? "0" + hours : hours;
minutes = minutes < 10 ? "0" + minutes : minutes;

let dateNow = document.querySelector(".current");
dateNow.innerHTML = `At your current location it's ${hours}:${minutes} on ${day} ${date} ${month}`;
console.log(dateNow);

//for making use my location button work
function myPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "9b385bf584a6637913273ac2cfe59646";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(weatherResult);
}

//for making searchbox work
function searchCity(event) {
  event.preventDefault();
  let searchResult = document.querySelector("#searchbox");
  let cityResult = document.querySelector(".searchedCity");
  cityResult.innerHTML = `${searchResult.value}`;
  let apiKey = "9b385bf584a6637913273ac2cfe59646";
  let apiUrlTwo = `https://api.openweathermap.org/data/2.5/weather?q=${searchResult.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrlTwo).then(weatherResult);
}

//for updating weather results in site body
function weatherResult(response) {
  let tempC = Math.round(response.data.main.temp);
  let weatherDescription = response.data.weather[0].main;
  let city = response.data.name;
  let searchedCity = document.querySelector(".searchedCity");
  searchedCity.innerHTML = city;
  let localTempNum = document.querySelector(".tempNumber");
  localTempNum.innerHTML = `${tempC}°C`;
  let localTempWords = document.querySelector(".weatherDesc");
  localTempWords.innerHTML = weatherDescription;
}

let showCity = document.querySelector(".searching");
showCity.addEventListener("submit", searchCity);

function getPosition(event) {
  event.preventDefault();
  let searchResult = document.querySelector("#searchbox");
  searchResult.value = "";
  navigator.geolocation.getCurrentPosition(myPosition);
}
// to make the myPosition function work when I press use my location
let locationButton = document.getElementById("my-location-button");
locationButton.addEventListener("click", getPosition);

// to make the above function work when I press go - nothing in the search box
let searchButton = document.getElementById("go-Button");
searchButton.addEventListener("click", searchCity);

let tempC = "17";
let tempF = Math.round(tempC * (9 / 5) + 32);

//changes temp to F
function changeTempTypeF(event) {
  event.preventDefault();
  let tempTypeChange = document.querySelector(".tempNumber");
  tempTypeChange.innerHTML = `${tempF}°F ☀`;
}

//changes temp to C
function changeTempTypeC(event) {
  event.preventDefault();
  let tempTypeChange = document.querySelector(".tempNumber");
  tempTypeChange.innerHTML = `${tempC}°C ☀`;
}

let ctof = document.querySelector(".tempTypeF");
ctof.addEventListener("click", changeTempTypeF);

let ftoc = document.querySelector(".tempTypeC");
ftoc.addEventListener("click", changeTempTypeC);

// function findWeather() {
//   let city = prompt("Enter a city");
//   city = city.toLowerCase();
//   if (weather[city] !== undefined) {
//     let tempC = Math.round(weather[city].temp);
//     let tempF = Math.round(weather[city].temp * (9 / 5) + 32);
//     let humidity = weather[city].humidity;

//     alert(
//       `It is currently ${tempC}°C (${tempF}°F) in ${city} with a humidity of ${humidity}%.`
//     );
//   } else {
//     alert(
//       `Sorry, we don't know the weather for this city. Try going to www.google.com/search?q=weather+${city}.`
//     );
//   }
// }

//change emojis in weather result (not working as of 4 May)
// if (tempC < 10) {
//   let emojiChange = document.querySelector(".emoji");
//   emojiChange.innerHTML = `❄`;
// } else {
//   let emojiChange = document.querySelector(".emoji");
//   emojiChange.innerHTML = `🌞`;
// }
