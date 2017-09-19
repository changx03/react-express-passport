var Path = require("path");
var webpack = require("webpack");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  context: __dirname,
  entry: ["./src/app.tsx"],
  output: {
    path: Path.resolve(__dirname, "build"),
    filename: "[name].bundle.js"
    // publicPath: "/dist"
  },
  devtool: "inline-sourcemap",
  module: {
    loaders: [
      {
        test: /\.(ts|tsx)$/,
        loaders: ["awesome-typescript-loader"]
      },
      {
        test: /\.(js|jsx)$/,
        use: ["babel-loader"],
        exclude: /node_modules/
      },
      {
        test: /\.(scss|css)$/,
        use: ExtractTextPlugin.extract({
          use: ["css-loader", "sass-loader"]
        })
      }
    ]
  },
  resolve: {
    extensions: ['.jsx', '.js', '.tsx', '.ts']
  },
  externals: {
    jquery: "jQuery",
    $: "jQuery"
  },
  plugins: [
    new ExtractTextPlugin("[name].css"),
    new HtmlWebpackPlugin({
      template: "src/index.html",
      cache: true
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: false,
      mangle: false,
      beautify: true,
      comments: true,
      sourceMap: true
    })
  ]
};
