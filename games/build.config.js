const webpack = require("webpack");

module.exports = {
    watch : false,
    stats : { warnings: false },
    minimize : true,
    outputRoot : "../public/build/",
    buildRoot : "/build",
    env : {
        mode : "production",
        buildDev : false
    },
    plugins : [
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    ],
    syncDataConfig : {
        dataPath : "../web/data/games.json",
        publicBuildDir : "/build/[module_name]/"
    }
};
