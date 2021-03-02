//var url for earthquake data
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_day.geojson";

//Make initial map with centering & zoom
var geoMap = L.map("map", {
    center: [36.17191, -115.13997],
    zoom: 4
});

//Define street map as title layer
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 15,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
}).addTo(geoMap);


