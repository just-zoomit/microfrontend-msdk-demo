
const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const commonConfig = require('./webpack.common')

const packageJson = require('../package.json')
console.log('Msdk PackageJson.dependencies List: ', packageJson.dependencies)


const devConfig = {
    mode: 'development',
    output: {
        publicPath: 'http://localhost:8088/'
    },
    devServer: {
        port: 8088,
        historyApiFallback: {
            index: '/index.html',
        },
    },
    plugins: [
        new ModuleFederationPlugin({
            name : 'msdk',
            filename: 'remoteEntry.js',
            exposes: {
                './MsdkApp': './src/bootstrap',
            },
            shared: packageJson.dependencies,
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html',
        }),
    ],
}

module.exports = merge(commonConfig, devConfig);