const Line = require(__root + "/model/Line");

class LineController extends require("./Controller") {
    constructor() {
        super();
        this.prefix = "/lines";
        this.viewPath = "pages/lines/";
        this.routes = [
            { path: "/", method: this.METHOD.GET, handler: this.index },
            { path: "/:title", method: this.METHOD.GET, handler: this.show },
        ];
    }

    index(req, res) {
        res.render(this.viewPath + 'index', {
            title : "Lines",
            lines : Line.all()
        });
    }

    show(req, res) {
        let line = Line.findBy('title', req.params.title);
        res.render(this.viewPath + 'single', {
            title : line.title,
            script : line.path
        });
    }
}

module.exports = new LineController();
