var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var serverConfiguration = require('config').get('Server');

var config = {
    entry:   {
        app: './app/app.js'
    },
    output:  {
        path:     __dirname + '/',
        filename: 'bundle.js'
    },
    resolve: {
        root:       __dirname + '/app/',
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
    },
    plugins: [
        new webpack.DefinePlugin({
            'API_URL': serverConfiguration.url
        }),
        new HtmlWebpackPlugin({
            template: './app/index.html',
            inject:   'body',
            hash:     true
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {warnings: false}
        })
    ],
    ts:      {
        silent:              true,
        'ignoreDiagnostics': [
            2403, // 2403 -> Subsequent variable declarations
            2409,
            2322,
            2300, // 2300 -> Duplicate identifier
            2374, // 2374 -> Duplicate number index signature
            2375  // 2375 -> Duplicate string index signature
        ]
    },
    module:  {
        noParse: [],
        loaders: [
            {test: /\.html$/, loader: 'raw'},
            {test: /\.htm$/, loader: 'raw'},
            {test: /\.css$/, loaders: ['style', 'css']},
            {test: /\.less$/, loader: 'style!css!less'},
            {test: /\.jpg$/, loader: 'file-loader'},
            {test: /\.tsx?$/, loader: 'ts-loader'},
            {test: /\.(png|woff|woff2|eot|ttf|svg|gif)$/, loader: 'url-loader?limit=100000'}
        ]
    }
};

module.exports = config;
