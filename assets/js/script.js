var searchEl=document.getElementById("search")
var eventMainEL = document.querySelectorAll(".event-h2");
var ticketMasterAPIKey = '9daAJhjhZVxP9AAiMXhhIxjkZhBwKooJ';
var breweryListEls = document.querySelectorAll(".brewery-list")
var modalTextEls = document.querySelectorAll(".w3-container");
var eventContainer = document.querySelectorAll(".event-container")

function clickPress(event) {
    if (event.key === "Enter") {
        for (event of eventContainer)
        {
        event.setAttribute('style', 'display: block;')
    }
        var city = searchEl.value;

        var ticketmasterQuery = `https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&countryCode=US&city=${city}&apikey=${ticketMasterAPIKey}`;


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
        eventMainEL[i].textContent = `${eventName} ${date}`
        document.querySelectorAll('.bg-purple-500')[i].firstElementChild.textContent = venueName + " " + venueAddress;
        console.log(eventVenue)
    }
}

function getBreweries(latitude, longitude, venueData, index) {
    fetch(`https://api.openbrewerydb.org/v1/breweries?by_dist=${latitude},${longitude}&per_page=1`)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        modalTextEls[index].lastElementChild.innerHTML = `<a href=${data[0].website_url}>${data[0].name}</a>`;
        console.log(data)
        console.log(data);
    })
}