// searchbar variables
var searchFormEl = $('#search-form');
var recentsListEl = $('#recents-list');

// current forecast variables
var dateToday = moment().format('l');
var cityDateEl = $('#city-date');
var tempTodayEl = $('#temp-today');
var windTodayEl = $('#wind-today');
var humidTodayEl = $('#humid-today');
var uvTodayEl = $('#uv-today');
var uvColorEl = $('#uv-color');

// five day forecast elements
var forecastCardEl = $('#forecast');

// renders past city searches
function renderRecents () {

  // retrieves locally stored cities or sets an empty array if no cities stored
  recents = JSON.parse(localStorage.getItem("recents") || '[]');

  recentsListEl.innerHTML = "";

  // for every recent search create a button 
  for (var i=0; i < recents.length; i++) {
    var recent = recents[i];
    recentsListEl.prepend(
    `<li class="btn">
    <button class="btn recent-button" id="${recent}" type="button">${recent}</button>
    </li>`);
  }
} 

// gets city lat and lon coordinates
function coordApi(city) {

    var coordinateQueryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + api.key;
    fetch(coordinateQueryUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (coordData) {

          var cityName = coordData.name;

          // render city name and today date
          cityDateEl.text(coordData.name + " " + dateToday);

          saveCity(cityName);
          // renderNewRecent(cityName);
          todayApi(coordData);
          fiveForecastApi(coordData);
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function (e) {
      console.log(e);
    });
};

// saves user's search in local storage
function saveCity (cityName) {

  // adds user's most recent search to array
  if (recents.includes(cityName)) {
    return;
  } else {
  recents.push(cityName);
  recentsListEl.prepend(
    `<li class="btn">
    <button class="btn recent-button" type="button">${cityName}</button>
    </li>`);
  }

  // stores recents array in local storage
  localStorage.setItem("recents", JSON.stringify(recents));
}

// gets city's current weather data
function todayApi (coordData) {
  var weatherQueryUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + coordData.coord.lat + "&lon=" + coordData.coord.lon + "&exclude=hourly,daily&appid=" + api.key + "&units=imperial";
  fetch(weatherQueryUrl)
  .then(function (response) {
    if (response.ok) {
      response.json().then(function (weatherData) {
    
        renderToday(weatherData);
      });
    } else {
      alert('Error: ' + response.statusText);
    }
  })
  .catch(function (e) {
    console.log(e);
  });
}

// renders city's current weather
function renderToday (weatherData) {
  var temp = weatherData.current.temp
  var wind = weatherData.current.wind_speed
  var humid = weatherData.current.humidity
  var uvi = weatherData.current.uvi
  
  tempTodayEl.text(`Temp: ${temp}??F`);
  windTodayEl.text(`Wind: ${wind}  MPH`);
  humidTodayEl.text(`Humidity: ${humid} %`);

  // display UVI number value
  uvColorEl.text(uvi);
  
  // round down uvi to whole number and set color coded class
  var uviTrunc = Math.trunc(uvi);
  uvColorEl.attr("class", `uv${uviTrunc}`);
}

// gets city's five day weather data
function fiveForecastApi (coordData) {
  var fiveForecastUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + coordData.coord.lat + "&lon=" + coordData.coord.lon + "&exclude=hourly,daily&appid=" + api.key + "&units=imperial";

  fetch(fiveForecastUrl)
  .then(function (response) {
    if (response.ok) {
      response.json().then(function (fiveForecastData) {
        renderFiveForecast(fiveForecastData);
      });
    } else {
      alert('Error: ' + response.statusText);
    }
  })
  .catch(function (e) {
    console.log(e);
  });
}

// renders five day weather data
function renderFiveForecast(fiveForecastData) {

  // take 5 times from fiveForecastData 
  var days = [0, 8, 16, 24, 32];

  forecastCardEl.empty();

  days.forEach(function (i) {

  // creates HTML container with ID for each day  
  forecastCardEl.append(`<div id="day${i}" class="card text-center"></div>`);

  // appends forecast data to respective day 
  $(`#day${i}`).append(
  `<h5 class="card-title">${new Date(fiveForecastData.list[i].dt * 1000).toLocaleDateString("en-US")}</h5>`,
  `<img class src="https://openweathermap.org/img/wn/${fiveForecastData.list[i].weather[0].icon}@2x.png"</img>`,
  `<p class="card-body">Temp: ${fiveForecastData.list[i].main.temp}??F</p>`, 
  `<p class="card-body">Wind: ${fiveForecastData.list[i].wind.speed} MPH</p>`,
  `<p class="card-body">Humidity: ${fiveForecastData.list[i].main.humidity}%</p>`);
  })
}

// handles user search submission
function handleSearchFormSubmit(e) {
  e.preventDefault();

  var searchInputVal = $('#search-input').val();

  // if user clicks search without entering input
  if (!searchInputVal) {
    console.log('You need a search input value!');
    return;
  } else {
  var city = searchInputVal;

  // gets coordinates for searched city
  coordApi(city);
  }
}

searchFormEl.submit(handleSearchFormSubmit);

// loads recent searches and displays Irvine weather upon initilization
function init () {
  renderRecents();
  coordApi('Irvine');
}

init();

// searches and displays weather data of the recent search button clicked
function handleRecentSearch(event) {
  event.preventDefault();
  var recentCity = $(this).attr('id');
  coordApi(recentCity);
}

// handles click on a recent search button
$('.recent-button').on('click', handleRecentSearch);

