var searchEl=document.getElementById("search")

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
    var eventListEl = document.createElement("ol");
    document.body.appendChild(eventListEl);
    for (var i = 0; i < searchData._embedded.events.length; i++) {

        console.log(searchData._embedded.events[i]);
        var eventLi = document.createElement("li")
        
        eventLi.id = `event-${i}`;
        eventLi.className = `event-list-items`
        
        eventListEl.appendChild(eventLi);

        var event = searchData._embedded.events[i];
        var date = event.dates.start.localDate
        var eventVenue = event._embedded.venues[0]
        var eventName = event.name
        var venueName = eventVenue.name

        eventLi.textContent = `${eventName} - ${venueName} Date: ${date}`;
    }
}

