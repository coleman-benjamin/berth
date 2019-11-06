const fs = require("fs-extra");
const path = require("path");

class FileSystem {
	constructor(dataDirectory) {
		this.dataDirectory = dataDirectory
	}

	async fetchCollection(collectionName) {
		try {
			const body = await fs.readFile(this.dataDirectory + collectionName + ".json", "utf8");
			const collectionObject = JSON.parse(body);
			return Promise.resolve(collectionObject);
		} catch (e) {
			return Promise.reject(e);
		}

		// fs.readFile(this.dataDirectory + collectionName + ".json", (err, file) => {
		//     if (err) callback(err);
		//     else {
		//         let body = new Buffer(file).toString();
		//         let collectionObject = JSON.parse(body); // Stored in .json file, should keep it correct for this imp.
		//         callback(null, collectionObject);
		//     }
		// });
	}
}

module.exports = FileSystem;
