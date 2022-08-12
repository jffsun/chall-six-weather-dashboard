// Searchbar function
var searchFormEl = $('#search-form');

function handleSearchFormSubmit(e) {
  e.preventDefault();

  var searchInputVal = $('#search-input').val();

  if (!searchInputVal) {
    console.log('You need a search input value!');
    return;
  }

  var queryString = '/data/2.5/weather?=' + lat + '&lon=' + lon + '&appid=' + api.key

  // TO DO: Take input > Match with City > Pull Lat and Longi 
}

searchFormEl.submit(handleSearchFormSubmit);


// Get long and lat params out of city input 
function getParams() {
    var searchParamsArr = document.location.search.split('&');

}