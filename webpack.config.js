var Path = require("path");
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var BrowserSyncPlugin = require("browser-sync-webpack-plugin");

module.exports = {
    context: __dirname,
    entry: ["./src/app.tsx"],
    output: {
        path: Path.resolve(__dirname, "build"),
        filename: "[name].bundle.js",
        publicPath: "/build"
    },
    devtool: "cheap-module-source-map",
    module: {
        loaders: [{
            test: /\.tsx?$/,
            loaders: ["awesome-typescript-loader"]
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
        extensions: [".jsx", ".js", ".tsx", ".ts"]
    },
    externals: {
        jquery: "jQuery",
        $: "jQuery"
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"development"',
        }),
        new ExtractTextPlugin("[name].css")
    ]
};
