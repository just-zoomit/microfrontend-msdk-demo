const { merge } = require('webpack-merge')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common')
const packageJson = require('../package.json')

//Build remoteentry through ci/cd pipline
const domain = process.env.PRODUCTION_DOMAIN;


const prodConfig = {
    mode: 'production',
    output: {
        filename: '[name].[contenthash].js',
        publicPath: '/booking/latest/',
    },
    plugins: [
        new ModuleFederationPlugin({
            name : 'booking',
            filename: 'remoteEntry.js',
            exposes: {
                './bookingApp': './src/bootstrap',
            },
            shared: packageJson.dependencies,
        }),
    ],
}

module.exports = merge(commonConfig, prodConfig);