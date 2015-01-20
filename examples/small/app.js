
/*
Example showing that three planets (or x planets)
from the same starting point with the same speed size
but a different direction will end up on the same point
after some time.
 */

(function() {
  var DAY, KG, KG24, KM, M, SECOND, YEAR, canvas, m, r, universe, v;

  SECOND = Universe.SECOND, DAY = Universe.DAY, YEAR = Universe.YEAR, KG = Universe.KG, KG24 = Universe.KG24, M = Universe.M, KM = Universe.KM;

  universe = new Universe({
    speed: 365,
    accuracy: 10,
    scale: 1e-6
  });

  m = 1.989e30 * KG;

  r = 0.1496e12 * M;

  v = 30 * KM / SECOND;

  universe.addPlanet(m, [0, 0], [0, 0]);

  universe.addPlanet(5.976 * KG24, [r, 0], [0, v]);

  universe.addPlanet(0.0735 * KG24, [r + 384.4e6 * M, 0], [0, v + 1 * KM / SECOND, 0]);

  canvas = new Canvas(document.getElementById('canvas'));

  canvas.origin([10, 10]);

  canvas.scale((1 / 94e7) * 8e6);

  universe.loop(canvas);

}).call(this);
