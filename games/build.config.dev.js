module.exports = {
    watch : false,
    stats : { warnings: false },
    minimize : false,
    outputRoot : "../server/public/dev/",
    buildRoot : "/dev",
    env : {
        mode : "development",
        buildDev : true
    },
    syncDataConfig : {
        dataPath : "../server/data/games.json",
        publicBuildDir : "/dev/[module_name]/"
    }
};
