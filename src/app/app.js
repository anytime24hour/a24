// @flow

export default function() {
    // const myApp = document.getElementById('app');
}

// Skew the main logo like driving by a highway sign
let ticking = false;
window.addEventListener('scroll', function scrollEvt() {
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
