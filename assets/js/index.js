var recentList = $('#recent-list')
var recents = [];

// Pulling the api key from the config.js
console.log(api.key);

console.log(`https://api.openweathermap.org/data/2.5/onecall?lat=${api.lat}&lon=${api.lon}&appid=${api.key}`);

function searchApi(query) {
    var weatherQueryUrl = 'https://www.loc.gov/search/?fo=json';
  
    if (format) {
      locQueryUrl = 'https://www.loc.gov/' + format + '/?fo=json';
    }
  
    locQueryUrl = locQueryUrl + '&q=' + query;
  
    fetch(locQueryUrl)
      .then(function (response) {
        if (!response.ok) {
          throw response.json();
        }
  
        return response.json();
      })
      .then(function (locRes) {
        // write query to page so user knows what they are viewing
        resultTextEl.textContent = locRes.search.query;
  
        console.log(locRes);
  
        if (!locRes.results.length) {
          console.log('No results found!');
          resultContentEl.innerHTML = '<h3>No results found, search again!</h3>';
        } else {
          resultContentEl.textContent = '';
          for (var i = 0; i < locRes.results.length; i++) {
            printResults(locRes.results[i]);
          }
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  }

// // Append unordered list items to #recent
// function renderRecents () {

//     recentList.innerHTML = ""

//     // Render new li for each previous search 
//     for (var i=0; i < recents.length; i++) {
    
//     // recent variable represents recents array item at [i]
//     var recent = recents[i];

//     var newRecent = $("<btn></btn>").text(city);
//     recentList.append(newRecent)
//     }
// }

// Default Irvine for 5-day forecast 