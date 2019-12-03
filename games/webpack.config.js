const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const SyncDataPlugin = require("./SyncDataPlugin");

module.exports = function (env, argv) {
    /*
        Args / Webpack flags
     */
	if (!argv.game) {
		console.log("Error : Pass in module name, e.g. npm run game -- --game=myGame");
		process.exit(1);
	}

	argv.mode = argv.dev ? "development" : "production";

	const moduleName = argv.game;
	const mode = argv.mode;
	const watch = argv.watch ? true : false;
	const minimize = mode === "production"
	const stats = { warnings: mode === "production" }

    /*
        Declarations
     */
	const inputPath = path.resolve(__dirname, `./module/${moduleName}`);
	const outputPath = path.resolve(__dirname, `../server/public/js/games/${moduleName}`);

	const publicBuildDir = `/js/games/${moduleName}/`;
	const publicPath = './';

	const dataPath = path.resolve(__dirname, "../server/data");
	const dataFileName = "/games.json";

	const buildRoot = "/js/games";
	const assetsPath = `${inputPath}/assets`;
	const metaPath = `${inputPath}/meta.json`;

	const entry = {};
	const output = {};
	const plugins = [];

    /*
        Entry Config
    */
	entry[moduleName] = `${inputPath}/main.js`;
	entry["vendor"] = ['phaser'];

    /*
        Output Config
     */
	output["pathinfo"] = true;
	output["path"] = outputPath;
	output["publicPath"] = publicPath;
	output["library"] = '[name]';
	output["libraryTarget"] = 'umd';
	output["filename"] = '[name].bundle.js';

    /*
        Ignore Plugins
    */
	if (mode === "production") {
		plugins.push.apply(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/));
	}

    /*
        Plugin : Phaser 3
    */
	plugins.push(new webpack.DefinePlugin({
		__DEV__: mode === "development",
		WEBGL_RENDERER: true,
		CANVAS_RENDERER: true
	}));

    /*
        Plugin : SyncDataPlugin
        Responsible for writing game meta data to storage
     */
	plugins.push(new SyncDataPlugin({ mode, moduleName, publicBuildDir, dataPath, dataFileName, metaPath }));

    /*
        Plugin : CopyWebpackPlugin
        Used when the project has assets (will probably elaborate)
     */

	if (fs.readdirSync(inputPath).includes("assets")) {

		plugins.push(new CopyWebpackPlugin([{
			from: assetsPath,
			to: 'assets'
		}]));

        /*
            When loading assets in the game, set the load path with the BUILD_ROOT environment variable
            process.env.ASSETS_PATH can be accessed within the game, so you can preface your asset load calls

            e.g. : this.load.path = process.env.ASSETS_PATH;
         */
		plugins.push(new webpack.DefinePlugin({ 'process.env.BUILD_ROOT': `'${buildRoot}'` }));
		plugins.push(new webpack.DefinePlugin({ 'process.env.ASSETS_PATH': `'${publicBuildDir}assets/'` }));
	}

    /*
        Log info
    */
	console.log("--------------------------");
	console.log(`Module name : ${moduleName}`);
	console.log(`Input path : ${inputPath}`);
	console.log(`Output path : ${outputPath}`);
	console.log("--------------------------");

	return {
		entry,
		output,
		watch,
		stats,
		plugins,
		optimization: {
			minimize,
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
