class Line extends require('./Model') {
    constructor() {
        super();
        this.collection = [
            { id : 1, name : "Handwoven", path : "/js/lines/1-Handwoven.js" },
            { id : 2, name : "Count Scapula", path : "/js/lines/2-Count Scapula.js" },
            { id : 3, name : "Not Literally", path : "/js/lines/3-Not Literally.js" }
        ];
    }
}

module.exports = new Line();