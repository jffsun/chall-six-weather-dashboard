var resultTextEl = $('#result-text');
var recentList = $('#recent-list');
var tempToday = $('#temp-today');
var windToday = $('#wind-today');
var humidToday = $('#humid-today');
var uvToday = $('#uv-today');



var recents = [];

// Pulling the api key from the config.js
console.log(api.key);
console.log(`https://api.openweathermap.org/data/2.5/weather?q=${api.city}&appid=${api.key}&units=imperial`)

// Searchbar function
var searchFormEl = $('#search-form');

function handleSearchFormSubmit(e) {
  e.preventDefault();

  var searchInputVal = $('#search-input').val();

  if (!searchInputVal) {
    console.log('You need a search input value!');
    return;
  }

  console.log(searchInputVal);
  var city = searchInputVal;
  searchApi(city);
}

searchFormEl.submit(handleSearchFormSubmit);

// First call API for latitutude and longitude
function searchApi(city) {
    var coordinateQueryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + api.key + "&units=imperial"
    console.log(coordinateQueryUrl);

    fetch(coordinateQueryUrl)
    .then(function (response) {
      if (response.ok) {
        console.log(response);
        response.json().then(function (geoData) {
          console.log(geoData);
          console.log(geoData.coord)
          //TO DO: display and store recent search function
          weatherApi(geoData);
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    // .catch(function (error) {
    //   alert('Unable to connect to GitHub');
    // });
};

// Then call API for weather conditions
function weatherApi(geoData) {
  var weatherQueryUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + geoData.coord.lat + "&lon=" + geoData.coord.lon + "&exclude=hourly,daily&appid=" + api.key

  console.log(weatherQueryUrl);

  fetch(weatherQueryUrl)
  .then(function (response) {
    if (response.ok) {
      console.log(response);
      response.json().then(function (weatherData) {
        console.log(weatherData);
        //TO DO: display and store recent search function
        todayForecast(weatherData);
      });
    } else {
      alert('Error: ' + response.statusText);
    }
  })
  // .catch(function (error) {
  //   alert('Unable to connect to GitHub');
  // });
};
// TO DO: trim display data to today forecast el with units
function todayForecast (weatherData) {
  tempToday.text(weatherData.current.temp)
  windToday.text(weatherData.current.wind_speed)
  humidToday.text(weatherData.current.humidity)
  uvToday.text(weatherData.current.uvi)
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

// TO DO: 5-day forecast (default Irvine) 