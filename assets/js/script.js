var searchEl=document.getElementById("search")
var eventMainEL = document.querySelectorAll(".event-h2");
var ticketMasterAPIKey = '9daAJhjhZVxP9AAiMXhhIxjkZhBwKooJ';
var breweryListEls = document.querySelectorAll(".brewery-list")


function clickPress(event) {
    if (event.key === "Enter") {
        city = searchEl.value;
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
        // var eventLi = document.createElement("li")
        
        // eventLi.id = `event-${i}`;
        // eventLi.className = `event-list-items`
        
        // eventListEl.appendChild(eventLi);
        
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
        console.log(breweryListEls[index].children[0])
        breweryListEls[index].children[0].textContent = data[0].name
        console.log(venueData);
    })
}