const webpack = require('webpack');
const process = require('process');
const AssetsPlugin = require('assets-webpack-plugin');
const sharedConfig = require('./webpack.config.shared.js');
const NODE_ENV = process.env.NODE_ENV;
const isProduction = NODE_ENV === 'production';

console.log(NODE_ENV);

const config = {
  mode: NODE_ENV,
  resolve: sharedConfig.resolve,
  entry: {
    client: [
      'regenerator-runtime/runtime.js',
      './src/app/client.js'
    ]
  },
  output: sharedConfig.output,
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      include: /src/,
      use: [{
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          plugins: [
            ...(!isProduction ? ['react-hot-loader/babel'] : []),
            'dynamic-import-webpack',
          ],
          presets: [
            // Optimise the React build, see
            // https://github.com/jamiebuilds/babel-react-optimize
            ...(isProduction ? ['react-optimize'] : []),
          ],
        }
      }],
    }, {
      test: /\.(png|gif|jpg|jpeg|ico|svg)$/,
      include: /src/,
      use: ['file-loader']
    }]
  },
  stats: sharedConfig.stats,
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
      'process.env.TARGET': JSON.stringify('BROWSER')
    }),
    new AssetsPlugin({
      fullPath: false,
    })
  ],
};

if (isProduction) {
  config.plugins.push(
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  );
  config.output.filename = '[name].[hash].js';
} else {
  // Development
  config.entry.client.unshift(
    'webpack-hot-middleware/client',
  );

  config.plugins.push(
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  );
}

config.devtool = '#source-map';

module.exports = config;
