/*
    SyncDataPlugin

    Takes the meta.json info and adds output scripts and other info for serving
 */

const fs = require("fs");

class SyncDataPlugin {
    /*
        Options :
            moduleName : [String],  // Module name (required)
            mode : [String],        // Compile mode (required)
            dataPath : [String]     // Path to data folder (required)
            dataFileName : [String]     // Name of file containing data
            metaPath : [String]     // Path to module meta file (required)
     */
	constructor(options) {
		this.options = options;
		this.errorMsgBase = "SyncDataPlugin error : ";
	}

	getInvalidOptions() {
		if (!this.options)
			return "Missing options.";
		if (!this.options.mode || (this.options.mode !== "development" && this.options.mode !== "production"))
			return "Missing or invalid option : mode. Required, values should be \"development\" or \"production\".";
		if (!this.options.moduleName)
			return "Missing option : moduleName";
		if (!this.options.dataPath)
			return "Missing option : dataPath";
		if (!this.options.dataFileName)
			return "Missing option : filename";
		if (!this.options.metaPath)
			return "Missing option : metaPath";
		if (!this.options.publicBuildDir)
			return "Missing option : publicBuildDir";
		return null;
	}

	fetchData(filepath) {
		return JSON.parse(fs.readFileSync(filepath, "utf8"));
	}

	writeData(filepath, jsonObject) {
		fs.writeFileSync(filepath, JSON.stringify(jsonObject, null, 2));
	}

	apply(compiler) {
        /*
            Validate
         */
		const invalidOptions = this.getInvalidOptions();
		if (invalidOptions) {
			console.log(`${this.errorMsgBase}${invalidOptions}`);
			return;
		}

		// Game meta file required
		try {
			fs.statSync(filepath);
		} catch (e) {
			console.log(`${this.errorMsgBase}Missing module meta file. Configured path : ${this.options.metaPath}`);
			return;
		}

        /*
            Create hook
         */
		compiler.hooks.done.tap("SyncDataPlugin", (stats) => {
			console.log("--------------------------");
			console.log("SyncDataPlugin :::: syncing...");

			const filename = `${this.options.dataPath}${this.options.dataFileName}`;

			// Get game meta information from meta.json
			const gameMeat = this.fetchData(this.options.metaPath);

			// Get data file if exists
			let database = {};
			try {
				database = this.fetchData(filename)
			} catch (e) { }

			// Make data directory if no data, fail if no make
			if (Object.keys(database).length === 0) fs.mkdirSync(this.options.dataPath);

			// Add game scripts
			gameMeat["scripts"] = Object.keys(stats.compilation.assets) // List of compiled assets
				.filter(script => /\b.js\b/.test(script)) // Take only .js files
				.map(script => `${this.options.publicBuildDir}${script}`); // Add script path to scripts field

			// Add mode
			gameMeat["build_mode"] = this.options.mode;

			// Update database record
			database[this.options.moduleName] = gameMeat;

			// Write it, fail if no write
			this.writeData(filename, database); // Fail if no write

			console.log(`SyncDataPlugin :::: finished writing data to ${filename}`);
			console.log("--------------------------");
		})
	}
}

module.exports = SyncDataPlugin;
