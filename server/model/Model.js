const Exception = require(__root + "/exception/Exception");

class Model {
    constructor() {
        this.collection = [];
    }

    all() {
        return this.collection;
    }

    findBy(field, term) {
        field = field ? field : 'id';
        let record = this.collection.find((it) => it[field] === term);
        if (!record) {
            throw new Exception.ResourceNotFoundException(this.constructor.name + " by query : \"" + field + "\" = \"" + term + "\"");
        }
        return record;
    }
}

module.exports = Model;
