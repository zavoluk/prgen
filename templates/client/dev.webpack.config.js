/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const baseConfig = require('./webpack.config');

module.exports = {
    devServer: {
        compress: true,
        contentBase: path.join(__dirname, 'dist'),
        port: 9100,
        publicPath: '/'
    },
    devtool: 'source-map',
    ...baseConfig
};
