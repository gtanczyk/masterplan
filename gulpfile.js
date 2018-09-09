var gulp = require('gulp');
var concat = require('gulp-concat');
var deploy = require('gulp-gh-pages');
var serve = require('gulp-serve');
var rm = require('gulp-rm');
var minifyCss = require('gulp-clean-css');
var htmlreplace = require('gulp-html-replace');
var closureCompiler = require('gulp-closure-compiler');
var inlineImages = require('gulp-inline-images');
var inline = require('gulp-inline');
var zip = require('gulp-zip');

gulp.task('clean', function() {
    gulp.src('dist/**/*')
        .pipe(rm());
});

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
            compilation_level: 'ADVANCED_OPTIMIZATIONS',
            output_wrapper: '(function(){%output%}).call(window);',
            define: [ "DEBUG=false" ],
            "language_in": "ECMASCRIPT6",
            "language_out": "ES5"
          }
        }))
       .pipe(gulp.dest('./dist'));
});

gulp.task('minify-css', function() {
    return gulp.src('./src/css/main.css')
               .pipe(minifyCss())
               .pipe(gulp.dest('./dist'));
});

gulp.task('compile-html', function() {
    return gulp.src('./src/index.html')
        .pipe(inlineImages({})) 
        .pipe(htmlreplace({
            'css': 'main.css',
            'js': 'game.min.js'
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('dist', ['compile-html', 'compile', 'minify-css'], function() {
    return gulp.src('dist/game.js')
        .pipe(rm());
});

gulp.task('inline', ['dist'], function() {
    return gulp.src('dist/index.html')
    .pipe(inline({
        base: 'dist/'
    }))
    .pipe(gulp.dest('dist/'));
});

gulp.task('package', ['inline'], function() {
    return gulp.src(['dist/index.html'])
        .pipe(zip('masterplan.zip'))
        .pipe(gulp.dest('dist'));
});

gulp.task('deploy', ['inline'], function() {
    return gulp.src("./dist/index.html")
      .pipe(deploy())
});

gulp.task('serve', serve('./src'));
gulp.task('serve:dist', serve('./dist'));