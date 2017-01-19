var gulp = require('gulp');
var config = require('../config').css;
var concat = require('gulp-concat');
var cleanCss = require('gulp-clean-css');

gulp.task('css',function () {
    for(var key in config.all) {
        (function (key) {
            gulp.src(config.all[key])
                .pipe(concat("/"+key+"/"+key+".min.css"))
                .pipe(cleanCss({'compatibility':'ie7','debug':true},function (details) {
                    console.log(details.name + ': ' + details.stats.originalSize);
                    console.log(details.name + ': ' + details.stats.minifiedSize);
                }))
                .pipe(gulp.dest(config.dist))
        })(key);
    }
});