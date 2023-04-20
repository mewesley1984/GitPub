var searchEl=document.getElementById("search")
var eventMainEL = document.querySelectorAll(".event-h2");
var ticketMasterAPIKey = '9daAJhjhZVxP9AAiMXhhIxjkZhBwKooJ';
var breweryListEls = document.querySelectorAll(".brewery-list")
var savedCitiesEl = document.getElementById("savedCities")
var currentCityEl = document.getElementById("currentCity")


var modalTextEls = document.querySelectorAll(".w3-container");
var eventContainer = document.querySelectorAll(".event-container")
// Running this function right away allows users to see their prior searches when the website initially shows.
renderCityInfo()

function clickPress(event) {
    
    if (event.key === "Enter") {

        
        var city = searchEl.value;
        
        var ticketmasterQuery = `https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&countryCode=US&city=${city}&apikey=${ticketMasterAPIKey}`;
        // sets the searched item in local storage, and pushes new cities onto object string.  Also gets the saved cities and shows them in the browser
        saveSearch(city)
        // this allows users to see the current city they searched 
        showCity(city)

        function eventsQuery() {
            fetch(ticketmasterQuery, {
                mode: 'cors', 
            })
            .then ((response) => response.json())
            .then((data) => createEventList(data))
            .catch((err) => console.log(err))
        }
        eventsQuery();
        for (event of eventContainer) {event.setAttribute('style', 'display: block;')}
    }
}
// this function fetches the ticketmaster api and shows info when the user clicks on one of their saved cities.
function fetchCity(city) {
    console.log(city)
        var ticketmasterQuery = `https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&countryCode=US&city=${city}&apikey=${ticketMasterAPIKey}`;
        fetch(ticketmasterQuery, {
            mode: 'cors', 
        })
        .then ((response) => response.json())
        .then((data) => createEventList(data))
        .catch((err) => console.log(err))
}
// gets the items in searchHistory and returns them as a object.  If there were no prior searches it will show nothng.
function getSearches() {
    var searchHistory = JSON.parse(localStorage.getItem("searchHistory") || "[]") 
    return searchHistory
}
// clears search history on webpage and local storage
function clearSearches() {
    localStorage.setItem('searchHistory', "[]")
    savedCitiesEl.innerHTML = ""
    currentCityEl.textContent = ""
}
// grabs the prior saved cities and adds current saved city to string.  Shows current city as well as prior saved cities on webpage.
function saveSearch(savedCity) {
    var cityInfo = {
    name: savedCity,
   };
 
   var searches = getSearches()
   searches.push(cityInfo)
   localStorage.setItem('searchHistory', JSON.stringify(searches))
   showCity(cityInfo.name)
   renderCityInfo()
}
// shows current city as all upper-case letters.
function showCity(city) {
    currentCityEl.textContent = city.toUpperCase();
}
// when a user clicks on a saved city this will run.  The eventContainer box displays when user clicks, the saved city is now shown as the current city being searched, and the fetchCity function grabs the tickemaster API.
function fetchAndShowCity(city) {
    
    fetchCity(city)
    showCity(city)
    for (var clickevent of eventContainer) {clickevent.setAttribute('style', 'display: block;')}
}
// this functions shows saved cities as clickable buttons all uppercase.  Button brings in fetchAndShowCity function so when user clicks the ticketmaster API runs.
function renderCityInfo() {
    savedCitiesEl.innerHTML = getSearches()
    .map(cityInfo=>`<button onclick="fetchAndShowCity(event.target.value)" value="${cityInfo.name}">${cityInfo.name.toUpperCase()}</button>`)
    .join("")
    
}

function createEventList(searchData) {
    for (var i = 0; i < eventMainEL.length; i++) {
        
        var event = searchData._embedded.events[i];
        var date = event.dates.start.localDate.slice(5)
        var eventVenue = event._embedded.venues[0]
        var eventName = event.name
        var venueName = eventVenue.name
        var venueLat = eventVenue.location.latitude;
        var venueLon = eventVenue.location.longitude;
        var venueAddress = eventVenue.address.line1;

        getBreweries(venueLat, venueLon, eventVenue, i);

        eventMainEL[i].innerHTML = `${eventName} <span class="dates" id="date-${i + 1}">${date}</span>`

        document.querySelectorAll('.event')[i].firstElementChild.innerHTML = `<a href=${eventVenue.url}>${venueName} — ${venueAddress}</a>`;
    }
}

function getBreweries(latitude, longitude, venueData, index) {
    fetch(`https://api.openbrewerydb.org/v1/breweries?by_dist=${latitude},${longitude}&per_page=5`)
      .then((response) => response.json())
      .then((data) => {
        var breweryList = '';
        for (var i = 0; i < data.length; i++) {
          var brewery = data[i];

          // Adds each brewery for its respective venue to <li> list in modal 
          breweryList += `<li class="brewery-list"><a href="${brewery.website_url}">${brewery.name}</a> - ${brewery.address_1}</li>`;
        }

        // Sets modal inner content with the brewery information 
        modalTextEls[index].lastElementChild.innerHTML = `
          <h3 class="modal-header">Here are the Breweries Near ${venueData.name} (From closest to farthest):</h3>
          <ul>${breweryList}</ul>
        `;
      })
      .catch((err) => console.log(err))
  }