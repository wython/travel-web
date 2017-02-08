var gulp = require('gulp');
var scssConfig = require('../config').scss;
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var gulp = require('gulp');
var config = require('../config').css;
var concat = require('gulp-concat');
var cleanCss = require('gulp-clean-css');
var browserSync = require('browser-sync').create();

gulp.task('watch',function () {
    //scss
    for(var key in scssConfig.all){
        console.log("开始监听"+scssConfig.all[key]+"的scss");
        //此处得用闭包包
        // var num = key;
        (function (num) {
            gulp.watch(scssConfig.all[num],function (cb) {
                console.log(scssConfig.all[num]);
                gulp.src(scssConfig.all[num])
                    .pipe(sass())
                    .pipe(autoprefixer())
                    .pipe(gulp.dest(scssConfig.dist+'/'+num +'/'))
                    .pipe(concat("/"+num+"/"+num+'.min.css'))
                    .pipe(cleanCss({'compatibility':'ie7','debug':true},function (details) {
                        console.log(details.name + ': ' + details.stats.originalSize);
                        console.log(details.name + ': ' + details.stats.minifiedSize);
                    }))
                    .pipe(gulp.dest(config.dist))
                    .pipe(browserSync.reload({
                        stream:true
                    }));
                console.log(num+"的scss搞定了");
            })
        })(key);
    }
    //css
    for(var key in config.all) {
        (function (key) {
            gulp.src(config.all[key])
                .pipe(concat("/"+key+"/"+key+".min.css"))
                .pipe(cleanCss({'compatibility':'ie7','debug':true},function (details) {
                    console.log(details.name + ': ' + details.stats.originalSize);
                    console.log(details.name + ': ' + details.stats.minifiedSize);
                }))
                .pipe(gulp.dest(config.dist))
                .pipe(browserSync.reload({
                    stream:true
                }));
        })(key);
    }
    gulp.watch('./src/js/**/*.js', browserSync.reload);
    browserSync.init({
        server:{
            baseDir:'.'
        }
    })
});