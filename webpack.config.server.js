var webpack = require('webpack');
var process = require('process');
var sharedConfig = require('./webpack.config.shared.js');
var nodeExternals = require('webpack-node-externals');
var isProduction = process.env.NODE_ENV === 'production';

var config = {
    mode: isProduction ? 'production' : 'development',
    resolve: sharedConfig.resolve,
    entry: {
        server: [
            'regenerator-runtime/runtime.js',
            './src/server/server.js'
        ]
    },
    target: 'node',
    output: sharedConfig.output,
    externals: [nodeExternals()],
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: [{
                loader: 'babel-loader',
                options: {
                    cacheDirectory: true
                }
            }]
        }, {
            test: /\.(png|gif|jpg|jpeg|ico|svg)$/,
            use: [{
                loader: 'file-loader',
                options: {
                    emitFiles: false
                }
            }]
        }]
    },
    stats: sharedConfig.stats,
    plugins: [
        new webpack.BannerPlugin({
            banner: 'require("source-map-support").install();',
            entryOnly: false,
            raw: true
        })
    ]
};

module.exports = config;
