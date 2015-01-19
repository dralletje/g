"use strict"; 

/*
A place to draw on with vectors.
 */

(function() {
  var Canvas;

  Canvas = (function() {
    function Canvas(canvas_element) {
      this.el = canvas_element;
      this.ctx = canvas_element.getContext("2d");
      this.o = Vector["null"];
      this.s = 1;
    }

    Canvas.prototype.origin = function(o) {
      this.o = Vector.fromArray(o);
      return this;
    };

    Canvas.prototype.scale = function(x) {
      this.s = x;
      return this;
    };

    Canvas.prototype.linecolor = function(color) {
      this.ctx.strokeStyle = color;
      return this;
    };

    Canvas.prototype.linewidth = function(width) {
      this.ctx.lineWidth = width * this.s;
      return this;
    };

    Canvas.prototype._convert = function(p) {
      p = (p.x == null) || (p.y == null) ? Vector.fromArray(p) : p;
      return this.o.plus(p.multiply(this.s));
    };

    Canvas.prototype.circle = function(p, r) {
      var p_;
      this.ctx.beginPath();
      p_ = this._convert(p);
      this.ctx.arc(p_.x, p_.y, r * this.s, 0, 2 * Math.PI);
      this.ctx.stroke();
      return this;
    };

    Canvas.prototype.line = function(from, to) {
      var from_, to_;
      this.ctx.beginPath();
      from_ = this._convert(from);
      to_ = from_.plus(to.multiply(this.s));
      this.ctx.moveTo(from_.x, from_.y);
      this.ctx.lineTo(to_.x, to_.y);
      this.ctx.stroke();
      return this;
    };

    Canvas.prototype.clear = function(color) {
      if (color == null) {
        color = 'rgba(255,255,255,1)';
      }
      this.ctx.fillStyle = color;
      return this.ctx.fillRect(0, 0, this.el.width, this.el.height);
    };

    return Canvas;

  })();

  window.Canvas = Canvas;

}).call(this);


/*
A planet, floating around in the universe.
Pulled by his friends and pushed by love.
 */

(function() {
  var G, Planet;

  G = 10e4;

  Planet = (function() {
    function Planet(mass, position, speed, timespeed) {
      if (position instanceof Array) {
        position = Vector.fromArray(position);
      }
      if (speed instanceof Array) {
        speed = Vector.fromArray(speed);
      }
      if (position.x == null) {
        throw new TypeError('Position should be a Vector');
      }
      if (speed.x == null) {
        throw new TypeError('Speed should be a Vector');
      }
      this.timespeed = timespeed;
      this.timespeed2 = timespeed * timespeed;
      this.G = this.timespeed2 / G;
      this.mass = mass;
      this.p = position;
      this.s = speed.multiply(this.timespeed);
      this.a = Vector["null"];
      this.size = Math.max(10, Math.log(mass) * 5 + 10);
    }

    Planet.prototype.draw = function(canvas) {
      var scale;
      canvas.linewidth('2').linecolor('rgba(0,0,0,1)').circle(this.p, this.size).circle(this.p, 5);
      canvas.linewidth('3');
      scale = 50 / this.timespeed;
      canvas.linecolor('rgba(255,0,0,1)').line(this.p, this.s.multiply(scale));
      scale = 1000 / this.timespeed2;
      return canvas.linecolor('rgba(0,255,0,1)').line(this.p, this.a.multiply(scale));
    };

    Planet.prototype.move = function() {
      return this.p = this.p.plus(this.s);
    };

    Planet.prototype.accelerate = function(entities) {
      var a;
      a = fast.map(entities, (function(_this) {
        return function(entitie) {
          var dp, force, r2;
          if (entitie === _this || entitie.mass === 0) {
            return Vector["null"];
          }
          dp = entitie.p.minus(_this.p);
          r2 = dp.size2();
          if (r2 === 0) {
            return Vector["null"];
          }
          force = entitie.mass / (r2 * Math.sqrt(r2));
          return dp.multiply(force);
        };
      })(this));
      a = fast.reduce(a, function(p, n) {
        return p.plus(n);
      }, Vector["null"]);
      this.a = a.multiply(this.G);
      return this.s = this.s.plus(this.a);
    };

    return Planet;

  })();

  window.Planet = Planet;

}).call(this);


/*
Represents a universe with planets floating around in it..
Floaty float.. floaty float...
 */

(function() {
  var Universe;

  Universe = (function() {
    function Universe(options) {
      this.timespeed = options.timespeed;
      if (this.imespeed == null) {
        this.imespeed = 1;
      }
      this.planets = [];
      this.origin = Vector["null"];
    }

    Universe.prototype.addPlanet = function(mass, position, speed) {
      var planet;
      planet = new Planet(mass, position, speed, this.timespeed);
      return this.planets.push(planet);
    };

    Universe.prototype.run = function(t) {
      var i, planet, _i, _j, _k, _len, _len1, _ref, _ref1;
      for (i = _i = 0; 0 <= t ? _i < t : _i > t; i = 0 <= t ? ++_i : --_i) {
        _ref = this.planets;
        for (_j = 0, _len = _ref.length; _j < _len; _j++) {
          planet = _ref[_j];
          planet.accelerate(this.planets);
        }
        _ref1 = this.planets;
        for (_k = 0, _len1 = _ref1.length; _k < _len1; _k++) {
          planet = _ref1[_k];
          planet.move();
        }
      }
    };

    Universe.prototype.draw = function(canvas) {
      var planet, _i, _len, _ref, _results;
      _ref = this.planets;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        planet = _ref[_i];
        _results.push(planet.draw(canvas));
      }
      return _results;
    };

    Universe.prototype.loop = function(canvas, speed) {
      var history;
      if (speed == null) {
        speed = 2;
      }
      history = performance.now();
      return setInterval((function(_this) {
        return function() {
          var seconds;
          seconds = performance.now() - history;
          history = performance.now();
          seconds = Math.min(seconds, 20);
          canvas.clear();
          _this.run(seconds * speed);
          return _this.draw(canvas);
        };
      })(this), 1);
    };

    return Universe;

  })();

  window.Universe = Universe;

}).call(this);


/*
Represents a Vector in 2D space
---
All methods on a vector are pure, a vector is immutable.
 */

(function() {
  var Vector, vector;

  vector = function(x, y) {
    return new Vector(x, y);
  };

  Vector = (function() {
    function Vector(x, y) {
      this.x = x;
      this.y = y;
    }

    Vector.fromArray = function(array) {
      return new Vector(array[0], array[1]);
    };

    Vector["null"] = Vector.fromArray([0, 0]);

    Vector.prototype.toArray = function() {
      return [this.x, this.y];
    };

    Vector.prototype.map = function(fn) {
      return new Vector(fn(this.x), fn(this.y));
    };

    Vector.prototype.zipWith = function(v, fn) {
      if ((v.x == null) || (v.y == null)) {
        return new Vector(fn(this.x, v), fn(this.y, v));
      } else {
        return new Vector(fn(this.x, v.x), fn(this.y, v.y));
      }
    };

    Vector.prototype.plus = function(input) {
      return this.zipWith(input, function(x, y) {
        return x + y;
      });
    };

    Vector.prototype.minus = function(input) {
      return this.zipWith(input, function(x, y) {
        return x - y;
      });
    };

    Vector.prototype.multiply = function(input) {
      return this.zipWith(input, function(x, y) {
        return x * y;
      });
    };

    Vector.prototype.divide = function(input) {
      if (input instanceof Vector) {
        return this.zipWith(input, function(x, y) {
          return x / y;
        });
      } else {
        return this.multiply(1 / input);
      }
    };

    Vector.prototype.size2 = function() {
      return this.x * this.x + this.y * this.y;
    };

    Vector.prototype.size = function() {
      return Math.sqrt(this.size2());
    };

    Vector.prototype.norm = function() {
      return this.divide(this.size());
    };

    return Vector;

  })();

  window.Vector = Vector;

  window.vector = vector;

}).call(this);
