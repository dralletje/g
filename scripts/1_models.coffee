# Pixels for sun
sunSize = 50

class Planet
  constructor: (mass, position, speed) ->
    @mass = mass

    # Size is (times the mass of the sun) * (pixels per sun)
    @size = (mass / 2e30) * sunSize

    @position = position
    @speed = speed

  draw: (context) ->
    # Draw size based on mass
    size = @size

    context.beginPath()
    context.arc @position[0], @position[1], size, 0, 2 * Math.PI
    context.stroke()
