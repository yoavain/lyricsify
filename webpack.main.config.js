const webpack = require("webpack");
const { merge } = require("webpack-merge");

const baseConfig = require("./webpack.base.config");

module.exports = merge(baseConfig, {
    target: "electron-main",
    entry: {
        main: "./src/main/main.ts"
    },
    module: {
        rules: [
            {
                test: /node_modules[\/\\](iconv-lite)[\/\\].+/,
                resolve: {
                    aliasFields: ["main"]
                }
            },
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || "development")
        })
    ]
});
