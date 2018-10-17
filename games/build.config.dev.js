module.exports = {
    watch : false,
    stats : { warnings: false },
    minimize : false,
    outputRoot : "../public/dev/",
    buildRoot : "/dev",
    env : {
        mode : "development",
        buildDev : true
    },
    syncDataConfig : {
        dataPath : "../web/data/dev.json",
        publicBuildDir : "/dev/[module_name]/"
    }
};

// const webpack = require('webpack');
// const path = require('path');
// const fs = require('fs');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
// const SyncDataPlugin = require("./SyncDataPlugin");
//
// module.exports = function(env, argv) {
//     /*
//         Set module name to package a particular project.
//      */
//     if (!argv.game) {
//         let msg = "Error : Pass in module name, e.g. npm run dev -- --game=myGame";
//         console.log(msg);
//         process.exit(1);
//     }
//
//     /*
//         Config Declarations
//      */
//     const moduleName = argv.game;
//     const entryConfig = {};
//     const outputConfig = {};
//     const inputPath = path.resolve(__dirname, "src/[module_name]".replace("[module_name]", moduleName));
//     const outputPath = path.resolve(__dirname, 'public/dev/[module_name]'.replace("[module_name]", moduleName));
//     const watch = false;
//     const stats = { warnings: false };
//     const publicPath = './';
//     const pluginsArray = [];
//
//
//
//     /*
//         Plugins
//     */
//
//     // To make Phaser 3 work
//     pluginsArray.push(new webpack.DefinePlugin({
//         __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true')),
//         WEBGL_RENDERER: true,
//         CANVAS_RENDERER: true
//     }));
//
//     // Custom plugin to update data file with module information
//     pluginsArray.push(new SyncDataPlugin({
//         moduleName : moduleName,
//         env : "dev",
//         dataPath : path.resolve(__dirname, "./server/data/dev.json"),
//         metaPath : path.resolve(__dirname, inputPath + "/meta.json")
//     }));
//
//     // Check to see if there are assets to be copied to the build directory
//     const assetsPath = "src/[module_name]/assets".replace("[module_name]", moduleName);
//     try {
//         fs.statSync(path.resolve(__dirname, assetsPath));
//         pluginsArray.push(new CopyWebpackPlugin([{
//             from: assetsPath,
//             to: 'assets'
//         }
//         ]));
//
//         // When loading assets in the game, set the load path with this environment variable
//         pluginsArray.push(new webpack.DefinePlugin({'process.env.BUILD_ROOT': "'/dev'"}));
//     } catch(e) {
//         console.log(e);
//     }
//
//     /*
//         Log info
//     */
//     console.log("--------------------------");
//     console.log("Module name : " + moduleName);
//     console.log("Entry config : " + JSON.stringify(entryConfig, null, 2));
//     console.log("Output config : " + JSON.stringify(outputConfig, null, 2));
//     console.log("--------------------------");
//
//     /*
//         Export webpack configuration
//      */
//     return {
//         entry: entryConfig,
//         output: outputConfig,
//         watch: watch,
//         stats: stats,
//         plugins: pluginsArray,
//         module: {
//             rules: [
//                 { test: /\.js$/, use: ['babel-loader'], include: path.join(__dirname, 'src') },
//                 { test: /phaser-split\.js$/, use: ['expose-loader?Phaser'] },
//                 { test: [/\.vert$/, /\.frag$/], use: 'raw-loader' }
//             ]
//         },
//         optimization: {
//             minimize: false,
//             splitChunks: {
//                 cacheGroups: {
//                     vendor: {
//                         chunks: 'all',
//                         name: 'js/vendor',
//                         test: /[\\/]node_modules[\\/]/,
//                         enforce: true
//                     },
//                 }
//             }
//         }
//     };
// };
