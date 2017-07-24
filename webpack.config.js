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
const extractText = new ExtractTextPlugin({
  filename: '[name]_[id]_[contenthash:base64:5].css'
});

module.exports = {
  devServer: {
    // config reserve proxy to backend server
    proxy: {
      '/': {
        target: 'http://localhost:8001',
        secure: false,
        bypass: function(req, res, proxyOptions) {
          if (req.headers.accept.indexOf('html') !== -1) {
            console.log('Skipping proxy for browser request.');
            return '/index.html';
          }
        }
      }
    }
  },
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
        test: /\.[less|css]+$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
            loader: "css-loader",
            options: {
              modules: true,
              localIdentName: '[path][name]__[local]--[hash:base64:5]',
              importLoaders: 1,
            }
          }, {
            loader: 'less-loader',
          }]
        }),
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
  resolve: {
    alias: {
      images: path.join(DIR.APP, '/images'),
      pages: path.join(DIR.APP, '/pages'),
      components: path.join(DIR.APP, '/components'),
      fonts: path.join(DIR.APP, '/fonts'),
      utils: path.join(DIR.APP, '/utils'),
      config: path.join(DIR.APP, '/config'),
    },
  },
  plugins: [
    htmlWebpack,
    extractText,
  ]
};