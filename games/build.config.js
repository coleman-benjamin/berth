const webpack = require("webpack");

module.exports = {
    watch: false,
    stats: { warnings: false },
    minimize: true,
    inputRoot: "module/",
    outputRoot: "../server/public/js/games/",
    buildRoot: "/js/games",
    env: {
        mode: "production",
        buildDev: false
    },
    plugins: [
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    ],
    syncDataConfig: {
        dataPath: "../server/data",
        filename: "/games.json",
        publicBuildDir: "/js/games/[module_name]/"
    }
};
