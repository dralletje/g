getAcceleration = (distance, m2) ->
  G * m2 / (Math.pow(distance, 2))

my_canvas = document.getElementById("canvas")
context = my_canvas.getContext("2d")

#Remember: .arc(x, y, radius, startAngle, endAngle (2PI))
acceleration = 0.00002
rearth = 7


startDate = Date.now()


entities = [
  new Planet 10e8, [300,400], [0,0] # Sun
  new Planet 10e4, [900,400], [0,-.7] # Second sun
  new Planet 10, [1100,400], [0,.5]# Planet
  new Planet 10, [100,400], [0,5]# Planet
#  new Planet 10e2, [1000,400], [0,.5] # Farest planet
#  new Planet 4e29, [600+275+65,400], [0,0] # Moon of farest planet
]


#updating drawing function
drawingisfun = ->
  # Calculate time from start time
  c2 = (Date.now() - startDate) / 100
  #context.clearRect 0, 0, my_canvas.width, my_canvas.height

  # redraw Sun
  for entitie in entities
    entitie.accelerate(entities)

  for entitie in entities
    entitie.move()
    entitie.draw(context)

runit = setInterval(drawingisfun, 1)
