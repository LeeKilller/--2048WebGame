const path = require('path');



module.exports = {
    // 模式：开发模式/生产模式
    mode:"production",
    // 打包入口文件，根据该文件寻找项目依赖
    entry:"./src/index.js",
    // 
    output: {
        filename: "mian.[contenthash:8].js",
        path: path.resolve(__dirname, "build"),
    },

    resolve: {
        alias: {
            '@': path.resolve(__dirname, "./src")
        }
    }
}