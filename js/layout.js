"use strict";

let preloader;

let Layout = function () {

    let self = this;

    this.init = function() {
        self.lazyFunc();
        self.exists();
        self.ieStubFunc();
        self.safariClass();
        self.sidePanel();
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

    this.sidePanel = function () {
        let sideArrow = document.querySelector('.side-arrow');
        let bottomArrowTop = document.querySelector('.bottom-arrow--open');
        let bottomArrowDown = document.querySelector('.bottom-arrow--close');
        let rightSide = document.querySelector('.content-right');
        let centerContent = document.querySelector('.content-center');

        if (document.querySelector('.content-right.opened-full')) {
            centerContent.classList.add('with-aside');
            rightSide.classList.remove('opened-full');
        } else {
            centerContent.classList.remove('with-aside');
        }

        sideArrow.addEventListener('click', function () {
            if (window.outerWidth > 1279) {
                rightSide.classList.toggle('opened-full');
                centerContent.classList.toggle('with-aside');
                // window.addEventListener("resize", lazyload);
            } else {
                // rightSide.classList.remove('opened-middle');
                rightSide.classList.add('opened-middle');
            }
        });
        bottomArrowTop.addEventListener('click', function () {
            rightSide.classList.remove('opened-middle');
            rightSide.classList.add('opened-full');
            centerContent.classList.add('with-aside');
        });
        bottomArrowDown.addEventListener('click', function () {
            if ( document.querySelector('.content-right.opened-full') ) {
                rightSide.classList.remove('opened-full');
                rightSide.classList.add('opened-middle');
            } else if ( document.querySelector('.content-right.opened-middle') ) {
                rightSide.classList.remove('opened-full');
                rightSide.classList.remove('opened-middle');
            }
            centerContent.classList.remove('with-aside');
        });
    };

    this.exists = function (selector) {
        return (document.querySelectorAll(selector).length > 0);
    };
};

let layout = new Layout();

document.addEventListener("DOMContentLoaded", function(){

         layout.init();

});
