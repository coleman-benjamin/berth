const exception = require(__root + "/exception/exception");

class Model {
    constructor() {
        this.exception = exception;
        this.collection = [];
    }

    all() {
        return this.collection;
    }

    findBy(field, term) {
        field = field ? field : 'id';
        let record = this.collection.find((it) => it[field] === term);
        if (!record) {
            throw new this.exception.ResourceNotFoundException(this.constructor.name + " by query : \"" + field + "\" = \"" + term + "\"");
        }
        return record;
    }
}

module.exports = Model;
