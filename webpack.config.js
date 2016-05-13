var webpack = require("webpack");

//var PROD = ((JSON.parse(process.env['NODE_ENV']) == 'production') || process.argv.indexOf('--production') !== -1);
//var QA = ((JSON.parse(process.env['NODE_ENV']) == 'qa') || process.argv.indexOf('--qa') !== -1);

var PROD = (process.argv.indexOf('--production') !== -1);
var QA = (process.argv.indexOf('--qa') !== -1);

var entry = [];
var devtool = "#source-map";
var plugins = [];
var outputFile = "build/app.js";

if (PROD) {
  entry = './entry/production.ts';
  devtool = '';
  plugins = [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      mangle: false
    })
  ];
}
else if (QA) {
  entry.push('./entry/qa.ts');
}
else {
  entry.push('./entry/development.ts');
}

module.exports = {
  entry: entry,
  devtool: devtool,
  output: {
    path: __dirname,
    filename: outputFile
  },
  resolve: {
    modulesDirectories: ['node_modules', 'bower_components']
  },
  module: {
    loaders: [
      { test: /\.ts$/, exclude: [/node_modules/, /bower_components/], loader: "ts-loader"},
      { test: /\.css$/, loader: "text-loader" },
      { test: /\.less$/, loader: "style!css!less" },
      { test: /\.(woff|svg|ttf|eot|otf)([\?]?.*)$/, loader: "file-loader?name=fonts/[name].[ext]" },
      { test: /\.json$/, loader: "json-loader" },
      { test: /\.html$/, loader: "text-loader" }
    ]
  },
  plugins: plugins
};
