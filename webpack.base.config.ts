import type webpack from "webpack";
import path from "path";

export const baseConfig: webpack.Configuration = {
    mode: "development",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].js"
    },
    node: {
        __dirname: false,
        __filename: false
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js", ".json"],
        alias: {
            "~root": __dirname,
            "~src": path.resolve(__dirname, "src"),
            "~components": path.resolve(__dirname, "src/renderer/components"),
            "~resources": path.resolve(__dirname, "resources")
        }
    },
    devtool: "source-map",
    plugins: [
    ]
};

export default baseConfig;