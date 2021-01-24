import type webpack from "webpack";
import { merge } from "webpack-merge";
import { rendererConfig } from "./webpack.renderer.config";

export const rendererProdConfig: webpack.Configuration = merge(rendererConfig, {
    mode: "production"
});

export default rendererProdConfig;
