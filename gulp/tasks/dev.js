/**
 * Created by wython on 2017/3/25.
 */

const gulp = require('gulp');
const webpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const webpackConfig = require('../../webpack.config')(true);

gulp.task('dev', function () {
    let devStats = {
        colors: true,
        reasons: false,
        chunks: false,
        chunkModules: false,
        chunkOrigins: false,
        modules: false,
        cached: false,
        cachedAssets: false,
        children: false,
        warning: false,
        progress: true
    };
    let serverConfig = {
        contentBase: 'dist',
        stats: devStats,
        hot: true
    };
    new webpackDevServer(webpack(webpackConfig), serverConfig).listen(9999, 'localhost' ,function (error) {
        console.log('Open the browser in http://localhost:9999 to see the page');
        if (error) {
            console.log(error);
        }
    })
});
