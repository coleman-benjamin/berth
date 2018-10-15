const fs = require("fs");
const path = require("path");

class FileSystem {
    constructor(dataDirectory) {
        this.dataDirectory = dataDirectory
    }
    fetchCollection(collectionName, callback) {
        fs.readFile(this.dataDirectory + collectionName + ".json", (err, file) => {
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
