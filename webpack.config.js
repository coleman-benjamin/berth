/*
    Set module name to package a particular project.

    When running, pass in module name as the first argument. e.g. webpack-cli --[n]=[name]

    Example : webpack-cli --n=book

    As of right now the argument name (n) does not matter. [webpack-cli --crumps=book] will still package "book".

    --TODO : 'all' to package all? Worth it to test framework changes I suppose
 */
if (!process.argv[2] || process.argv[2].indexOf("=") === -1) {
    let msg = "Error : Pass in module name, first argument. e.g. webpack-cli --[x]=[name]";
    console.log(msg);
    process.exit(1);
}

const moduleName = process.argv[2].split("=")[1];

console.log("Module name : " + moduleName);

/*
    Begin
 */
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");
const path = require('path');
const glob = require("glob");
const devTool = 'cheap-source-map';

/*
    Entry
*/
const entries = glob.sync('src/**/main.js');

const entryObject = entries.reduce((acc, item) => {
    const name = item.replace('/main.js', '').replace('src', 'js');
    acc[name] = path.resolve(__dirname, item);
    return acc;
}, {});

// Add vendor to output
entryObject["js/vendor"] = ['phaser'];

console.log("Entry object : " + JSON.stringify(entryObject));

/*
    HtmlWebpackPlugin
*/
const indexTemplate = "./src/index.template.html";
const chunkSortMode = "auto";
let bundleChunks = ["vendor"].push(moduleName);
let indexPath = "../[module_name]/index.html".replace("[module_name]", moduleName);

const htmlWebpackPlugin = new HtmlWebpackPlugin({
    chunks: bundleChunks,
    filename: indexPath,
    template: indexTemplate,
    chunksSortMode: chunkSortMode,
});

/*
    Other Plugins
*/
const customPhaserPlugin = new webpack.DefinePlugin({
    __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true')),
    WEBGL_RENDERER: true,
    CANVAS_RENDERER: true
});

const browserSyncPlugin = new BrowserSyncPlugin({
        host: process.env.IP || 'localhost',
        port: process.env.PORT || 3000,
        server: {
            baseDir: ['./', './dev']
        }
    }, {
        reload: false
    }
);

/*
    Add modules to configure their output
 */
let outputPath = path.resolve(__dirname, 'dev/[module_name]'.replace("[module_name]", moduleName));
let publicPath = './';

let webpackConfig = {
    entry: entryObject,
    output: {
        pathinfo: true,
        path: outputPath,
        publicPath: publicPath,
        library: '[name]',
        libraryTarget: 'umd',
        filename: '[name].js'
    },

    // watch: true,
    devtool: devTool,
    plugins: [
        htmlWebpackPlugin,
        customPhaserPlugin,
        // browserSyncPlugin
    ],
    module: {
        rules: [
            { test: /\.js$/, use: ['babel-loader'], include: path.join(__dirname, 'src') },
            { test: /phaser-split\.js$/, use: ['expose-loader?Phaser'] },
            { test: [/\.vert$/, /\.frag$/], use: 'raw-loader' }
        ]
    }
};

module.exports = webpackConfig;
