const webpack = require('webpack');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const baseConfig = require('./webpack.base.config');

module.exports = merge(baseConfig, {
    target: 'electron-renderer',
    entry: {
        app: './src/renderer/app.tsx'
    },
    externals: {
        knex: 'commonjs knex',
        sqlite3: 'commonjs sqlite3'
    },
    module: {
        rules: [
            {
                test: /node_modules[\/\\](iconv-lite)[\/\\].+/,
                resolve: {
                    aliasFields: ['main']
                }
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' },
                    { loader: 'sass-loader' }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' }
                ]
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/,
                use: {
                    loader: 'file-loader'
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "Lyricsify"
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
        }),
        new CopyPlugin({
            patterns: [
                { from: './dev.sqlite3', to: '.' }
            ]
        })
    ],
    optimization: {
        moduleIds: 'named'
    }
});
