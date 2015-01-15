var Planet, sunSize;

sunSize = 50;

Planet = (function() {
  function Planet(mass, position, speed) {
    this.mass = mass;
    this.size = (mass / 2e30) * sunSize;
    this.position = position;
    this.speed = speed;
  }

  Planet.prototype.draw = function(context) {
    var size;
    size = this.size;
    context.beginPath();
    context.arc(this.position[0], this.position[1], size, 0, 2 * Math.PI);
    return context.stroke();
  };

  return Planet;

})();

var G, R, R2, R3, acceleration, context, drawingisfun, getAcceleration, my_canvas, rearth, runit, startDate, sun;

getAcceleration = function(distance, m2) {
  return G * m2 / (Math.pow(distance, 2));
};

my_canvas = document.getElementById("canvas");

context = my_canvas.getContext("2d");

G = 6.67384e-11;

acceleration = 0.00002;

rearth = 7;

R = 275;

R2 = 150;

R3 = 65;

startDate = Date.now();

sun = new Planet(2e30, [600, 400], [0, 0]);

drawingisfun = function() {
  var MoonX, MoonY, ObjectX, ObjectX2, ObjectY, ObjectY2, c2, velocity, velocity2, velocity3;
  c2 = (Date.now() - startDate) / 2;
  context.clearRect(0, 0, my_canvas.width, my_canvas.height);
  sun.draw(context);
  velocity = 0.002;
  ObjectX = 600 + (R * Math.cos(velocity * c2));
  ObjectY = 400 + (R * Math.sin(velocity * c2));
  context.beginPath();
  context.arc(ObjectX, ObjectY, 20, 0, 2 * Math.PI);
  context.stroke();
  velocity2 = 0.005;
  ObjectX2 = 600 + (R2 * Math.cos(velocity2 * c2));
  ObjectY2 = 400 + (R2 * Math.sin(velocity2 * c2));
  context.beginPath();
  context.arc(ObjectX2, ObjectY2, 15, 0, 2 * Math.PI);
  context.stroke();
  velocity3 = 0.008;
  MoonX = ObjectX + (R3 * Math.cos(velocity3 * c2));
  MoonY = ObjectY + (R3 * Math.sin(velocity3 * c2));
  context.beginPath();
  context.arc(MoonX, MoonY, 10, 0, 2 * Math.PI);
  return context.stroke();
};

runit = setInterval(drawingisfun, 10);
