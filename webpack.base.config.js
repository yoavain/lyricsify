'use strict';

const path = require('path');

module.exports = {
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    node: {
        __dirname: false,
        __filename: false
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.json'],
        alias: {
            "~src": path.resolve(__dirname, "src"),
            "~components": path.resolve(__dirname, "src/renderer/components"),
            "~resources": path.resolve(__dirname, "resources")
        }
    },
    devtool: 'source-map',
    plugins: [
    ]
};
