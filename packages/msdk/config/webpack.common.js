module.exports = {
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use : {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react','@babel/preset-env'],
                        plugins: ['@babel/plugin-transform-runtime'],
                    },
                },
            },
            {
                test: /\.css$/,
                // exclude: /(node_modules)/, // Remove this 
                use: [
                  { loader: 'style-loader' },
                  { loader: 'css-loader' },
                ],
              }
        ]
    }
}