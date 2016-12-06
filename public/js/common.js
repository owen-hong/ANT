/*lazyload*/
(function ($) {
    $.fn.lazyload = function (options) {
        var settings = {
            threshold: 0,
            failurelimit: 0,
            event: "scroll",
            effect: "show",
            container: window
        };
        if (options) {
            $.extend(settings, options)
        }
        var elements = this;
        if ("scroll" == settings.event) {
            $(settings.container).bind("scroll", function (event) {
                var counter = 0;
                elements.each(function () {
                    if (!$.belowthefold(this, settings) && !$.rightoffold(this, settings)) {
                        $(this).trigger("appear")
                    } else {
                        if (counter++ > settings.failurelimit) {
                            return false
                        }
                    }
                });
                var temp = $.grep(elements, function (element) {
                    return !element.loaded
                });
                elements = $(temp)
            })
        }
        return this.each(function () {
            var self = this;
            $(self).attr("original", $(self).attr("src"));
            if ("scroll" != settings.event || $.belowthefold(self, settings) || $.rightoffold(self, settings)) {
                if (settings.placeholder) {
                    $(self).attr("src", settings.placeholder)
                } else {
                    $(self).removeAttr("src")
                }
                self.loaded = false
            } else {
                self.loaded = true
            }
            $(self).one("appear", function () {
                if (!this.loaded) {
                    $("<img />").bind("load", function () {
                        $(self).hide().attr("src", $(self).attr("original"))[settings.effect](settings.effectspeed);
                        self.loaded = true
                    }).attr("src", $(self).attr("original"))
                }
            });
            if ("scroll" != settings.event) {
                $(self).bind(settings.event, function (event) {
                    if (!self.loaded) {
                        $(self).trigger("appear")
                    }
                })
            }
        })
    };
    $.belowthefold = function (element, settings) {
        if (settings.container === undefined || settings.container === window) {
            var fold = $(window).height() + $(window).scrollTop()
        } else {
            var fold = $(settings.container).offset().top + $(settings.container).height()
        }
        return fold <= $(element).offset().top - settings.threshold
    };
    $.rightoffold = function (element, settings) {
        if (settings.container === undefined || settings.container === window) {
            var fold = $(window).width() + $(window).scrollLeft()
        } else {
            var fold = $(settings.container).offset().left + $(settings.container).width()
        }
        return fold <= $(element).offset().left - settings.threshold
    };
    $.extend($.expr[':'], {
        "below-the-fold": "$.belowthefold(a, {threshold : 0, container: window})",
        "above-the-fold": "!$.belowthefold(a, {threshold : 0, container: window})",
        "right-of-fold": "$.rightoffold(a, {threshold : 0, container: window})",
        "left-of-fold": "!$.rightoffold(a, {threshold : 0, container: window})"
    })
})(jQuery);
 
/*置顶*/
jQuery.fn.topLink = function (settings) {
    settings = jQuery.extend({
        min: 1,
        fadeSpeed: 200
    }, settings);
    return this.each(function () {
        var el = $(this);
        el.hide();
        $(window).scroll(function () {
            if ($(window).scrollTop() >= settings.min) {
                el.fadeIn(settings.fadeSpeed);
            } else {
                el.fadeOut(settings.fadeSpeed);
            }
        });
    });
};
 
$(function () {
    $(".lazyload img").lazyload({
        placeholder: 'images/main/blank.gif',
        effect: "fadeIn",
        failurelimit: 30
    });
    $('#gototop').topLink({
        min: 100,
        fadeSpeed: 0
    }).click(function () {
        $('html,body').animate({
            scrollTop: '0px'
        }, 800);
    });
    /*案例*/
    $(".case_item li").hover(function () {
        $(this).find(".boxCaption").stop().animate({
            bottom: 0
        }, 150);
    }, function () {
        $(this).find(".boxCaption").stop().animate({
            bottom: -300
        }, 600);
    });
    /*tab*/
    $(".cate_tabtitle li").each(function (i, temp) {
        $(temp).click(function () {
            var tabhover = function () {
                $(temp).addClass("cur").siblings("li").removeClass("cur");
                $(temp).closest(".cate_main").find(".case_item").eq($(temp).index()).show().siblings(".case_item").hide();
            };
            timer = setTimeout(tabhover, 300);
        }, function () {
            clearTimeout(timer);
        });
    });
    /*文本获得焦点清空*/
    if ($(".txt_clear").length > 0) {
        clearInput();
    };
    /*超链接去虚线*/
    $("a").bind("focus", function () {
        if (this.blur) {
            this.blur()
        }
    })
});
 
function clearInput() {
    $(".txt_clear .txt_input").each(function (i, temp) {
        if ($(temp).val() != '') {
            $(temp).siblings("label").hide();
        }
        var text = $(temp).get(0);
        if ("\v" == "v") {
            text.onpropertychange = webChange;
        } else {
            text.addEventListener($(temp),
                webChange, false);
        }
        $(temp).siblings("label").click(function () {
            $(temp).focus();
        })
 
        function webChange() {
            var txt_label = $(temp).siblings(
                "label");
            if ($(temp).val() != '') {
                $(txt_label).hide();
            }
        }
        // 基本事件 聚焦
        $(temp).focus(function () {
            if ($(temp).val() != '') {
                $(temp).siblings("label").hide();
            }
        }).blur(function () { // 基本事件 失去焦点
            if ($(temp).val() == '')
                $(temp).siblings("label").show();
            else
                $(temp).siblings("label").hide();
        });
        //键盘事件
        $(temp).keydown(function () {
            $(temp).siblings("label").hide();
        });
    });
}