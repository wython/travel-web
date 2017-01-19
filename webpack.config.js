var webpack = require('webpack');

module.exports = {
    watch: true,    //监听变化自动编译
    entry: {
        'index': './src/js/index.js'
    },
    output: {
        filename: '[name].min.js'
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