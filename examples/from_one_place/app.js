
/*
Example showing that three planets (or x planets)
from the same starting point with the same speed size
but a different direction will end up on the same point
after some time.
 */

(function() {
  var canvas, i, planets, speed, universe, _i;

  universe = new Universe({
    timespeed: 5e-2
  });

  universe.addPlanet(10e7, [0, 0], [0, 0]);

  planets = 20;

  for (i = _i = 0; 0 <= planets ? _i < planets : _i > planets; i = 0 <= planets ? ++_i : --_i) {
    speed = vector(Math.floor(Math.random() * 100 - 50), Math.floor(Math.random() * 100 - 50)).norm().multiply(1.5);
    universe.addPlanet(0, [400, 0], speed);
  }

  canvas = new Canvas(document.getElementById('canvas'));

  canvas.origin([400, 400]);

  universe.loop(canvas);

}).call(this);
