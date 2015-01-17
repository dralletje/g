###
A planet, floating around in the universe.
Pulled by his friends and pushed by love.
###

#G = 6.67384e-11
G = 10e4

class Planet
  constructor: (mass, position, speed, timespeed) ->
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

    # Timespeed multiplies all accelerations and speeds
    @timespeed = timespeed
    @timespeed2 = timespeed*timespeed
    @G = @timespeed2 / G

    @mass = mass
    @p = position
    @s = speed.multiply @timespeed
    @a = Vector.null

    # Size is a function of the mass, to keep it easy
    @size = Math.max 10, (Math.log(mass) * 5 + 10)

  draw: (canvas) ->
    # Draw circle
    canvas
      .linewidth('2')
      .linecolor('rgba(0,0,0,1)') #.linecolor('black')
      .circle(@p, @size)
      .circle(@p, 5) # And one to determine the center


    canvas.linewidth('3')

    # Draw speedline
    scale = 50 / @timespeed
    canvas.linecolor('rgba(255,0,0,1)').line(@p, @s.multiply scale)

    # Draw acceleration
    scale = 1000 / @timespeed2
    canvas.linecolor('rgba(0,255,0,1)').line(@p, @a.multiply scale)

  move: ->
    #if @watch and (Math.random() > 0.95) then console.log @p.map Math.floor
    @p = @p.plus @s


  accelerate: (entities) ->
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

    @a = a.multiply(@G) # Random compensator
    @s = @s.plus @a
