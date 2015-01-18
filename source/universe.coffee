###
Represents a universe with planets floating around in it..
Floaty float.. floaty float...
###

class Universe
  # Some constants about time, mass and length
  @SECOND = 1
  @DAY = 86400
  @YEAR = 3.15569e7

  @KG = 1
  @KG24 = 1e24

  @M = 1
  @KM = 1e3

  @G = 6.67384e-11

  constructor: (opts= {}) ->
    @opts =
      speed: opts.speed or 1
      accuracy: opts.accuracy or 1
    @opts.speed = @opts.speed / @opts.accuracy

    @planets = []
    @t = 0

  # Add a planet to the universe!
  addPlanet: (mass, position, speed) ->
    planet = new Planet mass, position, speed, @opts
    @planets.push planet


  # Simulate it (Calculate the next position for the next `t` ticks)
  run: (t) ->
    speed = @opts.speed
    planets = @planets
    for i in [0...t]
      for planet in planets
        planet.accelerate planets, speed, Universe.G
      for planet in planets
        planet.move speed
    return


  # Draw every planet on the canvas
  draw: (canvas) ->
    for planet in @planets
      planet.draw canvas


  # TODO: Split this function up or something, this is ugly
  loop: (canvas) ->
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
      @run seconds
      @draw canvas
    , 1

# Export it to the world!
window.Universe = Universe
