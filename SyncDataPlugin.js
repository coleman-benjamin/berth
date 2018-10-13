/*
    SyncDataPlugin

    The purpose of this plugin is to write the compilation information to a local file,
    which the server will use to present the compiled modules.
 */

const fs = require("fs");

class SyncDataPlugin {
    /*
        Options :
            moduleName : [String],  // Module name (required)
            env : [String],         // Compile environment (required)
            dataPath : [String]     // Path to data folder (required)
            metaPath : [String]     // Path to module meta file (required)
     */
    constructor(options) {
        this.options = options;
        this.errorMsgBase = "SyncDataPlugin error : ";
    }

    getInvalidOptions() {
        if (!this.options)
            return "Missing options.";
        if (!this.options.env || (this.options.env !== "dev" && this.options.env !== "prod"))
            return "Missing or invalid option : env. Required, values should be \"dev\" or \"prod\".";
        if (!this.options.moduleName)
            return "Missing option : moduleName";
        if (!this.options.dataPath)
            return "Missing option : dataPath";
        if (!this.options.metaPath)
            return "Missing option : metaPath";
        return null;
    }

    checkFileExists(path) {
        try {
            fs.statSync(path);
            return true;
        } catch(e) {
            return false;
        }
    }

    getJsonFromFile(path) {
        let file = fs.readFileSync(path, { encoding : "utf8" });
        return JSON.parse(new Buffer(file).toString());
    }

    writeJsonObjectToFile(path, jsonObject) {
        fs.writeFileSync(path, JSON.stringify(jsonObject, null, 2));
    }

    apply(compiler) {
        /*
            Validate
         */
        let invalidOptions = this.getInvalidOptions();
        if (invalidOptions) {
            console.log(this.errorMsgBase + invalidOptions);
            return;
        }
        if (!this.checkFileExists(this.options.metaPath)) {
            console.log(this.errorMsgBase + "Missing module meta file.");
            return;
        }

        /*
            Create hook
         */
        const ctx = this;

        compiler.hooks.done.tap("SyncDataPlugin", (stats) => {
            console.log("--------------------------");
            console.log("SyncDataPlugin :::: syncing...");

            /*
                Environment config
             */
            let publicBuildDir = "/dev/" + this.options.moduleName + "/";
            let scriptsField = "devScripts";
            if (this.options.env === "prod") {
                publicBuildDir = "/build/" + this.options.moduleName + "/";
                scriptsField = "scripts";
            }

            /*
                Get module meta object
             */
            const meta = ctx.getJsonFromFile(this.options.metaPath);

            /*
                Get data file if exists, or empty object if not
             */
            let data = {};
            if (ctx.checkFileExists(this.options.dataPath)) {
                data = ctx.getJsonFromFile(this.options.dataPath);
            }

            /*
                Add information to meta file and assign it to data object
             */

            // Fill public build path for each script (JS only)
            let scripts = Object.keys(stats.compilation.assets);
            let compiledScripts = [];
            for (let x = 0; x < scripts.length; x++) {
                if (/\b.js\b/.test(scripts[x])) {
                    compiledScripts.push(publicBuildDir + scripts[x]);
                }
            }
            meta[scriptsField] = compiledScripts;
            console.log(compiledScripts);

            /*
                Assign meta to data object and write to file
             */
            data[this.options.moduleName] = meta;
            ctx.writeJsonObjectToFile(this.options.dataPath, data);

            console.log("SyncDataPlugin :::: finished writing data to " + this.options.dataPath);
            console.log("--------------------------");
        })
    }
}

module.exports = SyncDataPlugin;
