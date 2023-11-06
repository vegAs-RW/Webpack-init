const terserPlugin = require('terser-webpack-plugin')

module.exports = {
    mode: 'development',
    entry : {
        app: './src/index.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: __dirname+ '/dist'
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|jpeg)$/,
                use: {
                loader: 'file-loader',
                options: {
                    name: 'images/[name].[ext]',
                },
              }
            }
        ]
    },
    optimization: {
        minimize: true,
        minimizer: [new terserPlugin()]
    },
    devServer: {
        static: {
            directory: __dirname+ '/dist'
        },
        compress: true,
        port: 9000
    }
}