getAcceleration = (distance, m2) ->
  G * m2 / (Math.pow(distance, 2))

#Remember: .arc(x, y, radius, startAngle, endAngle (2PI))
acceleration = 0.00002
rearth = 7


startDate = Date.now()

normalize = (v, times) ->
  length = Math.sqrt v.reduce (p, x) ->
    p + x*x
  , 0
  v = v.map (x) ->
    x / length

  if times?
    v.map (x) -> x*times
  else
    v

planets = [
  [10e7, [0,0], [0,0]] # Sun
  [0, [400,0], normalize([0,1], 1.5)] # Planet
  [0, [400,0], normalize([.6,.4], 1.5)]  # Planet
  [0, [400,0], normalize([-1.3,-1.2], 1.5)] # Planet
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
