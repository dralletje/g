###
Represents a Vector in 2D space
---
All methods on a vector are pure, a vector is immutable.
###

class Vector
  constructor: (x,y) ->
    if Number.isNaN(x) or Number.isNaN(y)
      throw new TypeError "Can\'t handle NaN: (#{x}, #{y})"

    if this not instanceof Vector
      return new Vector x, y

    @x = x
    @y = y


  @fromArray: (array) ->
    new Vector array[0], array[1]

  # Null vector
  @null: Vector.fromArray [0,0]

  toArray: ->
    [@x, @y]


  # Collection funtions (Vector is collection of numbers)
  map: (fn) ->
    new Vector fn(@x), fn(@y)

  # Create a new vector from a function over two vectors
  zipWith: (input, fn) ->
    # if v is not a vector but a value, make it a vector
    v = if input instanceof Vector
        input
      else
        x:input, y:input
    new Vector fn(@x, v.x), fn(@y, v.y)


  # Basic mathamatical operations
  plus: (input) ->
    @zipWith input, (x,y) -> x + y

  minus: (input) ->
    @zipWith input, (x,y) -> x - y

  multiply: (input) ->
    @zipWith input, (x,y) -> x * y

  divide: (input) ->
    if input instanceof Vector
      @zipWith input, (x,y) -> x / y
    else
      @multiply(1 / input) # Divide once and multiply the rest, read it was faster


  # Basic Vector functions
  size2: -> # Squared size
    @x*@x + @y*@y

  size: -> # Not squared size
    Math.sqrt @size2()

  norm: -> # Create a vector with size 1
    @divide @size()
