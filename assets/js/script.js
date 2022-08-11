var recentList = $('recent-list')
var recents = [];

// Searchbar function
var searchFormEl = document.querySelector('#search-form');

function handleSearchFormSubmit(event) {
  event.preventDefault();

  var searchInputVal = document.querySelector('#search-input').value;
  var formatInputVal = document.querySelector('#format-input').value;

  if (!searchInputVal) {
    console.error('You need a search input value!');
    return;
  }

  var queryString = './search-results.html?q=' + searchInputVal + '&format=' + formatInputVal;

  location.assign(queryString);
}

searchFormEl.addEventListener('submit', handleSearchFormSubmit);

// Append unordered list items to #recent
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

// Default Irvine for 5-day forecast 