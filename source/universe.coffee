###
Represents a universe with planets floating around in it..
Floaty float.. floaty float...
###

class Universe
  constructor: (options) ->
    {@timespeed} = options

    @imespeed ?= 1
    @planets = []
    @origin = Vector.null

  # Add a planet to the universe!
  addPlanet: (mass, position, speed) ->
    planet = new Planet mass, position, speed, @timespeed
    @planets.push planet


  # Simulate it (Calculate the next position for the next `t` ticks)
  run: (t) ->
    for i in [0...t]
      for planet in @planets
        planet.accelerate(@planets)
      for planet in @planets
        planet.move()
    return


  # Draw every planet on the canvas
  draw: (canvas) ->
    for planet in @planets
      planet.draw canvas


  # TODO: Split this function up or something, this is ugly
  loop: (canvas, speed) ->
    speed ?= 2
    # Acces the canvas drawing context

    # Set this out of the loop scope
    history = performance.now()
    setInterval =>
      # Calculate time since previous draw (on chrome the average was 6)
      seconds = performance.now() - history
      history = performance.now()
      seconds = Math.min(seconds, 20) # Max 20 calculations per iteration

      # Clear the canvas (or dont :-D)
      canvas.clear()
      #canvas.clear('rgba(255,255,255,.01)')

      # run the cycle for every lost millisecond
      @run seconds * speed
      @draw canvas
    , 1

# Export it to the world!
window.Universe = Universe
