// Import Dependencies
const gulp = require('gulp');
const uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');

// Define the 'minify' task to minify JavaScript files
gulp.task('minify', function () {
  // Source the JavaScript files
  return gulp.src('src/scripts/**/*.js')
    // Pipe the files through the uglify function
    .pipe(uglify())
    // Output the minified files to the 'build' directory
    .pipe(gulp.dest('build'));
});

// Define the 'minify-css' task to minify CSS files
gulp.task('minify-css', function () {
  // Source the CSS files
  return gulp.src('src/styles/**/*.css')
    // Pipe the files through the cleanCSS function with compatibility for IE8
    .pipe(cleanCSS({compatibility: 'ie8'}))
    // Output the minified files to the 'build' directory
    .pipe(gulp.dest('build'));
});

// Define the 'build' task to run 'minify' and 'minify-css' in parallel
gulp.task('build', gulp.parallel('minify', 'minify-css'));

// Define the 'default' task
gulp.task('default', gulp.series('build'));