/*
    Set module name to package a particular project.

    When running, pass in module name as the first argument. e.g. webpack-cli --[n]=[module_name]

    Example : webpack-cli --n=book

    As of right now the argument name (n) does not matter. [webpack-cli --xyz=book] will still package "book".
 */
if (!process.argv[2] || process.argv[2].indexOf("=") === -1) {
    let msg = "Error : Pass in module name, first argument. e.g. webpack-cli --[n]=[module_name]";
    console.log(msg);
    process.exit(1);
}

const moduleName = process.argv[2].split("=")[1];

/*
    Dependencies
 */
const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

/*
    Config Declarations
 */
const entryConfig = {};
const outputConfig = {};
const outputPath = path.resolve(__dirname, 'public/build/[module_name]'.replace("[module_name]", moduleName));
const stats = { warnings: false };
const publicPath = './';
const pluginsArray = [];

/*
    Entry
*/
entryConfig["js/[module_name]".replace("[module_name]", moduleName)] = path.resolve(__dirname, "src/[module_name]/main.js".replace("[module_name]", moduleName));
entryConfig["js/vendor"] = ['phaser'];

/*
    Output
 */
outputConfig["path"] = outputPath;
outputConfig["publicPath"] = publicPath;
outputConfig["filename"] = '[name].bundle.js';

/*
    Plugins
*/
pluginsArray.push(new webpack.DefinePlugin({
    __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true')),
    WEBGL_RENDERER: true,
    CANVAS_RENDERER: true
}));
pluginsArray.push(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/));

// Check to see if there are assets to be copied to the build directory
const assetsPath = "src/[module_name]/assets".replace("[module_name]", moduleName);
try {
    fs.statSync(assetsPath);
    pluginsArray.push(new CopyWebpackPlugin([{
        from: assetsPath,
        to: 'assets'
    }
    ]));

    // When loading assets in the game, set the load path with this environment variable
    pluginsArray.push(new webpack.DefinePlugin({'process.env.BUILD_ROOT': "'/build'"}));
} catch(e) {}

/*
    Log info
*/
console.log("--------------------------");
console.log("Module name : " + moduleName);
console.log("Entry config : " + JSON.stringify(entryConfig, null, 2));
console.log("Output config : " + JSON.stringify(outputConfig, null, 2));
console.log("--------------------------");

/*
    Export webpack configuration
 */
module.exports = {
  entry: entryConfig,
  output: outputConfig,
  plugins: pluginsArray,
  stats: stats,
  module: {
    rules: [
      { test: /\.js$/, use: ['babel-loader'], include: path.join(__dirname, 'src') },
      { test: /phaser-split\.js$/, use: 'raw-loader' },
      { test: [/\.vert$/, /\.frag$/], use: 'raw-loader' }
    ]
  },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    chunks: 'initial',
                    name: 'js/vendor',
                    test: 'js/vendor',
                    enforce: true
                },
            }
        }
    }
};
