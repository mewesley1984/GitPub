var searchEl=document.getElementById("search")
var eventMainEL = document.querySelectorAll(".event-h2");
var ticketMasterAPIKey = '9daAJhjhZVxP9AAiMXhhIxjkZhBwKooJ';


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

function musicSearch() {
    
    
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
        function getBreweries() {
            fetch(`https://api.openbrewerydb.org/v1/breweries?by_dist=${venueLat},${venueLon}&per_page=3`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data);
            })
        }
        getBreweries();
        eventMainEL[i].textContent = `${eventName} - ${venueName} Date: ${date}`
    }
}

// function getBreweries(venueData) {
//     var geocodeAPI = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=b4b306d022e640a29cb62888f869d314`
//     geoCode();
//     function geoCode()  {
//         fetch(geocodeAPI, {
//             mode: 'cors',
//         })
//         .then ((response) => {
//             return response.json();
//         })
//         .then((data) => {
//             venueData
//         })
//     }
// }