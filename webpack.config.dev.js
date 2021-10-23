"use strict";
const webpack = require("webpack");
const path = require('path');
const { VueLoaderPlugin } = require("vue-loader");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: './src/app.js',
    mode: "development",
    module: {
      rules: [
        {
          test: /\.vue$/,
          use: "vue-loader",
        }, {
          test: /\.js$/,
          use: "babel-loader",
        }, {
          test: /\.css$/,
          use: ["vue-style-loader", "css-loader"],
        }, {
          test: /\.s[ac]ss$/i,
          use: [
            // Creates `style` nodes from JS strings
            "style-loader",
            // Translates CSS into CommonJS
            "css-loader",
            // Compiles Sass to CSS
            "sass-loader",
          ],
        },
      ],
    },
    output: {
      path: path.join(__dirname, "./dist"),
      filename: "bundle.js"
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new VueLoaderPlugin(),
      new HtmlWebpackPlugin({
        filename: "index.html",
        template: "index.html",
        inject: true,
      }),
    ],
};
