// @flow

import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';

import './app';

import { Map } from './map';

// loads the Icon plugin
UIkit.use(Icons);

// initialize Google Maps after page loading
document.addEventListener('DOMContentLoaded', function DOMContentLoadedCallback() {
    const mapElement = document.getElementById('map');

    Map.loadGoogleMapsApi().then(function loadGoogleMapsApiCallback(googleMaps) {
        Map.createMap(googleMaps, mapElement);
    });
});
