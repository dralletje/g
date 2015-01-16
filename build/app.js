
/*
A place to draw on with vectors
 */
var Canvas;

Canvas = (function() {
  function Canvas(canvas_element) {
    this.el = canvas_element;
    this.ctx = canvas_element.getContext("2d");
    this.o = Vector["null"];
  }

  Canvas.prototype.origin = function(o) {
    this.o = Vector.fromArray(o);
    return this;
  };

  Canvas.prototype.linecolor = function(color) {
    this.ctx.strokeStyle = color;
    return this;
  };

  Canvas.prototype.linewidth = function(width) {
    this.ctx.lineWidth = '3';
    return this;
  };

  Canvas.prototype._fromOrigin = function(p) {
    p = p instanceof Array ? Vector.fromArray(p) : p;
    return this.o.plus(p);
  };

  Canvas.prototype.circle = function(p, r) {
    var p_;
    this.ctx.beginPath();
    p_ = this._fromOrigin(p);
    this.ctx.arc(p_.x, p_.y, r, 0, 2 * Math.PI);
    this.ctx.stroke();
    return this;
  };

  Canvas.prototype.line = function(from, to) {
    var from_, to_;
    this.ctx.beginPath();
    from_ = this._fromOrigin(from);
    to_ = this._fromOrigin(to);
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


/*
A planet, floating around in the universe.
Pulled by his friends and pushed by love.
 */
var Planet;

Planet = (function() {
  function Planet(mass, position, speed, timespeed) {
    if (position instanceof Array) {
      position = Vector.fromArray(position);
    }
    if (speed instanceof Array) {
      speed = Vector.fromArray(speed);
    }
    if (!(position instanceof Vector)) {
      throw new TypeError('Position should be a Vector');
    }
    if (!(speed instanceof Vector)) {
      throw new TypeError('Speed should be a Vector');
    }
    this.timespeed = timespeed;
    this.timespeed2 = timespeed * timespeed;
    this.mass = mass;
    this.p = position;
    this.s = speed.multiply(this.timespeed);
    this.a = Vector["null"];
    this.size = mass < 1 ? 10 : Math.log(mass) * 5 + 10;
  }

  Planet.prototype.draw = function(canvas) {
    var acceleration_to, scale, speed_to;
    canvas.linewidth('2').linecolor('black').circle(this.p, this.size).circle(this.p, 5);
    canvas.linewidth('3');
    scale = 50 / this.timespeed;
    speed_to = this.p.plus(this.s.multiply(scale));
    canvas.linecolor('red').line(this.p, speed_to);
    scale = 10000 / this.timespeed2;
    acceleration_to = this.p.plus(this.a.multiply(scale));
    return canvas.linecolor('green').line(this.p, acceleration_to);
  };

  Planet.prototype.move = function() {
    return this.p = this.p.plus(this.s);
  };

  Planet.prototype.accelerate = function(entities) {
    this.a = entities.filter((function(_this) {
      return function(e) {
        return e !== _this;
      };
    })(this)).map((function(_this) {
      return function(entitie) {
        var dp, force, r, r2;
        dp = entitie.p.minus(_this.p);
        r2 = dp.size2();
        if (r2 === 0) {
          return Vector["null"];
        }
        r = Math.sqrt(r2);
        force = entitie.mass / r2;
        return dp.divide(r).multiply(force);
      };
    })(this)).reduce(function(p, n) {
      return p.plus(n);
    }, Vector["null"]).divide(10e4).multiply(this.timespeed2).map(function(x) {
      var m;
      m = .1;
      if (x > 0) {
        return Math.min(m, x);
      } else {
        return Math.max(-m, x);
      }
    });
    return this.s = this.s.plus(this.a);
  };

  return Planet;

})();


/*
Represents a universe with planets floating around in it..
Floaty float.. floaty float...
 */
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
    var i, planet, _i, _j, _len, _ref, _results;
    _results = [];
    for (i = _i = 0; 0 <= t ? _i < t : _i > t; i = 0 <= t ? ++_i : --_i) {
      _ref = this.planets;
      for (_j = 0, _len = _ref.length; _j < _len; _j++) {
        planet = _ref[_j];
        planet.accelerate(this.planets);
      }
      _results.push((function() {
        var _k, _len1, _ref1, _results1;
        _ref1 = this.planets;
        _results1 = [];
        for (_k = 0, _len1 = _ref1.length; _k < _len1; _k++) {
          planet = _ref1[_k];
          _results1.push(planet.move());
        }
        return _results1;
      }).call(this));
    }
    return _results;
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
      speed = 10;
    }
    history = Date.now();
    return setInterval((function(_this) {
      return function() {
        var seconds;
        seconds = Date.now() - history;
        history = Date.now();
        canvas.clear();
        _this.run(seconds * speed);
        return _this.draw(canvas);
      };
    })(this), 1);
  };

  return Universe;

})();


/*
Represents a Vector in 2D space
---
All methods on a vector are pure, a vector is immutable.
 */
var Vector;

Vector = (function() {
  function Vector(x, y) {
    if (Number.isNaN(x) || Number.isNaN(y)) {
      throw new TypeError("Can\'t handle NaN: (" + x + ", " + y + ")");
    }
    if (!(this instanceof Vector)) {
      return new Vector(x, y);
    }
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

  Vector.prototype.zipWith = function(input, fn) {
    var v;
    v = input instanceof Vector ? input : {
      x: input,
      y: input
    };
    return new Vector(fn(this.x, v.x), fn(this.y, v.y));
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
    return this.zipWith(input, function(x, y) {
      return x / y;
    });
  };

  Vector.prototype.size2 = function() {
    return this.x * this.x + this.y * this.y;
  };

  Vector.prototype.size = function() {
    return Math.sqrt(this.size2());
  };

  return Vector;

})();

var canvas, getAcceleration, normalize, planetArgs, planets, universe, _i, _len;

getAcceleration = function(distance, m2) {
  return G * m2 / (Math.pow(distance, 2));
};

normalize = function(v, times) {
  var length;
  length = Math.sqrt(v.reduce(function(p, x) {
    return p + x * x;
  }, 0));
  v = v.map(function(x) {
    return x / length;
  });
  if (times != null) {
    return v.map(function(x) {
      return x * times;
    });
  } else {
    return v;
  }
};

planets = [[10e7, [0, 0], [0, 0]], [0, [400, 0], normalize([0, 1], 1.5)], [0, [400, 0], normalize([.6, -.4], 1.5)], [0, [400, 0], normalize([-1.3, -1.2], 1.5)]];


/*
planets = [
  [10e7, [0,0], [0,-1.5]] # Sun
  [10e7, [300,0], [0,1.5]] # Sun
  [10e3, [600,0], [0,1.2]]  # Planet
   *[10e4, [400,0], [0,-1]]  # Planet
]
 */

universe = new Universe({
  timespeed: 10e-3
});

for (_i = 0, _len = planets.length; _i < _len; _i++) {
  planetArgs = planets[_i];
  universe.addPlanet.apply(universe, planetArgs);
}

canvas = new Canvas(document.getElementById('canvas'));

canvas.origin([400, 400]);

universe.loop(canvas);
