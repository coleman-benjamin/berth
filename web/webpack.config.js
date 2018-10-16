const path = require("path");

module.exports = options => {
    const entry = path.resolve(__dirname, "./src/client/main.jsx");
    return {
        entry: entry,
        output: {
            pathinfo: true,
            path : path.resolve(__dirname, "../public/web/"),
            filename: 'web.bundle.js',
        },
        module: {
            rules: [
                { test: /.js$/, exclude: /node_modules/,
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
    }
}