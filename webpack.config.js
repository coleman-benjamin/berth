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
const webpack = require('webpack');
const path = require('path');

/*
    Config Declarations
 */
const entryConfig = {};
const outputConfig = {};
const outputPath = path.resolve(__dirname, 'public/dev/[module_name]'.replace("[module_name]", moduleName));
const watch = false;
const stats = { warnings: false };
const devTool = 'cheap-source-map';
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
outputConfig["pathinfo"] = true;
outputConfig["path"] = outputPath;
outputConfig["publicPath"] = publicPath;
outputConfig["library"] = '[name]';
outputConfig["libraryTarget"] = 'umd';
outputConfig["filename"] = '[name].js';

/*
    Plugins
*/
pluginsArray.push(new webpack.DefinePlugin({
    __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true')),
    WEBGL_RENDERER: true,
    CANVAS_RENDERER: true
}));

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
    watch: watch,
    stats: stats,
    devtool: devTool,
    plugins: pluginsArray,
    module: {
        rules: [
            { test: /\.js$/, use: ['babel-loader'], include: path.join(__dirname, 'src') },
            { test: /phaser-split\.js$/, use: ['expose-loader?Phaser'] },
            { test: [/\.vert$/, /\.frag$/], use: 'raw-loader' }
        ]
    }
};
