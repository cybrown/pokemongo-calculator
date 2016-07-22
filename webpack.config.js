var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    name: 'client',
    devtool: 'source-map',
    entry: {
        client: __dirname + '/app/app.ts'
    },
    output: {
        path: __dirname + '/dist/',
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.js', '.ts']
    },
    module: {
        preLoaders: [
            { test: /\.ts$/, loader: "tslint" }
        ],
        loaders: [
            { test: /\.html$/, loader: "html" },
            { test: /\.ts$/, loader: 'ts' },
            { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") },
            { test: /\.less$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader") },
            {test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff'},
            {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
            {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
            {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'}
        ]
    },
    plugins: [
        new ExtractTextPlugin("style.css", {
            allChunks: true
        })
    ]
};
