"use strict";
$(document).ready(function() {
    function t() {
        if ($(this).is(".tabs__link")) {
            var t = $(".tabs__nav-item", $(this).closest(".tabs__nav")),
                e = $(">.tabs__content-wrap>.tabs__content", $(this).closest(".tabs")),
                o = $(this).closest(".tabs"),
                a = $(this).attr("id");
            o.is("#user-profile-tabs") && "1" === a ? $("#save-user-profile").show() : $("#save-user-profile").hide(), t.each(function() {
                $(".tabs__link", $(this)).removeClass("tabs__link--active")
            }), $(this).hasClass("tabs__link--active") || $(this).addClass("tabs__link--active"), e.each(function() {
                $(this).attr("data-id") !== a && $(this).hide()
            }), e.each(function() {
                $(this).attr("data-id") === a && $(this).fadeIn("fast")
            })
        } else {
            var n = $(".tabs");
            $("#save-user-profile").show(), n.each(function() {
                var t = $(".tabs__nav-item .tabs__link", $(this)),
                    e = void 0;
                t.each(function() {
                    if ($(this).hasClass("tabs__link--active")) return e = $(this).attr("id"), !1
                }), $('.tabs__content[data-id="' + e + '"]', $(this)).show()
            })
        }
    }

    function e(t) {
        var e = $(".form--modal", $(this).parent()),
            o = $(".form--modal");
        t.preventDefault(), t.stopImmediatePropagation(), o.each(function() {
            $(this).hide()
        }), e.fadeIn()
    }

    function o(t) {
        var e = $(this).closest(".form--modal"),
            o = $(".button--action", e.parent()),
            a = $('.form__wrap--blocks[data-id="' + o.attr("id") + '"]'),
            n = $("#user-warnings");
        t.preventDefault(), e.fadeOut(), o.hasClass("button--action-disabled") || o.is("#send-warning") || o.is("#reset-password") || o.addClass("button--action-disabled"), a.length > 0 && (n.hide(), a.css("display", "flex"))
    }

    function a() {
        var t = $(this).closest(".form__wrap--blocks"),
            e = $('.button--action[id="' + t.attr("data-id") + '"]'),
            o = $(".form__wrap--blocks"),
            a = $("#user-warnings"),
            n = 0;
        t.hide(), e.removeClass("button--action-disabled"), o.each(function() {
            $(this).is(":hidden") && n++
        }), o.length === n && a.show()
    }

    function n(t) {
        var e = $(".form--modal"),
            o = $(".modal.modal--filters"),
            a = $(".table__cell-block-dropdown");
        e.is(t.target) || 0 !== e.has(t.target).length || e.fadeOut(), o.is(t.target) || 0 !== o.has(t.target).length || o.fadeOut(), a.is(t.target) || 0 !== a.has(t.target).length || a.slideUp()
    }

    function i() {
        var t = $(this).closest(".table__cell--flex"),
            e = $(".form__textarea--comment", t),
            o = $(".button--edit-comment", t),
            a = $(".button--delete-comment", t),
            n = $(".button--save-comment", t),
            i = $(".button--cancel-comment", t),
            s = $(".temp-storage", t);
        s.val(e.val()), e.attr("readonly", !1).focus(), o.removeClass("button--show-on-hover"), a.removeClass("button--show-on-hover"), n.show(), i.show()
    }

    function s() {
        var t = $(this).closest(".table__cell--flex"),
            e = $(".form__textarea--comment", t),
            o = $(".button--edit-comment", t),
            a = $(".button--delete-comment", t),
            n = $(".button--save-comment", t),
            i = $(".button--cancel-comment", t),
            s = $(".temp-storage", t);
        e.attr("readonly", !0), o.addClass("button--show-on-hover"), a.addClass("button--show-on-hover"), n.hide(), i.hide(), $(this).is(".button--cancel-comment") && e.val(s.val())
    }

    function c() {
        var t = $(".table__delete-row", $(this).closest(".table__row"));
        t.css("display", "flex").hide().fadeIn()
    }

    function r() {
        var t = $(this).closest(".table__row"),
            e = $(this).closest(".table__delete-row");
        $(this).is(".button--accept") && t.fadeOut(function() {
            $(this).remove()
        }), $(this).is(".button--decline") && e.fadeOut()
    }

    function l() {
        $(".products__filter .checkboxinpt").prop("checked", !1), $(".product__filter_1").find("ul").hide(), $(".filter_icon").removeClass("filter_icon-act"), $(".title").removeClass("title-act")
    }

    function _() {
        var t = $(".product__filter_2"),
            e = $(".product__filter_3"),
            o = $(".product__filter_4");
        t.each(function() {
            var t = $(".product__filter_2--item", $(this));
            t.length < 6 && $(this).addClass("product__filter_2--no-scroll")
        }), e.each(function() {
            var t = $(".product__filter_3--item", $(this));
            t.length < 6 && $(this).addClass("product__filter_3--no-scroll")
        }), o.each(function() {
            var t = $(".product__filter_4--item", $(this));
            t.length < 6 && $(this).addClass("product__filter_4--no-scroll")
        })
    }

    function d(t) {
        var e = $(".modal.modal--filters", $(this).parent()),
            o = $(".modal.modal--filters");
        t.preventDefault(), t.stopImmediatePropagation(), o.each(function() {
            $(this).hide()
        }), e.is(":visible") ? e.fadeOut() : (e.fadeIn(), e.css("width", e.width()))
    }

    function p(t) {
        arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
        t && $.featherlight(t, {
            persist: !0,
            afterClose: function() {
                $("#popup-image").remove()
            }
        })
    }

    function h() {
        var t = $.featherlight.current();
        t.close()
    }

    function u(t) {
        var e = $(".modal", $(this).parent());
        t.preventDefault(), t.stopImmediatePropagation(), e.is(":visible") ? e.fadeOut() : e.fadeIn()
    }

    function f() {
        if ($(this).closest(".modal").fadeOut(), $(this).is(".button--close-modal-save")) {
            var t = $(".button--no-return .button__text", $(this).closest(".table__wrap")),
                e = $(".button--no-return", $(this).closest(".table__wrap"));
            e.unbind("click"), t.removeClass("button__text--clickable"), t.addClass("button__text--dark")
        }
    }

    function b() {
        var t = $(this).attr("data-route");
        $.get(t, function(t, e) {
            p(t)
        })
    }

    function m(t) {
        t.preventDefault();
        var e = $(t.target),
            o = e.attr("action"),
            a = $(".form__select", e);
        $.ajax({
            url: o,
            type: "PUT",
            data: {
                status: "" + a.val()
            },
            success: function(t) {
                window.location.reload()
            }
        })
    }

    function v(t, e) {
        var o = new XMLHttpRequest;
        o.onload = function() {
            var t = new FileReader;
            t.onloadend = function() {
                e(t.result)
            }, t.readAsDataURL(o.response)
        }, o.open("GET", t), o.responseType = "blob", o.send()
    }

    function w(t) {
        var e = $(".required__photo_menu--item-show");
        e.length > 0 && ($("body").append('<div id="gallery-content" style="display: none;"></div>'), e.each(function(t) {
            var e = $(this).attr("href"),
                o = $("#gallery-content");
            v(e, function(e) {
                o.append('<div class="popup__content" id="gallery-content-' + t + '">\n\t                                            <div class="popup__row">\n\t                                              <img class="popup__img" src="' + e + '" alt="img">\n\t                                            </div>\n\t                                            <div class="popup__row popup__row--navs">\n\t                                            </div>\n\t                                        </div>');
                var a = $(".popup__row--navs", "#gallery-content-" + t),
                    n = $(".required__photo_menu--item", $(this).parent()).clone();
                a.append(n), $(this).attr("href", "#gallery-content-" + t)
            })
        }), $(".required__photo_menu--item-show").featherlightGallery({
            previousIcon: "",
            nextIcon: "",
            galleryFadeIn: 300,
            openSpeed: 300,
            variant: "popup popup--gallery"
        }))
    }

    function k() {
        var t = $(this).parent();
        t.fadeOut(function() {
            $(this).remove()
        })
    }

    function g(t) {
        var e = $(t.target),
            o = $('.form__row:not(".form__row--not-search")', e.closest(".form--table-filter"));
        o.each(function() {
            var t = $(".form__text--checkbox", this).html();
            t.toLowerCase().includes(e.val().toLowerCase()) ? $(this).show() : $(this).hide()
        })
    }

    function C(t) {
        var e = $(t.target),
            o = $(".table__cell-block-dropdown", e.parent()),
            a = $(".table__cell-block-dropdown");
        t.stopImmediatePropagation(), t.preventDefault(), a.hide(), o.is(":hidden") ? o.slideDown() : o.slideUp()
    }
    t(), $(".tabs__link", ".tabs__nav-item").on("click", t), $(".button--action").on("click", e), $('.button--modal[type="submit"]').on("click", o), $(".button--unblock").on("click", a), $(document).on("click", n), $(".button--edit-comment").on("click", i), $(".button--save-comment").on("click", s), $(".button--cancel-comment").on("click", s), $(".button--delete-comment").on("click", c), $(".button--accept").on("click", r), $(".button--decline").on("click", r), $(".photoe__selct_items").hide(), $(".photo__select").click(function() {
        $(".photo__select").hasClass("photo__select_act") ? ($(".photo__select").removeClass("photo__select_act").html("Выбрать фото"), $(".tabs__column .required__photo_select").hide(), $(".photoe__selct_items").hide()) : ($(".photo__select").addClass("photo__select_act").html("Отмена"), $(".required__photo_select").show(), $(".photoe__selct_items").show())
    }), $(".tab__wrapper_photo .checkboxinpt").click(function() {
        $(this).is(":checked") ? $(this).parent().parent().parent().find(".required__photo_select--bg").addClass("required__photo_select--bg-act") : $(this).parent().parent().parent().find(".required__photo_select--bg").removeClass("required__photo_select--bg-act")
    }), $(".tab__status_select--toggle").click(function() {
        $(".moderation__second_popup").toggleClass("moderation__second_popup--act")
    }), $(".modeernation__wrapper_second .checkboxinpt").click(function() {
        $(this).is(":checked") ? ($(this).parent().parent().parent().find(".tab__status_container").addClass("tab__status_container--act"), $(this).parent().parent().find(".tab__status_select--text").show()) : ($(this).parent().parent().parent().find(".tab__status_container").removeClass("tab__status_container--act"), $(this).parent().parent().find(".tab__status_select--text").hide())
    }), $(".second_popup--button-save").click(function() {
        $(".moderation__second_popup").toggleClass("moderation__second_popup--act");
        var t = $(".popupinput").length;
        $(".tab__status_select--text").html(t + " фото")
    }), $(".moderation__second_popup--wrapper .checkboxinpt").click(function() {
        $(this).is(":checked") ? $(this).addClass("popupinput") : $(this).removeClass("popupinput")
    }), $(function() {
        $(".content__products .tabs__all_products:first").show(), $(".content__nav_container--tabs-item").click(function() {
            var t = $(this).data("id");
            $(".tabs__all_products").hide(), $('[data-id="p' + t + '"]').show(), $(".content__nav_container--tabs-item").removeClass("content__nav_container--tabs-act"), $(this).hasClass(".content__nav_container--tabs-act") || $(this).addClass("content__nav_container--tabs-act")
        }), $(".tab__size_container--tabs-table:first").show(), $(".tab__size_container--tabs-item").click(function() {
            var t = $(this).data("id");
            $(".tab__size_container--tabs-item").removeClass("tab__size_container--tabs-item_act"), $(this).addClass("tab__size_container--tabs-item_act"), $(".tab__size_container--tabs-table").hide(), $('[data-id="st' + t + '"]').show()
        })
    }), _(), $("#sortable1, #sortable2").sortable({
        connectWith: ".connectedSortable"
    }).disableSelection(), $(".title").click(function() {
        var t = $(".product__filter-wrap", $(this).closest("ul"));
        t.each(function() {
            $(this).hide()
        }), $(this).parent().parent().find(".title").removeClass("title-act"), $(this).parent().parent().find(".filter_icon").removeClass("filter_icon-act"), $(this).addClass("title-act").siblings(".filter_icon").addClass("filter_icon-act"), $(this).parent().parent().find("ul").hide(), $(this).siblings(".product__filter-wrap").show(), $(this).siblings(".product__filter-wrap > ul").show();
        var e = $("ul", $(this).closest("li")),
            o = $(this).closest("ul");
        e.show(), o.hasClass("product__filter--open-next") || o.addClass("product__filter--open-next")
    }), $(".filter--icon").click(function() {
        $(".product__filter_box").hasClass("filter--act") || $(".product__filter_box").addClass("filter--act")
    }), $(".product__filter_bg").on("click", function() {
        $(".product__filter_box").removeClass("filter--act"), l()
    }), $(".product__filter_heading--res").on("click", l), $(".icon--filter.icon--clickable").on("click", d), $.featherlight.defaults.closeIcon = "", $(document).on("click", ".button--close-popup", h), $(".button--no-return").on("click", u), $(".button--close-modal").on("click", f), w(), $(".table__row--with-popup").on("click", b), $(document).on("submit", ".form--offers", m), $(document).on("click", ".button--remove-size", k), $(document).on("keyup", ".form__input--search--modal", g), $(document).on("click", ".table__text--clickable", C)
});