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
    @size = if mass < 1
      10
    else
      Math.log(mass) * 5 + 10

  draw: (canvas) ->
    # Draw circle

    canvas
      .linewidth('2')
      .linecolor('black')
      .circle(@p, @size)
      .circle(@p, 5)


    canvas.linewidth('3')

    # Draw speedline
    scale = 50 / @timespeed
    speed_to = @p.plus (@s.multiply scale)
    canvas.linecolor('red').line(@p, speed_to)

    # Draw acceleration
    scale = 10000 / @timespeed2
    acceleration_to = @p.plus (@a.multiply scale)
    canvas.linecolor('green').line(@p, acceleration_to)

  move: ->
    #if @watch and (Math.random() > 0.95) then console.log @p.map Math.floor
    @p = @p.plus @s


  accelerate: (entities) ->
    @a = entities.filter (e) =>
      # Do not take in account yourself :p
      e isnt this

    .map (entitie) =>
      # Calculate the acceleration to every other planet
      dp = entitie.p.minus @p
      r2 = dp.size2()

      if r2 is 0 # Problems with dividing by zero
        return Vector.null

      r = Math.sqrt(r2)
      force = entitie.mass / r2
      # Determine direction vector and multiply it by the force
      dp.divide(r).multiply(force)

    .reduce (p, n) ->
      p.plus n
    , Vector.null

    .divide(10e4).multiply(@timespeed2) # Random compensator
    .map (x) -> # Prevent too high speeds
      m = .1
      if x > 0 then Math.min(m,x) else Math.max(-m,x)

    @s = @s.plus @a
