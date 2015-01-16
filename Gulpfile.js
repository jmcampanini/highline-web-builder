var gulp = require('gulp');
var del = require('del');

gulp.task('clean', function() {
    del('build/web');
});


gulp.task('build', function() {

    // copy over the javascript files as is
    gulp.src('src/**/*.js')
        .pipe(gulp.dest('build/web/'));

});
