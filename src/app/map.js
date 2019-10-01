const loadGoogleMapsApi = require('load-google-maps-api');

const milesToMeters = miles => miles * 1609.344;

class Map {
    static loadGoogleMapsApi() {
        return loadGoogleMapsApi({ key: process.env.GOOGLE_MAPS_KEY });
    }

    static createMap(googleMaps, mapElement) {
        const map = new googleMaps.Map(mapElement, {
            center: { lat: 33.210786, lng: -84.064104 },
            zoom: 8,
            mapTypeControl: false,
            streetViewControl: false,
        });

        // Mark Atlanta Coverage Area
        const atlMarker = new googleMaps.Marker({
            map,
            position: new googleMaps.LatLng(33.595968, -84.491529),
            title: 'Atlanta',
            visible: false,
        });

        const atlCoverageArea = new googleMaps.Circle({
            map,
            radius: milesToMeters(50),
            fillColor: '#006747',
            fillOpacity: 0.15,
            strokeColor: '#e57200',
            strokeWeight: 4,
        });
        atlCoverageArea.bindTo('center', atlMarker, 'position');

        // Mark Macon Coverage Area
        const mcoMarker = new googleMaps.Marker({
            map,
            position: new googleMaps.LatLng(32.791902, -83.711456),
            title: 'Middle Georgia',
            visible: false,
        });

        const mcoCoverageArea = new googleMaps.Circle({
            map,
            radius: milesToMeters(50),
            fillColor: '#006747',
            fillOpacity: 0.15,
            strokeColor: '#e57200',
            strokeWeight: 4,
        });
        mcoCoverageArea.bindTo('center', mcoMarker, 'position');

        return map;
    }
}
export { Map };

// // Try HTML5 geolocation. (https://developers.google.com/maps/documentation/javascript/geolocation)
// if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(function(position) {
//         var pos = {
//         lat: position.coords.latitude,
//         lng: position.coords.longitude
//         };

//         infoWindow.setPosition(pos);
//         infoWindow.setContent('Location found.');
//         infoWindow.open(map);
//         map.setCenter(pos);
//     }, function() {
//         handleLocationError(true, infoWindow, map.getCenter());
//     });
//     } else {
//     // Browser doesn't support Geolocation
//     handleLocationError(false, infoWindow, map.getCenter());
//     }
// }

// function handleLocationError(browserHasGeolocation, infoWindow, pos) {
//     infoWindow.setPosition(pos);
//     infoWindow.setContent(browserHasGeolocation ?
//                         'Error: The Geolocation service failed.' :
//                         'Error: Your browser doesn\'t support geolocation.');
//     infoWindow.open(map);
// }
