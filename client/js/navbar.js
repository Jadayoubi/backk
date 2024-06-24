// navbar.js
document.addEventListener("DOMContentLoaded", function() {
    fetch('../navbar.html')  // Ensure the correct path to navbar.html
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar-container').innerHTML = data;
        });
});
function setActiveLink() {
    const path = window.location.pathname;
    const navLinks = {
        '/client/index.html': 'nav-home',
        '/client/About/about.html': 'nav-about',
        '/client/About/Careers.html': 'nav-careers',
        '/client/About/contact.html': 'nav-contact',
        '/client/service.html': 'nav-services',
        '/client/Pages/quote.html': 'nav-quote'
        // Add more links as needed
    };

    for (const link in navLinks) {
        if (path === link) {
            document.getElementById(navLinks[link]).classList.add('active');
        } else {
            document.getElementById(navLinks[link]).classList.remove('active');
        }
    }
}