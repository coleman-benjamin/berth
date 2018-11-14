const path = require("path");

module.exports = options => {
    const entry = path.resolve(__dirname, "./main.jsx");
    return {
        entry: entry,
        output: {
            pathinfo: true,
            path : path.resolve(__dirname, "../server/public/js/"),
            filename: 'client.bundle.js',
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