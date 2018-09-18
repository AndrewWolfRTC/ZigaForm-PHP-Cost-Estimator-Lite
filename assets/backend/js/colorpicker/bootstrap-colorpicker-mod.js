! function(a) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], a) : window.$uifm && !window.$uifm.fn.colorpicker && a(window.$uifm)
}(function(a) {
    "use strict";
    var b = function(a) {
        this.value = {
            h: 0,
            s: 0,
            b: 0,
            a: 1
        }, this.origFormat = null, a && (void 0 !== a.toLowerCase ? this.setColor(a) : void 0 !== a.h && (this.value = a))
    };
    b.prototype = {
        constructor: b,
        colors: {
            aliceblue: "#f0f8ff",
            antiquewhite: "#faebd7",
            aqua: "#00ffff",
            aquamarine: "#7fffd4",
            azure: "#f0ffff",
            beige: "#f5f5dc",
            bisque: "#ffe4c4",
            black: "#000000",
            blanchedalmond: "#ffebcd",
            blue: "#0000ff",
            blueviolet: "#8a2be2",
            brown: "#a52a2a",
            burlywood: "#deb887",
            cadetblue: "#5f9ea0",
            chartreuse: "#7fff00",
            chocolate: "#d2691e",
            coral: "#ff7f50",
            cornflowerblue: "#6495ed",
            cornsilk: "#fff8dc",
            crimson: "#dc143c",
            cyan: "#00ffff",
            darkblue: "#00008b",
            darkcyan: "#008b8b",
            darkgoldenrod: "#b8860b",
            darkgray: "#a9a9a9",
            darkgreen: "#006400",
            darkkhaki: "#bdb76b",
            darkmagenta: "#8b008b",
            darkolivegreen: "#556b2f",
            darkorange: "#ff8c00",
            darkorchid: "#9932cc",
            darkred: "#8b0000",
            darksalmon: "#e9967a",
            darkseagreen: "#8fbc8f",
            darkslateblue: "#483d8b",
            darkslategray: "#2f4f4f",
            darkturquoise: "#00ced1",
            darkviolet: "#9400d3",
            deeppink: "#ff1493",
            deepskyblue: "#00bfff",
            dimgray: "#696969",
            dodgerblue: "#1e90ff",
            firebrick: "#b22222",
            floralwhite: "#fffaf0",
            forestgreen: "#228b22",
            fuchsia: "#ff00ff",
            gainsboro: "#dcdcdc",
            ghostwhite: "#f8f8ff",
            gold: "#ffd700",
            goldenrod: "#daa520",
            gray: "#808080",
            green: "#008000",
            greenyellow: "#adff2f",
            honeydew: "#f0fff0",
            hotpink: "#ff69b4",
            "indianred ": "#cd5c5c",
            "indigo ": "#4b0082",
            ivory: "#fffff0",
            khaki: "#f0e68c",
            lavender: "#e6e6fa",
            lavenderblush: "#fff0f5",
            lawngreen: "#7cfc00",
            lemonchiffon: "#fffacd",
            lightblue: "#add8e6",
            lightcoral: "#f08080",
            lightcyan: "#e0ffff",
            lightgoldenrodyellow: "#fafad2",
            lightgrey: "#d3d3d3",
            lightgreen: "#90ee90",
            lightpink: "#ffb6c1",
            lightsalmon: "#ffa07a",
            lightseagreen: "#20b2aa",
            lightskyblue: "#87cefa",
            lightslategray: "#778899",
            lightsteelblue: "#b0c4de",
            lightyellow: "#ffffe0",
            lime: "#00ff00",
            limegreen: "#32cd32",
            linen: "#faf0e6",
            magenta: "#ff00ff",
            maroon: "#800000",
            mediumaquamarine: "#66cdaa",
            mediumblue: "#0000cd",
            mediumorchid: "#ba55d3",
            mediumpurple: "#9370d8",
            mediumseagreen: "#3cb371",
            mediumslateblue: "#7b68ee",
            mediumspringgreen: "#00fa9a",
            mediumturquoise: "#48d1cc",
            mediumvioletred: "#c71585",
            midnightblue: "#191970",
            mintcream: "#f5fffa",
            mistyrose: "#ffe4e1",
            moccasin: "#ffe4b5",
            navajowhite: "#ffdead",
            navy: "#000080",
            oldlace: "#fdf5e6",
            olive: "#808000",
            olivedrab: "#6b8e23",
            orange: "#ffa500",
            orangered: "#ff4500",
            orchid: "#da70d6",
            palegoldenrod: "#eee8aa",
            palegreen: "#98fb98",
            paleturquoise: "#afeeee",
            palevioletred: "#d87093",
            papayawhip: "#ffefd5",
            peachpuff: "#ffdab9",
            peru: "#cd853f",
            pink: "#ffc0cb",
            plum: "#dda0dd",
            powderblue: "#b0e0e6",
            purple: "#800080",
            red: "#ff0000",
            rosybrown: "#bc8f8f",
            royalblue: "#4169e1",
            saddlebrown: "#8b4513",
            salmon: "#fa8072",
            sandybrown: "#f4a460",
            seagreen: "#2e8b57",
            seashell: "#fff5ee",
            sienna: "#a0522d",
            silver: "#c0c0c0",
            skyblue: "#87ceeb",
            slateblue: "#6a5acd",
            slategray: "#708090",
            snow: "#fffafa",
            springgreen: "#00ff7f",
            steelblue: "#4682b4",
            tan: "#d2b48c",
            teal: "#008080",
            thistle: "#d8bfd8",
            tomato: "#ff6347",
            turquoise: "#40e0d0",
            violet: "#ee82ee",
            wheat: "#f5deb3",
            white: "#ffffff",
            whitesmoke: "#f5f5f5",
            yellow: "#ffff00",
            yellowgreen: "#9acd32"
        },
        _sanitizeNumber: function(a) {
            return "number" == typeof a ? a : isNaN(a) || null === a || "" === a || void 0 === a ? 1 : void 0 !== a.toLowerCase ? parseFloat(a) : 1
        },
        setColor: function(a) {
            a = a.toLowerCase(), this.value = this.stringToHSB(a) || {
                h: 0,
                s: 0,
                b: 0,
                a: 1
            }
        },
        stringToHSB: function(b) {
            b = b.toLowerCase();
            var c = this,
                d = !1;
            return a.each(this.stringParsers, function(a, e) {
                var f = e.re.exec(b),
                    g = f && e.parse.apply(c, [f]),
                    h = e.format || "rgba";
                return g ? (d = h.match(/hsla?/) ? c.RGBtoHSB.apply(c, c.HSLtoRGB.apply(c, g)) : c.RGBtoHSB.apply(c, g), c.origFormat = h, !1) : !0
            }), d
        },
        setHue: function(a) {
            this.value.h = 1 - a
        },
        setSaturation: function(a) {
            this.value.s = a
        },
        setBrightness: function(a) {
            this.value.b = 1 - a
        },
        setAlpha: function(a) {
            this.value.a = parseInt(100 * (1 - a), 10) / 100
        },
        toRGB: function(a, b, c, d) {
            a || (a = this.value.h, b = this.value.s, c = this.value.b), a *= 360;
            var e, f, g, h, i;
            return a = a % 360 / 60, i = c * b, h = i * (1 - Math.abs(a % 2 - 1)), e = f = g = c - i, a = ~~a, e += [i, h, 0, 0, h, i][a], f += [h, i, i, h, 0, 0][a], g += [0, 0, h, i, i, h][a], {
                r: Math.round(255 * e),
                g: Math.round(255 * f),
                b: Math.round(255 * g),
                a: d || this.value.a
            }
        },
        toHex: function(a, b, c, d) {
            var e = this.toRGB(a, b, c, d);
            return "#" + (1 << 24 | parseInt(e.r) << 16 | parseInt(e.g) << 8 | parseInt(e.b)).toString(16).substr(1)
        },
        toHSL: function(a, b, c, d) {
            a = a || this.value.h, b = b || this.value.s, c = c || this.value.b, d = d || this.value.a;
            var e = a,
                f = (2 - b) * c,
                g = b * c;
            return g /= f > 0 && 1 >= f ? f : 2 - f, f /= 2, g > 1 && (g = 1), {
                h: isNaN(e) ? 0 : e,
                s: isNaN(g) ? 0 : g,
                l: isNaN(f) ? 0 : f,
                a: isNaN(d) ? 0 : d
            }
        },
        toAlias: function(a, b, c, d) {
            var e = this.toHex(a, b, c, d);
            for (var f in this.colors)
                if (this.colors[f] == e) return f;
            return !1
        },
        RGBtoHSB: function(a, b, c, d) {
            a /= 255, b /= 255, c /= 255;
            var e, f, g, h;
            return g = Math.max(a, b, c), h = g - Math.min(a, b, c), e = 0 === h ? null : g === a ? (b - c) / h : g === b ? (c - a) / h + 2 : (a - b) / h + 4, e = (e + 360) % 6 * 60 / 360, f = 0 === h ? 0 : h / g, {
                h: this._sanitizeNumber(e),
                s: f,
                b: g,
                a: this._sanitizeNumber(d)
            }
        },
        HueToRGB: function(a, b, c) {
            return 0 > c ? c += 1 : c > 1 && (c -= 1), 1 > 6 * c ? a + (b - a) * c * 6 : 1 > 2 * c ? b : 2 > 3 * c ? a + (b - a) * (2 / 3 - c) * 6 : a
        },
        HSLtoRGB: function(a, b, c, d) {
            0 > b && (b = 0);
            var e;
            e = .5 >= c ? c * (1 + b) : c + b - c * b;
            var f = 2 * c - e,
                g = a + 1 / 3,
                h = a,
                i = a - 1 / 3,
                j = Math.round(255 * this.HueToRGB(f, e, g)),
                k = Math.round(255 * this.HueToRGB(f, e, h)),
                l = Math.round(255 * this.HueToRGB(f, e, i));
            return [j, k, l, this._sanitizeNumber(d)]
        },
        toString: function(a) {
            switch (a = a || "rgba") {
                case "rgb":
                    var b = this.toRGB();
                    return "rgb(" + b.r + "," + b.g + "," + b.b + ")";
                case "rgba":
                    var b = this.toRGB();
                    return "rgba(" + b.r + "," + b.g + "," + b.b + "," + b.a + ")";
                case "hsl":
                    var c = this.toHSL();
                    return "hsl(" + Math.round(360 * c.h) + "," + Math.round(100 * c.s) + "%," + Math.round(100 * c.l) + "%)";
                case "hsla":
                    var c = this.toHSL();
                    return "hsla(" + Math.round(360 * c.h) + "," + Math.round(100 * c.s) + "%," + Math.round(100 * c.l) + "%," + c.a + ")";
                case "hex":
                    return this.toHex();
                case "alias":
                    return this.toAlias() || this.toHex();
                default:
                    return !1
            }
        },
        stringParsers: [{
            re: /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/,
            format: "hex",
            parse: function(a) {
                return [parseInt(a[1], 16), parseInt(a[2], 16), parseInt(a[3], 16), 1]
            }
        }, {
            re: /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/,
            format: "hex",
            parse: function(a) {
                return [parseInt(a[1] + a[1], 16), parseInt(a[2] + a[2], 16), parseInt(a[3] + a[3], 16), 1]
            }
        }, {
            re: /rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*?\)/,
            format: "rgb",
            parse: function(a) {
                return [a[1], a[2], a[3], 1]
            }
        }, {
            re: /rgb\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*?\)/,
            format: "rgb",
            parse: function(a) {
                return [2.55 * a[1], 2.55 * a[2], 2.55 * a[3], 1]
            }
        }, {
            re: /rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,
            format: "rgba",
            parse: function(a) {
                return [a[1], a[2], a[3], a[4]]
            }
        }, {
            re: /rgba\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,
            format: "rgba",
            parse: function(a) {
                return [2.55 * a[1], 2.55 * a[2], 2.55 * a[3], a[4]]
            }
        }, {
            re: /hsl\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*?\)/,
            format: "hsl",
            parse: function(a) {
                return [a[1] / 360, a[2] / 100, a[3] / 100, a[4]]
            }
        }, {
            re: /hsla\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,
            format: "hsla",
            parse: function(a) {
                return [a[1] / 360, a[2] / 100, a[3] / 100, a[4]]
            }
        }, {
            re: /^([a-z]{3,})$/,
            format: "alias",
            parse: function(a) {
                var b = this.colorNameToHex(a[0]) || "#000000",
                    c = this.stringParsers[0].re.exec(b),
                    d = c && this.stringParsers[0].parse.apply(this, [c]);
                return d
            }
        }],
        colorNameToHex: function(a) {
            return "undefined" != typeof this.colors[a.toLowerCase()] ? this.colors[a.toLowerCase()] : !1
        }
    };
    var c = {
            horizontal: !1,
            inline: !1,
            color: !1,
            format: !1,
            input: "input",
            container: !1,
            boxcont: !1,
            component: ".add-on, .input-group-addon",
            sliders: {
                saturation: {
                    maxLeft: 100,
                    maxTop: 100,
                    callLeft: "setSaturation",
                    callTop: "setBrightness"
                },
                hue: {
                    maxLeft: 0,
                    maxTop: 100,
                    callLeft: !1,
                    callTop: "setHue"
                },
                alpha: {
                    maxLeft: 0,
                    maxTop: 100,
                    callLeft: !1,
                    callTop: "setAlpha"
                }
            },
            slidersHorz: {
                saturation: {
                    maxLeft: 100,
                    maxTop: 100,
                    callLeft: "setSaturation",
                    callTop: "setBrightness"
                },
                hue: {
                    maxLeft: 100,
                    maxTop: 0,
                    callLeft: "setHue",
                    callTop: !1
                },
                alpha: {
                    maxLeft: 100,
                    maxTop: 0,
                    callLeft: "setAlpha",
                    callTop: !1
                }
            },
            template: '<div class="colorpicker dropdown-menu"><div class="colorpicker-saturation"><i><b></b></i></div><div class="colorpicker-hue"><i></i></div><div class="colorpicker-alpha"><i></i></div><div class="colorpicker-color"><div /></div></div>'
        },
        d = function(d, e) {
            this.element = a(d).addClass("colorpicker-element"),
                    this.options = a.extend({}, c, this.element.data(), e),
                    this.boxcont=this.options.boxcont,
                    this.component = this.options.component, this.component = this.component !== !1 ? this.element.find(this.component) : !1,
                    this.component && 0 === this.component.length && (this.component = !1),
                    this.container = this.options.container === !0 ? this.element : this.options.container,
                    this.container = this.container !== !1 ? a(this.container) : !1,
                    this.input = this.element.is("input") ? this.element : this.options.input ? this.element.find(this.options.input) : !1,
                    this.input && 0 === this.input.length && (this.input = !1), this.color = new b(this.options.color !== !1 ? this.options.color : this.getValue()),
                    this.format = this.options.format !== !1 ? this.options.format : this.color.origFormat,
                    this.picker = a(this.options.template), this.picker.addClass(this.options.inline ? "colorpicker-inline colorpicker-visible" : "colorpicker-hidden"),
                    this.options.horizontal && this.picker.addClass("colorpicker-horizontal"),
                    ("rgba" === this.format || "hsla" === this.format) && this.picker.addClass("colorpicker-with-alpha"),
                    this.picker.on("mousedown.colorpicker", a.proxy(this.mousedown, this)),
                    
                    this.picker.appendTo(this.container ? this.container : a("body")),
                    this.input !== !1 && (this.input.on({
                "keyup.colorpicker": a.proxy(this.keyup, this)
            }), this.component === !1 && this.element.on({
                "focus.colorpicker": a.proxy(this.show, this)
            }), this.options.inline === !1 && this.element.on({
                "focusout.colorpicker": a.proxy(this.hide, this)
            })), this.component !== !1 && this.component.on({
                "click.colorpicker": a.proxy(this.show, this)
            }), this.input === !1 && this.component === !1 && this.element.on({
                "click.colorpicker": a.proxy(this.show, this)
            }), this.update(), a(a.proxy(function() {
                this.element.trigger("create")
            }, this))
        };
    d.version = "2.0.0-beta", d.Color = b, d.prototype = {
        constructor: d,
        destroy: function() {
            this.picker.remove(), this.element.removeData("colorpicker").off(".colorpicker"), this.input !== !1 && this.input.off(".colorpicker"), this.component !== !1 && this.component.off(".colorpicker"), this.element.removeClass("colorpicker-element"), this.element.trigger({
                type: "destroy"
            })
        },
        reposition: function() {
            if (this.options.inline !== !1) return !1;
           /* var a = this.container && this.container[0] !== document.body ? "position" : "offset",
                b = this.component ? this.component[a]() : this.element[a]();*/
          /* this.picker.css({
                top: b.top + (this.component ? this.component.outerHeight() : this.element.outerHeight()),
                left: b.left
            })*/
          
         /*temporal solution*/ 
        try {
             if(String(rocketfm.getExternalVars("fm_loadmode"))==="iframe"){
                  this.picker.css({
                top: this.component.offset().top-this.container.offset().top+40,
                left: this.component.offset().left -this.container.offset().left -90
                })                                         
            }else{
                 this.picker.css({
                top: this.component.offset().top-this.container.offset().top+30,
                left: this.component.offset().left -this.container.offset().left
                })
            }
        }
        catch(err) {
            this.picker.css({
                top: this.component.offset().top,
                left: this.component.offset().left
                })
        }
            
            
            
            
        },
        show: function(b) {
            return this.isDisabled() ? !1 : (this.picker.addClass("colorpicker-visible").removeClass("colorpicker-hidden"), this.reposition(), a(window).on("resize.colorpicker", a.proxy(this.reposition, this)), !this.hasInput() && b && b.stopPropagation && b.preventDefault && (b.stopPropagation(), b.preventDefault()), this.options.inline === !1 && a(window.document).on({
                "mousedown.colorpicker": a.proxy(this.hide, this)
            }), void this.element.trigger({
                type: "showPicker",
                color: this.color
            }))
        },
        hide: function() {
            this.picker.addClass("colorpicker-hidden").removeClass("colorpicker-visible"), a(window).off("resize.colorpicker", this.reposition), a(document).off({
                "mousedown.colorpicker": this.hide
            }), this.update(), this.element.trigger({
                type: "hidePicker",
                color: this.color
            })
        },
        updateData: function(a) {
            return a = a || this.color.toString(this.format), this.element.data("color", a), a
        },
        updateInput: function(a) {
            return a = a || this.color.toString(this.format), this.input !== !1 && this.input.prop("value", a), a
        },
        updatePicker: function(a) {
            void 0 !== a && (this.color = new b(a));
            var c = this.options.horizontal === !1 ? this.options.sliders : this.options.slidersHorz,
                d = this.picker.find("i");
            return 0 !== d.length ? (this.options.horizontal === !1 ? (c = this.options.sliders, d.eq(1).css("top", c.hue.maxTop * (1 - this.color.value.h)).end().eq(2).css("top", c.alpha.maxTop * (1 - this.color.value.a))) : (c = this.options.slidersHorz, d.eq(1).css("left", c.hue.maxLeft * (1 - this.color.value.h)).end().eq(2).css("left", c.alpha.maxLeft * (1 - this.color.value.a))), d.eq(0).css({
                top: c.saturation.maxTop - this.color.value.b * c.saturation.maxTop,
                left: this.color.value.s * c.saturation.maxLeft
            }), this.picker.find(".colorpicker-saturation").css("backgroundColor", this.color.toHex(this.color.value.h, 1, 1, 1)), this.picker.find(".colorpicker-alpha").css("backgroundColor", this.color.toHex()), this.picker.find(".colorpicker-color, .colorpicker-color div").css("backgroundColor", this.color.toString(this.format)), a) : void 0
        },
        updateComponent: function(a) {
            if (a = a || this.color.toString(this.format), this.component !== !1) {
                var b = this.component.find("i").eq(0);
                b.length > 0 ? b.css({
                    backgroundColor: a
                }) : this.component.css({
                    backgroundColor: a
                })
            }
            return a
        },
        update: function(a) {
            var b = this.updateComponent();
            return (this.getValue(!1) !== !1 || a === !0) && (this.updateInput(b), this.updateData(b)), this.updatePicker(), b
        },
        setValue: function(a) {
            this.color = new b(a), this.update()/*, this.element.trigger({
                type: "changeColor",
                color: this.color,
                value: a
            })*/
        },
        getValue: function(a) {
            a = void 0 === a ? "#000000" : a;
            var b;
            return b = this.hasInput() ? this.input.val() : this.element.data("color"), (void 0 === b || "" === b || null === b) && (b = a), b
        },
        hasInput: function() {
            return this.input !== !1
        },
        isDisabled: function() {
            return this.hasInput() ? this.input.prop("disabled") === !0 : !1
        },
        disable: function() {
            return this.hasInput() ? (this.input.prop("disabled", !0), !0) : !1
        },
        enable: function() {
            return this.hasInput() ? (this.input.prop("disabled", !1), !0) : !1
        },
        currentSlider: null,
        mousePointer: {
            left: 0,
            top: 0
        },
        mousedown: function(b) {
            b.stopPropagation(), b.preventDefault();
            var c = a(b.target),
                d = c.closest("div"),
                e = this.options.horizontal ? this.options.slidersHorz : this.options.sliders;
            if (!d.is(".colorpicker")) {
                if (d.is(".colorpicker-saturation")) this.currentSlider = a.extend({}, e.saturation);
                else if (d.is(".colorpicker-hue")) this.currentSlider = a.extend({}, e.hue);
                else {
                    if (!d.is(".colorpicker-alpha")) return !1;
                    this.currentSlider = a.extend({}, e.alpha)
                }
                var f = d.offset();
                this.currentSlider.guide = d.find("i")[0].style, this.currentSlider.left = b.pageX - f.left, this.currentSlider.top = b.pageY - f.top, this.mousePointer = {
                    left: b.pageX,
                    top: b.pageY
                }, a(document).on({
                    "mousemove.colorpicker": a.proxy(this.mousemove, this),
                    "mouseup.colorpicker": a.proxy(this.mouseup, this)
                }).trigger("mousemove")
            }
            return !1
        },
        mousemove: function(a) {
            a.stopPropagation(), a.preventDefault();
            var b = Math.max(0, Math.min(this.currentSlider.maxLeft, this.currentSlider.left + ((a.pageX || this.mousePointer.left) - this.mousePointer.left))),
                c = Math.max(0, Math.min(this.currentSlider.maxTop, this.currentSlider.top + ((a.pageY || this.mousePointer.top) - this.mousePointer.top)));
            return this.currentSlider.guide.left = b + "px", this.currentSlider.guide.top = c + "px", this.currentSlider.callLeft && this.color[this.currentSlider.callLeft].call(this.color, b / 100), this.currentSlider.callTop && this.color[this.currentSlider.callTop].call(this.color, c / 100), this.update(!0), this.element.trigger({
                type: "changeColor",
                color: this.color
            }), !1
        },
        mouseup: function(b) {
            return b.stopPropagation(), b.preventDefault(), a(document).off({
                "mousemove.colorpicker": this.mousemove,
                "mouseup.colorpicker": this.mouseup
            }), !1
        },
        keyup: function(a) {
            if (38 === a.keyCode) this.color.value.a < 1 && (this.color.value.a = Math.round(100 * (this.color.value.a + .01)) / 100), this.update(!0);
            else if (40 === a.keyCode) this.color.value.a > 0 && (this.color.value.a = Math.round(100 * (this.color.value.a - .01)) / 100), this.update(!0);
            else {
                var c = this.input.val();
                this.color = new b(c), this.getValue(!1) !== !1 && (this.updateData(), this.updateComponent(), this.updatePicker())
            }
            this.element.trigger({
                type: "changeColor",
                color: this.color,
                value: c
            })
        }
    }, a.colorpicker = d, a.fn.colorpicker = function(b) {
        var c = arguments;
        return this.each(function() {
            var e = a(this),
                f = e.data("colorpicker"),
                g = "object" == typeof b ? b : {};
            f || "string" == typeof b ? "string" == typeof b && f[b].apply(f, Array.prototype.slice.call(c, 1)) : e.data("colorpicker", new d(this, g))
        })
    }, a.fn.colorpicker.constructor = d
});