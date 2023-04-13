var searchEl=document.getElementById("search")

function clickPress(event) {
    if (event.key === "Enter") {
        console.log("do something")
    }
}

function musicSearch() {
    
    
}
var ticketmasterQuery = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${ticketMasterAPIKey}`;
var ticketMasterAPIKey = '9daAJhjhZVxP9AAiMXhhIxjkZhBwKooJ';