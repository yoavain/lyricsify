const { merge } = require('webpack-merge');

const baseConfig = require('./webpack.renderer.config');

module.exports = merge(baseConfig, {
    resolve: {
        alias: {
            'react-dom': '@hot-loader/react-dom'
        }
    }
});
