getAcceleration = (distance, m2) ->
  G * m2 / (Math.pow(distance, 2))

my_canvas = document.getElementById("canvas")
context = my_canvas.getContext("2d")

#Remember: .arc(x, y, radius, startAngle, endAngle (2PI))
acceleration = 0.00002
rearth = 7


startDate = Date.now()


entities = [
  new Planet 10e6, [600,400], [0,0], 'Sun'
  new Planet 10, [800,400], [0,.8], 'Planet'
#  new Planet 8e29, [600+275,400], [0,0] # Farest planet
#  new Planet 4e29, [600+275+65,400], [0,0] # Moon of farest planet
]


#updating drawing function
drawingisfun = ->
  # Calculate time from start time
  c2 = (Date.now() - startDate) / 100
  context.clearRect 0, 0, my_canvas.width, my_canvas.height

  # redraw Sun
  for entitie in entities
    entitie.accelerate(entities)

  for entitie in entities
    entitie.move()
    entitie.draw(context)

  #calc values
  ###
  velocity2 = 0.005 #+(acceleration*c2);
  ObjectX2 = 600 + (R2 * Math.cos((velocity2 * c2)))
  ObjectY2 = 400 + (R2 * Math.sin((velocity2 * c2)))
  context.beginPath()
  context.arc ObjectX2, ObjectY2, 15, 0, 2 * Math.PI
  context.stroke()
  ###

  ###
  # Calc values
  velocity = 0.002 #+(acceleration*c2);
  #var ObjectX = 800+(velocity*c2);
  #var ObjectY = 85+(velocity2*c2);
  ObjectX = 600 + (R * Math.cos((velocity * c2)))
  ObjectY = 400 + (R * Math.sin((velocity * c2)))
  context.beginPath()
  context.arc ObjectX, ObjectY, 20, 0, 2 * Math.PI
  context.stroke()

  #draw the Moon
  velocity3 = 0.008
  MoonX = ObjectX + (R3 * Math.cos((velocity3 * c2)))
  MoonY = ObjectY + (R3 * Math.sin((velocity3 * c2)))
  context.beginPath()
  context.arc MoonX, MoonY, 10, 0, 2 * Math.PI
  context.stroke()
  ###

runit = setInterval(drawingisfun, 1)
