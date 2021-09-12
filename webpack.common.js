const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        main: path.resolve(__dirname, 'src', 'index.js'),
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        clean: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "static", "index.html")
        }),
    ],
    resolve: {
        extensions: ['*', '.js', '.jsx'],
    },
    module: {
        rules: [
            { 
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.s(a|c)ss?$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(bin|gltf|glb)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options:
                        {
                            name: '[path][name].[ext]',
                        }
                    }
                ]
            }
        ]
    }
}