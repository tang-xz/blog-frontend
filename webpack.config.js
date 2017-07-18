const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const DIR = {
  ROOT: path.resolve(__dirname),
  APP: path.resolve(__dirname, 'app'),
};

const htmlWebpack = new HtmlWebpackPlugin({
  template: DIR.APP + '/index.html',
  filename: 'index.html',
  inject: 'body',
})

module.exports = {
  entry: path.resolve(DIR.APP, 'index.js'),
  output: {
    path: path.resolve(DIR.ROOT, 'dist'),
    publicPath: "",
    filename: 'bundle.[hash:6].js'
  },
  module: {
    rules: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: "babel-loader" },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      }
    ],
  },
  plugins: [htmlWebpack]
};