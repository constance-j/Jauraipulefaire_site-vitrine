var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var runSequence = require('run-sequence');
var autoprefixer = require('gulp-autoprefixer');
var postcss = require('gulp-postcss');
var pxtorem = require('postcss-pxtorem');


gulp.task('watch', ['browserSync', 'sass'], function(){
  // Run sass compilation task whenever SASS files change
  gulp.watch('app/scss/*.scss', ['sass']);
  // Reloads the browser whenever HTML or JS files change
  gulp.watch('app/*.html', browserSync.reload); 
});

// Converts Sass to CSS and prefix
gulp.task('sass', function(){
  var processors = [
        pxtorem({
            replace: false,
            propWhiteList: []
        })
  ];

  return gulp.src('app/scss/main.scss')
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(postcss(processors))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

// Hot reload 
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  })
});

/* Default task which compiles sass and html includes, run hot reload and watch for changes */
gulp.task('default', function (callback) {
  runSequence(['sass','browserSync', 'watch'],
    callback
  )
});