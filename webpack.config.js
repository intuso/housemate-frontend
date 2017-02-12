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
        ]
    },
    output: {
        path: BUILD_DIR,
        publicPath: "js",
        filename: '[name].bundle.js'
    },
    module : {
        loaders : [
            {
                test : /\.(jsx?|es6)/,
                include : APP_DIR,
                loaders : ['react-hot', 'babel']
            }
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