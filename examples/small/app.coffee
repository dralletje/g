###
Example showing that three planets (or x planets)
from the same starting point with the same speed size
but a different direction will end up on the same point
after some time.
###

# Create a universe
{SECOND, DAY, YEAR, KG, KG24, M, KM} = Universe
universe = new Universe
  speed: 365
  accuracy: 10
  scale: 1e-6

m = 1.989e30*KG
r = 0.1496e12*M
v = 30*KM/SECOND

# Add the Sun!
universe.addPlanet m, [0,0], [0,0]

# Add the earth!
universe.addPlanet 5.976*KG24, [r,0], [0,v]

# Add the moon!
universe.addPlanet 0.0735*KG24, [r + 384.4e6*M,0], [0,v+1*KM/SECOND, 0]


canvas = new Canvas (document.getElementById 'canvas')
canvas.origin [10, 10]
canvas.scale (1/94e7)*8e6
universe.loop canvas
