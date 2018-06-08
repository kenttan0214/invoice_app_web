module.exports = {
  resolve: {
    extensions: [
      '.js',
      '.jsx',
      '.ico',
      '.svg',
      '.json'
    ],
    modules: [
      'node_modules', 'components', 'theme'
    ]
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/dist/app',
    publicPath: process.env.DIST_PUBLIC_PATH
  },
  stats: 'normal'
};
