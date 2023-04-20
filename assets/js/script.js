var searchEl=document.getElementById("search")
var eventMainEL = document.querySelectorAll(".event-h2");
var ticketMasterAPIKey = '9daAJhjhZVxP9AAiMXhhIxjkZhBwKooJ';
var breweryListEls = document.querySelectorAll(".brewery-list")
var savedCitiesEl = document.getElementById("savedCities")
var currentCityEl = document.getElementById("currentCity")


var modalTextEls = document.querySelectorAll(".w3-container");
var eventContainer = document.querySelectorAll(".event-container")

function clickPress(event) {
    console.log(event)
    if (event.key === "Enter") {

        
        var city = searchEl.value;
        
        var ticketmasterQuery = `https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&countryCode=US&city=${city}&apikey=${ticketMasterAPIKey}`;
        
        saveSearch(city)
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

function fetchCity(city) {
        var ticketmasterQuery = `https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&countryCode=US&city=${city}&apikey=${ticketMasterAPIKey}`;
        fetch(ticketmasterQuery, {
            mode: 'cors', 
        })
        .then ((response) => response.json())
        .then((data) => createEventList(data))
        .catch((err) => console.log(err))
}

function getSearches() {
    var searchHistory = JSON.parse(localStorage.getItem("searchHistory") || "[]") 
    return searchHistory
}

function clearSearches() {
    localStorage.setItem('searchHistory', "[]")
    savedCitiesEl.innerHTML = ""
    currentCityEl.textContent = ""
}

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

function showCity(city) {
    currentCityEl.textContent = city.toUpperCase();
}
function fetchAndShowCity(city) {
    fetchCity(city)
    showCity(city)
    
}
function renderCityInfo() {
    savedCitiesEl.innerHTML = getSearches()
    .map(cityInfo=>`<button onclick="fetchAndShowCity(event.target.value)" class="saved-city" value="${cityInfo.name}">${cityInfo.name.toUpperCase()}</button>`)
    .join("<br>")
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

        document.querySelectorAll('.event')[i].firstElementChild.innerHTML = `${venueName} — ${venueAddress}`;
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