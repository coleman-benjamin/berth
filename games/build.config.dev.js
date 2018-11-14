module.exports = {
    watch : false,
    stats : { warnings: false },
    minimize : false,
    inputRoot : "src/",
    outputRoot : "../server/public/js/games/",
    buildRoot : "/js/games",
    env : {
        mode : "development",
        buildDev : true
    },
    syncDataConfig : {
        dataPath : "../server/data",
        filename : "/games.json",
        publicBuildDir : "/js/games/[module_name]/"
    }
};
