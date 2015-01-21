gulp = require 'gulp'
plumber = require 'gulp-plumber'

source = require 'vinyl-source-stream2'
browserify = require 'browserify'
uglify = require 'gulp-uglify'

p = require 'path'

DIST = "build/"

libpath = "source/*.coffee"
examplespath = './examples/**/*.coffee'

bundle = (file) ->
  dir = p.dirname file
  bundler = browserify file, extension: '.coffee'
  bundler.transform 'coffeeify'

  bundler.bundle()
    .pipe(source('app.js'))
    .pipe(plumber())
    .pipe(uglify())
    .pipe(gulp.dest(dir))

gulp.task "coffee", ->
  gulp.src(examplespath, read: no)
    .on 'readable', ->
      bundle @read().path


# Rerun the task when a file changes
gulp.task "watch", ->
  gulp.watch libpath, ["coffee"]

  gulp.src(examplespath, read: no).on 'readable', ->
    {path} = @read()
    gulp.watch path, ->
      bundle path

gulp.task "default", [
  "coffee"
]
