const fs = require("fs");
const path = require("path");

class FileSystem {
    constructor() {
        this.cache = {
            "build" : null,
            "dev" : null
        };
        this.reposPath = path.resolve(__dirname, "../data") + "/"; // It's right there
    }
    fetchCollection(reposName, callback) {
        if (!this.cache[reposName]) {
            fs.readFile(this.reposPath + reposName + ".json", (err, file) => {
                if (err) callback(err);
                else {
                    let body = new Buffer(file).toString();

                    // Parse
                    let collectionObject = JSON.parse(body); // Stored in .json file, should keep it correct for this imp.

                    // Cache
                    this.cache[reposName] = collectionObject;

                    callback(null, collectionObject);
                }
            });
        } else {
            callback(null, this.cache[reposName]);
        }
    }
}

module.exports = FileSystem;
