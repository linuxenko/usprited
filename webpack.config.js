/* global __dirname */

var path = require('path');

var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin')

var dir_js = path.resolve(__dirname, 'app');
var dir_build = path.resolve(__dirname, 'dist');

module.exports = {
    entry: {
      app : path.resolve(dir_js, 'index.js')
    },
    output: {
        path: dir_build,
        filename: 'bundle.js'
    },
    resolve: {
       modulesDirectories: ['node_modules', dir_js],
    },
    devServer: {
        contentBase: dir_build,
    },
    module: {
        loaders: [
            {
                loader: 'babel-loader',
                test: dir_js,
                presets : ['es2015', 'react']
            },
            {
              test: /\.less$/,
              loader: "style-loader!css-loader?minimize!less-loader"
            },
            {
              test: /\.(png|jpg|ttf)$/,
              loader: 'url-loader'
            }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({minimize: true}),
        // Avoid publishing files when compilation fails
        new webpack.NoErrorsPlugin(),
        new HtmlWebpackPlugin({
          title : 'uSpritEd'
        })
    ],
    stats: {
        // Nice colored output
        colors: true
    },
    // Create Sourcemaps for the bundle
  //  devtool: 'source-map',
}
