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


// Write function to apply changes to color & radius based on magnitude of the earthquake
d3.json(url, function (data) {
    function markerDetail(feature) {
        return {
            opacity: .6,
            fillOpacity: 1,
            fillColor: applyColors(feature.properties.mag),

            radius: applyRadius(feature.properties.mag),
            weight: 0.5
        };
    }
    // Write function to apply changes to the radius of a circle point based on magnitude of the captured earthquake
    function applyRadius(magnitude) {
        if (magnitude == 0) {
            return 1;
        }

        return magnitude * 5;
    }
    // specify color shade for fill color based based on magnitude
    function applyColors(magnitude) {
        switch (true) {
            case magnitude > 5:
                return "#0B0B61";
            case magnitude > 4:
                return "#0404B4";
            case magnitude > 3:
                return "#0000FF";
            case magnitude > 2:
                return "#2E9AFE";
            case magnitude > 1:
                return "#81BEF7";
            default:
                return "#CEE3F6";
        }
    }
    
    // Write GeoJson to apply changes to map
    L.geoJson(data, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng);
        },
        style: markerDetail,
        // popup for each marker
        onEachFeature: function (feature, layer) {
            layer.bindPopup("<br>Location: " + feature.properties.place + " Magnitude: " + feature.properties.mag);
        }
    }).addTo(geoMap);
});
