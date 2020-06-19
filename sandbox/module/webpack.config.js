'use strict';

let path = require('path');

module.exports = {
  mode: 'development', //production (slowly)
  entry: './src/js/script.js', //may be obj
  output: {
    filename: 'bundle.js',
    path: __dirname + '/dist/js'
  },
  watch: true,

  devtool: "source-map",

  module: {}
};
