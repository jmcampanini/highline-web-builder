var gulp = require('gulp');
var del = require('del');
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('clean', function() {
    del('build/web');
});


gulp.task('build', ['less'], function() {

    // copy over the javascript files as is
    gulp.src('src/**/*.js')
        .pipe(gulp.dest('build/web/'));
});

gulp.task('less', function() {
    gulp.src('src/**/*.less')
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('build/web/'));
});
