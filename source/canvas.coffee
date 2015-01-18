###
A place to draw on with vectors.

###

class Canvas
  constructor: (canvas_element) ->
    @el = canvas_element
    @ctx = canvas_element.getContext("2d")
    @o = Vector.null

  # Settings
  origin: (o) ->
    @o = Vector.fromArray o
    this

  linecolor: (color) ->
    @ctx.strokeStyle = color
    this

  linewidth: (width) ->
    @ctx.lineWidth = '3'
    this


  # Internal
  _fromOrigin: (p) ->
    p = if p instanceof Array then Vector.fromArray(p) else p
    @o.plus p

  # Drawing functions
  circle: (p, r) ->
    @ctx.beginPath()
    p_ = @_fromOrigin p
    @ctx.arc p_.x, p_.y, r, 0, 2 * Math.PI
    @ctx.stroke()
    this

  line: (from, to) ->
    @ctx.beginPath()
    from_ = @_fromOrigin from
    to_ = from_.plus to
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
