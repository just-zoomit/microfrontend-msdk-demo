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
        publicPath: '/golden/latest/',
    },
    plugins: [
        new ModuleFederationPlugin({
            name : 'golden',
            filename: 'remoteEntry.js',
            exposes: {
                './GoldenApp': './src/bootstrap',
            },
            shared: packageJson.dependencies,
        }),
    ],
}

module.exports = merge(commonConfig, prodConfig);