import webpack from "webpack";
import { merge } from "webpack-merge";
import { baseConfig } from "./webpack.base.config";

export const mainConfig: webpack.Configuration = merge(baseConfig, {
    target: "electron-main",
    entry: {
        main: "./src/main/main.ts"
    },
    module: {
        rules: [
            {
                test: /node_modules[/\\](iconv-lite)[/\\].+/,
                resolve: {
                    aliasFields: ["main"]
                }
            },
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || "development")
        })
    ]
});

export default mainConfig;