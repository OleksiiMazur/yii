"use strict";

let bannerSlider = function () {
    let bannerSlider = $('.banner-slider');
    let bannerSliderItem = $('.banner-slider__item');
    let bannerSliderBtnPrev = $('.banner-controls__prev');
    let bannerSliderBtnNext = $('.banner-controls__next');

    bannerSlider.owlCarousel({
        loop: bannerSliderItem.length > 1,
        nav: false,
        dots: bannerSliderItem.length > 1,
        animateIn: 'fadeIn',
        animateOut: 'fadeOut',
        autoplay: false,
        autoplaySpeed: 6000,
        autoplayHoverPause: false,
        touchDrag: false,
        mouseDrag: false,
        items:1,
    });

    if (bannerSliderItem.length <= 1) {
        $('.banner-controls').css({'visibility': 'hidden'});
    }

    bannerSliderBtnPrev.on('click', function () {
        bannerSlider.trigger('prev.owl.carousel');
    });
    bannerSliderBtnNext.on('click', function () {
        bannerSlider.trigger('next.owl.carousel');
    });

    bannerSliderBtnPrev.on('mouseover', function(){
        bannerSlider.trigger('stop.owl.autoplay');
    });
    bannerSliderBtnNext.on('mouseover', function(){
        bannerSlider.trigger('stop.owl.autoplay');
    });
    $('.slide-content').on('mouseover', function(){
        bannerSlider.trigger('stop.owl.autoplay');
    });
};


$(document).ready(function(){
    bannerSlider();
});