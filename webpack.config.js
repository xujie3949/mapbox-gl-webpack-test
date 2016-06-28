/**
 * Created by xujie on 2016/6/16 0016.
 */
const webpack = require('webpack');
const path = require('path');

/**
 * Mapbox GL JS example webpack configuration. This demonstrates the options
 * you'll need to add to your existing webpack configuration in order to successfully
 * use Mapbox GL JS.
 *
 * This configuration refers to specific paths, especially in its configuration
 * of the brfs transform. You'll likely need to change these paths so that
 * they point at the correct file in Mapbox GL JS.
 *
 * Additional dependencies:
 *
 *     npm install --save transform-loader
 *     npm install --save json-loader
 *     npm install --save webworkify-webpack
 *
 * Why these dependencies?
 *
 * json-loader
 * By default, browserify and node allow you to use the `require` method
 * with JSON files. Webpack doesn't have this built-in, so we include
 * the json loader.
 *
 * transform-loader
 * Mapbox GL JS uses the brfs browserify transform to allow it to use
 * the fs.readFileSync method in order to load its shaders for WebGL. Adding
 * the transform loader lets webpack use brfs as well.
 *
 * webworkify-webpack
 * Mapbox GL JS uses the webworkify module by default, and that module
 * does things very specific to browserify's module loading system. In this
 * configuration, we alias webworkify to webworkify-webpack to add webpack
 * support.
 */
module.exports = {
    entry: './app/index.js',
    output: {
        path: './app',
        filename: 'index.bundle.js'
    },
    devtool: 'source-map',
    resolve: {
        alias: {
            'webworkify': 'webworkify-webpack'
        }
    },
    node: {
        fs: 'empty'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['babel'],
                include: path.resolve('app/index.js')
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.css$/,
                loaders: ['style', 'css']
            },
            {
                test: /\.js$/,
                include: [
                    path.resolve('node_modules/mapbox-gl')
                ],
                loader: 'transform/cacheable?brfs'
            }]
    }
};
