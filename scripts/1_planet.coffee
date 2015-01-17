###
A planet, floating around in the universe.
Pulled by his friends and pushed by love.
###

#G = 6.67384e-11

class Planet
  constructor: (mass, position, speed, timespeed) ->
    # Try to convert from array to vector
    if position instanceof Array
      position = Vector.fromArray position
    if speed instanceof Array
      speed = Vector.fromArray speed

    # If there is not way to convert.. die!!! :-D
    if position not instanceof Vector
      throw new TypeError 'Position should be a Vector'
    if speed not instanceof Vector
      throw new TypeError 'Speed should be a Vector'

    # Timespeed multiplies all accelerations and speeds
    @timespeed = timespeed
    @timespeed2 = timespeed*timespeed

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
      .linecolor('black')
      .circle(@p, @size)
      .circle(@p, 5) # And one to determine the center


    canvas.linewidth('3')

    # Draw speedline
    scale = 50 / @timespeed
    canvas.linecolor('red').line(@p, @s.multiply scale)

    # Draw acceleration
    scale = 10000 / @timespeed2
    canvas.linecolor('green').line(@p, @a.multiply scale)

  move: ->
    #if @watch and (Math.random() > 0.95) then console.log @p.map Math.floor
    @p = @p.plus @s


  accelerate: (entities) ->
    now = performance.now()
    a = fast.filter entities, (e) =>
      # Do not take in account yourself :p
      e isnt this

    a = fast.filter a, (e) ->
      # Dont even try to calculate massless bodies
      e.mass isnt 0

    a = fast.map a, (entitie) =>
      # Calculate the acceleration to every other planet
      dp = entitie.p.minus @p
      r2 = dp.size2()

      if r2 is 0 # Problems with dividing by zero
        return Vector.null

      # Real distance between the two planets
      r = Math.sqrt(r2)
      force = entitie.mass / r2
      # Determine direction vector and multiply it by the force
      dp.divide(r).multiply(force)

    a = fast.reduce a, (p, n) ->
      p.plus n
    , Vector.null

    @a = a
      .divide(10e4).multiply(@timespeed2) # Random compensator
      .map (x) -> # Prevent too high speeds
        m = .1
        if x > 0 then Math.min(m,x) else Math.max(-m,x)

    console.log 'Got a:', (performance.now() - now)
    @s = @s.plus @a
