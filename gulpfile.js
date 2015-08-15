var gulp = require('gulp');
var concat = require('gulp-concat');
var serve = require('gulp-serve');
var rm = require('gulp-rm');

var closureCompiler = require('gulp-closure-compiler');

gulp.task('concat', function() {
    return gulp.src('./src/**/*.js')
               .pipe(concat('game.js'))
               .pipe(gulp.dest('./dist'));
});

gulp.task('compile', ['concat'], function() {
   return gulp.src('./dist/game.js')
       .pipe(closureCompiler({
          compilerPath: 'bower_components/closure-compiler/lib/vendor/compiler.jar',
          fileName: 'game.min.js',
          compilerFlags: {
            compilation_level: 'ADVANCED_OPTIMIZATIONS'
          }
        }))
       .pipe(gulp.dest('./dist'));
});

gulp.task('dist', ['compile'], function() {
    return gulp.src('dist/game.js')
        .pipe(rm());
});

gulp.task('serve', serve('./src'));