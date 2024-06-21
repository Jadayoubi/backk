(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 45) {
            $('.navbar').addClass('sticky-top shadow-sm');
        } else {
            $('.navbar').removeClass('sticky-top shadow-sm');
        }
    });
    
    // Dropdown on mouse hover
    const $dropdown = $(".dropdown");
    const $dropdownToggle = $(".dropdown-toggle");
    const $dropdownMenu = $(".dropdown-menu");
    const showClass = "show";
    
    $(window).on("load resize", function() {
        if (this.matchMedia("(min-width: 992px)").matches) {
            $dropdown.hover(
            function() {
                const $this = $(this);
                $this.addClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "true");
                $this.find($dropdownMenu).addClass(showClass);
            },
            function() {
                const $this = $(this);
                $this.removeClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "false");
                $this.find($dropdownMenu).removeClass(showClass);
            }
            );
        } else {
            $dropdown.off("mouseenter mouseleave");
        }
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        dots: true,
        loop: true,
        center: true,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });


    // Vendor carousel
    $('.vendor-carousel').owlCarousel({
        loop: true,
        margin: 45,
        dots: false,
        loop: true,
        autoplay: true,
        smartSpeed: 1000,
        responsive: {
            0:{
                items:2
            },
            576:{
                items:4
            },
            768:{
                items:6
            },
            992:{
                items:8
            }
        }
    });
    
})(jQuery);

//aboutSlider Script
let sections = ['security', 'ecosystem', 'workflow', 'visibility'];
let currentIndex = 0;

function changeContent(section) {
    const image = document.getElementById('image');
    const text = document.getElementById('text');
    
    document.querySelectorAll('.navbar a').forEach(link => {
        link.classList.remove('active');
    });

    let activeLink;
    let iconAndTextHTML = '';

    switch (section) {
        case 'security':
            image.src = './images/aboutSlider/AI.jpg';
            text.innerHTML = `
                Use AI-powered video technology to protect your most important assets, your employees. Capture and manage security risks in real time across your operations.
                <br>
                <span class="icon-text"><i class="bi bi-shield-lock"></i> Security feature</span>
                <span class="icon-text"><i class="bi bi-camera-video"></i> Video surveillance</span>
                <span class="icon-text"><i class="bi bi-alarm"></i> Real-time alerts</span>
            `;
            activeLink = document.getElementById('security-link');
            currentIndex = 0;
            break;
        case 'ecosystem':
            image.src = './images/aboutSlider/eco.jpg';
            text.innerHTML = `
                Run your business on one integrated platform. Unify data across maintenance, logistics, sales accounting, HR and more.
                <br>
                <span class="icon-text"><i class="bi bi-globe"></i> Global reach</span>
                <span class="icon-text"><i class="bi bi-graph-up"></i> Data integration</span>
                <span class="icon-text"><i class="bi bi-person-lines-fill"></i> HR management</span>
            `;
            activeLink = document.getElementById('ecosystem-link');
            currentIndex = 1;
            break;
        case 'workflow':
            image.src = './images/aboutSlider/flow.jpg';
            text.innerHTML = `
                Streamline workflows and increase productivity. Establish benchmarks and make business decisions using 1.6 billion data points captured by Samsara.
                <br>
                <span class="icon-text"><i class="bi bi-diagram-3"></i> Workflow automation</span>
                <span class="icon-text"><i class="bi bi-bar-chart"></i> Benchmarking</span>
                <span class="icon-text"><i class="bi bi-gear"></i> Productivity tools</span>
            `;
            activeLink = document.getElementById('workflow-link');
            currentIndex = 2;
            break;
        case 'visibility':
            image.src = './images/aboutSlider/last.jpg';
            text.innerHTML = `
                Gain real-time visibility across production facilities, remote assets, fleets and services all the way to end customers to enable digital transformation at scale.
                <br>
                <span class="icon-text"><i class="bi bi-eye"></i> Real-time monitoring</span>
                <span class="icon-text"><i class="bi bi-map"></i> Asset tracking</span>
                <span class="icon-text"><i class="bi bi-wifi"></i> Connectivity solutions</span>
            `;
            activeLink = document.getElementById('visibility-link');
            currentIndex = 3;
            break;
        default:
            image.src = './images/aboutSlider/AI.jpg';
            text.innerHTML = `
                Use AI-powered video technology to protect your most important assets, your employees. Capture and manage security risks in real time across your operations.
                <br>
               
                <span class="icon-text"><i class="bi bi-shield-lock"></i> Security feature</span>
                <span class="icon-text"><i class="bi bi-camera-video"></i> Video surveillance</span>
                <span class="icon-text"><i class="bi bi-alarm"></i> Real-time alerts</span>
            `;
            activeLink = document.getElementById('security-link');
            currentIndex = 0;
    }

    activeLink.classList.add('active');

    // Adjust progress bar width and position
    const progressBar = document.getElementById('progress-bar');
    const rect = activeLink.getBoundingClientRect();
    const containerRect = document.querySelector('.navbar').getBoundingClientRect();
    const width = rect.width;
    const left = rect.left - containerRect.left;

    progressBar.style.transition = 'none';
    progressBar.style.width = '0';
    progressBar.style.left = `${left}px`;
    
    setTimeout(() => {
        progressBar.style.transition = 'width 5s linear';
        progressBar.style.width = `${width}px`;
    }, 10);
}

function autoChangeContent() {
    currentIndex = (currentIndex + 1) % sections.length;
    changeContent(sections[currentIndex]);
}

setInterval(autoChangeContent, 7000); 

changeContent('ecosystem');
