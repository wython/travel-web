var webpack = require('webpack');
var config = require('./gulp/config');

var publicPath = config.debug?'./src/js/lazys/':'./dist/js/lazys/';

module.exports = {
    watch: true,    //监听变化自动编译
    entry: {
        'index': './src/js/index.js'
    },
    output: {
        filename: '[name].min.js',
        publicPath: publicPath,
        chunkFilename:'[name].min.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                //js转换
                loader: "babel-loader",
                query: {
                    presets: ['es2015','react']
                }
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin("common.min.js")
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false
        //     }
        // }),
    ]
};