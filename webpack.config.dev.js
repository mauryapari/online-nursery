"use strict";
const webpack = require("webpack");
const path = require('path');
const { VueLoaderPlugin } = require("vue-loader");
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: {
      dependencies: path.join(__dirname,'./src/components/assets/index.js'),
      site: path.join(__dirname, './src/app.js')
    },
    mode: "development",
    module: {
      rules: [
        {
          test: /\.vue$/,
          use: "vue-loader",
        }, {
          test: /\.js$/,
          exclude: /node_modules/,
          use: ["babel-loader", "glob-import-loader"]
        }, {
          test: /\.(s[ac]ss|css)$/i,
          exclude: /node_modules/,
          use: [
            MiniCSSExtractPlugin.loader,
            'css-loader',
            'postcss-loader', // handles post css, autoprefixer, cssnano
            // Translates CSS into CommonJS
            {
              loader: 'sass-loader', // compiles scss code
              options: {
                additionalData: (content, loaderContext) => {
                  // More information about available properties https://webpack.js.org/api/loaders/
                  const { resourcePath, rootContext } = loaderContext;
                  const relativePath = path.relative(rootContext, resourcePath);
                  const noCharRelPath = relativePath.replace(/[^a-zA-Z ]/g, '');
                  return `@import "./src/components/assets/css/abstracts/_imports.scss";${content}`; // inject this import by default in each scss-file
                }
              }
            },
            "glob-import-loader",
          ],
        }, {
          test: /\.html$/i,
          loader: 'html-loader'
        }, {
            test: /\.(png|svg|jpg|jpeg|gif|webp|jfif)$/i,
            type: 'asset/resource',
            generator: {
                filename: './resources/img/[name][ext]'
            }
        }, {
            test: /\.(woff|woff2|eot|ttf|otf)$/i,
            type: 'asset/resource',
            generator: {
                filename: './resources/font/[name][ext]'
            }
        },
      ],
    },
    output: {
      path: path.join(__dirname, "./dist"),
      filename: "clientlib-[name]/[name].js"
    },
    devtool: 'source-map',
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new MiniCSSExtractPlugin({
        filename: () => {
            return 'clientlib-[name]/[name].css';
        }
    }),
      new VueLoaderPlugin(),
      new HtmlWebpackPlugin({
        filename: "index.html",
        template: "index.html",
        inject: true,
      }),
    ],
};
