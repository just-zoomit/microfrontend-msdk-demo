const { merge } = require('webpack-merge')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

/**
 * Definition: 
 * The ModuleFederationPlugin allows a build to provide or 
 * consume modules with other independent builds at runtime.
 * ModuleFederationPlugin:  
 * https://webpack.js.org/plugins/module-federation-plugin/#root
 * 
*/
const commonConfig = require('./webpack.common')
const packageJson = require('../package.json')

//Build remoteentry through ci/cd pipline
const domain = process.env.PRODUCTION_DOMAIN;


const prodConfig = {
    mode: 'production', // Chosen mode tells webpack to use its built-in optimizations accordingly.
    output: {  // options related to how webpack emits results
        filename: '[name].[contenthash].js',  // the filename template for entry chunks
        publicPath: '/container/latest/' // the url to the output directory resolved relative to the HTML page
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