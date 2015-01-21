###
Example showing that three planets (or x planets)
from the same starting point with the same speed size
but a different direction will end up on the same point
after some time.
###

Universe = require '../../source/universe.coffee'
Canvas = require '../../source/canvas.coffee'

# Create a universe
{SECOND, DAY, YEAR, KG, KG24, M, KM} = Universe
universe = new Universe
  speed: 365

# Add the Sun
universe.addPlanet 1.989e30*KG, [0,0], [0,0]

# Add the earth
universe.addPlanet 5.976*KG24, [0.1496e12*M,0], [0,30*KM/SECOND]

# Add the moon
universe.addPlanet 0.0735*KG24, [(0.1496e12 + 384.4e6)*M,0], [0,(30+1)*KM/SECOND, 0]


canvas = new Canvas (document.getElementById 'canvas')
canvas.origin [400, 400]
canvas.scale 1/94000000
universe.loop canvas
