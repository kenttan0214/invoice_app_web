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
      'node_modules', 'components'
    ]
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/dist/app',
    publicPath: 'http://localhost:9812/dist/app/'
  },
  stats: 'normal'
};
