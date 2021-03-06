var RadarChart = {
  defaultConfig: {
    containerClass: "radar-chart",
    w: 600,
    h: 600,
    factor: .95,
    factorLegend: 1,
    levels: 3,
    levelTick: !1,
    TickLength: 10,
    maxValue: 0,
    radians: 2 * Math.PI,
    color: d3.scale.category10(),
    axisLine: !0,
    axisText: !0,
    circles: !0,
    radius: 5,
    axisJoin: function(t, e) {
      return t.className || e
    },
    transitionDuration: 300
  },
  chart: function() {
    function t(t) {
      t.each(function(t) {
        function a(t, a, n, r) {
          return n = "undefined" != typeof n ? n : 1, a * (1 - n * r(t * e.radians / o))
        }

        function n(t, e, n) {
          return a(t, e, n, Math.sin)
        }

        function r(t, e, n) {
          return a(t, e, n, Math.cos)
        }
        var s = d3.select(this);
        t = t.map(function(t) {
          return t instanceof Array && (t = {
            axes: t
          }), t
        });
        var i = Math.max(e.maxValue, d3.max(t, function(t) {
            return d3.max(t.axes, function(t) {
              return t.value
            })
          })),
          c = t[0].axes.map(function(t) {
            return {
              name: t.axis,
              xOffset: t.xOffset ? t.xOffset : 0,
              yOffset: t.yOffset ? t.yOffset : 0
            }
          }),
          o = c.length,
          u = e.factor * Math.min(e.w / 2, e.h / 2);
        s.classed(e.containerClass, 1);
        var l = d3.range(0, e.levels).map(function(t) {
            return u * ((t + 1) / e.levels)
          }),
          d = s.selectAll("g.level-group").data(l);
        d.enter().append("g"), d.exit().remove(), d.attr("class", function(t, e) {
          return "level-group level-group-" + e
        });
        var f = d.selectAll(".level").data(function(t) {
          return d3.range(0, o).map(function() {
            return t
          })
        });
        if (f.enter().append("line"), f.exit().remove(), e.levelTick ? f.attr("class", "level").attr("x1", function(t, a) {
            return u == t ? n(a, t) : n(a, t) + e.TickLength / 2 * Math.cos(a * e.radians / o)
          }).attr("y1", function(t, a) {
            return u == t ? r(a, t) : r(a, t) - e.TickLength / 2 * Math.sin(a * e.radians / o)
          }).attr("x2", function(t, a) {
            return u == t ? n(a + 1, t) : n(a, t) - e.TickLength / 2 * Math.cos(a * e.radians / o)
          }).attr("y2", function(t, a) {
            return u == t ? r(a + 1, t) : r(a, t) + e.TickLength / 2 * Math.sin(a * e.radians / o)
          }).attr("transform", function(t) {
            return "translate(" + (e.w / 2 - t) + ", " + (e.h / 2 - t) + ")"
          }) : f.attr("class", "level").attr("x1", function(t, e) {
            return n(e, t)
          }).attr("y1", function(t, e) {
            return r(e, t)
          }).attr("x2", function(t, e) {
            return n(e + 1, t)
          }).attr("y2", function(t, e) {
            return r(e + 1, t)
          }).attr("transform", function(t) {
            return "translate(" + (e.w / 2 - t) + ", " + (e.h / 2 - t) + ")"
          }), e.axisLine || e.axisText) {
          var x = s.selectAll(".axis").data(c),
            h = x.enter().append("g");
          e.axisLine && h.append("line"), e.axisText && h.append("text"), x.exit().remove(), x.attr("class", "axis"), e.axisLine && x.select("line").attr("x1", e.w / 2).attr("y1", e.h / 2).attr("x2", function(t, a) {
            return n(a, e.w / 2, e.factor)
          }).attr("y2", function(t, a) {
            return r(a, e.h / 2, e.factor)
          }), e.axisText && x.select("text").attr("class", function(t, e) {
            var a = n(e, .5);
            return "legend " + (.4 > a ? "left" : a > .6 ? "right" : "middle")
          }).attr("dy", function(t, e) {
            var a = r(e, .5);
            return .1 > a ? "1em" : a > .9 ? "0" : "0.5em"
          }).text(function(t) {
            return t.name
          }).attr("x", function(t, a) {
            return t.xOffset + n(a, e.w / 2, e.factorLegend)
          }).attr("y", function(t, a) {
            return t.yOffset + r(a, e.h / 2, e.factorLegend)
          })
        }
        t.forEach(function(t) {
          t.axes.forEach(function(t, a) {
            t.x = n(a, e.w / 2, parseFloat(Math.max(t.value, 0)) / i * e.factor), t.y = r(a, e.h / 2, parseFloat(Math.max(t.value, 0)) / i * e.factor)
          })
        });
        var v = s.selectAll(".area").data(t, e.axisJoin);
        if (v.enter().append("polygon").classed({
            area: 1,
            "d3-enter": 1
          }).on("mouseover", function() {
            s.classed("focus", 1), d3.select(this).classed("focused", 1)
          }).on("mouseout", function() {
            s.classed("focus", 0), d3.select(this).classed("focused", 0)
          }), v.exit().classed("d3-exit", 1).transition().duration(e.transitionDuration).remove(), v.each(function(t, e) {
            var a = {
              "d3-exit": 0
            };
            a["radar-chart-serie" + e] = 1, t.className && (a[t.className] = 1), d3.select(this).classed(a)
          }).style("stroke", function(t, a) {
            return e.color(a)
          }).style("fill", function(t, a) {
            return e.color(a)
          }).transition().duration(e.transitionDuration).attr("points", function(t) {
            return t.axes.map(function(t) {
              return [t.x, t.y].join(",")
            }).join(" ")
          }).each("start", function() {
            d3.select(this).classed("d3-enter", 0)
          }), e.circles && e.radius) {
          var m = s.selectAll(".tooltip").data([1]);
          m.enter().append("text").attr("class", "tooltip");
          var p = s.selectAll("g.circle-group").data(t, e.axisJoin);
          p.enter().append("g").classed({
            "circle-group": 1,
            "d3-enter": 1
          }), p.exit().classed("d3-exit", 1).transition().duration(e.transitionDuration).remove(), p.each(function(t) {
            var e = {
              "d3-exit": 0
            };
            t.className && (e[t.className] = 1), d3.select(this).classed(e)
          }).transition().duration(e.transitionDuration).each("start", function() {
            d3.select(this).classed("d3-enter", 0)
          });
          var g = p.selectAll(".circle").data(function(t, e) {
            return t.axes.map(function(t) {
              return [t, e]
            })
          });
          g.enter().append("circle").classed({
            circle: 1,
            "d3-enter": 1
          }).on("mouseover", function(t) {
            m.attr("x", t[0].x - 10).attr("y", t[0].y - 5).text(t[0].value).classed("visible", 1), s.classed("focus", 1), s.select(".area.radar-chart-serie" + t[1]).classed("focused", 1)
          }).on("mouseout", function(t) {
            m.classed("visible", 0), s.classed("focus", 0), s.select(".area.radar-chart-serie" + t[1]).classed("focused", 0)
          }), g.exit().classed("d3-exit", 1).transition().duration(e.transitionDuration).remove(), g.each(function(t) {
            var e = {
              "d3-exit": 0
            };
            e["radar-chart-serie" + t[1]] = 1, d3.select(this).classed(e)
          }).style("fill", function(t) {
            return e.color(t[1])
          }).transition().duration(e.transitionDuration).attr("r", e.radius).attr("cx", function(t) {
            return t[0].x
          }).attr("cy", function(t) {
            return t[0].y
          }).each("start", function() {
            d3.select(this).classed("d3-enter", 0)
          });
          var y = m.node();
          y.parentNode.appendChild(y)
        }
      })
    }
    var e = Object.create(RadarChart.defaultConfig);
    return t.config = function(a) {
      return arguments.length ? (arguments.length > 1 ? e[arguments[0]] = arguments[1] : d3.entries(a || {}).forEach(function(t) {
        e[t.key] = t.value
      }), t) : e
    }, t
  },
  draw: function(t, e, a) {
    var n = RadarChart.chart().config(a),
      r = n.config();
    d3.select(t).select("svg").remove(), d3.select(t).append("svg").attr("width", r.w).attr("height", r.h).datum(e).call(n)
  }
};

