const path = require('path');
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
                test: /\.(sass|scss)$/,
                use: [
                  "style-loader",
                  "css-loader",
                  "postcss-loader",
                  {
                    loader: "sass-loader",
                    options: {
                      // Prefer `dart-sass`
                      implementation: require("sass"),
                    },
                  },
                ],
              },
              { 
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'] 
              }
        ]
    }
}