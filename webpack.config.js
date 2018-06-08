const webpack = require('webpack');
const process = require('process');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const sharedConfig = require('./webpack.config.shared.js');

const isProduction = process.env.NODE_ENV === 'production';
const entries = (isProduction) ? ['./src/app/app.entry.js'] : ['./src/app/app.entry-hmr.js'];

const config = {
  mode: isProduction ? 'production' : 'development',
  resolve: sharedConfig.resolve,
  entry: {
    client: [
      'regenerator-runtime/runtime.js',
      ...entries,
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
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.TARGET': JSON.stringify('BROWSER')
    }),
    new HtmlWebpackPlugin({  // Also generate a test.html
      filename: 'index.html',
      template: 'public/index.html'
    })
  ],
};

config.output.filename = '[name].[hash].js';

if (isProduction) {
  config.plugins.push(
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  );
  config.devtool = '#source-map';
} else {
  // Development
  config.entry.client.unshift(
    'webpack-hot-middleware/client',
  );

  config.plugins.push(
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  );

  config.devtool = 'source-map';
}

module.exports = config;
