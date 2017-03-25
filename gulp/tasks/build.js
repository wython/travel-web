/**
 * Created by wython on 2017/3/25.
 */
const gulp = require('gulp');
const webpackConfig = require('../../webpack.config')(false);
const webpack = require('webpack');
const del = require('del');

const state = {
    colors: true,
    reasons: false,
    chunks: false, //屏蔽(react)模块的一些明细
    chunkModules: false,
    chunkOrigins: false,
    modules: false,
    cached: false,
    cachedAssets: false,
    children: false,
    warning: false,
    progress: true
};

gulp.task('build', function (callback) {
    del([
        'server/public/**/*'
    ], callback);
    return webpack(webpackConfig, function (error) {
        if (error) {
            console.log('webpack:', error);
            callback();
        }
    });
    console.log('build success!!');
});