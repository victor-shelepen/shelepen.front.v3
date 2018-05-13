var path = require('path');
var webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  entry: './js/app.js',
  output: {
    path: path.resolve(__dirname, 'www'),
    filename: 'js/app.bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  plugins: [
    // new BundleAnalyzerPlugin()
  ],
  stats: {
    colors: true
  },
  devtool: 'source-map'
};
