const path = require('path');

const DIR = {
  ROOT: path.resolve(__dirname),
  APP: path.resolve(__dirname, 'app'),
};

module.exports = {
  entry: path.resolve(DIR.APP, 'index.js'),
  output: {
    path: path.resolve(DIR.ROOT, 'dist'),
    publicPath: "",
    filename: 'bundle.[hash:6].js'
  },
  module: {
    rules: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
  },
};