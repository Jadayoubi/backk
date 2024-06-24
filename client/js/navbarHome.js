// navbar.js
document.addEventListener("DOMContentLoaded", function() {
    fetch('navbarHome.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar-container').innerHTML = data;
        });
});
