import type webpack from "webpack";
import { merge } from "webpack-merge";
import { mainConfig } from "./webpack.main.config";

export const mainProdConfig: webpack.Configuration = merge(mainConfig, {
    mode: "production"
});

export default mainProdConfig;