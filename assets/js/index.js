var resultTextEl = $('#result-text');
var dateToday = moment().format('l');
var recentList = $('#recent-list');
var tempToday = $('#temp-today');
var windToday = $('#wind-today');
var humidToday = $('#humid-today');
var uvToday = $('#uv-today');
var uvColor = $('#uv-color');
var recents = [];

// Pulling the api key from the config.js
// console.log(api.key);
// console.log(`https://api.openweathermap.org/data/2.5/weather?q=${api.city}&appid=${api.key}&units=imperial`)

// Searchbar function
var searchFormEl = $('#search-form');

function handleSearchFormSubmit(e) {
  e.preventDefault();

  var searchInputVal = $('#search-input').val();

  if (!searchInputVal) {
    console.log('You need a search input value!');
    return;
  }

  var city = searchInputVal;
  searchApi(city);
}

searchFormEl.submit(handleSearchFormSubmit);

// Call API for city lat and lon coordinates
function searchApi(city) {

    var coordinateQueryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + api.key
    console.log(coordinateQueryUrl)
    fetch(coordinateQueryUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (geoData) {

          //TO DO: display and store recent search function
          resultTextEl.text(geoData.name + " " + dateToday);
          weatherApi(geoData);
          forecastApi(geoData);
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function (e) {
      console.log(e);
    });
};

// Call API for current city weather conditions
function weatherApi (geoData) {
  var weatherQueryUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + geoData.coord.lat + "&lon=" + geoData.coord.lon + "&exclude=hourly,daily&appid=" + api.key + "&units=imperial"

  console.log(weatherQueryUrl);

  fetch(weatherQueryUrl)
  .then(function (response) {
    if (response.ok) {
      response.json().then(function (weatherData) {
        console.log(weatherData);
        //TO DO: display and store recent search function
        todayForecast(weatherData);
      });
    } else {
      alert('Error: ' + response.statusText);
    }
  })
  .catch(function (e) {
    console.log(e);
  });
};

// Display city weather data to today forecast
function todayForecast (weatherData) {
  var temp = weatherData.current.temp
  var wind = weatherData.current.wind_speed
  var humid = weatherData.current.humidity
  var uvi = weatherData.current.uvi

  tempToday.text(`Temp: ${temp}°F`);
  windToday.text(`Wind: ${wind} MPH`);
  humidToday.text(`Humidity: ${humid} %`);

  // Display UVI value
  uvColor.text(uvi);
  
  // Get color code value and apply color class accordingly
  var uviTrunc = Math.trunc(uvi)
  uvColor.attr("class", `uv${uviTrunc}`);
  
}

// TO DO: 5-day forecast (default Irvine) 
function forecastApi (geoData) {
  var forecastQueryUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + geoData.coord.lat + "&lon=" + geoData.coord.lon + "&exclude=hourly,daily&appid=" + api.key + "&units=imperial"
  console.log(forecastQueryUrl);

  fetch(forecastQueryUrl)
  .then(function (response) {
    if (response.ok) {
      response.json().then(function (forecastData) {
        console.log(forecastData);
        fiveForecast(forecastData);
      });
    } else {
      alert('Error: ' + response.statusText);
    }
  })
  .catch(function (e) {
    console.log(e);
  });
}

function fiveForecast(forecastData) {
  
}

// TO DO: Search history - append unordered list items to #recent
function renderRecents () {

    recentList.innerHTML = ""

    // Render new li for each previous search 
    for (var i=0; i < recents.length; i++) {
    
    // recent variable represents recents array item at [i]
    var recent = recents[i];

    var newRecent = $("<btn></btn>").text(city);
    recentList.append(newRecent)
    }
}

