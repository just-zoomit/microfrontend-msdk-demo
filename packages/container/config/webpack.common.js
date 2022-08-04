const HtmlWebpackPlugin = require('html-webpack-plugin');

/**
 * HtmlWebpackPlugin : https://webpack.js.org/plugins/html-webpack-plugin/#basic-usage
 *  
 * Basic Usage: 
 *  The plugin will generate an HTML5 file for you that includes all 
 * your webpack bundles in the body using script tags. 
 * Add the plugin to your webpack configuration as follows:
*/

// configuration regarding modules
module.exports = {
    module: {
        rules: [  // rules for modules (configure loaders, parser options, etc.)
            {   
                test: /\.m?js$/, // Conditions:
                exclude: /node_modules/,
                /**
                 * These are matching conditions, each accepting a regular expression or string
                 * test and include have the same behavior, both must be matched
                 * exclude must not be matched (takes preferrence over test and include)
                 */
                use : { // options for the loader
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react','@babel/preset-env'],
                        plugins: ['@babel/plugin-transform-runtime'],
                    },
                },
            },
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: './public/index.html',
        }),
    ],
};