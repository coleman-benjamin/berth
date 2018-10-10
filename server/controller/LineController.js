const Line = require(__root + "/model/Line");

class LineController extends require("./Controller") {
    constructor() {
        super();
        this.prefix = "/lines";
        this.routes = [
            { path: "/", method: this.METHOD.GET, handler: this.index },
            { path: "/:name", method: this.METHOD.GET, handler: this.show },
        ];
    }

    index(req, res) {
        res.render('pages/lines/index', {
            title : "Lines",
            lines : Line.all()
        });
    }

    show(req, res) {
        let line = Line.findBy('name', req.params.name);
        res.render('pages/lines/single', {
            title : line.name,
            script : line.path
        });
    }
}

module.exports = new LineController();
