var gulp = require('gulp');
var del = require('del');
var csslint = require('gulp-csslint');
var scsslint = require('gulp-scss-lint');
var eslint = require('gulp-eslint');
var tslint = require('gulp-tslint');

//var less = require('gulp-less');
//var sourcemaps = require('gulp-sourcemaps');

gulp.task('clean', function () {
    del('build/');
});

gulp.task('check', ['check-css', 'check-sass', 'check-js', 'check-ts'], function () {
    // do nothing
});

gulp.task('check-css', function () {
    return gulp.src('src/**/*.css')
        .pipe(csslint())
        .pipe(csslint.reporter())
        .pipe(csslint.failReporter());
});

gulp.task('check-sass', function () {
    return gulp.src('src/**/*.scss')
        .pipe(scsslint())
        .pipe(scsslint.failReporter());
});

gulp.task('check-js', function () {
    return gulp.src('src/**/*.js')
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failOnError());
});

gulp.task('check-ts', function () {
    return gulp.src('src/**/*.ts')
        .pipe(tslint())
        .pipe(tslint.report('verbose'));
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
