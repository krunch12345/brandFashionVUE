const gulp = require('gulp'),
  browserSync = require('browser-sync').create(),
  sass = require('gulp-sass'),
  postcss = require('gulp-postcss'),
  autoprefixer = require('autoprefixer'),
  cssnano = require('cssnano'),
  sourcemaps = require('gulp-sourcemaps')

const paths = {
  styles: {
    src: 'src/sass/*.sass',
    dst: 'src/css',
    html: 'src/*.html',
  },
}

function style() {
  return gulp
    .src(paths.styles.src)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.styles.dst))
    .pipe(browserSync.stream())
}
exports.style = style

function reload() {
  browserSync.reload()
}

function watch() {
  browserSync.init({
    server: {
      baseDir: './src',
    },
  })
  gulp.watch(paths.styles.src, style)
  gulp.watch(paths.styles.html, reload)
}
exports.watch = watch
