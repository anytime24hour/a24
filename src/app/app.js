// @flow

import { Map } from './map';

export default function() {
    // const myApp = document.getElementById('app');
}

// Skew the main logo like driving by a highway sign
let ticking = false;
window.addEventListener('scroll', function scrollCallback() {
    const logo = document.querySelector('#logo-full');
    const pos = window.scrollY;
    // logo.style.transformOrigin = '0 0';
    if (logo && !ticking) {
        window.requestAnimationFrame(function animateLogo() {
            const opacity = 1 - pos / 400;
            logo.style.opacity = opacity.toString();
            const angle = pos / 30;
            if (angle < 4) {
                logo.style.transform = `skewY(${-angle}deg)`;
            }
            ticking = false;
        });
        ticking = true;
    }
});

// initialize Google Maps after page loading
document.addEventListener('DOMContentLoaded', function DOMContentLoadedCallback() {
    const mapElement = document.getElementById('map');

    Map.loadGoogleMapsApi().then(function loadGoogleMapsApiCallback(googleMaps) {
        Map.createMap(googleMaps, mapElement);
    });
});

const useLocation = document.getElementById('use-location');
if (useLocation) {
    useLocation.addEventListener('click', function useLocationClick(e: MouseEvent) {
        Map.loadGoogleMapsApi().then(function loadGoogleMapsApiCallback(googleMaps) {
            Map.findMyLocation(googleMaps);
        });
        e.preventDefault();
        return false;
    });
}

const whereAmI = document.getElementById('whereAmI');
if (whereAmI) {
    whereAmI.addEventListener('click', function whereAmIClick(e: MouseEvent) {
        alert('Under Construction! Will show distance to nearest technician.');
        e.preventDefault();
        return false;
    });
}
