###
A planet, floating around in the universe.
Pulled by his friends and pushed by love.
###

{Vector, vector} = require './vector-immutable.coffee'

class Planet
  constructor: (mass, position, speed) ->
    # Try to convert from array to vector
    if position instanceof Array
      position = Vector.fromArray position
    if speed instanceof Array
      speed = Vector.fromArray speed

    # If there is not way to convert.. die!!! :-D
    if not position.x?
      throw new TypeError 'Position should be a Vector'
    if not speed.x?
      throw new TypeError 'Speed should be a Vector'

    @mass = mass
    @p = position
    @s = speed
    @a = Vector.null

    # Size is a function of the mass, to keep it easy
    @size = Math.max 10, (Math.log(mass) * 5 + 10)

  draw: (canvas) ->
    # Draw circle
    canvas
      .linewidth('2')
      .linecolor('rgba(0,0,0,1)') #.linecolor('black')
      .circle(@p, @size)
      .circle(@p, 2/canvas.s) # And one to determine the center


    canvas.linewidth('3')

    # Draw speedline
    scale = 50 / @timespeed
    canvas.linecolor('rgba(255,0,0,1)').line(@p, @s.multiply scale)

    # Draw acceleration
    scale = 1000 / @timespeed2
    canvas.linecolor('rgba(0,255,0,1)').line(@p, @a.multiply scale)

  move: (timespeed) ->
    #if @watch and (Math.random() > 0.95) then console.log @p.map Math.floor
    @p = @p.plus @s.multiply(timespeed)


  accelerate: (entities, timespeed, G) ->
    #now = performance.now()
    a = fast.map entities, (entitie) =>
      if entitie is this or entitie.mass is 0
        return Vector.null

      # Calculate the acceleration to every other planet
      dp = entitie.p.minus @p
      r2 = dp.size2()

      if r2 is 0 # Problems with dividing by zero
        return Vector.null

      # Real distance between the two planets
      force = entitie.mass / (r2 * Math.sqrt(r2))
      # Determine direction vector and multiply it by the force
      dp.multiply(force)

    a = fast.reduce a, (p, n) ->
      p.plus n
    , Vector.null

    @a = a.multiply(timespeed * G) # Random compensator
    @s = @s.plus @a

# Export it to the world!
module.exports = Planet
