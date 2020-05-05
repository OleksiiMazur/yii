"use strict";

let preloader;

let Layout = function () {

    let self = this;

    this.init = function() {
        window.onload = function() {
            self.pagePreloader();
        };
        self.lazyFunc();
        self.exists();
        self.ieStubFunc();
        self.safariClass();
        self.sideMenu();
        self.mobileMenu();
    };

    this.lazyFunc = function(){
        var lazyloadImages;

        if ("IntersectionObserver" in window) {
            lazyloadImages = document.querySelectorAll(".lazyClass");
            var imageObserver = new IntersectionObserver(function(entries, observer) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        var image = entry.target;
                        image.src = image.dataset.src;
                        image.classList.remove("lazyClass");
                        if (image.classList.contains('lazyBg')) {
                            image.classList.remove("lazyBg");
                            image.setAttribute('style', 'background-image: url(' + image.src + ')');
                        }
                        image.classList.add("visible");
                        imageObserver.unobserve(image);
                    }
                });
            });

            lazyloadImages.forEach(function(image) {
                imageObserver.observe(image);
            });
        } else {
            var lazyloadThrottleTimeout;
            lazyloadImages = document.querySelectorAll(".lazyClass");

            function lazyload () {
                if(lazyloadThrottleTimeout) {
                    clearTimeout(lazyloadThrottleTimeout);
                }

                lazyloadThrottleTimeout = setTimeout(function() {
                    var scrollTop = window.pageYOffset;
                    lazyloadImages.forEach(function(img) {
                        if(img.offsetTop < (window.innerHeight + scrollTop)) {
                            img.src = img.dataset.src;
                            img.classList.remove('lazyClass');
                            if (img.classList.contains('lazyBg')) {
                                img.classList.remove("lazyBg");
                                img.setAttribute('style', 'background-image: url(' + image.src + ')');
                            }
                            img.classList.add("visible");
                        }
                    });
                    if(lazyloadImages.length === 0) {
                        document.removeEventListener("scroll", lazyload);
                        window.removeEventListener("resize", lazyload);
                        window.removeEventListener("orientationChange", lazyload);
                    }
                }, 20);
            }

            document.addEventListener("scroll", lazyload);
            window.addEventListener("resize", lazyload);
            window.addEventListener("orientationChange", lazyload);
        }
    };

    this.ieStubFunc = function(){
        let isIE = /*@cc_on!@*/false || !!document.documentMode;
        let isIE11 = !!navigator.userAgent.match(/Trident.*rv\:11\./);
        if (isIE11 || isIE)
        {
            document.body.classList.add("ie");
            let ieStub = "<div class=\"ie-detect\" style=\"display\: none;\"><b>Ваш браузер устарел</b><p>Ви пользуетесь устаревшым браузером, который не поддерживает современные веб-стандарты и представляет угрозу Вашей безопасности.</p><p>Обновите или скачайте совресенную версию браузера.</p><p>Internet Explorer не поддерживается.</p></div>";
            document.querySelector("body").classList.add("ie");
            document.querySelector(".body-grid").innerHTML = ieStub;
        };

        var ua = window.navigator.userAgent;
        var trident = ua.indexOf('Trident/');
        if (trident > 0) {
            // IE 11 => return version number
            var rv = ua.indexOf('rv:');
            return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
        }
    };

    this.safariClass = function() {
        let is_safari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
        if (is_safari) {
            document.querySelector("body").classList.add("safari");
        }
    };

    this.mobileMenu = function () {
        if(document.querySelector('.hamburger')) {
            let hamburger = document.querySelector('.hamburger'),
                menu = document.querySelector('.header-center > ul.mobile'),
                link = document.querySelectorAll('.header-center > ul a');

            hamburger.addEventListener("click", function(){
                menu.classList.toggle("opened");
            });

            function closeMenu(){
                menu.classList.remove("opened");
            }
            for(let i=0; i<link.length; i++) {
                link[i].addEventListener("click", function(){
                    closeMenu();
                });
            }
        }
    };

    this.sideMenu = function () {
        let sideArrow = document.querySelector('.side-arrow');
        let bottomArrowO = document.querySelector('.bottom-arrow--open');
        let bottomArrowC = document.querySelector('.bottom-arrow--close');
        let rightSide = document.querySelector('.content-right');
        let centerContent = document.querySelector('.content-center');

        if (document.querySelector('.content-right.opened')) {
            centerContent.classList.add('with-aside');
        } else {
            centerContent.classList.remove('with-aside');
        }

        sideArrow.addEventListener('click', function () {
            rightSide.classList.toggle('opened');
            centerContent.classList.toggle('with-aside');
        });
        bottomArrowO.addEventListener('click', function () {
            rightSide.classList.toggle('opened');
            centerContent.classList.toggle('with-aside');
        });
        bottomArrowC.addEventListener('click', function () {
            rightSide.classList.toggle('opened');
            centerContent.classList.toggle('with-aside');
        });
    };

    this.pagePreloader = function () {
        if( document.querySelector('.preloader') ) {
            let preloader = document.querySelector('.preloader');

            setTimeout( function () {
                preloader.classList.add('hidden');
            }, 300);
        }
    };

    this.exists = function (selector) {
        return (document.querySelectorAll(selector).length > 0);
    };
};

let layout = new Layout();

document.addEventListener("DOMContentLoaded", function(){

         layout.init();

});
