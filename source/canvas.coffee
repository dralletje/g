###
A place to draw on with vectors.

###

class Canvas
  constructor: (canvas_element) ->
    @el = canvas_element
    @ctx = canvas_element.getContext("2d")

    @o = Vector.null
    @s = 1

  # Settings
  origin: (o) -> # Position of the (0,0) on the canvas
    @o = Vector.fromArray o
    this
  scale: (x) -> # Every unit is x pixels
    @s = x
    this

  linecolor: (color) ->
    @ctx.strokeStyle = color
    this

  linewidth: (width) ->
    @ctx.lineWidth = width * @s
    this


  # Internal
  _convert: (p) ->
    p = if (not p.x?) or (not p.y?) then Vector.fromArray(p) else p
    @o.plus p.multiply(@s)

  # Drawing functions
  circle: (p, r) ->
    @ctx.beginPath()
    p_ = @_convert p
    @ctx.arc p_.x, p_.y, r*@s, 0, 2 * Math.PI
    @ctx.stroke()
    this

  line: (from, to) ->
    @ctx.beginPath()
    from_ = @_convert from
    to_ = from_.plus(to.multiply @s)
    @ctx.moveTo from_.x, from_.y
    @ctx.lineTo to_.x, to_.y
    @ctx.stroke()
    this

  clear: (color) ->
    color ?= 'rgba(255,255,255,1)'
    @ctx.fillStyle = color
    @ctx.fillRect 0, 0, @el.width, @el.height

# Export it to the world!
window.Canvas = Canvas
