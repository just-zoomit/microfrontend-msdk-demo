
const { merge } = require('webpack-merge')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common')
const packageJson = require('../package.json')
console.log('packageJson.dependencies: ', packageJson.dependencies)

/**
 *  Resource : https://webpack.js.org/configuration/
 * 
 * webpack-merge provides a merge function that concatenates arrays and merges objects creating a new object. 
 * If functions are encountered, it will execute them, run the results through the algorithm, 
 * and then wrap the returned values within a function again.
*/

const devConfig = {
    

    /**
     * Options : "production" | "development" | "none"
     * Description : Chosen mode tells webpack to use its built-in optimizations accordingly.
     */
    mode: 'development', 
    /**
     * The top-level `output` key contains a set of options instructing webpack 
     * on how and where it should output your bundles, assets,
     * and anything else you bundle or load with webpack.
    */
    output: {
        publicPath: 'http://localhost:8080/' // the url to the output directory resolved relative to the HTML page
    },
    devServer: { // proxy URLs to backend development server
        port: 8080,
        historyApiFallback: {
            index: '/index.html',
        },
    },
    plugins: [
        new ModuleFederationPlugin({
            name : 'container',
            remotes: {
                booking: 'booking@http://localhost:8081/remoteEntry.js',
                auth: 'auth@http://localhost:8082/remoteEntry.js',
                dashboard: 'dashboard@http://localhost:8083/remoteEntry.js',
                msdk: 'msdk@http://localhost:8088/remoteEntry.js',
                
            },
            shared: packageJson.dependencies,
        }),
        
    ],
}

module.exports = merge(commonConfig, devConfig);