// Place any jQuery/helper plugins in here.
/*
 * verge 1.9.1+201402130803
 * https://github.com/ryanve/verge
 * MIT License 2013 Ryan Van Etten
 */
!function (a, b, c) { "undefined" != typeof module && module.exports ? module.exports = c() : a[b] = c() }(this, "verge", function () { function a() { return { width: k(), height: l() } } function b(a, b) { var c = {}; return b = +b || 0, c.width = (c.right = a.right + b) - (c.left = a.left - b), c.height = (c.bottom = a.bottom + b) - (c.top = a.top - b), c } function c(a, c) { return a = a && !a.nodeType ? a[0] : a, a && 1 === a.nodeType ? b(a.getBoundingClientRect(), c) : !1 } function d(b) { b = null == b ? a() : 1 === b.nodeType ? c(b) : b; var d = b.height, e = b.width; return d = "function" == typeof d ? d.call(b) : d, e = "function" == typeof e ? e.call(b) : e, e / d } var e = {}, f = "undefined" != typeof window && window, g = "undefined" != typeof document && document, h = g && g.documentElement, i = f.matchMedia || f.msMatchMedia, j = i ? function (a) { return !!i.call(f, a).matches } : function () { return !1 }, k = e.viewportW = function () { var a = h.clientWidth, b = f.innerWidth; return b > a ? b : a }, l = e.viewportH = function () { var a = h.clientHeight, b = f.innerHeight; return b > a ? b : a }; return e.mq = j, e.matchMedia = i ? function () { return i.apply(f, arguments) } : function () { return {} }, e.viewport = a, e.scrollX = function () { return f.pageXOffset || h.scrollLeft }, e.scrollY = function () { return f.pageYOffset || h.scrollTop }, e.rectangle = c, e.aspect = d, e.inX = function (a, b) { var d = c(a, b); return !!d && d.right >= 0 && d.left <= k() }, e.inY = function (a, b) { var d = c(a, b); return !!d && d.bottom >= 0 && d.top <= l() }, e.inViewport = function (a, b) { var d = c(a, b); return !!d && d.bottom >= 0 && d.right >= 0 && d.top <= l() && d.left <= k() }, e });
jQuery.extend(verge);

/**
 * bxSlider v4.2.5
 * Copyright 2013-2015 Steven Wanderski
 * Written while drinking Belgian ales and listening to jazz

 * Licensed under MIT (http://opensource.org/licenses/MIT)
 */
!function (a) { var b = { mode: "horizontal", slideSelector: "", infiniteLoop: !0, hideControlOnEnd: !1, speed: 500, easing: null, slideMargin: 0, startSlide: 0, randomStart: !1, captions: !1, ticker: !1, tickerHover: !1, adaptiveHeight: !1, adaptiveHeightSpeed: 500, video: !1, useCSS: !0, preloadImages: "visible", responsive: !0, slideZIndex: 50, wrapperClass: "bx-wrapper", touchEnabled: !0, swipeThreshold: 50, oneToOneTouch: !0, preventDefaultSwipeX: !0, preventDefaultSwipeY: !1, ariaLive: !0, ariaHidden: !0, keyboardEnabled: !1, pager: !0, pagerType: "full", pagerShortSeparator: " / ", pagerSelector: null, buildPager: null, pagerCustom: null, controls: !0, nextText: "Next", prevText: "Prev", nextSelector: null, prevSelector: null, autoControls: !1, startText: "Start", stopText: "Stop", autoControlsCombine: !1, autoControlsSelector: null, auto: !1, pause: 4e3, autoStart: !0, autoDirection: "next", stopAutoOnClick: !1, autoHover: !1, autoDelay: 0, autoSlideForOnePage: !1, minSlides: 1, maxSlides: 1, moveSlides: 0, slideWidth: 0, shrinkItems: !1, onSliderLoad: function () { return !0 }, onSlideBefore: function () { return !0 }, onSlideAfter: function () { return !0 }, onSlideNext: function () { return !0 }, onSlidePrev: function () { return !0 }, onSliderResize: function () { return !0 } }; a.fn.bxSlider = function (c) { if (0 === this.length) return this; if (this.length > 1) return this.each(function () { a(this).bxSlider(c) }), this; var d = {}, e = this, f = a(window).width(), g = a(window).height(); if (!a(e).data("bxSlider")) { var h = function () { a(e).data("bxSlider") || (d.settings = a.extend({}, b, c), d.settings.slideWidth = parseInt(d.settings.slideWidth), d.children = e.children(d.settings.slideSelector), d.children.length < d.settings.minSlides && (d.settings.minSlides = d.children.length), d.children.length < d.settings.maxSlides && (d.settings.maxSlides = d.children.length), d.settings.randomStart && (d.settings.startSlide = Math.floor(Math.random() * d.children.length)), d.active = { index: d.settings.startSlide }, d.carousel = d.settings.minSlides > 1 || d.settings.maxSlides > 1 ? !0 : !1, d.carousel && (d.settings.preloadImages = "all"), d.minThreshold = d.settings.minSlides * d.settings.slideWidth + (d.settings.minSlides - 1) * d.settings.slideMargin, d.maxThreshold = d.settings.maxSlides * d.settings.slideWidth + (d.settings.maxSlides - 1) * d.settings.slideMargin, d.working = !1, d.controls = {}, d.interval = null, d.animProp = "vertical" === d.settings.mode ? "top" : "left", d.usingCSS = d.settings.useCSS && "fade" !== d.settings.mode && function () { for (var a = document.createElement("div"), b = ["WebkitPerspective", "MozPerspective", "OPerspective", "msPerspective"], c = 0; c < b.length; c++) if (void 0 !== a.style[b[c]]) return d.cssPrefix = b[c].replace("Perspective", "").toLowerCase(), d.animProp = "-" + d.cssPrefix + "-transform", !0; return !1 }(), "vertical" === d.settings.mode && (d.settings.maxSlides = d.settings.minSlides), e.data("origStyle", e.attr("style")), e.children(d.settings.slideSelector).each(function () { a(this).data("origStyle", a(this).attr("style")) }), j()) }, j = function () { var b = d.children.eq(d.settings.startSlide); e.wrap('<div class="' + d.settings.wrapperClass + '"><div class="bx-viewport"></div></div>'), d.viewport = e.parent(), d.settings.ariaLive && !d.settings.ticker && d.viewport.attr("aria-live", "polite"), d.loader = a('<div class="bx-loading" />'), d.viewport.prepend(d.loader), e.css({ width: "horizontal" === d.settings.mode ? 1e3 * d.children.length + 215 + "%" : "auto", position: "relative" }), d.usingCSS && d.settings.easing ? e.css("-" + d.cssPrefix + "-transition-timing-function", d.settings.easing) : d.settings.easing || (d.settings.easing = "swing"), d.viewport.css({ width: "100%", overflow: "hidden", position: "relative" }), d.viewport.parent().css({ maxWidth: n() }), d.settings.pager || d.settings.controls || d.viewport.parent().css({ margin: "0 auto 0px" }), d.children.css({ "float": "horizontal" === d.settings.mode ? "left" : "none", listStyle: "none", position: "relative" }), d.children.css("width", o()), "horizontal" === d.settings.mode && d.settings.slideMargin > 0 && d.children.css("marginRight", d.settings.slideMargin), "vertical" === d.settings.mode && d.settings.slideMargin > 0 && d.children.css("marginBottom", d.settings.slideMargin), "fade" === d.settings.mode && (d.children.css({ position: "absolute", zIndex: 0, display: "none" }), d.children.eq(d.settings.startSlide).css({ zIndex: d.settings.slideZIndex, display: "block" })), d.controls.el = a('<div class="bx-controls" />'), d.settings.captions && y(), d.active.last = d.settings.startSlide === q() - 1, d.settings.video && e.fitVids(), ("all" === d.settings.preloadImages || d.settings.ticker) && (b = d.children), d.settings.ticker ? d.settings.pager = !1 : (d.settings.controls && w(), d.settings.auto && d.settings.autoControls && x(), d.settings.pager && v(), (d.settings.controls || d.settings.autoControls || d.settings.pager) && d.viewport.after(d.controls.el)), k(b, l) }, k = function (b, c) { var d = b.find('img:not([src=""]), iframe').length, e = 0; return 0 === d ? void c() : void b.find('img:not([src=""]), iframe').each(function () { a(this).one("load error", function () { ++e === d && c() }).each(function () { this.complete && a(this).load() }) }) }, l = function () { if (d.settings.infiniteLoop && "fade" !== d.settings.mode && !d.settings.ticker) { var b = "vertical" === d.settings.mode ? d.settings.minSlides : d.settings.maxSlides, c = d.children.slice(0, b).clone(!0).addClass("bx-clone"), f = d.children.slice(-b).clone(!0).addClass("bx-clone"); d.settings.ariaHidden && (c.attr("aria-hidden", !0), f.attr("aria-hidden", !0)), e.append(c).prepend(f) } d.loader.remove(), s(), "vertical" === d.settings.mode && (d.settings.adaptiveHeight = !0), d.viewport.height(m()), e.redrawSlider(), d.settings.onSliderLoad.call(e, d.active.index), d.initialized = !0, d.settings.responsive && a(window).bind("resize", S), d.settings.auto && d.settings.autoStart && (q() > 1 || d.settings.autoSlideForOnePage) && I(), d.settings.ticker && J(), d.settings.pager && E(d.settings.startSlide), d.settings.controls && H(), d.settings.touchEnabled && !d.settings.ticker && N(), d.settings.keyboardEnabled && !d.settings.ticker && a(document).keydown(M) }, m = function () { var b = 0, c = a(); if ("vertical" === d.settings.mode || d.settings.adaptiveHeight) if (d.carousel) { var e = 1 === d.settings.moveSlides ? d.active.index : d.active.index * r(); for (c = d.children.eq(e), i = 1; i <= d.settings.maxSlides - 1; i++) c = e + i >= d.children.length ? c.add(d.children.eq(i - 1)) : c.add(d.children.eq(e + i)) } else c = d.children.eq(d.active.index); else c = d.children; return "vertical" === d.settings.mode ? (c.each(function (c) { b += a(this).outerHeight() }), d.settings.slideMargin > 0 && (b += d.settings.slideMargin * (d.settings.minSlides - 1))) : b = Math.max.apply(Math, c.map(function () { return a(this).outerHeight(!1) }).get()), "border-box" === d.viewport.css("box-sizing") ? b += parseFloat(d.viewport.css("padding-top")) + parseFloat(d.viewport.css("padding-bottom")) + parseFloat(d.viewport.css("border-top-width")) + parseFloat(d.viewport.css("border-bottom-width")) : "padding-box" === d.viewport.css("box-sizing") && (b += parseFloat(d.viewport.css("padding-top")) + parseFloat(d.viewport.css("padding-bottom"))), b }, n = function () { var a = "100%"; return d.settings.slideWidth > 0 && (a = "horizontal" === d.settings.mode ? d.settings.maxSlides * d.settings.slideWidth + (d.settings.maxSlides - 1) * d.settings.slideMargin : d.settings.slideWidth), a }, o = function () { var a = d.settings.slideWidth, b = d.viewport.width(); if (0 === d.settings.slideWidth || d.settings.slideWidth > b && !d.carousel || "vertical" === d.settings.mode) a = b; else if (d.settings.maxSlides > 1 && "horizontal" === d.settings.mode) { if (b > d.maxThreshold) return a; b < d.minThreshold ? a = (b - d.settings.slideMargin * (d.settings.minSlides - 1)) / d.settings.minSlides : d.settings.shrinkItems && (a = Math.floor((b + d.settings.slideMargin) / Math.ceil((b + d.settings.slideMargin) / (a + d.settings.slideMargin)) - d.settings.slideMargin)) } return a }, p = function () { var a = 1, b = null; return "horizontal" === d.settings.mode && d.settings.slideWidth > 0 ? d.viewport.width() < d.minThreshold ? a = d.settings.minSlides : d.viewport.width() > d.maxThreshold ? a = d.settings.maxSlides : (b = d.children.first().width() + d.settings.slideMargin, a = Math.floor((d.viewport.width() + d.settings.slideMargin) / b)) : "vertical" === d.settings.mode && (a = d.settings.minSlides), a }, q = function () { var a = 0, b = 0, c = 0; if (d.settings.moveSlides > 0) if (d.settings.infiniteLoop) a = Math.ceil(d.children.length / r()); else for (; b < d.children.length;)++a, b = c + p(), c += d.settings.moveSlides <= p() ? d.settings.moveSlides : p(); else a = Math.ceil(d.children.length / p()); return a }, r = function () { return d.settings.moveSlides > 0 && d.settings.moveSlides <= p() ? d.settings.moveSlides : p() }, s = function () { var a, b, c; d.children.length > d.settings.maxSlides && d.active.last && !d.settings.infiniteLoop ? "horizontal" === d.settings.mode ? (b = d.children.last(), a = b.position(), t(-(a.left - (d.viewport.width() - b.outerWidth())), "reset", 0)) : "vertical" === d.settings.mode && (c = d.children.length - d.settings.minSlides, a = d.children.eq(c).position(), t(-a.top, "reset", 0)) : (a = d.children.eq(d.active.index * r()).position(), d.active.index === q() - 1 && (d.active.last = !0), void 0 !== a && ("horizontal" === d.settings.mode ? t(-a.left, "reset", 0) : "vertical" === d.settings.mode && t(-a.top, "reset", 0))) }, t = function (b, c, f, g) { var h, i; d.usingCSS ? (i = "vertical" === d.settings.mode ? "translate3d(0, " + b + "px, 0)" : "translate3d(" + b + "px, 0, 0)", e.css("-" + d.cssPrefix + "-transition-duration", f / 1e3 + "s"), "slide" === c ? (e.css(d.animProp, i), 0 !== f ? e.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function (b) { a(b.target).is(e) && (e.unbind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd"), F()) }) : F()) : "reset" === c ? e.css(d.animProp, i) : "ticker" === c && (e.css("-" + d.cssPrefix + "-transition-timing-function", "linear"), e.css(d.animProp, i), 0 !== f ? e.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function (b) { a(b.target).is(e) && (e.unbind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd"), t(g.resetValue, "reset", 0), K()) }) : (t(g.resetValue, "reset", 0), K()))) : (h = {}, h[d.animProp] = b, "slide" === c ? e.animate(h, f, d.settings.easing, function () { F() }) : "reset" === c ? e.css(d.animProp, b) : "ticker" === c && e.animate(h, f, "linear", function () { t(g.resetValue, "reset", 0), K() })) }, u = function () { for (var b = "", c = "", e = q(), f = 0; e > f; f++) c = "", d.settings.buildPager && a.isFunction(d.settings.buildPager) || d.settings.pagerCustom ? (c = d.settings.buildPager(f), d.pagerEl.addClass("bx-custom-pager")) : (c = f + 1, d.pagerEl.addClass("bx-default-pager")), b += '<div class="bx-pager-item"><a href="" data-slide-index="' + f + '" class="bx-pager-link">' + c + "</a></div>"; d.pagerEl.html(b) }, v = function () { d.settings.pagerCustom ? d.pagerEl = a(d.settings.pagerCustom) : (d.pagerEl = a('<div class="bx-pager" />'), d.settings.pagerSelector ? a(d.settings.pagerSelector).html(d.pagerEl) : d.controls.el.addClass("bx-has-pager").append(d.pagerEl), u()), d.pagerEl.on("click touchend", "a", D) }, w = function () { d.controls.next = a('<a class="bx-next" href="">' + d.settings.nextText + "</a>"), d.controls.prev = a('<a class="bx-prev" href="">' + d.settings.prevText + "</a>"), d.controls.next.bind("click touchend", z), d.controls.prev.bind("click touchend", A), d.settings.nextSelector && a(d.settings.nextSelector).append(d.controls.next), d.settings.prevSelector && a(d.settings.prevSelector).append(d.controls.prev), d.settings.nextSelector || d.settings.prevSelector || (d.controls.directionEl = a('<div class="bx-controls-direction" />'), d.controls.directionEl.append(d.controls.prev).append(d.controls.next), d.controls.el.addClass("bx-has-controls-direction").append(d.controls.directionEl)) }, x = function () { d.controls.start = a('<div class="bx-controls-auto-item"><a class="bx-start" href="">' + d.settings.startText + "</a></div>"), d.controls.stop = a('<div class="bx-controls-auto-item"><a class="bx-stop" href="">' + d.settings.stopText + "</a></div>"), d.controls.autoEl = a('<div class="bx-controls-auto" />'), d.controls.autoEl.on("click", ".bx-start", B), d.controls.autoEl.on("click", ".bx-stop", C), d.settings.autoControlsCombine ? d.controls.autoEl.append(d.controls.start) : d.controls.autoEl.append(d.controls.start).append(d.controls.stop), d.settings.autoControlsSelector ? a(d.settings.autoControlsSelector).html(d.controls.autoEl) : d.controls.el.addClass("bx-has-controls-auto").append(d.controls.autoEl), G(d.settings.autoStart ? "stop" : "start") }, y = function () { d.children.each(function (b) { var c = a(this).find("img:first").attr("title"); void 0 !== c && ("" + c).length && a(this).append('<div class="bx-caption"><span>' + c + "</span></div>") }) }, z = function (a) { a.preventDefault(), d.controls.el.hasClass("disabled") || (d.settings.auto && d.settings.stopAutoOnClick && e.stopAuto(), e.goToNextSlide()) }, A = function (a) { a.preventDefault(), d.controls.el.hasClass("disabled") || (d.settings.auto && d.settings.stopAutoOnClick && e.stopAuto(), e.goToPrevSlide()) }, B = function (a) { e.startAuto(), a.preventDefault() }, C = function (a) { e.stopAuto(), a.preventDefault() }, D = function (b) { var c, f; b.preventDefault(), d.controls.el.hasClass("disabled") || (d.settings.auto && d.settings.stopAutoOnClick && e.stopAuto(), c = a(b.currentTarget), void 0 !== c.attr("data-slide-index") && (f = parseInt(c.attr("data-slide-index")), f !== d.active.index && e.goToSlide(f))) }, E = function (b) { var c = d.children.length; return "short" === d.settings.pagerType ? (d.settings.maxSlides > 1 && (c = Math.ceil(d.children.length / d.settings.maxSlides)), void d.pagerEl.html(b + 1 + d.settings.pagerShortSeparator + c)) : (d.pagerEl.find("a").removeClass("active"), void d.pagerEl.each(function (c, d) { a(d).find("a").eq(b).addClass("active") })) }, F = function () { if (d.settings.infiniteLoop) { var a = ""; 0 === d.active.index ? a = d.children.eq(0).position() : d.active.index === q() - 1 && d.carousel ? a = d.children.eq((q() - 1) * r()).position() : d.active.index === d.children.length - 1 && (a = d.children.eq(d.children.length - 1).position()), a && ("horizontal" === d.settings.mode ? t(-a.left, "reset", 0) : "vertical" === d.settings.mode && t(-a.top, "reset", 0)) } d.working = !1, d.settings.onSlideAfter.call(e, d.children.eq(d.active.index), d.oldIndex, d.active.index) }, G = function (a) { d.settings.autoControlsCombine ? d.controls.autoEl.html(d.controls[a]) : (d.controls.autoEl.find("a").removeClass("active"), d.controls.autoEl.find("a:not(.bx-" + a + ")").addClass("active")) }, H = function () { 1 === q() ? (d.controls.prev.addClass("disabled"), d.controls.next.addClass("disabled")) : !d.settings.infiniteLoop && d.settings.hideControlOnEnd && (0 === d.active.index ? (d.controls.prev.addClass("disabled"), d.controls.next.removeClass("disabled")) : d.active.index === q() - 1 ? (d.controls.next.addClass("disabled"), d.controls.prev.removeClass("disabled")) : (d.controls.prev.removeClass("disabled"), d.controls.next.removeClass("disabled"))) }, I = function () { if (d.settings.autoDelay > 0) { setTimeout(e.startAuto, d.settings.autoDelay) } else e.startAuto(), a(window).focus(function () { e.startAuto() }).blur(function () { e.stopAuto() }); d.settings.autoHover && e.hover(function () { d.interval && (e.stopAuto(!0), d.autoPaused = !0) }, function () { d.autoPaused && (e.startAuto(!0), d.autoPaused = null) }) }, J = function () { var b, c, f, g, h, i, j, k, l = 0; "next" === d.settings.autoDirection ? e.append(d.children.clone().addClass("bx-clone")) : (e.prepend(d.children.clone().addClass("bx-clone")), b = d.children.first().position(), l = "horizontal" === d.settings.mode ? -b.left : -b.top), t(l, "reset", 0), d.settings.pager = !1, d.settings.controls = !1, d.settings.autoControls = !1, d.settings.tickerHover && (d.usingCSS ? (g = "horizontal" === d.settings.mode ? 4 : 5, d.viewport.hover(function () { c = e.css("-" + d.cssPrefix + "-transform"), f = parseFloat(c.split(",")[g]), t(f, "reset", 0) }, function () { k = 0, d.children.each(function (b) { k += "horizontal" === d.settings.mode ? a(this).outerWidth(!0) : a(this).outerHeight(!0) }), h = d.settings.speed / k, i = "horizontal" === d.settings.mode ? "left" : "top", j = h * (k - Math.abs(parseInt(f))), K(j) })) : d.viewport.hover(function () { e.stop() }, function () { k = 0, d.children.each(function (b) { k += "horizontal" === d.settings.mode ? a(this).outerWidth(!0) : a(this).outerHeight(!0) }), h = d.settings.speed / k, i = "horizontal" === d.settings.mode ? "left" : "top", j = h * (k - Math.abs(parseInt(e.css(i)))), K(j) })), K() }, K = function (a) { var b, c, f, g = a ? a : d.settings.speed, h = { left: 0, top: 0 }, i = { left: 0, top: 0 }; "next" === d.settings.autoDirection ? h = e.find(".bx-clone").first().position() : i = d.children.first().position(), b = "horizontal" === d.settings.mode ? -h.left : -h.top, c = "horizontal" === d.settings.mode ? -i.left : -i.top, f = { resetValue: c }, t(b, "ticker", g, f) }, L = function (b) { var c = a(window), d = { top: c.scrollTop(), left: c.scrollLeft() }, e = b.offset(); return d.right = d.left + c.width(), d.bottom = d.top + c.height(), e.right = e.left + b.outerWidth(), e.bottom = e.top + b.outerHeight(), !(d.right < e.left || d.left > e.right || d.bottom < e.top || d.top > e.bottom) }, M = function (a) { var b = document.activeElement.tagName.toLowerCase(), c = "input|textarea", d = new RegExp(b, ["i"]), f = d.exec(c); if (null == f && L(e)) { if (39 === a.keyCode) return z(a), !1; if (37 === a.keyCode) return A(a), !1 } }, N = function () { d.touch = { start: { x: 0, y: 0 }, end: { x: 0, y: 0 } }, d.viewport.bind("touchstart MSPointerDown pointerdown", O), d.viewport.on("click", ".bxslider a", function (a) { d.viewport.hasClass("click-disabled") && (a.preventDefault(), d.viewport.removeClass("click-disabled")) }) }, O = function (a) { if (d.controls.el.addClass("disabled"), d.working) a.preventDefault(), d.controls.el.removeClass("disabled"); else { d.touch.originalPos = e.position(); var b = a.originalEvent, c = "undefined" != typeof b.changedTouches ? b.changedTouches : [b]; d.touch.start.x = c[0].pageX, d.touch.start.y = c[0].pageY, d.viewport.get(0).setPointerCapture && (d.pointerId = b.pointerId, d.viewport.get(0).setPointerCapture(d.pointerId)), d.viewport.bind("touchmove MSPointerMove pointermove", Q), d.viewport.bind("touchend MSPointerUp pointerup", R), d.viewport.bind("MSPointerCancel pointercancel", P) } }, P = function (a) { t(d.touch.originalPos.left, "reset", 0), d.controls.el.removeClass("disabled"), d.viewport.unbind("MSPointerCancel pointercancel", P), d.viewport.unbind("touchmove MSPointerMove pointermove", Q), d.viewport.unbind("touchend MSPointerUp pointerup", R), d.viewport.get(0).releasePointerCapture && d.viewport.get(0).releasePointerCapture(d.pointerId) }, Q = function (a) { var b = a.originalEvent, c = "undefined" != typeof b.changedTouches ? b.changedTouches : [b], e = Math.abs(c[0].pageX - d.touch.start.x), f = Math.abs(c[0].pageY - d.touch.start.y), g = 0, h = 0; 3 * e > f && d.settings.preventDefaultSwipeX ? a.preventDefault() : 3 * f > e && d.settings.preventDefaultSwipeY && a.preventDefault(), "fade" !== d.settings.mode && d.settings.oneToOneTouch && ("horizontal" === d.settings.mode ? (h = c[0].pageX - d.touch.start.x, g = d.touch.originalPos.left + h) : (h = c[0].pageY - d.touch.start.y, g = d.touch.originalPos.top + h), t(g, "reset", 0)) }, R = function (a) { d.viewport.unbind("touchmove MSPointerMove pointermove", Q), d.controls.el.removeClass("disabled"); var b = a.originalEvent, c = "undefined" != typeof b.changedTouches ? b.changedTouches : [b], f = 0, g = 0; d.touch.end.x = c[0].pageX, d.touch.end.y = c[0].pageY, "fade" === d.settings.mode ? (g = Math.abs(d.touch.start.x - d.touch.end.x), g >= d.settings.swipeThreshold && (d.touch.start.x > d.touch.end.x ? e.goToNextSlide() : e.goToPrevSlide(), e.stopAuto())) : ("horizontal" === d.settings.mode ? (g = d.touch.end.x - d.touch.start.x, f = d.touch.originalPos.left) : (g = d.touch.end.y - d.touch.start.y, f = d.touch.originalPos.top), !d.settings.infiniteLoop && (0 === d.active.index && g > 0 || d.active.last && 0 > g) ? t(f, "reset", 200) : Math.abs(g) >= d.settings.swipeThreshold ? (0 > g ? e.goToNextSlide() : e.goToPrevSlide(), e.stopAuto()) : t(f, "reset", 200)), d.viewport.unbind("touchend MSPointerUp pointerup", R), d.viewport.get(0).releasePointerCapture && d.viewport.get(0).releasePointerCapture(d.pointerId) }, S = function (b) { if (d.initialized) if (d.working) window.setTimeout(S, 10); else { var c = a(window).width(), h = a(window).height(); (f !== c || g !== h) && (f = c, g = h, e.redrawSlider(), d.settings.onSliderResize.call(e, d.active.index)) } }, T = function (a) { var b = p(); d.settings.ariaHidden && !d.settings.ticker && (d.children.attr("aria-hidden", "true"), d.children.slice(a, a + b).attr("aria-hidden", "false")) }, U = function (a) { return 0 > a ? d.settings.infiniteLoop ? q() - 1 : d.active.index : a >= q() ? d.settings.infiniteLoop ? 0 : d.active.index : a }; return e.goToSlide = function (b, c) { var f, g, h, i, j = !0, k = 0, l = { left: 0, top: 0 }, n = null; if (d.oldIndex = d.active.index, d.active.index = U(b), !d.working && d.active.index !== d.oldIndex) { if (d.working = !0, j = d.settings.onSlideBefore.call(e, d.children.eq(d.active.index), d.oldIndex, d.active.index), "undefined" != typeof j && !j) return d.active.index = d.oldIndex, void (d.working = !1); "next" === c ? d.settings.onSlideNext.call(e, d.children.eq(d.active.index), d.oldIndex, d.active.index) || (j = !1) : "prev" === c && (d.settings.onSlidePrev.call(e, d.children.eq(d.active.index), d.oldIndex, d.active.index) || (j = !1)), d.active.last = d.active.index >= q() - 1, (d.settings.pager || d.settings.pagerCustom) && E(d.active.index), d.settings.controls && H(), "fade" === d.settings.mode ? (d.settings.adaptiveHeight && d.viewport.height() !== m() && d.viewport.animate({ height: m() }, d.settings.adaptiveHeightSpeed), d.children.filter(":visible").fadeOut(d.settings.speed).css({ zIndex: 0 }), d.children.eq(d.active.index).css("zIndex", d.settings.slideZIndex + 1).fadeIn(d.settings.speed, function () { a(this).css("zIndex", d.settings.slideZIndex), F() })) : (d.settings.adaptiveHeight && d.viewport.height() !== m() && d.viewport.animate({ height: m() }, d.settings.adaptiveHeightSpeed), !d.settings.infiniteLoop && d.carousel && d.active.last ? "horizontal" === d.settings.mode ? (n = d.children.eq(d.children.length - 1), l = n.position(), k = d.viewport.width() - n.outerWidth()) : (f = d.children.length - d.settings.minSlides, l = d.children.eq(f).position()) : d.carousel && d.active.last && "prev" === c ? (g = 1 === d.settings.moveSlides ? d.settings.maxSlides - r() : (q() - 1) * r() - (d.children.length - d.settings.maxSlides), n = e.children(".bx-clone").eq(g), l = n.position()) : "next" === c && 0 === d.active.index ? (l = e.find("> .bx-clone").eq(d.settings.maxSlides).position(), d.active.last = !1) : b >= 0 && (i = b * parseInt(r()), l = d.children.eq(i).position()), "undefined" != typeof l ? (h = "horizontal" === d.settings.mode ? -(l.left - k) : -l.top, t(h, "slide", d.settings.speed)) : d.working = !1), d.settings.ariaHidden && T(d.active.index * r()) } }, e.goToNextSlide = function () { if (d.settings.infiniteLoop || !d.active.last) { var a = parseInt(d.active.index) + 1; e.goToSlide(a, "next") } }, e.goToPrevSlide = function () { if (d.settings.infiniteLoop || 0 !== d.active.index) { var a = parseInt(d.active.index) - 1; e.goToSlide(a, "prev") } }, e.startAuto = function (a) { d.interval || (d.interval = setInterval(function () { "next" === d.settings.autoDirection ? e.goToNextSlide() : e.goToPrevSlide() }, d.settings.pause), d.settings.autoControls && a !== !0 && G("stop")) }, e.stopAuto = function (a) { d.interval && (clearInterval(d.interval), d.interval = null, d.settings.autoControls && a !== !0 && G("start")) }, e.getCurrentSlide = function () { return d.active.index }, e.getCurrentSlideElement = function () { return d.children.eq(d.active.index) }, e.getSlideElement = function (a) { return d.children.eq(a) }, e.getSlideCount = function () { return d.children.length }, e.isWorking = function () { return d.working }, e.redrawSlider = function () { d.children.add(e.find(".bx-clone")).outerWidth(o()), d.viewport.css("height", m()), d.settings.ticker || s(), d.active.last && (d.active.index = q() - 1), d.active.index >= q() && (d.active.last = !0), d.settings.pager && !d.settings.pagerCustom && (u(), E(d.active.index)), d.settings.ariaHidden && T(d.active.index * r()) }, e.destroySlider = function () { d.initialized && (d.initialized = !1, a(".bx-clone", this).remove(), d.children.each(function () { void 0 !== a(this).data("origStyle") ? a(this).attr("style", a(this).data("origStyle")) : a(this).removeAttr("style") }), void 0 !== a(this).data("origStyle") ? this.attr("style", a(this).data("origStyle")) : a(this).removeAttr("style"), a(this).unwrap().unwrap(), d.controls.el && d.controls.el.remove(), d.controls.next && d.controls.next.remove(), d.controls.prev && d.controls.prev.remove(), d.pagerEl && d.settings.controls && !d.settings.pagerCustom && d.pagerEl.remove(), a(".bx-caption", this).remove(), d.controls.autoEl && d.controls.autoEl.remove(), clearInterval(d.interval), d.settings.responsive && a(window).unbind("resize", S), d.settings.keyboardEnabled && a(document).unbind("keydown", M), a(this).removeData("bxSlider")) }, e.reloadSlider = function (b) { void 0 !== b && (c = b), e.destroySlider(), h(), a(e).data("bxSlider", this) }, h(), a(e).data("bxSlider", this), this } } }(jQuery);


/*
Waypoints - 4.0.0
Copyright © 2011-2015 Caleb Troughton
Licensed under the MIT license.
https://github.com/imakewebthings/waypoints/blog/master/licenses.txt
*/
!function () { "use strict"; function t(o) { if (!o) throw new Error("No options passed to Waypoint constructor"); if (!o.element) throw new Error("No element option passed to Waypoint constructor"); if (!o.handler) throw new Error("No handler option passed to Waypoint constructor"); this.key = "waypoint-" + e, this.options = t.Adapter.extend({}, t.defaults, o), this.element = this.options.element, this.adapter = new t.Adapter(this.element), this.callback = o.handler, this.axis = this.options.horizontal ? "horizontal" : "vertical", this.enabled = this.options.enabled, this.triggerPoint = null, this.group = t.Group.findOrCreate({ name: this.options.group, axis: this.axis }), this.context = t.Context.findOrCreateByElement(this.options.context), t.offsetAliases[this.options.offset] && (this.options.offset = t.offsetAliases[this.options.offset]), this.group.add(this), this.context.add(this), i[this.key] = this, e += 1 } var e = 0, i = {}; t.prototype.queueTrigger = function (t) { this.group.queueTrigger(this, t) }, t.prototype.trigger = function (t) { this.enabled && this.callback && this.callback.apply(this, t) }, t.prototype.destroy = function () { this.context.remove(this), this.group.remove(this), delete i[this.key] }, t.prototype.disable = function () { return this.enabled = !1, this }, t.prototype.enable = function () { return this.context.refresh(), this.enabled = !0, this }, t.prototype.next = function () { return this.group.next(this) }, t.prototype.previous = function () { return this.group.previous(this) }, t.invokeAll = function (t) { var e = []; for (var o in i) e.push(i[o]); for (var n = 0, r = e.length; r > n; n++) e[n][t]() }, t.destroyAll = function () { t.invokeAll("destroy") }, t.disableAll = function () { t.invokeAll("disable") }, t.enableAll = function () { t.invokeAll("enable") }, t.refreshAll = function () { t.Context.refreshAll() }, t.viewportHeight = function () { return window.innerHeight || document.documentElement.clientHeight }, t.viewportWidth = function () { return document.documentElement.clientWidth }, t.adapters = [], t.defaults = { context: window, continuous: !0, enabled: !0, group: "default", horizontal: !1, offset: 0 }, t.offsetAliases = { "bottom-in-view": function () { return this.context.innerHeight() - this.adapter.outerHeight() }, "right-in-view": function () { return this.context.innerWidth() - this.adapter.outerWidth() } }, window.Waypoint = t }(), function () { "use strict"; function t(t) { window.setTimeout(t, 1e3 / 60) } function e(t) { this.element = t, this.Adapter = n.Adapter, this.adapter = new this.Adapter(t), this.key = "waypoint-context-" + i, this.didScroll = !1, this.didResize = !1, this.oldScroll = { x: this.adapter.scrollLeft(), y: this.adapter.scrollTop() }, this.waypoints = { vertical: {}, horizontal: {} }, t.waypointContextKey = this.key, o[t.waypointContextKey] = this, i += 1, this.createThrottledScrollHandler(), this.createThrottledResizeHandler() } var i = 0, o = {}, n = window.Waypoint, r = window.onload; e.prototype.add = function (t) { var e = t.options.horizontal ? "horizontal" : "vertical"; this.waypoints[e][t.key] = t, this.refresh() }, e.prototype.checkEmpty = function () { var t = this.Adapter.isEmptyObject(this.waypoints.horizontal), e = this.Adapter.isEmptyObject(this.waypoints.vertical); t && e && (this.adapter.off(".waypoints"), delete o[this.key]) }, e.prototype.createThrottledResizeHandler = function () { function t() { e.handleResize(), e.didResize = !1 } var e = this; this.adapter.on("resize.waypoints", function () { e.didResize || (e.didResize = !0, n.requestAnimationFrame(t)) }) }, e.prototype.createThrottledScrollHandler = function () { function t() { e.handleScroll(), e.didScroll = !1 } var e = this; this.adapter.on("scroll.waypoints", function () { (!e.didScroll || n.isTouch) && (e.didScroll = !0, n.requestAnimationFrame(t)) }) }, e.prototype.handleResize = function () { n.Context.refreshAll() }, e.prototype.handleScroll = function () { var t = {}, e = { horizontal: { newScroll: this.adapter.scrollLeft(), oldScroll: this.oldScroll.x, forward: "right", backward: "left" }, vertical: { newScroll: this.adapter.scrollTop(), oldScroll: this.oldScroll.y, forward: "down", backward: "up" } }; for (var i in e) { var o = e[i], n = o.newScroll > o.oldScroll, r = n ? o.forward : o.backward; for (var s in this.waypoints[i]) { var a = this.waypoints[i][s], l = o.oldScroll < a.triggerPoint, h = o.newScroll >= a.triggerPoint, p = l && h, u = !l && !h; (p || u) && (a.queueTrigger(r), t[a.group.id] = a.group) } } for (var c in t) t[c].flushTriggers(); this.oldScroll = { x: e.horizontal.newScroll, y: e.vertical.newScroll } }, e.prototype.innerHeight = function () { return this.element == this.element.window ? n.viewportHeight() : this.adapter.innerHeight() }, e.prototype.remove = function (t) { delete this.waypoints[t.axis][t.key], this.checkEmpty() }, e.prototype.innerWidth = function () { return this.element == this.element.window ? n.viewportWidth() : this.adapter.innerWidth() }, e.prototype.destroy = function () { var t = []; for (var e in this.waypoints) for (var i in this.waypoints[e]) t.push(this.waypoints[e][i]); for (var o = 0, n = t.length; n > o; o++) t[o].destroy() }, e.prototype.refresh = function () { var t, e = this.element == this.element.window, i = e ? void 0 : this.adapter.offset(), o = {}; this.handleScroll(), t = { horizontal: { contextOffset: e ? 0 : i.left, contextScroll: e ? 0 : this.oldScroll.x, contextDimension: this.innerWidth(), oldScroll: this.oldScroll.x, forward: "right", backward: "left", offsetProp: "left" }, vertical: { contextOffset: e ? 0 : i.top, contextScroll: e ? 0 : this.oldScroll.y, contextDimension: this.innerHeight(), oldScroll: this.oldScroll.y, forward: "down", backward: "up", offsetProp: "top" } }; for (var r in t) { var s = t[r]; for (var a in this.waypoints[r]) { var l, h, p, u, c, d = this.waypoints[r][a], f = d.options.offset, w = d.triggerPoint, y = 0, g = null == w; d.element !== d.element.window && (y = d.adapter.offset()[s.offsetProp]), "function" == typeof f ? f = f.apply(d) : "string" == typeof f && (f = parseFloat(f), d.options.offset.indexOf("%") > -1 && (f = Math.ceil(s.contextDimension * f / 100))), l = s.contextScroll - s.contextOffset, d.triggerPoint = y + l - f, h = w < s.oldScroll, p = d.triggerPoint >= s.oldScroll, u = h && p, c = !h && !p, !g && u ? (d.queueTrigger(s.backward), o[d.group.id] = d.group) : !g && c ? (d.queueTrigger(s.forward), o[d.group.id] = d.group) : g && s.oldScroll >= d.triggerPoint && (d.queueTrigger(s.forward), o[d.group.id] = d.group) } } return n.requestAnimationFrame(function () { for (var t in o) o[t].flushTriggers() }), this }, e.findOrCreateByElement = function (t) { return e.findByElement(t) || new e(t) }, e.refreshAll = function () { for (var t in o) o[t].refresh() }, e.findByElement = function (t) { return o[t.waypointContextKey] }, window.onload = function () { r && r(), e.refreshAll() }, n.requestAnimationFrame = function (e) { var i = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || t; i.call(window, e) }, n.Context = e }(), function () { "use strict"; function t(t, e) { return t.triggerPoint - e.triggerPoint } function e(t, e) { return e.triggerPoint - t.triggerPoint } function i(t) { this.name = t.name, this.axis = t.axis, this.id = this.name + "-" + this.axis, this.waypoints = [], this.clearTriggerQueues(), o[this.axis][this.name] = this } var o = { vertical: {}, horizontal: {} }, n = window.Waypoint; i.prototype.add = function (t) { this.waypoints.push(t) }, i.prototype.clearTriggerQueues = function () { this.triggerQueues = { up: [], down: [], left: [], right: [] } }, i.prototype.flushTriggers = function () { for (var i in this.triggerQueues) { var o = this.triggerQueues[i], n = "up" === i || "left" === i; o.sort(n ? e : t); for (var r = 0, s = o.length; s > r; r += 1) { var a = o[r]; (a.options.continuous || r === o.length - 1) && a.trigger([i]) } } this.clearTriggerQueues() }, i.prototype.next = function (e) { this.waypoints.sort(t); var i = n.Adapter.inArray(e, this.waypoints), o = i === this.waypoints.length - 1; return o ? null : this.waypoints[i + 1] }, i.prototype.previous = function (e) { this.waypoints.sort(t); var i = n.Adapter.inArray(e, this.waypoints); return i ? this.waypoints[i - 1] : null }, i.prototype.queueTrigger = function (t, e) { this.triggerQueues[e].push(t) }, i.prototype.remove = function (t) { var e = n.Adapter.inArray(t, this.waypoints); e > -1 && this.waypoints.splice(e, 1) }, i.prototype.first = function () { return this.waypoints[0] }, i.prototype.last = function () { return this.waypoints[this.waypoints.length - 1] }, i.findOrCreate = function (t) { return o[t.axis][t.name] || new i(t) }, n.Group = i }(), function () { "use strict"; function t(t) { this.$element = e(t) } var e = window.jQuery, i = window.Waypoint; e.each(["innerHeight", "innerWidth", "off", "offset", "on", "outerHeight", "outerWidth", "scrollLeft", "scrollTop"], function (e, i) { t.prototype[i] = function () { var t = Array.prototype.slice.call(arguments); return this.$element[i].apply(this.$element, t) } }), e.each(["extend", "inArray", "isEmptyObject"], function (i, o) { t[o] = e[o] }), i.adapters.push({ name: "jquery", Adapter: t }), i.Adapter = t }(), function () { "use strict"; function t(t) { return function () { var i = [], o = arguments[0]; return t.isFunction(arguments[0]) && (o = t.extend({}, arguments[1]), o.handler = arguments[0]), this.each(function () { var n = t.extend({}, o, { element: this }); "string" == typeof n.context && (n.context = t(this).closest(n.context)[0]), i.push(new e(n)) }), i } } var e = window.Waypoint; window.jQuery && (window.jQuery.fn.waypoint = t(window.jQuery)), window.Zepto && (window.Zepto.fn.waypoint = t(window.Zepto)) }();


/*
Waypoints Sticky Element Shortcut - 4.0.0
Copyright © 2011-2015 Caleb Troughton
Licensed under the MIT license.
https://github.com/imakewebthings/waypoints/blog/master/licenses.txt
*/
!function () { "use strict"; function t(s) { this.options = e.extend({}, i.defaults, t.defaults, s), this.element = this.options.element, this.$element = e(this.element), this.createWrapper(), this.createWaypoint() } var e = window.jQuery, i = window.Waypoint; t.prototype.createWaypoint = function () { var t = this.options.handler; this.waypoint = new i(e.extend({}, this.options, { element: this.wrapper, handler: e.proxy(function (e) { var i = this.options.direction.indexOf(e) > -1, s = i ? this.$element.outerHeight(!0) : ""; this.$wrapper.height(s), this.$element.toggleClass(this.options.stuckClass, i), t && t.call(this, e) }, this) })) }, t.prototype.createWrapper = function () { this.options.wrapper && this.$element.wrap(this.options.wrapper), this.$wrapper = this.$element.parent(), this.wrapper = this.$wrapper[0] }, t.prototype.destroy = function () { this.$element.parent()[0] === this.wrapper && (this.waypoint.destroy(), this.$element.removeClass(this.options.stuckClass), this.options.wrapper && this.$element.unwrap()) }, t.defaults = { wrapper: '<div class="sticky-wrapper" />', stuckClass: "stuck", direction: "down right" }, i.Sticky = t }();

/*
    jQuery Masked Input Plugin
    Copyright (c) 2007 - 2015 Josh Bush (digitalbush.com)
    Licensed under the MIT license (http://digitalbush.com/projects/masked-input-plugin/#license)
    Version: 1.4.1
*/
!function (a) { "function" == typeof define && define.amd ? define(["jquery"], a) : a("object" == typeof exports ? require("jquery") : jQuery) }(function (a) { var b, c = navigator.userAgent, d = /iphone/i.test(c), e = /chrome/i.test(c), f = /android/i.test(c); a.mask = { definitions: { 9: "[0-9]", a: "[A-Za-z]", "*": "[A-Za-z0-9]" }, autoclear: !0, dataName: "rawMaskFn", placeholder: "_" }, a.fn.extend({ caret: function (a, b) { var c; if (0 !== this.length && !this.is(":hidden")) return "number" == typeof a ? (b = "number" == typeof b ? b : a, this.each(function () { this.setSelectionRange ? this.setSelectionRange(a, b) : this.createTextRange && (c = this.createTextRange(), c.collapse(!0), c.moveEnd("character", b), c.moveStart("character", a), c.select()) })) : (this[0].setSelectionRange ? (a = this[0].selectionStart, b = this[0].selectionEnd) : document.selection && document.selection.createRange && (c = document.selection.createRange(), a = 0 - c.duplicate().moveStart("character", -1e5), b = a + c.text.length), { begin: a, end: b }) }, unmask: function () { return this.trigger("unmask") }, mask: function (c, g) { var h, i, j, k, l, m, n, o; if (!c && this.length > 0) { h = a(this[0]); var p = h.data(a.mask.dataName); return p ? p() : void 0 } return g = a.extend({ autoclear: a.mask.autoclear, placeholder: a.mask.placeholder, completed: null }, g), i = a.mask.definitions, j = [], k = n = c.length, l = null, a.each(c.split(""), function (a, b) { "?" == b ? (n--, k = a) : i[b] ? (j.push(new RegExp(i[b])), null === l && (l = j.length - 1), k > a && (m = j.length - 1)) : j.push(null) }), this.trigger("unmask").each(function () { function h() { if (g.completed) { for (var a = l; m >= a; a++) if (j[a] && C[a] === p(a)) return; g.completed.call(B) } } function p(a) { return g.placeholder.charAt(a < g.placeholder.length ? a : 0) } function q(a) { for (; ++a < n && !j[a];); return a } function r(a) { for (; --a >= 0 && !j[a];); return a } function s(a, b) { var c, d; if (!(0 > a)) { for (c = a, d = q(b) ; n > c; c++) if (j[c]) { if (!(n > d && j[c].test(C[d]))) break; C[c] = C[d], C[d] = p(d), d = q(d) } z(), B.caret(Math.max(l, a)) } } function t(a) { var b, c, d, e; for (b = a, c = p(a) ; n > b; b++) if (j[b]) { if (d = q(b), e = C[b], C[b] = c, !(n > d && j[d].test(e))) break; c = e } } function u() { var a = B.val(), b = B.caret(); if (o && o.length && o.length > a.length) { for (A(!0) ; b.begin > 0 && !j[b.begin - 1];) b.begin--; if (0 === b.begin) for (; b.begin < l && !j[b.begin];) b.begin++; B.caret(b.begin, b.begin) } else { for (A(!0) ; b.begin < n && !j[b.begin];) b.begin++; B.caret(b.begin, b.begin) } h() } function v() { A(), B.val() != E && B.change() } function w(a) { if (!B.prop("readonly")) { var b, c, e, f = a.which || a.keyCode; o = B.val(), 8 === f || 46 === f || d && 127 === f ? (b = B.caret(), c = b.begin, e = b.end, e - c === 0 && (c = 46 !== f ? r(c) : e = q(c - 1), e = 46 === f ? q(e) : e), y(c, e), s(c, e - 1), a.preventDefault()) : 13 === f ? v.call(this, a) : 27 === f && (B.val(E), B.caret(0, A()), a.preventDefault()) } } function x(b) { if (!B.prop("readonly")) { var c, d, e, g = b.which || b.keyCode, i = B.caret(); if (!(b.ctrlKey || b.altKey || b.metaKey || 32 > g) && g && 13 !== g) { if (i.end - i.begin !== 0 && (y(i.begin, i.end), s(i.begin, i.end - 1)), c = q(i.begin - 1), n > c && (d = String.fromCharCode(g), j[c].test(d))) { if (t(c), C[c] = d, z(), e = q(c), f) { var k = function () { a.proxy(a.fn.caret, B, e)() }; setTimeout(k, 0) } else B.caret(e); i.begin <= m && h() } b.preventDefault() } } } function y(a, b) { var c; for (c = a; b > c && n > c; c++) j[c] && (C[c] = p(c)) } function z() { B.val(C.join("")) } function A(a) { var b, c, d, e = B.val(), f = -1; for (b = 0, d = 0; n > b; b++) if (j[b]) { for (C[b] = p(b) ; d++ < e.length;) if (c = e.charAt(d - 1), j[b].test(c)) { C[b] = c, f = b; break } if (d > e.length) { y(b + 1, n); break } } else C[b] === e.charAt(d) && d++, k > b && (f = b); return a ? z() : k > f + 1 ? g.autoclear || C.join("") === D ? (B.val() && B.val(""), y(0, n)) : z() : (z(), B.val(B.val().substring(0, f + 1))), k ? b : l } var B = a(this), C = a.map(c.split(""), function (a, b) { return "?" != a ? i[a] ? p(b) : a : void 0 }), D = C.join(""), E = B.val(); B.data(a.mask.dataName, function () { return a.map(C, function (a, b) { return j[b] && a != p(b) ? a : null }).join("") }), B.one("unmask", function () { B.off(".mask").removeData(a.mask.dataName) }).on("focus.mask", function () { if (!B.prop("readonly")) { clearTimeout(b); var a; E = B.val(), a = A(), b = setTimeout(function () { B.get(0) === document.activeElement && (z(), a == c.replace("?", "").length ? B.caret(0, a) : B.caret(a)) }, 10) } }).on("blur.mask", v).on("keydown.mask", w).on("keypress.mask", x).on("input.mask paste.mask", function () { B.prop("readonly") || setTimeout(function () { var a = A(!0); B.caret(a), h() }, 0) }), e && f && B.off("input.mask").on("input.mask", u), A() }) } }) });

/**
 * jQuery Unveil
 * A very lightweight jQuery plugin to lazy load images
 * http://luis-almeida.github.com/unveil
 *
 * Licensed under the MIT license.
 * Copyright 2013 Luís Almeida
 * https://github.com/luis-almeida
 */

; (function ($) {

    $.fn.unveil = function (threshold, callback) {

        var $w = $(window),
            th = threshold || 0,
            retina = window.devicePixelRatio > 1,
            attrib = retina ? "data-src-retina" : "data-src",
            images = this,
            loaded;

        this.one("unveil", function () {
            var source = this.getAttribute(attrib);
            source = source || this.getAttribute("data-src");
            if (source) {
                this.setAttribute("src", source);
                if (typeof callback === "function") callback.call(this);
            }
        });

        function unveil() {
            var inview = images.filter(function () {
                var $e = $(this);
                if ($e.is(":hidden")) return;

                var wt = $w.scrollTop(),
                    wb = wt + $w.height(),
                    et = $e.offset().top,
                    eb = et + $e.height();

                return eb >= wt - th && et <= wb + th;
            });

            loaded = inview.trigger("unveil");
            images = images.not(loaded);
        }

        $w.on("scroll.unveil resize.unveil lookup.unveil", unveil);

        unveil();

        return this;

    };

})(window.jQuery || window.Zepto);

/*
    SimpleLightBox
	By André Rinas, http://andreknieriem.de/simple-lightbox/
	Available for use under the MIT License
*/
!function (e, t, n, i) { "use strict"; e.fn.simpleLightbox = function (i) { var i = e.extend({ overlay: !0, spinner: !0, nav: !0, navText: ["&lsaquo;", "&rsaquo;"], captions: !0, captionDelay: 0, captionSelector: "img", captionType: "attr", captionsData: "title", captionPosition: "bottom", close: !0, closeText: "×", showCounter: !0, fileExt: "png|jpg|jpeg|gif", animationSlide: !0, animationSpeed: 250, preloading: !0, enableKeyboard: !0, loop: !0, docClose: !0, swipeTolerance: 50, className: "simple-lightbox", widthRatio: .8, heightRatio: .9, disableRightClick: !1, disableScroll: !0, alertError: !0, alertErrorMessage: "Image not found, next image will be loaded" }, i), a = (t.navigator.pointerEnabled || t.navigator.msPointerEnabled, 0), o = e(), s = function () { var e = n.body || n.documentElement, e = e.style; return "" == e.WebkitTransition ? "-webkit-" : "" == e.MozTransition ? "-moz-" : "" == e.OTransition ? "-o-" : "" == e.transition ? "" : !1 }, l = !1, r = [], d = this, s = s(), p = s !== !1 ? !0 : !1, c = "simplelb", g = e("<div>").addClass("sl-overlay"), h = e("<button>").addClass("sl-close").html(i.closeText), f = e("<div>").addClass("sl-spinner").html("<div></div>"), u = e("<div>").addClass("sl-navigation").html('<button class="sl-prev">' + i.navText[0] + '</button><button class="sl-next">' + i.navText[1] + "</button>"), m = e("<div>").addClass("sl-counter").html('<span class="sl-current"></span>/<span class="sl-total"></span>'), v = !1, x = 0, b = e(), y = e("<div>").addClass("sl-caption pos-" + i.captionPosition), w = e("<div>").addClass("sl-wrapper").addClass(i.className).html('<div class="sl-image"></div>'), E = function (t) { return i.fileExt ? "a" == e(t).prop("tagName").toLowerCase() && new RegExp(".(" + i.fileExt + ")$", "i").test(e(t).attr("href")) : !0 }, T = function () { b = e(".sl-image"), i.close && h.appendTo(w), i.showCounter && d.length > 1 && (m.appendTo(w), m.find(".sl-total").text(d.length)), i.nav && u.appendTo(w), i.spinner && f.appendTo(w) }, S = function (t) { t.trigger(e.Event("show.simplelightbox")), i.disableScroll && R("hide"), w.appendTo("body"), i.overlay && g.appendTo(e("body")), v = !0, x = d.index(t), o = e("<img/>").hide().attr("src", t.attr("href")), -1 == r.indexOf(t.attr("href")) && r.push(t.attr("href")), e(".sl-image").html("").attr("style", ""), o.appendTo(e(".sl-image")), g.fadeIn("fast"), e(".sl-close").fadeIn("fast"), f.show(), u.fadeIn("fast"), e(".sl-wrapper .sl-counter .sl-current").text(x + 1), m.fadeIn("fast"), C(), i.preloading && q(), setTimeout(function () { t.trigger(e.Event("shown.simplelightbox")) }, i.animationSpeed) }, C = function (n) { if (o.length) { var a = new Image, s = e(t).width() * i.widthRatio, c = e(t).height() * i.heightRatio; a.src = o.attr("src"), e(a).bind("error", function (t) { return d.eq(x).trigger(e.Event("error.simplelightbox")), v = !1, l = !0, f.hide(), i.alertError ? (alert(i.alertErrorMessage), void D(1 == n || -1 == n ? n : 1)) : void 0 }), a.onload = function () { "undefined" != typeof n && d.eq(x).trigger(e.Event("changed.simplelightbox")).trigger(e.Event((1 === n ? "nextDone" : "prevDone") + ".simplelightbox")), -1 == r.indexOf(o.attr("src")) && r.push(o.attr("src")); var g = a.width, h = a.height; if (g > s || h > c) { var u = g / h > s / c ? g / s : h / c; g /= u, h /= u } e(".sl-image").css({ top: (e(t).height() - h) / 2 + "px", left: (e(t).width() - g) / 2 + "px" }), f.hide(), o.css({ width: g + "px", height: h + "px" }).fadeIn("fast"), l = !0; var m = "self" == i.captionSelector ? d.eq(x) : d.eq(x).find(i.captionSelector); if ("data" == i.captionType) var b = m.data(i.captionsData); else if ("text" == i.captionType) var b = m.html(); else var b = m.prop(i.captionsData); if (i.loop || (0 == x && e(".sl-prev").hide(), x >= d.length - 1 && e(".sl-next").hide(), x > 0 && x < d.length - 1 && e(".sl-prev, .sl-next").show()), 1 == d.length && e(".sl-prev, .sl-next").hide(), 1 == n || -1 == n) { var y = { opacity: 1 }; i.animationSlide && (p ? (I(0, 100 * n + "px"), setTimeout(function () { I(i.animationSpeed / 1e3, "0px"), 50 })) : y.left = parseInt(e(".sl-image").css("left")) + 100 * n + "px"), e(".sl-image").animate(y, i.animationSpeed, function () { v = !1, k(b) }) } else v = !1, k(b) } } }, k = function (t) { "" != t && "undefined" != typeof t && i.captions && y.html(t).hide().appendTo(e(".sl-image")).delay(i.captionDelay).fadeIn("fast") }, I = function (t, n) { var i = {}; i[s + "transform"] = "translateX(" + n + ")", i[s + "transition"] = s + "transform " + t + "s linear", e(".sl-image").css(i) }, q = function () { var t = 0 > x + 1 ? d.length - 1 : x + 1 >= d.length - 1 ? 0 : x + 1, n = 0 > x - 1 ? d.length - 1 : x - 1 >= d.length - 1 ? 0 : x - 1; e("<img />").attr("src", d.eq(t).attr("href")).load(function () { -1 == r.indexOf(e(this).attr("src")) && r.push(e(this).attr("src")), d.eq(x).trigger(e.Event("nextImageLoaded.simplelightbox")) }), e("<img />").attr("src", d.eq(n).attr("href")).load(function () { -1 == r.indexOf(e(this).attr("src")) && r.push(e(this).attr("src")), d.eq(x).trigger(e.Event("prevImageLoaded.simplelightbox")) }) }, D = function (t) { d.eq(x).trigger(e.Event("change.simplelightbox")).trigger(e.Event((1 === t ? "next" : "prev") + ".simplelightbox")); var n = x + t; if (!(v || (0 > n || n >= d.length) && 0 == i.loop)) { x = 0 > n ? d.length - 1 : n > d.length - 1 ? 0 : n, e(".sl-wrapper .sl-counter .sl-current").text(x + 1); var s = { opacity: 0 }; i.animationSlide && (p ? I(i.animationSpeed / 1e3, -100 * t - a + "px") : s.left = parseInt(e(".sl-image").css("left")) + -100 * t + "px"), e(".sl-image").animate(s, i.animationSpeed, function () { setTimeout(function () { var n = d.eq(x); o.attr("src", n.attr("href")), -1 == r.indexOf(n.attr("href")) && f.show(), e(".sl-caption").remove(), C(t), i.preloading && q() }, 100) }) } }, M = function () { if (!v) { var t = d.eq(x), n = !1; t.trigger(e.Event("close.simplelightbox")), e(".sl-image img, .sl-overlay, .sl-close, .sl-navigation, .sl-image .sl-caption, .sl-counter").fadeOut("fast", function () { i.disableScroll && R("show"), e(".sl-wrapper, .sl-overlay").remove(), n || t.trigger(e.Event("closed.simplelightbox")), n = !0 }), o = e(), l = !1, v = !1 } }, R = function (i) { if ("hide" == i) { var a = t.innerWidth; if (!a) { var o = n.documentElement.getBoundingClientRect(); a = o.right - Math.abs(o.left) } if (n.body.clientWidth < a) { var s = n.createElement("div"), l = parseInt(e("body").css("padding-right"), 10); s.className = "sl-scrollbar-measure", e("body").append(s); var r = s.offsetWidth - s.clientWidth; e(n.body)[0].removeChild(s), e("body").data("padding", l), r > 0 && e("body").css({ "padding-right": l + r, overflow: "hidden" }) } } else e("body").css({ "padding-right": e("body").data("padding"), overflow: "visible" }) }; T(), e(t).on("resize", C), d.on("click." + c, function (t) { if (E(this)) { if (t.preventDefault(), v) return !1; S(e(this)) } }), e(n).on("click", ".sl-close", function (e) { e.preventDefault(), l && M() }), e(n).click(function (t) { l && i.docClose && 0 == e(t.target).closest(".sl-image").length && 0 == e(t.target).closest(".sl-navigation").length && M() }), i.disableRightClick && e(n).on("contextmenu", ".sl-image img", function (e) { return !1 }), e(n).on("click", ".sl-navigation button", function (t) { t.preventDefault(), a = 0, D(e(this).hasClass("sl-next") ? 1 : -1) }), i.enableKeyboard && e(n).on("keyup." + c, function (e) { if (e.preventDefault(), a = 0, l) { var t = e.keyCode; 27 == t && M(), (37 == t || 39 == e.keyCode) && D(39 == e.keyCode ? 1 : -1) } }); var O = 0, P = 0, W = !1, X = 0; return e(n).on("touchstart mousedown pointerdown MSPointerDown", ".sl-image", function (e) { return W ? !0 : (p && (X = parseInt(b.css("left"))), W = !0, O = e.originalEvent.pageX || e.originalEvent.touches[0].pageX, !1) }).on("touchmove mousemove pointermove MSPointerMove", function (e) { return W ? (e.preventDefault(), P = e.originalEvent.pageX || e.originalEvent.touches[0].pageX, a = O - P, void (i.animationSlide && (p ? I(0, -a + "px") : b.css("left", X - a + "px")))) : !0 }).on("touchend mouseup touchcancel pointerup pointercancel MSPointerUp MSPointerCancel", function (e) { W && (W = !1, Math.abs(a) > i.swipeTolerance ? D(a > 0 ? 1 : -1) : i.animationSlide && (p ? I(i.animationSpeed / 1e3, "0px") : b.animate({ left: X + "px" }, i.animationSpeed / 2))) }), this.open = function (t) { t = t || e(this[0]), S(t) }, this.next = function () { D(1) }, this.prev = function () { D(-1) }, this.close = function () { M() }, this.destroy = function () { e(n).unbind("click." + c).unbind("keyup." + c), M(), e(".sl-overlay, .sl-wrapper").remove() }, this } }(jQuery, window, document);


//Modal windows:
(function ($) {
    //пример вызова:
    //$('#modal_id').popup('open')  - открыть
    //$('#modal_id').popup('close') - закрыть

    $.fn.popup = function (action) {
        var modal_id = this.selector, //id окна
            $modal = $(modal_id), //контент окна
            $body = $('body'),
            $window = $(window),
            $overlay = $('#overlay'),
            $close = $('<button type="button" class="modal__close"><i class="icon-cross"></i></button>'), //кнопка закрыть
            method = {};

        method.center = function () {//центрируем окно
            var top, left;
            top = Math.max($window.height() - $modal.outerHeight(), 0) / 2;
            left = Math.max($window.width() - $modal.outerWidth(), 0) / 2;

            $modal.css({
                top: top + $window.scrollTop(),
                left: left + $window.scrollLeft()
            });
        };

        method.open = function () {//открываем
            method.center();//отцентрировали
            $window.bind('resize.modal', method.center);//при ресайзе - пересчитаем положение окна

            var isCloseExist = $modal.find('.modal__close').length;
            if (isCloseExist < 1) {//если открываем первый раз - добавляем кнопку Закрыть
                $modal.append($close);
            };
            $modal.show();
            $('#overlay').show().bind('click', method.close);
        };

        method.close = function () {//закрываем окно
            $modal.hide();
            $('#overlay').hide().unbind('click', method.close);
            $window.unbind('resize.modal');
        };
        $modal.on('click', '.modal__close', method.close); //закроем окно при клике по кнопке

        if (action === 'open' && $modal.length) {//открываем
            method.open();
        };

        if (action === 'close') {//закрываем
            method.close();
        };
    };
}(jQuery));


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
// Модальное окно - откроем по клику на [data-modal]
// Покажем новость в модальном окне
// Слайдер новостей
// Гугл карта
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

        function addImages() {
            var count = $slider.children('li').length;
            for (var i = 1; i < count; i++) {//для первого элемента вывели изображенния скриптом на странице, начинаем цикл со второго
                var $el = $slider.children('li').eq(i),
                    $elXS = $el.find('.h-hero__img--xs'),
                    $elXL = $el.find('.h-hero__img--xl');
                $elXS.css('background-image', 'url(' + $elXS.data('src') + ')');
                $elXL.css('background-image', 'url(' + $elXL.data('src') + ')');
            };
        }

        $slider.bxSlider({
            controls: true,
            mode: 'fade',
            nextText: '<i class="icon-right"></i>',
            prevText: '<i class="icon-left"></i>',
            nextSelector: $slider.parent().find('.h-hero__next'),
            prevSelector: $slider.parent().find('.h-hero__prev'),
            pager: true,
            auto: true,
            pause: 12000,
            onSliderLoad: addImages()
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
            method.preLoadGallery = function (link) {//первая загрузка контента в Главный слайдер галереи
                if (!isGalleryLoad) {
                    $gallery.load(link, function () {
                        method.startGallery();
                    });
                };
            };

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
                        var $el = $album.children('li').eq(currentIndex).find('.b-album__thumb').addClass('current'),
                            gallery_link = $el.data('load'),
                            lightbox_link = $el.data('lightbox');
                        method.changeGalleryTitle($el); //передадим заголовки первого альбома
                        method.preLoadGallery(gallery_link); //загрузили разметку слайдера первого альбома
                        method.preLoadLightbox(lightbox_link); //загрузили разметку первого альбома для просмотра в лайтбоксе
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
            method.preLoadLightbox = function (link) {//загрузка контента первого альбома для просмотра в лайтбоксе
                if (!isLightBoxStarted) {
                    $lightbox.load(link, function () {
                        method.initLightBox();
                    });
                };
            };

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
                };

                $gallery.on('click', '.b-gallery__thumb', function () {
                    if (isLightBoxStarted) {
                        var index = $(this).parent('li').index(),//находим индекс
                        $el = $lightbox.children('li').eq(index).find('a');
                        lightbox.open($el);//открываем в лайтбоксе
                    };
                });
            };

            method.reloadLightBox = function (link) {//загружаем новый контент в лайтбокс
                if (isLightBoxStarted) {
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
    // Модальное окно - откроем по клику на [data-modal]
    //---------------------------------------------------------------------------------------
    $(document).on('click', '[data-modal]', function (e) {
        e.preventDefault();
        var modal_id = $(this).data('modal');
        if (modal_id.length) { $(modal_id).popup('open'); }
    });

    //
    // Покажем новость в модальном окне
    //---------------------------------------------------------------------------------------
    (function () {
        $('.b-post').on('click', '.js-loadpost', function (e) {
            e.preventDefault();
            var modal_id = $(this).attr('href'),
                target = $(this).data('load'),
                $inner = $(modal_id).children('div');
            $inner.html();
            $inner.load(target, function () {
                $(modal_id).popup('open');
            });
        });
    })();

    //
    // Слайдер новостей
    //---------------------------------------------------------------------------------------
    (function () {
        var $slider = $('.js-post-slider'),
            $counter = $slider.parent().find('.js-post-counter'),
            rtime, //переменные для пересчета ресайза окна с задержкой delta - будем показывать разное кол-во слайдов на разных разрешениях
            timeout = false,
            delta = 200,
            BREAKPOINT = 768,
            isImagesLoaded = false, //при загрузке слайдера покажем 2 первые фотки, остальные - после первой прокрутки слайдера
            slideQty = 0, //будем хранить кол-во слайдов
            method = {};

        method.getSliderSettings = function () {
            var setting,
                    settings1 = {
                        maxSlides: 1,
                        minSlides: 1,
                        slideMargin: 50,
                    },
                    settings2 = {
                        maxSlides: 2,
                        minSlides: 2,
                        slideMargin: 50,
                    },
                    settings3 = {
                        maxSlides: 2,
                        minSlides: 2,
                        slideMargin: 90,
                    },
                    common = {
                        slideWidth: 360,
                        moveSlides: 1,
                        auto: false,
                        infiniteLoop: false,
                        hideControlOnEnd: true,
                        useCSS: false,
                        nextText: '<i class="icon-right"></i>',
                        prevText: '<i class="icon-left"></i>',
                        pager: false,
                        onSliderLoad: function (currentIndex) {
                            slideQty = +$slider.getSlideCount();
                            $counter.text(currentIndex + 1 + ' / ' + slideQty); //счетчик слайдов
                            return slideQty;
                        },
                        onSlideBefore: function () {//если картинки не загружены - загружаем
                            if (!isImagesLoaded) {
                                method.showAllImages();
                            };
                        },
                        onSlideAfter: function ($slideElement, oldIndex, newIndex) {
                            $counter.text(newIndex + 1 + ' / ' + slideQty);
                        }
                    },
                    winW = $.viewportW(); //ширина окна

            if (winW < BREAKPOINT) {
                setting = $.extend(settings1, common);
            };           
            if (winW >= BREAKPOINT && winW < 1200) {
                setting = $.extend(settings2, common);
            };
            if (winW >= 1200) {
                setting = $.extend(settings3, common);
            }
            return setting;
        };

        method.reloadSliderSettings = function () {
            $slider.reloadSlider($.extend(method.getSliderSettings(), { startSlide: $slider.getCurrentSlide() }));
        };


        method.endResize = function () {
            if (new Date() - rtime < delta) {
                setTimeout(method.endResize, delta);
            } else {
                timeout = false;
                //ресайз окончен - пересчитываем
                method.reloadSliderSettings();
            }
        };

        method.startResize = function () {
            rtime = new Date();
            if (timeout === false) {
                timeout = true;
                setTimeout(method.endResize, delta);
            }
        };

        method.show2images = function () {//при загрузке слайдера, сперва загрузим первые 2 картинки
            for (var i = 0; i < 2; i++) {
                var $img = $slider.children('li').eq(i).find('.js-slider-img');
                if ($img.length) {
                    method.loadImage($img);
                };
            };
        };

        method.showAllImages = function () {//дозагрузим остальные картинки в слайдер после первой прокрутки
            isImagesLoaded = true;
            $slider.children('li').each(function () {
                var $img = $(this).find('.js-slider-img');
                if ($img.length) {
                    method.loadImage($img);
                };
            });
        };

        method.loadImage = function (el) {//загрузим изображение в слайдер
            var source = el.data('src');
            if (source != '') {
                el.attr('src', source);
                el.removeClass('js-slider-img');
            };
        };

        
        $slider.bxSlider(method.getSliderSettings());//запускаем слайдер
        method.show2images();//показали первые 2 картинки
        $(window).bind('resize', method.startResize);//пересчитываем кол-во видимых элементов при ресайзе окна с задержкой .2с

        //перемотка в начало
        $('.b-slider__pager').on('click', '.js-post-first', function () {
            $slider.goToSlide(0);
        });

        //перемотка в конец
        $('.b-slider__pager').on('click', '.js-post-last', function () {//корректируем значение последнего слайда в зависимости от кол-ва видимых элементов слайдера
            var winW = $.viewportW();
            if (winW < BREAKPOINT) {
                $slider.goToSlide(slideQty - 1);
            } else {
                $slider.goToSlide(slideQty - 2);
            }
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
