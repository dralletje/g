gulp = require("gulp")
plumber = require("gulp-plumber")

coffee = require("gulp-coffee")
less = require("gulp-less")
concat = require("gulp-concat")
header = require("gulp-header")
rename = require("gulp-rename")

DIST = "build/"

lesspath = "styles/*.css"
coffeepath = "**/*.coffee"

gulp.task "less", ->
  gulp.src(lesspath)
  .pipe(plumber())
  .pipe(less())
  .pipe(concat "style.css")
  .pipe(gulp.dest DIST)


# # # # # # # # #
source = require 'vinyl-source-stream2'
browserify = require 'browserify'
uglify = require 'gulp-uglify'
dir = './examples/small/'

bundler = browserify dir + 'app.coffee', extension: '.coffee'
bundler.transform 'coffeeify'

gulp.task "coffee", ->
  bundler.bundle()
    .pipe(source('app.js'))
    .pipe(plumber())
    .pipe(uglify())
    .pipe(gulp.dest(dir))


# Rerun the task when a file changes
gulp.task "watch", ->
  gulp.watch lesspath, ["less"]
  gulp.watch coffeepath, ["coffee"]

gulp.task "default", [
  "less"
  "coffee"
]
