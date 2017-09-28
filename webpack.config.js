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
    // for using the HTML5 History API, the index.html page will likely have to be served in place of any 404 responses.
    historyApiFallback: true,
    // serve a HTML page in tagert server, but proxy api request to another backend server. 
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
  entry: {
    app: [
      // use for react state update without page reload
      'react-hot-loader/patch',
      path.resolve(DIR.APP, 'index.js'),
    ]
  },
  output: {
    path: path.resolve(DIR.ROOT, 'dist'),
    // Make sure publicPath always starts and ends with a forward slash.
    publicPath: "/",
    filename: 'bundle.[hash:6].js'
  },
  module: {
    rules: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: "babel-loader" },
      {
        test: /\.[less|css]+$/,
        use: [{
          loader: 'style-loader'
        },{
          loader: "css-loader",
          options: {
            modules: true,
            localIdentName: '[path][name]__[local]--[hash:base64:5]',
            importLoaders: 1,
          }
        }, {
          loader: 'less-loader',
        }],
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
    ]
  },
  resolve: {
    alias: {
      images: path.join(DIR.APP, '/images'),
      pages: path.join(DIR.APP, '/pages'),
      components: path.join(DIR.APP, '/components'),
      fonts: path.join(DIR.APP, '/fonts'),
      utils: path.join(DIR.APP, '/utils'),
      tools: path.join(DIR.APP, '/tools'),
    },
  },
  plugins: [
    htmlWebpack,
    extractText,
  ]
};