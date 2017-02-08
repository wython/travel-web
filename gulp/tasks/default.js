var gulp = require('gulp');
var config = require('../config');
var uglify = require('gulp-uglify');

if(config.debug){
    gulp.task('default',['js','scss','css','watch'],function () {

    });
}else {
    gulp.task('default',['js','scss','css'],function () {
        gulp.src( 'src/css/**/*.min.css' )
            .pipe( cleanCSS() )
            .pipe( gulp.dest('dist/src/css') );
        gulp.src( ['src/css/**/*.*', '!src/css/**/*.css'] )
            .pipe( gulp.dest('dist/src/css') );
        gulp.src( 'src/img/**/*.*' )
            .pipe( gulp.dest('dist/src/img') );
        gulp.src( 'src/js/**/*.min.js' )
            .pipe(uglify())
            .pipe( gulp.dest('dist/src/js') );
        gulp.src( './*.html' )
            .pipe( gulp.dest('dist') );
        console.log('build success');
    });
}
