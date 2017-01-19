var gulp = require('gulp');
var scssConfig = require('../config').scss;
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync');

gulp.task('scss',function () {
    gulp.src('./src/scss/**/*.scss')
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(gulp.dest('./src/css'))
        .pipe(browserSync.reload({
            stream: true
        }));
});