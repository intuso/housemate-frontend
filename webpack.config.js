var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'build', 'js');
var APP_DIR = path.resolve(__dirname, 'app');

var config = {
    entry: {
        "index": [
            'webpack-dev-server/client?http://0.0.0.0:8080', // WebpackDevServer host and port
            'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
            path.resolve(APP_DIR, 'main', 'main.jsx')
        ],
        "login": [
            'webpack-dev-server/client?http://0.0.0.0:8080', // WebpackDevServer host and port
            'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
            path.resolve(APP_DIR, 'login', 'login.jsx')
        ],
        "register": [
            'webpack-dev-server/client?http://0.0.0.0:8080', // WebpackDevServer host and port
            'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
            path.resolve(APP_DIR, 'register', 'register.jsx')
        ]
    },
    output: {
        path: BUILD_DIR,
        publicPath: "js",
        filename: '[name].bundle.js'
    },
    module : {
        loaders : [

            // main app code
            { test : /\.(js|jsx|es6)/, include : APP_DIR, loaders : ['react-hot', 'babel'] },

            // css
            { test: /\.css$/, loader: "style-loader!css-loader" },

            // images
            { test: /\.png$/, loader: "url-loader?limit=100000" },
            { test: /\.jpg$/, loader: "file-loader" },

            // fonts for bootstrap
            { test: /\.(woff|woff2)$/,  loader: "url-loader?limit=10000&mimetype=application/font-woff" },
            { test: /\.ttf$/,    loader: "file-loader" },
            { test: /\.eot$/,    loader: "file-loader" },
            { test: /\.svg$/,    loader: "file-loader" }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        host: "0.0.0.0",
        port: 8080,
        contentBase: path.resolve(__dirname, 'build', 'html'),
        proxy: {
            '/api/*': {
                target: 'http://localhost:8090'
            }
        }
    }
};

module.exports = config;