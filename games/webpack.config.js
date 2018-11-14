const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const SyncDataPlugin = require("./SyncDataPlugin");

module.exports = function(env, argv) {
    /*
        Validate arguments
     */
    if (!argv.game) {
        let msg = "Error : Pass in module name, e.g. npm run game -- --game=myGame";
        console.log(msg);
        process.exit(1);
    }
    if (!argv.mode && (argv.mode === "development" || argv.mode === "production")) {
        let msg = "Error : Pass in mode, development or production. Use npm [game or dev-game] --game=myGame";
        console.log(msg);
        process.exit(1);
    }
    const moduleName = argv.game;
    const mode = argv.mode;

    /*
        Get build config
     */
    const __config__ = (mode === "production") ? require("./build.config") : require("./build.config.dev");

    /*
        Declarations
     */
    const inputPath = path.resolve(__dirname, __config__.inputRoot + moduleName);
    const outputPath = path.resolve(__dirname, __config__.outputRoot + moduleName);
    const publicPath = './';
    const entryConfig = {};
    const outputConfig = {};
    const pluginsConfig = [];

    /*
        Entry Config
    */
    entryConfig[moduleName] = inputPath + "/main.js";
    entryConfig["vendor"] = ['phaser'];

    /*
        Output Config
     */
    outputConfig["pathinfo"] = true;
    outputConfig["path"] = outputPath;
    outputConfig["publicPath"] = publicPath;
    outputConfig["library"] = '[name]';
    outputConfig["libraryTarget"] = 'umd';
    outputConfig["filename"] = '[name].bundle.js';

    /*
        Plugins : From config
    */
    if (__config__.plugins)
        pluginsConfig.push.apply(__config__.plugins);

    /*
        Plugin : Phaser 3
    */
    pluginsConfig.push(new webpack.DefinePlugin({
        __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || __config__.env.buildDev)),
        WEBGL_RENDERER: true,
        CANVAS_RENDERER: true
    }));

    /*
        Plugin : SyncDataPlugin
        Responsible for writing game meta data to storage
     */
    pluginsConfig.push(new SyncDataPlugin({
        moduleName : moduleName,
        mode : __config__.env.mode,
        publicBuildDir : __config__.syncDataConfig.publicBuildDir,
        dataPath : path.resolve(__dirname, __config__.syncDataConfig.dataPath),
        filename : __config__.syncDataConfig.filename,
        metaPath : path.resolve(__dirname, inputPath + "/meta.json")
    }));

    /*
        Plugin : CopyWebpackPlugin
        Used when the project has assets (will probably elaborate)
     */
    const assetsPath = path.resolve(__dirname, "./src/" + moduleName + "/assets");

    let hasAssets = false;
    try {
        fs.statSync(path.resolve(__dirname, assetsPath)); // throw error if doesn't exist
        hasAssets = true;
    } catch(e) {}

    if (hasAssets) {
        pluginsConfig.push(new CopyWebpackPlugin([{
            from: assetsPath,
            to: 'assets'
        }]));

        /*
            When loading assets in the game, set the load path with the BUILD_ROOT environment variable
            process.env.BUILD_ROOT can be accessed within the game, so you can preface your asset load calls

            e.g. : this.load.path = process.env.BUILD_ROOT + "/not_literally/assets/";
         */
        pluginsConfig.push(new webpack.DefinePlugin({'process.env.BUILD_ROOT': "'" + __config__.buildRoot + "'"}));
    }

    /*
        Log info
    */
    console.log("--------------------------");
    console.log("Mode : " + mode);
    console.log("Module name : " + moduleName);
    console.log("Entry config : " + JSON.stringify(entryConfig, null, 2));
    console.log("Output config : " + JSON.stringify(outputConfig, null, 2));
    console.log("--------------------------");

    return {
        entry: entryConfig,
        output: outputConfig,
        watch: __config__.watch,
        stats: __config__.stats,
        plugins: pluginsConfig,
        optimization: {
            minimize: __config__.minimize,
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        chunks: 'all',
                        name: 'vendor',
                        test: /[\\/]node_modules[\\/]/,
                        enforce: true
                    },
                }
            }
        },
        module: {
            rules: [
                { test: /\.js$/, use: ['babel-loader'], include: path.join(__dirname, 'src') },
                { test: /phaser-split\.js$/, use: ['expose-loader?Phaser'] },
                { test: [/\.vert$/, /\.frag$/], use: 'raw-loader' }
            ]
        },
    };
};
