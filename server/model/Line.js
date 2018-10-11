class Line extends require('./Model') {
    constructor() {
        super();
        this.collection = [
            { id : 1, name : "Handwoven", path : "/build/handwoven/js/handwoven.bundle.js" },
            { id : 2, name : "Count Scapula", path : "/build/count_scapula/js/count_scapula.bundle.js" },
            { id : 3, name : "Not Literally", path : "/build/not_literally/js/not_literally.bundle.js" }
        ];
    }
}

module.exports = new Line();
