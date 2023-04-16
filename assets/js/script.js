var searchEl=document.getElementById("search")
var eventMainEL = document.querySelectorAll(".event-h2");
var ticketMasterAPIKey = '9daAJhjhZVxP9AAiMXhhIxjkZhBwKooJ';
var breweryListEls = document.querySelectorAll(".brewery-list")
var showCityEl = document.querySelector(".saved-city")


function clickPress(event) {
    if (event.key === "Enter") {
        city = searchEl.value;
        var ticketmasterQuery = `https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&countryCode=US&city=${city}&apikey=${ticketMasterAPIKey}`;
        
        saveSearch(city)

        function eventsQuery() {
            fetch(ticketmasterQuery, {
                mode: 'cors', 
            })
            .then ((response) => {
                return response.json();
            })
            .then((data) => {
                createEventList(data);
            })}

        
            eventsQuery();
    }

}
function clickClearSearchHistory() {
    clearSearches()
    showCity()
}

function getSearches() {
    var searchHistory = JSON.parse(localStorage.getItem("searchHistory") || "[]") 
    return searchHistory
}

function clearSearches() {
    localStorage.setItem('searchHistory', "[]")
}

function saveSearch(savedCity) {
    var cityInfo = {
    name: savedCity,
   };
 
   var searches = getSearches()
   searches.push(cityInfo)
   localStorage.setItem('searchHistory', JSON.stringify(searches))
   showCity()
}

function showCity() {
    showCityEl.textContent= getSearches().map(city=>city.name);
}

function createEventList(searchData) {
    for (var i = 0; i < eventMainEL.length; i++) { 
        var event = searchData._embedded.events[i];
        var date = event.dates.start.localDate
        var eventVenue = event._embedded.venues[0]
        var eventName = event.name
        var venueName = eventVenue.name
        var venueLat = eventVenue.location.latitude;
        var venueLon = eventVenue.location.longitude;

        getBreweries(venueLat, venueLon, eventVenue, i);
        eventMainEL[i].textContent = `${eventName} - ${venueName} Date: ${date}`
    }
}

function getBreweries(latitude, longitude, venueData, index) {
    fetch(`https://api.openbrewerydb.org/v1/breweries?by_dist=${latitude},${longitude}&per_page=1`)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        console.log(index)
        console.log(data);
        console.log(venueData);
    })
}

