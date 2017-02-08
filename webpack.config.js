var webpack = require('webpack');
var config = require('./gulp/config');

var publicPath = config.debug?'/src/js/':'/dist/js/';
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    watch: true,    //监听变化自动编译
    entry: {
        'index': './src/js/index.js'
    },
    output: {
        path:'/src/js/',
        filename: '[name].min.js',
        publicPath: publicPath,
        chunkFilename:'lazy/[id].chunk.js'
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
            },
            {
                test: /\.js$/,
                //js转换
                loader: "babel",
                query: {
                    presets: ['es2015','react'],
                    plugins: [['import',{'libraryName':'antd',"libraryDirectory": "lib",'style':'css'}]]
                }
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin("common.min.js"),
        new ExtractTextPlugin('../css/[name].css',{allChunks:true})  //代码分割的css也会被打包出来
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false
        //     }
        // }),
    ]
};