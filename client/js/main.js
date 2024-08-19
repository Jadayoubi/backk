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
let interval;

function changeContent(section) {
    const image = document.getElementById('image');
    const text = document.getElementById('text');
    
    document.querySelectorAll('.navbar a').forEach(link => {
        link.classList.remove('active');
    });

    let activeLink;
    switch (section) {
        case 'security':
            image.src = '/client/images/aboutSlider/camera.jpg';
            text.innerHTML = `
            Utilizes AI to enhance fleet security, detecting threats and ensuring safety. Continuously monitors data to prevent breaches and respond to incidents.    
            <br> 
                <span class="icon-text"><i class="bi bi-shield-lock"></i>Proactive threat detection</span>
                <span class="icon-text"><i class="bi bi-camera-video"></i>Automated incident response</span>
                <span class="icon-text"><i class="bi bi-alarm"></i>Improved data analysis</span>
            `;
            activeLink = document.getElementById('security-link');
            currentIndex = 0;
            break;
        case 'ecosystem':
            image.src = '/client/images/aboutSlider/eco.jpg';
            text.innerHTML = `
                Integrates various components of the fleet management system for seamless communication and data exchange, optimizing operations.
                <br>
                <span class="icon-text"><i class="bi bi-globe"></i>Integrated systems</span>
                <span class="icon-text"><i class="bi bi-graph-up"></i>Scalability</span>
                <span class="icon-text"><i class="bi bi-person-lines-fill"></i>Streamlined communication</span>
            `;
            activeLink = document.getElementById('ecosystem-link');
            currentIndex = 1;
            break;
        case 'workflow':
            image.src = '/client/images/aboutSlider/truckFleetC.png';
            text.innerHTML = `
            Automates tasks and provides comprehensive reporting, optimizing daily operations and tracking performance metrics.    
            <br>
                <span class="icon-text"><i class="bi bi-diagram-3"></i> Workflow automation</span>
                <span class="icon-text"><i class="bi bi-bar-chart"></i>Performance tracking</span>
                <span class="icon-text"><i class="bi bi-gear"></i>Comprehensive reports</span>
            `;
            activeLink = document.getElementById('workflow-link');
            currentIndex = 2;
            break;
        case 'visibility':
            image.src = '/client/images/aboutSlider/Fleet-Management.jpg';
            image.style.width='35%';
            text.innerHTML = `
                Offers constant monitoring of the fleet, allowing real-time tracking of vehicles and assets for better operational control.
                <br>
                <span class="icon-text"><i class="bi bi-eye"></i>Enhanced control</span>
                <span class="icon-text"><i class="bi bi-map"></i>Improved decision-making</span>
                <span class="icon-text"><i class="bi bi-wifi"></i>Live tracking</span>
            `;
            activeLink = document.getElementById('visibility-link');
            currentIndex = 3;
            break;
        default:
            image.src = '/client/images/aboutSlider/AI.jpg';
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
    }, 50);

    clearInterval(interval);
    interval = setInterval(autoChangeContent, 5000);
}

function autoChangeContent() {
    currentIndex = (currentIndex + 1) % sections.length;
    changeContent(sections[currentIndex]);
}

interval = setInterval(autoChangeContent, 5000);

changeContent('security');
////////////////////////////////////////////////////
/////////////////// ON Fleet////////////
//////////////////////////////////////////////////
function changeContentFleet(section) {
    const contentData = {
        'courier': {
            image: '/client/images/onfleet/industry-courier.png',
            subtitle: 'Courier',
            features: [
                'Gain up to 40% efficiency with route optimization',
                'Simplify driver onboarding',
                'Provide clients real-time updates on all deliveries'
            ]
        },
        'grocery': {
            image: '/client/images/onfleet/industry-grocery.png',
            subtitle: 'Grocery',
            features: [
                'Manage grocery deliveries effectively',
                'Ensure freshness with real-time tracking',
                'Optimize delivery routes for efficiency'
            ]
        },
        'restaurant': {
            image: '/client/images/onfleet/industry-courier.png',
            subtitle: 'Restaurant',
            features: [
                'Deliver food hot and fresh',
                'Real-time order tracking for customers',
                'Optimize delivery routes to reduce time'
            ]
        },
        'coffee': {
            image: '/client/images/onfleet/industry-courier.png',
            subtitle: 'coffee',
            features: [
                'Deliver coffee hot and fresh',
                'Real-time order tracking for customers',
                'Optimize delivery routes to reduce time'
            ]
        },
    };

    const content = contentData[section];
    const contentImage = document.getElementById('content-image');
    const contentSubtitle = document.getElementById('content-subtitle');
    const contentList = document.getElementById('content-list');

    contentImage.classList.remove('slide-in');
    contentSubtitle.classList.remove('slide-in');
    contentList.classList.remove('slide-in');

    contentImage.src = content.image;
    contentSubtitle.innerText = content.subtitle;
    
    contentList.innerHTML = '';
    content.features.forEach(feature => {
        const li = document.createElement('li');
        li.innerText = feature;
        contentList.appendChild(li);
    });
    

    contentImage.offsetHeight; 

    setTimeout(() => {
        contentImage.classList.add('slide-in');
        contentSubtitle.classList.add('slide-in');
        contentList.classList.add('slide-in');
    }, 50);


    const items = document.querySelectorAll('.item');
    items.forEach(item => item.classList.remove('selected-item')); // Remove 'selected-item' class from all items
    document.querySelector(`[onclick="changeContentFleet('${section}')"]`).classList.add('selected-item'); // Add 'selected-item' class to the clicked item
}

changeContentFleet('courier');

////////////////////////////////////////
/////////
//////////////////////////////////////////
const Islider = document.querySelector('.Islider');
const Islides = document.querySelectorAll('.Islide');
const IprevArrow = document.getElementById('IprevArrow');
const InextArrow = document.getElementById('InextArrow');
let IcurrentIndex = 0;
const IslidesToShow = 3; // Number of slides visible at a time
const ItotalSlides = Islides.length;

function IupdateSlider() {
    Islider.style.transform = `translateX(-${IcurrentIndex * (100 / IslidesToShow)}%)`;
}

function InextSlide() {
    IcurrentIndex = (IcurrentIndex + 1) % (ItotalSlides - IslidesToShow + 1);
    IupdateSlider();
}

function IprevSlide() {
    IcurrentIndex = (IcurrentIndex - 1 + (ItotalSlides - IslidesToShow + 1)) % (ItotalSlides - IslidesToShow + 1);
    IupdateSlider();
}

IprevArrow.addEventListener('click', IprevSlide);
InextArrow.addEventListener('click', InextSlide);

setInterval(InextSlide, 3000);

IupdateSlider();
