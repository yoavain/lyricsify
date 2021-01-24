import webpack = require("webpack");
import { merge } from "webpack-merge";
import { rendererConfig } from "./webpack.renderer.config";

export const rendererDevConfig: webpack.Configuration = merge(rendererConfig, {
    resolve: {
        alias: {
            "react-dom": "@hot-loader/react-dom"
        }
    }
});

export default rendererDevConfig;