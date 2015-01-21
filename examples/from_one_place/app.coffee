###
Example showing that three planets (or x planets)
from the same starting point with the same speed size
but a different direction will end up on the same point
after some time.
###


Universe = require '../../source/universe.coffee'
Canvas = require '../../source/canvas.coffee'

# Create a universe
universe = new Universe
  speed: 1e0

# Add the Sun
universe.addPlanet 10e10, [0,0], [0,0]

# Add 40 planets with no mass
planets = 20
for i in [0...planets]
  speed = vector(
    Math.floor(Math.random()*100-50),
    Math.floor(Math.random()*100-50)
  ).norm().multiply(.1)
  universe.addPlanet 0, [400,0], speed


canvas = new Canvas (document.getElementById 'canvas')
canvas.origin [400, 400]
universe.loop canvas
