###
Example showing that three planets (or x planets)
from the same starting point with the same speed size
but a different direction will end up on the same point
after some time.
###

# Create a universe
universe = new Universe
  timespeed: 5e-2

# Add the Sun
universe.addPlanet 10e7, [0,0], [0,0]

# Add 40 planets with no mass
planets = 40
for i in [0...planets]
  speed = Vector(
    Math.floor(Math.random()*100-50),
    Math.floor(Math.random()*100-50)
  ).norm().multiply(1.5)
  universe.addPlanet 0, [400,0], speed


canvas = new Canvas (document.getElementById 'canvas')
canvas.origin [400, 400]
universe.loop canvas
