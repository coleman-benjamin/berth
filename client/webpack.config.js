const path = require("path");

module.exports = function (env, argv) {
	const mode = argv.dev ? "development" : "production";
	const entry = path.resolve(__dirname, "./src/main.jsx");

	return {
		mode,
		entry,
		output: {
			pathinfo: true,
			path: path.resolve(__dirname, "../server/public/js/"),
			filename: 'client.bundle.js',
		},
		module: {
			rules: [
				{
					test: /.js$/, exclude: /node_modules/,
					use: [
						{
							loader: 'babel-loader',
							options: {
								cacheDirectory: true,
							},
						},
					],
				},
				{ test: /.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
			],
		},
		resolve: {
			alias: {
				'@': path.resolve(__dirname, './src')
			},
		},
	}
}