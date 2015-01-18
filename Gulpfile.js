var gulp = require('gulp');
var del = require('del');
var csslint = require('gulp-csslint');

//var less = require('gulp-less');
//var sourcemaps = require('gulp-sourcemaps');

gulp.task('clean', function () {
    del('build/');
});

gulp.task('check', function () {
    gulp.src('src/**/*.css')
        .pipe(csslint())
        .pipe(csslint.reporter())       // display errors
        .pipe(csslint.failReporter());  // fail on errors
});

//gulp.task('build', ['less'], function() {
//
//    // copy over the javascript files as is
//    gulp.src('src/**/*.js')
//        .pipe(gulp.dest('build/web/'));
//});
//
//gulp.task('less', function() {
//    gulp.src('src/**/*.less')
//        .pipe(sourcemaps.init())
//        .pipe(less())
//        .pipe(sourcemaps.write('.'))
//        .pipe(gulp.dest('build/web/'));
//});
