class Planet
  constructor: (mass, position, speed) ->
    @mass = mass
    @position = position
    @speed = speed

  draw: (context) ->
    # Draw size based on mass
    size = @mass

    context.beginPath()
    context.arc @position[0], @position[1], size, 0, 2 * Math.PI
    context.stroke()
