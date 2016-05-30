// Application Scripts:

// Переключатель языка
// Фикс.хидер на десктопе
// Мобильное меню
// Кнопка скролла страницы
// Навигация по секциям
// Загрузка изображений при скролле
// HERO slider
// Фотогалерея
// Вкладки
// Модальное окно
// Маска для телефонного номера
// Если браузер не знает о плейсхолдерах в формах

jQuery(document).ready(function ($) {
    $('body').append('<div id="overlay" class="overlay"></div>');//оверлей - будем использовать при открытии модального окна и мобильного меню

    //
    // Переключатель языка
    //---------------------------------------------------------------------------------------
    (function () {
        var $lang = $('.js-lang'),
            $menu = $lang.find('.h-lang__list'),
            $btn = $lang.find('.h-lang__btn.current'),
            $body=$('body'),
            method = {};

        method.show = function () {
            $btn.addClass('active');
            $menu.fadeIn(400);
            method.hideAlt();
        };
        method.hide = function () {
            $btn.removeClass('active');
            $menu.hide();
            $body.unbind('click', method.hide);
        };
        method.hideAlt = function () {
            $lang.on('mouseleave', function () {
                $body.bind('click', method.hide);
            }).on('mouseenter', function () {
                $body.unbind('click', method.hide);
            });
        };
        $lang.on('click', '.h-lang__btn.current', function (e) {
            e.preventDefault();
            if ($(this).hasClass('active')) {
                method.hide();
            } else {
                method.show();
            };
        });
    })();
    

    //
    // Фикс.хидер на десктопе
    //---------------------------------------------------------------------------------------
    (function () {
        var sticky,
            winW,
            isStick = false, //флаг состояния
            rtime, //переменные для пересчета ресайза окна с задержкой delta
            timeout = false,
            delta = 200,
            method = {};

        method.init = function () {
            sticky = new Waypoint.Sticky({
                element: $('.js-sticky-header')[0],
                offset: -28 //верхний отступ (паддинг)
            });
            isStick = true;
        };

        method.destroy = function () {
            sticky.destroy();
            isStick = false;
        };

        method.check = function () {
            winW = $.viewportW();
            if (winW >= 1200 && !isStick) {//если десктоп и "стикер" не запущен
                method.init(); //запускаем
            };
            if (winW < 1200 && isStick) {//если мелкий экран и "стикер" работает
                method.destroy(); //вырубаем
            }
        };

        method.endResize = function () {
            if (new Date() - rtime < delta) {
                setTimeout(method.endResize, delta);
            } else {
                timeout = false;
                //ресайз окончен - пересчитываем
                method.check();
            }
        };

        method.startResize = function () {
            rtime = new Date();
            if (timeout === false) {
                timeout = true;
                setTimeout(method.endResize, delta);
            }
        };

        method.check(); //проверяем при загрузке
        $(window).bind('resize', method.startResize); //начинаем отслеживать ресайз окна

    })();

    //
    // Мобильное меню
    //---------------------------------------------------------------------------------------
    (function () {
        var $btn = $('.js-menu-toggle'),
            $menu = $('.js-menu'),
            $overlay = $('#overlay'),
            $html = $('html'),
            method = {};

        method.hideMenu = function () {
            $btn.removeClass('active');
            $menu.removeClass('active');
            $html.css('overflow', 'auto');
            $overlay.unbind('click', method.hideMenu).hide();
        };

        method.showMenu = function () {
            $btn.addClass('active');
            $menu.addClass('active');
            $html.css('overflow', 'hidden');
            $overlay.show().bind('click', method.hideMenu);
        }

        $('.b-header').on('click', '.js-menu-toggle', function () {//покажем - спрячем
            if ($(this).hasClass('active')) {
                method.hideMenu();
            } else {
                method.showMenu();
            }
        });

        $menu.on('click', '.m-menu__label', method.hideMenu); //закроем по клику по заголовку
    })();

    //
    // Кнопка скролла страницы
    //---------------------------------------------------------------------------------------
    (function () {
        var $scroller = $('<button type="button" class="scroll-up-btn"><i class="icon-up"></i></button>');
        $('body').append($scroller);
        $(window).on('scroll', function () {
            if ($(this).scrollTop() > 300) {
                $scroller.show();
            } else {
                $scroller.hide();
            }
        });
        $scroller.on('click', function () {
            $('html, body').animate({ scrollTop: 0 }, 800);
            return false;
        });
    })();


    //
    // Навигация по секциям
    //---------------------------------------------------------------------------------------
    (function () {
        var $menu_link = $('.h-menu__link, .m-menu__link'),
            $sections = $('.page__section, .b-header__hero'),
            isGoogleMapLoad = false, //будем загружать Гугл карту при скролле
            mapSectionID = 'building', //когда прокрутим до этой секции - загрузим карту
            method = {};

        method.changeLinkState = function (el) {//находим и подсвечиваем линк в десктоп и мобильном меню
            method.clearLinkState();
            var $current = $('.h-menu, .m-menu').find('a[href^="#' + el + '"]');
            $current.addClass('current');
        };

        method.scrollToContent = function (id) {//плавный скролл к секции по переданному id
            if ($(id).length) {
                $('html,body').animate({ scrollTop: $(id).offset().top - method.calcTopOffset() }, 800);
            }
        };

        method.calcTopOffset = function () {//хелпер - узнаем нужно ли учитывать верхний отступ при скролле
            var top_offset = 0,
                winW = $.viewportW();//ширина окна
            if (winW >= 1200) {
                top_offset = 40; //высота хидера на десктопе
            };
            return top_offset;
        };

        method.clearLinkState = function () {//убираем активный класс у всех ссылок в меню
            $menu_link.removeClass('current');
        };

        var waypoints = $sections.waypoint({//подключили плагин
            handler: function (direction) {
                var prev = this.previous();//предыдущая секция

                if (this.element.id === mapSectionID && !isGoogleMapLoad) {//когда дошли до предпоследней последней секции - загрузим карту
                    initGoogleMap();
                    isGoogleMapLoad = true;
                };

                if (direction === 'down') {//скроллим вниз
                    method.changeLinkState(this.element.id);
                };

                if (direction === 'up') { //если скроллим вверх - подсвечиваем предыдущую секцию
                    method.changeLinkState(prev.element.id);

                    if (prev === this.group.first()) {//когда поднялись к hero - сбросили активный класс у ссылок меню
                        method.clearLinkState();
                    };
                };
            },
            group: 'section',
            offset: '35%'
        });

        $('.h-menu, .m-menu').on('click', 'a[href^="#"]', function (e) {//перехватываем клик по линкам в десктоп и моб.меню
            e.preventDefault();
            var id = $(this).attr('href');
            method.scrollToContent(id);
        });

        $('.b-action').on('click', '[data-scroll]', function (e) { //клик по кнопке "Забронировать место" - скроллим к секции Отправить заявку
            e.preventDefault();
            var id = $(this).data('scroll');
            method.scrollToContent(id);
        });

        $('.b-header__inner').on('click', '.h-logo', function (e) { //клик по логотипу - скроллим вверх без оффсетов
            e.preventDefault();
            $('.scroll-up-btn').trigger('click');
        });
    })();


    //
    // Загрузка изображений при скролле
    //---------------------------------------------------------------------------------------
    $('.js-lazyimg').unveil();

    //
    // HERO slider
    //---------------------------------------------------------------------------------------
    (function () {
        var $slider = $('.js-hero');
        $slider.bxSlider({
            controls: true,
            mode: 'fade',
            nextText: '<i class="icon-right"></i>',
            prevText: '<i class="icon-left"></i>',
            pager: false,
            auto: true,
            pause: 12000,
            onSliderLoad: function () {
                $slider.css('visibility', 'visible');//покажем контент слайдера после загрузки
            }
        });
    })();

    //
    // Фотогалерея
    //---------------------------------------------------------------------------------------
    (function () {
        function initGallery(list) {//т.к. на странице 2 однотипных блока галереи - передаем класс галереи
            var $gallery = list,
                $album = $gallery.parents('.b-gallery').find('.js-album-slider'),//альбом галереи
                $album_item = $album.find('.b-album__thumb'),
                $title = $gallery.parents('.b-gallery').find('.js-gallery-name'),//заголовок текущего альбома
                $lightbox = $gallery.parents('.b-gallery').find('.js-gallery-large'), //список с ссылками на крупные изображения,
                lightbox = {}, //объект лайтбокса
                isGalleryLoad = false,//флаги состояний
                isGalleryImagesLoaded = false,
                isLightBoxStarted = false,
                method = {};

            //--Методы Галереи--//
            method.startGallery = function () {//запускаем главный слайдер галереи
                if (!isGalleryLoad) {
                    $gallery.bxSlider({
                        auto: false,
                        useCSS: false,
                        pager: false,
                        nextText: '<i class="icon-right"></i>',
                        prevText: '<i class="icon-left"></i>',
                        infiniteLoop: false,
                        hideControlOnEnd: true,
                        startSlide: 1,
                        slideMargin: 0,
                        onSliderLoad: function () {
                            isGalleryLoad = true;
                            method.show2GalleryImages(); //показываем первые 2 картинки (видимые на десктопе)
                        },
                        onSlideBefore: function () {//перед началом перемотки 
                            if (!isGalleryImagesLoaded) {//дозагружаем остальные изображения
                                method.showAllGalleryImages();
                            };
                        }
                    });
                };
            };

            method.reloadGallery = function (link) {//перезагрузка контента галереи
                if (isGalleryLoad) {//убиваем главный слайдер галереи
                    $gallery.destroySlider();
                    $gallery.find('.b-gallery__item').remove();
                    isGalleryLoad = false;
                    isGalleryImagesLoaded = false;

                    $gallery.load(link, function () {//загрузка нового контента в главный слайдер Галереи
                        method.startGallery();
                    });
                };
            };

            method.show2GalleryImages = function () {//после загрузки главного слайдера галереи загрузим первые 2 картинки
                for (var i = 0; i < 2; i++) {
                    var $el = $gallery.children('li').eq(i).find('img[data-src]');
                    if ($el.length) {
                        method.loadImage($el);
                    };
                };
            };

            method.showAllGalleryImages = function () {//после того как начали скроллить главный слайдер галереи, дозагрузим остальные изображения
                $gallery.children('li').each(function () {
                    var $el = $(this).find('img[data-src]');
                    if (!$el.hasClass('loaded')) {
                        method.loadImage($el);
                    };
                });
                isGalleryImagesLoaded = true;
            };

            method.loadImage = function (el) {//хелпер
                var source = el.data('src');
                if (source != '') {
                    el.attr('src', source);
                    el.addClass('loaded');
                };
            };

            //--Методы слайдера альбомов--//
            method.startAlbumSlider = function () {//запускаем слайдер альбомов
                $album.bxSlider({
                    mode: 'vertical',
                    slideMargin: 0,
                    pager: false,
                    nextText: '<i class="icon-up"></i>',
                    prevText: '<i class="icon-down"></i>',
                    minSlides: 3,
                    maxSlides: 3,
                    moveSlides: 1,
                    infiniteLoop: false,
                    hideControlOnEnd: true,
                    onSliderLoad: function (currentIndex) {//добавим к первому элементу класс current
                        $album.children('li').eq(currentIndex).find('.b-album__thumb').addClass('current');
                    },
                });
            };

            method.changeGalleryTitle = function (el) { //передадим название выбранной галереи
                var title = el.find('.b-album__title').text(),
                    subtitle = el.find('.b-album__subtitle').text();
                $title.find('.b-gallery-name__title').text(title);
                $title.find('.b-gallery-name__subtitle').text(subtitle);
            };

            //--Методы Лайтбокса--//
            method.initLightBox = function () {//по клику на изображение в главной галерее будем открывать картинку в лайтбоксе
                if (!isLightBoxStarted) {
                    lightbox = $lightbox.find('a').simpleLightbox({
                        navText: ['<i class="icon-left"></i>', '<i class="icon-right"></i>'],
                        captions: true,
                        captionSelector: 'self',
                        captionType: 'data',
                        captionsData: 'caption',
                        close: true,
                        closeText: '<i class="icon-cross"></i>',
                        showCounter: true,
                        disableScroll: false,
                        animationSpeed: 200
                    });
                    isLightBoxStarted = true;
                    $gallery.find('.b-gallery__thumb').bind('click', method.openLightBox); //подключаем обработку клика на изображение в главном слайдере
                };
            };

            method.openLightBox = function () {//открываем в лайтбоксе линк с соотв.индексом
                var index = $(this).parent('li').index(),//находим индекс
                        $el = $lightbox.children('li').eq(index).find('a');
                lightbox.open($el);
            };


            method.reloadLightBox = function (link) {//загружаем новый контент в лайтбокс
                if (isLightBoxStarted) {
                    $gallery.find('.b-gallery__thumb').unbind('click', method.openLightBox);//отключили отслеживание клика по изображению
                    lightbox.destroy();
                    lightbox = {};
                    isLightBoxStarted = false;
                    $lightbox.children('li').remove();//очистили список
                    $lightbox.load(link, function () {
                        method.initLightBox();
                    });
                };
            };

            //-- Запускаем все это:
            if (list.length) {//запускаем главный слайдер галереи
                method.startGallery();
            };
            if ($lightbox.length) {//подключаем лайтбокс
                method.initLightBox();
            };
            if ($album.length) {//запускаем слайдер альбомов
                method.startAlbumSlider();
            };

            $album.on('click', '[data-load]', function () {//Переключение на другой альбом
                var $el = $(this),
                    link = $el.data('load'),
                    lightbox_link = $el.data('lightbox');

                if ($el.hasClass('current')) {//клик по текущему альбому
                    return false;
                } else {//клик по новому альбому
                    $album_item.removeClass('current');
                    $el.addClass('current');
                    method.changeGalleryTitle($el);//изменили название текущего альбома
                    method.reloadGallery(link); //перезагрузили главный слайдер галереи (заменили контент)
                    method.reloadLightBox(lightbox_link);//загрузили новый контент в лайтбокс
                };
            });
        };

        initGallery($('.js-gallery')); //запускаем фотогалерею
        initGallery($('.js-building-gallery')); //запускаем фотогалерею хода строительства
    })();
    

    //
    // Вкладки
    //---------------------------------------------------------------------------------------
    (function () {
        $('.js-tabs').on('click', '.js-tablink', function (e) {
            e.preventDefault();
            var $tabs = $(this).parents('.js-tabs').children('li'),
                target = $(this).attr('href'),
                $target = $(target);
            if ($target.length) {
                $tabs.hide();
                $target.fadeIn().find('.js-lazyimg').trigger('unveil'); //если во вкладке есть незагруженные картинки - загрузим их
                scrollToContent($target);
            };
            
            function scrollToContent(el) {
                var winW = $.viewportW();
                if (winW < 768) {
                    $('html, body').animate({//на маленьких экранах проскроллим к началу вкладки
                        scrollTop: el.offset().top
                    }, 800);
                };
            };
        });
    })();

    //
    // Модальное окно
    //---------------------------------------------------------------------------------------
    var showModal = (function (link) {
        var
        method = {},
        $modal,
        $window = $(window),
        $overlay = $('#overlay'),
        $close;

        $close = $('<button type="button" class="modal__close"><i class="icon-cross"></i></button>'); //иконка закрыть


        $close.on('click', function (e) {
            e.preventDefault();
            method.close();
        });

        // центрируем окно
        method.center = function () {
            var top, left;
            top = Math.max($window.height() - $modal.outerHeight(), 0) / 2;
            left = Math.max($window.width() - $modal.outerWidth(), 0) / 2;

            $modal.css({
                top: top + $window.scrollTop(),
                left: left + $window.scrollLeft()
            });
        };


        // открываем
        method.open = function (link) {
            $modal = $(link);
            $modal.append($close);
            method.center();
            $window.bind('resize.modal', method.center);
            $modal.show();
            $overlay.show().bind('click', method.close);
        };

        // закрываем
        method.close = function () {
            $modal.hide();
            $overlay.hide().unbind('click', method.close);
            $window.unbind('resize.modal');
        };

        // клик по кнопке с атрибутом data-modal - открываем модальное окно
        $('[data-modal]').on('click', function (e) {//передаем айди модального окна
            e.preventDefault();
            var link = $(this).data('modal');
            if (link) { showModal.open(link); }
        });

        return method;
    }());

    //
    // Покажем новость в модальном окне
    //---------------------------------------------------------------------------------------
    (function () {
        $('.b-post').on('click', '.js-loadpost', function (e) {
            e.preventDefault();
            var modal = $(this).attr('href'),
                target = $(this).data('load'),
                $inner = $(modal).children('div');
            $inner.html();
            $inner.load(target, function () {
                showModal.open(modal);
            });
        });
    })();

    //
    // Гугл карта
    //---------------------------------------------------------------------------------------
    function initGoogleMap() {//запуск - см. Навигация по секциям
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&' +
            'callback=gmap_draw';

        window.gmap_draw = function () {
            var map_lating = new google.maps.LatLng(50.388161, 30.63978),
                map_options = {
                    zoom: 15,
                    center: map_lating,
                    panControl: false,
                    zoomControl: true,
                    scrollwheel: false,
                    streetViewControl: false,
                    scaleControl: true,
                    mapTypeId: google.maps.MapTypeId.ROAD
                },
                map = new google.maps.Map(document.getElementById('map'), map_options),
                marker = new google.maps.Marker({
                    position: map_lating,
                    icon: "img/marker.png",
                    map: map
                }),
                info = new google.maps.InfoWindow({
                    content: '<div class="b-contacts__maptitle">ТРЦ «KyivMall»</div>'
                }),
                styles = [
                      {
                          stylers: [
                            { hue: "#7bc601" },
                          ]
                      }, {
                          featureType: "all",
                          elementType: "all",
                          stylers: [
                            { saturation: -150 }
                          ]
                      }
                ];
            map.setOptions({ styles: styles });

            google.maps.event.addListener(marker, 'mouseover', function () {
                info.open(map, marker);
            });

            google.maps.event.addListener(marker, 'mouseout', function () {
                info.close(map, marker);
            });

            google.maps.event.addDomListener(window, 'resize', function () {
                var center = map.getCenter();
                google.maps.event.trigger(map, 'resize');
                map.setCenter(center);
            });
        };

        document.body.appendChild(script);
    };

    //
    // Маска для телефонного номера
    //---------------------------------------------------------------------------------------
    $('.js-phone-input').mask('+38 (099) 999-99-99');

    //
    // Если браузер не знает о плейсхолдерах в формах
    //---------------------------------------------------------------------------------------
    if ($('html').hasClass('no-placeholder')) {
        /* Placeholders.js v4.0.1 */
        !function (a) { "use strict"; function b() { } function c() { try { return document.activeElement } catch (a) { } } function d(a, b) { for (var c = 0, d = a.length; d > c; c++) if (a[c] === b) return !0; return !1 } function e(a, b, c) { return a.addEventListener ? a.addEventListener(b, c, !1) : a.attachEvent ? a.attachEvent("on" + b, c) : void 0 } function f(a, b) { var c; a.createTextRange ? (c = a.createTextRange(), c.move("character", b), c.select()) : a.selectionStart && (a.focus(), a.setSelectionRange(b, b)) } function g(a, b) { try { return a.type = b, !0 } catch (c) { return !1 } } function h(a, b) { if (a && a.getAttribute(B)) b(a); else for (var c, d = a ? a.getElementsByTagName("input") : N, e = a ? a.getElementsByTagName("textarea") : O, f = d ? d.length : 0, g = e ? e.length : 0, h = f + g, i = 0; h > i; i++) c = f > i ? d[i] : e[i - f], b(c) } function i(a) { h(a, k) } function j(a) { h(a, l) } function k(a, b) { var c = !!b && a.value !== b, d = a.value === a.getAttribute(B); if ((c || d) && "true" === a.getAttribute(C)) { a.removeAttribute(C), a.value = a.value.replace(a.getAttribute(B), ""), a.className = a.className.replace(A, ""); var e = a.getAttribute(I); parseInt(e, 10) >= 0 && (a.setAttribute("maxLength", e), a.removeAttribute(I)); var f = a.getAttribute(D); return f && (a.type = f), !0 } return !1 } function l(a) { var b = a.getAttribute(B); if ("" === a.value && b) { a.setAttribute(C, "true"), a.value = b, a.className += " " + z; var c = a.getAttribute(I); c || (a.setAttribute(I, a.maxLength), a.removeAttribute("maxLength")); var d = a.getAttribute(D); return d ? a.type = "text" : "password" === a.type && g(a, "text") && a.setAttribute(D, "password"), !0 } return !1 } function m(a) { return function () { P && a.value === a.getAttribute(B) && "true" === a.getAttribute(C) ? f(a, 0) : k(a) } } function n(a) { return function () { l(a) } } function o(a) { return function () { i(a) } } function p(a) { return function (b) { return v = a.value, "true" === a.getAttribute(C) && v === a.getAttribute(B) && d(x, b.keyCode) ? (b.preventDefault && b.preventDefault(), !1) : void 0 } } function q(a) { return function () { k(a, v), "" === a.value && (a.blur(), f(a, 0)) } } function r(a) { return function () { a === c() && a.value === a.getAttribute(B) && "true" === a.getAttribute(C) && f(a, 0) } } function s(a) { var b = a.form; b && "string" == typeof b && (b = document.getElementById(b), b.getAttribute(E) || (e(b, "submit", o(b)), b.setAttribute(E, "true"))), e(a, "focus", m(a)), e(a, "blur", n(a)), P && (e(a, "keydown", p(a)), e(a, "keyup", q(a)), e(a, "click", r(a))), a.setAttribute(F, "true"), a.setAttribute(B, T), (P || a !== c()) && l(a) } var t = document.createElement("input"), u = void 0 !== t.placeholder; if (a.Placeholders = { nativeSupport: u, disable: u ? b : i, enable: u ? b : j }, !u) { var v, w = ["text", "search", "url", "tel", "email", "password", "number", "textarea"], x = [27, 33, 34, 35, 36, 37, 38, 39, 40, 8, 46], y = "#ccc", z = "placeholdersjs", A = new RegExp("(?:^|\\s)" + z + "(?!\\S)"), B = "data-placeholder-value", C = "data-placeholder-active", D = "data-placeholder-type", E = "data-placeholder-submit", F = "data-placeholder-bound", G = "data-placeholder-focus", H = "data-placeholder-live", I = "data-placeholder-maxlength", J = 100, K = document.getElementsByTagName("head")[0], L = document.documentElement, M = a.Placeholders, N = document.getElementsByTagName("input"), O = document.getElementsByTagName("textarea"), P = "false" === L.getAttribute(G), Q = "false" !== L.getAttribute(H), R = document.createElement("style"); R.type = "text/css"; var S = document.createTextNode("." + z + " {color:" + y + ";}"); R.styleSheet ? R.styleSheet.cssText = S.nodeValue : R.appendChild(S), K.insertBefore(R, K.firstChild); for (var T, U, V = 0, W = N.length + O.length; W > V; V++) U = V < N.length ? N[V] : O[V - N.length], T = U.attributes.placeholder, T && (T = T.nodeValue, T && d(w, U.type) && s(U)); var X = setInterval(function () { for (var a = 0, b = N.length + O.length; b > a; a++) U = a < N.length ? N[a] : O[a - N.length], T = U.attributes.placeholder, T ? (T = T.nodeValue, T && d(w, U.type) && (U.getAttribute(F) || s(U), (T !== U.getAttribute(B) || "password" === U.type && !U.getAttribute(D)) && ("password" === U.type && !U.getAttribute(D) && g(U, "text") && U.setAttribute(D, "password"), U.value === U.getAttribute(B) && (U.value = T), U.setAttribute(B, T)))) : U.getAttribute(C) && (k(U), U.removeAttribute(B)); Q || clearInterval(X) }, J); e(a, "beforeunload", function () { M.disable() }) } }(this);
    };
});
