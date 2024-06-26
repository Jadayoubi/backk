// navbar.js
document.addEventListener("DOMContentLoaded", function() {
    fetch('/client/navbar.html')  // Ensure the correct path to navbar.html
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar-container').innerHTML = data;
            setActiveLink();
        });
});

function setActiveLink() {
    const path = window.location.pathname;

    const navItems = {
        'nav-home': ['/client/index.html'],
        'nav-about': [
            '/client/About/about.html',
            '/client/About/Careers.html',
            '/client/About/contact.html'
        ],
        'nav-products': ['/client/products.html'], // Add all product page paths here
        'nav-services': [
            '/client/webDev.html',
            '/client/appDev.html'
        ],
        'nav-contact': ['/client/About/contact.html']
        // Add more nav items as needed
    };

    for (const [id, paths] of Object.entries(navItems)) {
        if (paths.includes(path)) {
            document.getElementById(id).classList.add('active');
        } else {
            document.getElementById(id).classList.remove('active');
        }
    }
}
