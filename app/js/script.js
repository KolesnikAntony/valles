$().ready(function() {

});
var swiper1 = new Swiper('.s1', { // Optional parameters
    direction: 'horizontal',
    loop: true,


    // If we need pagination
    pagination: {
        el: '.swiper-pagination',
    },

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    // And if we need scrollbar
    scrollbar: {
        el: '.swiper-scrollbar',
    },
})
var swiper2 = new Swiper('.s2', { // Optional parameters
    direction: 'horizontal',
    loop: true,
    width: 110,
})
var swiper3 = new Swiper('.s3', {
    direction: 'horizontal',
    loop: true,
    width: 250,
})
var swiper4 = new Swiper('.s4', {
    direction: 'horizontal',
    loop: true,
    width: 350,
})