// slider
const swiper= new Swiper('.work__swiper', {
    slidesPerView: 1,
    slidesPerGroup: 1,
    speed: 400,
    spaceBetween: 24,
})

const swiperButtons = document.querySelectorAll('.work__swiper__btn');

function removeActive(){
    swiperButtons.forEach(btn => {
        btn.classList.remove('work__swiper__btn--active');
        swiperButtons[swiper.activeIndex].classList.add('work__swiper__btn--active')
    })
}

swiperButtons.forEach((btn,index) => {
    btn.addEventListener('click', function(){
        swiper.slideTo(index, 1000, false);
        removeActive();
    })
})

swiper.on('slideChange', function () {
    removeActive()
});

// paralax using GSAP
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

ScrollSmoother.create({
    wrapper: '.wrapper',
    content: '.content',
    smooth: 1,
    effects: true
});

// paralax using simpleParallax
// const img1 = document.querySelector('.advantages__img--1')
// const img2 = document.querySelector('.advantages__img--2')
// const img3 = document.querySelector('.advantages__img--3')
// const img4 = document.querySelector('.advantages__img--4')
// const img5 = document.querySelector('.advantages__img--5')

// new simpleParallax(img1, {
//     overflow: true,
// 	delay: 0.2,
// 	transition: 'cubic-bezier(.57,.54,1,1)',
// });
// new simpleParallax(img2, {
//     overflow: true,
// 	delay: 0.4,
// 	transition: 'cubic-bezier(.4,.44,1,1)',
// });
// new simpleParallax(img3, {
//     overflow: true,
// 	delay: 0.5,
//     transition: 'cubic-bezier(.44,.64,1,1)',
// });
// new simpleParallax(img4, {
//     overflow: true,
// 	delay: 0.3,
// 	transition: 'cubic-bezier(.57,.54,1,1)',
// });
// new simpleParallax(img5, {
//     overflow: true,
// 	delay: 0.2,
// 	transition: 'cubic-bezier(.57,.54,1,1)',
// });


// map
ymaps.ready(init);

function init() {
    var myMap = new ymaps.Map("map", {
            center: [55.76, 37.64],
            zoom: 10
        }, {
            searchControlProvider: 'yandex#search'
        }),

        MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
            '<div class="mark" >$[properties.iconContent]</div>'
        ),
        myGeoObject = new ymaps.GeoObject({
            geometry: {
                type: "Point",
                coordinates: [55.8, 37.8]
            },
            properties: {
                iconContent: 'Находимся здесь'
            }
        }, {
            iconLayout: 'default#imageWithContent',
            iconContentLayout: MyIconContentLayout
        })

    myMap.geoObjects.add(myGeoObject);
}

// scroll
document.querySelectorAll('.archer').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();

        let href = this.getAttribute('href').substring(1);
        const scrollTarget = document.getElementById(href);
        const elementPosition = scrollTarget.getBoundingClientRect().top;
        closeMobileMenu()
        window.scrollBy({
            top: elementPosition,
            behavior: 'smooth'
        });
    });
});

// mobile menu
const burger = document.querySelector('.burger')
const headerContent = document.querySelector('.header__content')

let isActive = false;

burger.addEventListener('click', () => {
    burger.classList.toggle('burger--active')
    headerContent.classList.toggle('visible')
    isActive = !isActive
    if (isActive) {
        window.addEventListener('scroll', checkScroll)
    } else {
        window.removeEventListener('scroll', checkScroll)
    }
})

function closeMobileMenu(){
    burger.classList.remove('burger--active')
    headerContent.classList.remove('visible')
    isActive = false;
    window.removeEventListener('scroll', checkScroll)
}

function checkScroll(){
    if (window.scrollY + window.innerHeight > headerContent.offsetTop + headerContent.offsetHeight) {
        window.scrollTo(0, headerContent.offsetTop + headerContent.offsetHeight - window.innerHeight)
    }
}