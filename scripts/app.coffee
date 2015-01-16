getAcceleration = (distance, m2) ->
  G * m2 / (Math.pow(distance, 2))

planets = [
  [10e7, [0,0], [0,0]] # Sun
  [0, [400,0], Vector(0,1).norm().multiply(1.5)] # Planet
  [0, [400,0], Vector(.6,-.4).norm().multiply(1.5)]  # Planet
  [0, [400,0], Vector(-1.3,-1.2).norm().multiply(1.5)] # Planet
]

###
planets = [
  [10e7, [0,0], [0,-1.5]] # Sun
  [10e7, [300,0], [0,1.5]] # Sun
  [10e3, [600,0], [0,1.2]]  # Planet
  #[10e4, [400,0], [0,-1]]  # Planet
]
###

universe = new Universe
  timespeed: 10e-3

for planetArgs in planets
  universe.addPlanet planetArgs...

canvas = new Canvas (document.getElementById 'canvas')
canvas.origin [400, 400]
universe.loop canvas
