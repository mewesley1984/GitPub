var searchEl=document.getElementById("search")

var ticketMasterAPIKey = '9daAJhjhZVxP9AAiMXhhIxjkZhBwKooJ';


function clickPress(event) {
    if (event.key === "Enter") {
        city = searchEl.value;
        var ticketmasterQuery = `https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&city=${city}&apikey=${ticketMasterAPIKey}`;
        function testApi() {
            fetch(ticketmasterQuery, {
                mode: 'cors', 
            })
            .then ((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data);
            })}
        
            testApi();
    }

}

function musicSearch() {
    
    
}



