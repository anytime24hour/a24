// @flow

const loadGoogleMapsApi = require('load-google-maps-api');

const milesToMeters = miles => miles * 1609.344;

class Map {
    static loadGoogleMapsApi() {
        Map.googleMaps = loadGoogleMapsApi({ key: process.env.GOOGLE_MAPS_KEY });
        return Map.googleMaps;
    }

    static createMap(googleMaps: any, mapElement: HTMLElement) {
        Map.map = new googleMaps.Map(mapElement, {
            center: { lat: 33.210786, lng: -84.064104 },
            zoom: 8,
            mapTypeControl: false,
            streetViewControl: false,
        });

        // Mark Atlanta Coverage Area
        const atlMarker = new googleMaps.Marker({
            map: Map.map,
            position: new googleMaps.LatLng(33.595968, -84.491529),
            title: 'Atlanta',
            visible: false,
        });

        const atlCoverageArea = new googleMaps.Circle({
            map: Map.map,
            radius: milesToMeters(50),
            fillColor: '#006747',
            fillOpacity: 0.15,
            strokeColor: '#e57200',
            strokeWeight: 4,
        });
        atlCoverageArea.bindTo('center', atlMarker, 'position');

        // Mark Macon Coverage Area
        const mcoMarker = new googleMaps.Marker({
            map: Map.map,
            position: new googleMaps.LatLng(32.791902, -83.711456),
            title: 'Middle Georgia',
            visible: false,
        });

        const mcoCoverageArea = new googleMaps.Circle({
            map: Map.map,
            radius: milesToMeters(50),
            fillColor: '#006747',
            fillOpacity: 0.15,
            strokeColor: '#e57200',
            strokeWeight: 4,
        });
        mcoCoverageArea.bindTo('center', mcoMarker, 'position');

        return Map.map;
    }

    static findMyLocation(googleMaps: any) {
        const infoWin = new googleMaps.InfoWindow();

        function handleLocationError(browserHasGeolocation, infoWindow, pos) {
            infoWindow.setPosition(pos);
            infoWindow.setContent(
                browserHasGeolocation
                    ? 'Error: The Geolocation service failed.'
                    : "Error: Your browser doesn't support geolocation."
            );
            infoWindow.open(Map.map);
        }

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                function resolve(position) {
                    // Clear current location marker if we had one.
                    if (Map.whereAmI) {
                        Map.whereAmI.setMap(null);
                        Map.whereAmI = null;
                    }

                    // Put coords in the input field
                    const input = document.querySelector('#locateMe input');
                    input.value = `${position.coords.latitude}, ${position.coords.longitude}`;

                    // Create a new marker at current location
                    const pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };

                    const marker = new googleMaps.Marker({
                        map: Map.map,
                        position: pos,
                        title: 'You are here!',
                        animation: google.maps.Animation.DROP,
                    });
                    Map.whereAmI = marker;

                    Map.map.setCenter(pos);
                },
                function reject() {
                    handleLocationError(true, infoWin, Map.map.getCenter());
                }
            );
        } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, infoWin, Map.map.getCenter());
        }
    }
}

export { Map };

// Try HTML5 geolocation. (https://developers.google.com/maps/documentation/javascript/geolocation)

// Sorry, you appear to be a little far out of our coverage area. But please feel free to give us a call to verify and we can possibly point you in the right direction.
