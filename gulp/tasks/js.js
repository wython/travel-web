var gulp = require('gulp');
var config = require('../config');
var webpack = require('gulp-webpack');

gulp.task('js',function () {
    gulp.src(config.js.all)
        .pipe(webpack(require('../../webpack.config')))
        .pipe(gulp.dest(config.js.dist));
});