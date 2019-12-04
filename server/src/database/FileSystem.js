const fs = require("fs-extra");

class FileSystem {
	constructor(dataDirectory) {
		this.dataDirectory = dataDirectory
	}

	async fetchCollection(collectionName) {
		try {
			const body = await fs.readFile(`${this.dataDirectory}/${collectionName}.json`, "utf8");
			const collectionObject = JSON.parse(body);
			return Promise.resolve(collectionObject);
		} catch (e) {
			return Promise.reject(e);
		}
	}
}

module.exports = FileSystem;
