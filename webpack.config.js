const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");



module.exports = {
    // 模式：开发模式/生产模式
    mode: "development",
    // 打包入口文件，根据该文件寻找项目依赖
    entry: "./src/index.js",
    // 
    resolveLoader: {
        modules: ['node_modules', 'my_modules'], // node_modules找不到，
    },
    output: {
        filename: "mian.[contenthash:8].js",
        path: path.resolve(__dirname, "./public/source"),
        clean: true
    },

    resolve: {
        alias: {
            '@': path.resolve(__dirname, "./src")
        }
    },

    plugins: [new HtmlWebpackPlugin({
        title: "Game 2048",
        favicon: path.resolve(__dirname,'./public/favicon.ico')
    })],

    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()]
    },

    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"],
                    }
                }
            },
            {
                test: /\.html$/,
                exclude: /public/,
                use:'html-module-loader'
            }
        ]
    },

    devServer: {
        static: "./build"
    }
}