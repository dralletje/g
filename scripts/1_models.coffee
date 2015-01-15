# Pixels for sun
sunSize = 20
G = 6.67384e-11

timespeed = .1
timespeed2 = timespeed*timespeed

class Planet
  constructor: (mass, position, speed, watch) ->
    @watch = watch
    @mass = mass

    # Size is (times the mass of the sun) * (pixels per sun)
    @size = Math.log(mass) * 5 + 10

    @p = position
    @s = speed.map((x) -> x*timespeed)
    @a = [0,0]

  draw: (context) ->
    # Draw size based on mass
    size = @size

    # Draw circle
    context.beginPath()
    context.arc @p[0], @p[1], size, 0, 2 * Math.PI
    context.strokeStyle = 'black'
    context.stroke()

    # Draw speedline
    context.beginPath()
    context.moveTo(@p[0],@p[1])
    scale = 50 / timespeed
    context.lineTo(@p[0]+(@s[0]*scale),@p[1]+(@s[1]*scale))
    context.strokeStyle = 'red'
    context.stroke()

    # Draw acceleration
    context.beginPath()
    context.moveTo(@p[0],@p[1])
    scale = 30e3 / timespeed2
    context.lineTo(@p[0]+(@a[0]*scale),@p[1]+(@a[1]*scale))
    context.strokeStyle = 'green'
    context.stroke()


  log: (args...) ->
    console.log @name + ':', args...


  move: ->
    #@log @s
    if @watch and (Math.random() > 0.95) then console.log @p.map Math.floor
    @p = [@p[0] + @s[0], @p[1] + @s[1]]


  accelerate: (entities) ->
    a = entities.filter (e) =>
      e isnt this

    .map (entitie) =>
      x = entitie.p[0] - @p[0]
      y = entitie.p[1] - @p[1]
      r2 = x*x + y*y

      if r2 is 0
        @log 'Null!'
        return [0,0]

      #console.log r2

      scaleDirection = 1 / Math.sqrt(r2)
      scaleForce = entitie.mass / r2
      t = [x, y]
        .map((x) -> x*scaleDirection)
        .map((x) -> x*scaleForce)

    .reduce (p, n) ->
      [p[0]+n[0], p[1]+n[1]]
    , [0,0]

    a = a.map (x) -> x / 10e4 * timespeed2
    a = a.map (x) ->
      m = .1
      if x > 0 then Math.min(m,x) else Math.max(-m,x)
    @a = a

    @s = [@s[0] + a[0], @s[1] + a[1]]
