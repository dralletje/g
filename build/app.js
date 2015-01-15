var G, Planet, sunSize, timespeed, timespeed2,
  __slice = [].slice;

sunSize = 20;

G = 6.67384e-11;

timespeed = .1;

timespeed2 = timespeed * timespeed;

Planet = (function() {
  function Planet(mass, position, speed, watch) {
    this.watch = watch;
    this.mass = mass;
    this.size = Math.log(mass) * 5 + 10;
    this.p = position;
    this.s = speed.map(function(x) {
      return x * timespeed;
    });
    this.a = [0, 0];
  }

  Planet.prototype.draw = function(context) {
    var scale, size;
    size = this.size;
    context.beginPath();
    context.arc(this.p[0], this.p[1], size, 0, 2 * Math.PI);
    context.strokeStyle = 'black';
    context.stroke();
    context.beginPath();
    context.moveTo(this.p[0], this.p[1]);
    scale = 50 / timespeed;
    context.lineTo(this.p[0] + (this.s[0] * scale), this.p[1] + (this.s[1] * scale));
    context.strokeStyle = 'red';
    context.stroke();
    context.beginPath();
    context.moveTo(this.p[0], this.p[1]);
    scale = 30e3 / timespeed2;
    context.lineTo(this.p[0] + (this.a[0] * scale), this.p[1] + (this.a[1] * scale));
    context.strokeStyle = 'green';
    return context.stroke();
  };

  Planet.prototype.log = function() {
    var args;
    args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    return console.log.apply(console, [this.name + ':'].concat(__slice.call(args)));
  };

  Planet.prototype.move = function() {
    if (this.watch && (Math.random() > 0.95)) {
      console.log(this.p.map(Math.floor));
    }
    return this.p = [this.p[0] + this.s[0], this.p[1] + this.s[1]];
  };

  Planet.prototype.accelerate = function(entities) {
    var a;
    a = entities.filter((function(_this) {
      return function(e) {
        return e !== _this;
      };
    })(this)).map((function(_this) {
      return function(entitie) {
        var r2, scaleDirection, scaleForce, t, x, y;
        x = entitie.p[0] - _this.p[0];
        y = entitie.p[1] - _this.p[1];
        r2 = x * x + y * y;
        if (r2 === 0) {
          _this.log('Null!');
          return [0, 0];
        }
        scaleDirection = 1 / Math.sqrt(r2);
        scaleForce = entitie.mass / r2;
        return t = [x, y].map(function(x) {
          return x * scaleDirection;
        }).map(function(x) {
          return x * scaleForce;
        });
      };
    })(this)).reduce(function(p, n) {
      return [p[0] + n[0], p[1] + n[1]];
    }, [0, 0]);
    a = a.map(function(x) {
      return x / 10e4 * timespeed2;
    });
    a = a.map(function(x) {
      var m;
      m = .1;
      if (x > 0) {
        return Math.min(m, x);
      } else {
        return Math.max(-m, x);
      }
    });
    this.a = a;
    return this.s = [this.s[0] + a[0], this.s[1] + a[1]];
  };

  return Planet;

})();

var acceleration, context, drawingisfun, entities, getAcceleration, my_canvas, rearth, runit, startDate;

getAcceleration = function(distance, m2) {
  return G * m2 / (Math.pow(distance, 2));
};

my_canvas = document.getElementById("canvas");

context = my_canvas.getContext("2d");

acceleration = 0.00002;

rearth = 7;

startDate = Date.now();

entities = [new Planet(10e8, [300, 400], [0, 0]), new Planet(10e4, [900, 400], [0, -.7]), new Planet(10, [1100, 400], [0, .5]), new Planet(10, [100, 400], [0, 5])];

drawingisfun = function() {
  var c2, entitie, _i, _j, _len, _len1, _results;
  c2 = (Date.now() - startDate) / 100;
  for (_i = 0, _len = entities.length; _i < _len; _i++) {
    entitie = entities[_i];
    entitie.accelerate(entities);
  }
  _results = [];
  for (_j = 0, _len1 = entities.length; _j < _len1; _j++) {
    entitie = entities[_j];
    entitie.move();
    _results.push(entitie.draw(context));
  }
  return _results;
};

runit = setInterval(drawingisfun, 1);
