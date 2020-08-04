/* eslint-disable @typescript-eslint/no-var-requires */
const baseConfig = require('./webpack.config');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    ...baseConfig,
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                extractComments: false,
                terserOptions: {
                    output: {
                        comments: false
                    }
                }
            })
        ]
    }
};
