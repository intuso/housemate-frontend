var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'build', 'js');
var APP_DIR = path.resolve(__dirname, 'app');
var PAGES = path.resolve(APP_DIR, 'pages');

// todo in package.json restore to build script to "webpack -p" when uglify supports es6 or use an alternative to uglify

var config = {
    entry: {
        "devices": [
            'webpack-dev-server/client?http://0.0.0.0:8080', // WebpackDevServer host and port
            'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
            path.resolve(PAGES, 'devices', 'devices.jsx')
        ],
        "home": [
            'webpack-dev-server/client?http://0.0.0.0:8080', // WebpackDevServer host and port
            'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
            path.resolve(PAGES, 'home', 'home.jsx')
        ],
        "login": [
            'webpack-dev-server/client?http://0.0.0.0:8080', // WebpackDevServer host and port
            'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
            path.resolve(PAGES, 'login', 'login.jsx')
        ],
        "profile": [
            'webpack-dev-server/client?http://0.0.0.0:8080', // WebpackDevServer host and port
            'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
            path.resolve(PAGES, 'profile', 'profile.jsx')
        ],
        "register": [
            'webpack-dev-server/client?http://0.0.0.0:8080', // WebpackDevServer host and port
            'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
            path.resolve(PAGES, 'register', 'register.jsx')
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
            { test : /\.(js|jsx|es6)/, include : APP_DIR, loaders : ['babel-loader'] },

            // css
            // { test: /\.less$/, use: ExtractTextPlugin.extract({fallback: "style-loader", use: ["css-loader", "less-loader"]}) },
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
    /*resolve: {
        modules: [
            path.join(APP_DIR, "components"),
            path.join(APP_DIR, "pages"),
            path.join(APP_DIR, "css"),
            "node_modules"
        ],
        // you can now require('file') instead of require('file.jsx')
        extensions: ['.js', '.json', '.coffee', '.jsx', '.less', '.css']
    },*/
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        host: "0.0.0.0",
        port: 8080,
        contentBase: path.resolve(__dirname, 'build'),
        proxy: {
            '/api/*': {
                target: 'http://localhost:4601',
                ws: true
            }
        }
    }
};

module.exports = config;