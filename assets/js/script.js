var searchEl=document.getElementById("search")

var ticketMasterAPIKey = '9daAJhjhZVxP9AAiMXhhIxjkZhBwKooJ';


function clickPress(event) {
    if (event.key === "Enter") {
        city = searchEl.value;
        var ticketmasterQuery = `https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&countryCode=US&city=${city}&apikey=${ticketMasterAPIKey}`;
        function testApi() {
            fetch(ticketmasterQuery, {
                mode: 'cors', 
            })
            .then ((response) => {
                return response.json();
            })
            .then((data) => {
                for (var i = 0; i < data._embedded.events.length; i++) {
                    console.log(data._embedded.events[i]);
                    var eventDiv = document.createElement("div")
                    eventDiv.id = i;
                    document.body.appendChild(eventDiv);
                    eventDiv.textContent = `${data._embedded.events[i].name} - ${data._embedded.events[i]._embedded.venues[0].name} Date: ${data._embedded.events[i].dates.start.localDate}`;
                }
            })}
        
            testApi();
    }

}

function musicSearch() {
    
    
}



