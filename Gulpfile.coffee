gulp = require("gulp")
plumber = require("gulp-plumber")

coffee = require("gulp-coffee")
less = require("gulp-less")
concat = require("gulp-concat")
header = require("gulp-header")
rename = require("gulp-rename")

DIST = "build/"

lesspath = "styles/*.css"
coffeepath = "source/*.coffee"
examplespath = "examples/**/*.coffee"

# # # # # # # # #
sourcemaps = require 'gulp-sourcemaps'
source = require 'vinyl-source-stream'
buffer = require 'vinyl-buffer'
watchify = require 'watchify'
browserify = require 'browserify'

dir = './examples/small/'

bundler = watchify browserify(dir + 'app.coffee', watchify.args)
# add any other browserify options or transforms here
bundler.transform 'coffeeify'


bundle = () ->
  bundler.bundle()
    .pipe(plumber())
    .pipe(source('app.js'))
    # optional, remove if you dont want sourcemaps
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true})) # loads map from browserify file
    .pipe(sourcemaps.write('./')) # writes .map file
    #
    .pipe(gulp.dest(dir))

gulp.task 'js', bundle # so you can run `gulp js` to build the file
bundler.on 'update', bundle # on any dep update, runs the bundler






gulp.task "less", ->
  gulp.src(lesspath)
  .pipe(plumber())
  .pipe(less())
  .pipe(concat "style.css")
  .pipe(gulp.dest DIST)

gulp.task "coffee-lib", ->
  gulp.src(coffeepath)
  .pipe(plumber())
  .pipe(coffee())
  .pipe(concat "g.js")
  .pipe(header '"use strict" \n')
  .pipe(gulp.dest DIST)

gulp.task "coffee-examples", ->
  gulp.src(examplespath)
  .pipe(plumber())
  .pipe(coffee())
  .pipe(rename (path) ->
    path.extname = '.js'
    path
  ).pipe(gulp.dest 'examples')


# Rerun the task when a file changes
gulp.task "watch", ->
  gulp.watch lesspath, ["less"]
  gulp.watch coffeepath, ["coffee-lib"]
  gulp.watch examplespath, ["coffee-examples"]

gulp.task "default", [
  "less"
  "coffee-lib"
  "coffee-examples"
]
