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

gulp.task "less", ->
  gulp.src(lesspath)
  .pipe(plumber())
  .pipe(less())
  .pipe(concat "style.css")
  .pipe(gulp.dest DIST)

gulp.task "coffee-lib", ->
  gulp.src(coffeepath)
  .pipe(plumber())
  .pipe(coffee bare: true)
  .pipe(concat "g.js")
  .pipe(header '"use strict"; \n')
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
