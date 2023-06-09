/*! fuzzycomplete 2016-05-11 */
!(function (a) {
  return "undefined" == typeof jQuery
    ? void console.warn("fuzzyComplete plugin requires jQuery")
    : "undefined" == typeof Fuse
    ? void console.warn("fuzzyComplete plugin requires Fuse.js")
    : void (a.fn.fuzzyComplete = function (b, c) {
        return this.each(function () {
          function d() {
            h.val(g.children(".selected").first().data("id")),
              f.val(g.children(".selected").first().text());
          }
          "undefined" == typeof c &&
            (c = {
              display: Object.keys(b[0])[0],
              key: Object.keys(b[0])[0],
              fuseOptions: { keys: Object.keys(b[0]) },
            });
          var e = new Fuse(b, c.fuseOptions),
            f = a(this),
            g = a("<div>").addClass("fuzzyResults");
          f.after(g);
          var h = a("<select>").attr("name", f.attr("name")).hide();
          f.after(h), f.removeAttr("name");
          var i = f.position();
          (i.left += parseInt(f.css("marginLeft"), 10)),
            (i.top += parseInt(f.css("marginTop"), 10)),
            g.css({
              left: i.left,
              top: i.top + f.outerHeight(),
              width: f.outerWidth(),
            }),
            f.keydown(function (a) {
              switch (a.which) {
                case 13:
                  return a.preventDefault(), g.hide(), void d();
                case 9:
                  return g.hide(), void d();
              }
            }),
            f.keyup(function (b) {
              switch (b.which) {
                case 38:
                  var f = g.find(".selected").first();
                  return (
                    f.length
                      ? (f.removeClass("selected"),
                        f.prev().length
                          ? f.prev().addClass("selected")
                          : g.children().last().addClass("selected"))
                      : g.children().last().addClass("selected"),
                    void d()
                  );
                case 40:
                  var f = g.find(".selected").first();
                  return (
                    f.length
                      ? (f.removeClass("selected"),
                        f.next().length
                          ? f.next().addClass("selected")
                          : g.children().first().addClass("selected"))
                      : g.children().first().addClass("selected"),
                    void d()
                  );
                case 13:
                  return;
              }
              var i = e.search(a(this).val());
              g.empty(),
                0 === i.length && h.val(null),
                i.forEach(function (b, e) {
                  e >= 4 ||
                    (0 === e && h.val(b.id),
                    g.append(
                      a("<div>")
                        .text(b[c.display])
                        .data("id", b[c.key])
                        .addClass("__autoitem")
                        .on("mousedown", function (a) {
                          a.preventDefault();
                        })
                        .click(function () {
                          g.find(".selected").removeClass("selected"),
                            a(this).addClass("selected"),
                            d(),
                            g.hide();
                        })
                    ));
                }),
                g.children().length
                  ? (g.show(), g.children().first().addClass("selected"))
                  : g.hide();
            }),
            f.blur(function () {
              g.hide();
            }),
            f.focus(function () {
              g.children().length && g.show();
            }),
            h.append(a("<option>", { value: "", text: "(None Selected)" })),
            b.forEach(function (b, d) {
              h.append(a("<option>", { value: b[c.key], text: b[c.display] }));
            }),
            f.val() && (f.keyup(), f.blur());
        });
      });
})(jQuery);