const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const DIR = {
  ROOT: path.resolve(__dirname),
  APP: path.resolve(__dirname, 'app'),
};

const htmlWebpack = new HtmlWebpackPlugin({
  template: DIR.APP + '/index.html',
  filename: 'index.html',
  inject: 'body',
});

module.exports = {
  devServer: {
    port: 8001,
    inline: true,
    // enable open browser or not
    open: true,
    // opens the page in default browser
    openPage: '',
    // controls the console log messages shown in the browser. Use error, warning, info or none.
    clientLogLevel: 'none',
    // only errors & warns on hot reload
    noInfo: true,
  },
  entry: {
    app: [
      // use for react state update without page reload
      'react-hot-loader/patch',
      path.resolve(DIR.APP, 'index.js'),
    ]
  },
  entry: {
    app: [
      // use for react state update without page reload
      'react-hot-loader/patch',
      path.resolve(DIR.APP, 'index.js'),
    ]
  },
  output: {
    path: path.resolve(DIR.ROOT, 'dist'),
    publicPath: "",
    filename: 'bundle.[hash:6].js'
  },
  module: {
    rules: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: "babel-loader" },
      {
        test: /\.[less|css]+$/,
        use: [{
          loader: 'style-loader',
        }, {
          loader: 'css-loader',
          options: {
            modules: true,
            localIdentName: '[path][name]__[local]--[hash:base64:5]',
            importLoaders: 1,
          }
        }, {
          loader: 'less-loader',
        }]
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
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
  resolve: {
    alias: {},
  },
  plugins: [
    htmlWebpack,
  ]
};