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
      this.ctx.lineWidth = width;
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
  var Planet;

  Planet = (function() {
    function Planet(mass, position, speed) {
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
      this.mass = mass;
      this.p = position;
      this.s = speed;
      this.a = Vector["null"];
      this.size = Math.max(10, Math.log(mass) * 5 + 10);
    }

    Planet.prototype.draw = function(canvas) {
      var scale;
      canvas.linewidth('2').linecolor('rgba(0,0,0,1)').circle(this.p, this.size).circle(this.p, 2 / canvas.s);
      canvas.linewidth('3');
      scale = 50 / this.timespeed;
      canvas.linecolor('rgba(255,0,0,1)').line(this.p, this.s.multiply(scale));
      scale = 1000 / this.timespeed2;
      return canvas.linecolor('rgba(0,255,0,1)').line(this.p, this.a.multiply(scale));
    };

    Planet.prototype.move = function(timespeed) {
      return this.p = this.p.plus(this.s.multiply(timespeed));
    };

    Planet.prototype.accelerate = function(entities, timespeed, G) {
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
      this.a = a.multiply(timespeed * G);
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
    Universe.SECOND = 1;

    Universe.DAY = 86400;

    Universe.YEAR = 3.15569e7;

    Universe.KG = 1;

    Universe.KG24 = 1e24;

    Universe.M = 1;

    Universe.KM = 1e3;

    Universe.G = 6.67384e-11;

    function Universe(opts) {
      if (opts == null) {
        opts = {};
      }
      this.opts = {
        speed: opts.speed || 1,
        accuracy: opts.accuracy || 1,
        scale: opts.scale || 1
      };
      this.opts.speed = this.opts.speed / this.opts.accuracy;
      this.planets = [];
      this.t = 0;
    }

    Universe.prototype.addPlanet = function(mass, position, speed) {
      var planet, scale, scale3;
      scale = this.opts.scale;
      scale3 = scale * scale * scale;
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
      planet = new Planet(mass * scale3, position.multiply(scale), speed.multiply(scale), this.opts);
      return this.planets.push(planet);
    };

    Universe.prototype.run = function(t) {
      var i, planet, planets, speed, _i, _j, _k, _len, _len1;
      speed = this.opts.speed;
      planets = this.planets;
      for (i = _i = 0; 0 <= t ? _i < t : _i > t; i = 0 <= t ? ++_i : --_i) {
        for (_j = 0, _len = planets.length; _j < _len; _j++) {
          planet = planets[_j];
          planet.accelerate(planets, speed, Universe.G);
        }
        for (_k = 0, _len1 = planets.length; _k < _len1; _k++) {
          planet = planets[_k];
          planet.move(speed);
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

    Universe.prototype.loop = function(canvas) {
      var accuracy, history;
      history = performance.now();
      accuracy = this.opts.accuracy;
      return setInterval((function(_this) {
        return function() {
          var seconds;
          seconds = performance.now() - history;
          history = performance.now();
          seconds = Math.min(seconds, 20);
          canvas.clear();
          _this.run(seconds * accuracy);
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
