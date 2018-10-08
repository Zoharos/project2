const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  mode: "development",
  entry: './app/index.js',
  output: {
    path: path.resolve(__dirname, "build"),
    filename: 'bundle.js'
  },
  module: {
    rules: 
    [
    {
     test: /\.(png|jpg)$/,
     loader: 'file-loader',
     options: {
        name: '[name].[ext]',
        outputPath: './statics'
      }
     },
     {
      test: /\.(ico)$/,
      loader: 'file-loader',
      options: {
         name: '[name].[ext]',
       }
      },
     {
      test: /\.css$/,
      use: [ 'style-loader', 'css-loader' ]
     },
     {
      test: /\.js$/,
      include: [
        path.resolve(__dirname, "app")
      ],
      exclude: [
       path.resolve(__dirname, "node_modules")
      ],
      loader: 'babel-loader'
     }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./app/index.html"
    })
  ]
};