const fs = require("fs");
const path = require("path");

class FileSystem {
    constructor() {
        this.reposPath = path.resolve(__dirname, "../data") + "/"; // It's right there
    }
    fetchCollection(reposName, callback) {
        fs.readFile(this.reposPath + reposName + ".json", (err, file) => {
            if (err) callback(err);
            else {
                let body = new Buffer(file).toString();
                let collectionObject = JSON.parse(body); // Stored in .json file, should keep it correct for this imp.
                callback(null, collectionObject);
            }
        });
    }
}

module.exports = FileSystem;
