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
        publicPath: '/container/latest/'
    },
    plugins: [
        new ModuleFederationPlugin({
            name : 'container',
            remotes: {
                booking: `booking@${domain}/booking/latest/remoteEntry.js`,
                auth: `auth@${domain}/auth/latest/remoteEntry.js`,
                dashboard: `dashboard@${domain}/dashboard/latest/remoteEntry.js`,
                msdk: `msdk@${domain}/msdk/latest/remoteEntry.js`
                
            },
            shared: packageJson.dependencies,
        }),
    ],
}

module.exports = merge(commonConfig, prodConfig);