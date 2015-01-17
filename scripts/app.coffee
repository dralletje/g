###
Example showing that three planets (or x planets)
from the same starting point with the same speed size
but a different direction will end up on the same point
after some time.
###

planets = [
  [] # Sun
  [0, [400,0], Vector(0,1).norm().multiply(1.5)] # Planet
  [0, [400,0], Vector(.6,-.4).norm().multiply(1.5)]  # Planet
  [0, [400,0], Vector(-1.3,-1.2).norm().multiply(1.5)] # Planet
]

# Create a universe
universe = new Universe
  timespeed: 5e-2

# Add the planets to the universe
universe.addPlanet 10e7, [0,0], [0,-.5]
universe.addPlanet 10e7, [800,0], [0,.5]

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
