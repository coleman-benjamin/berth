const GameService = require(__root + "/service/GameService");
const ModeMiddleware = require(__root + "/middleware/ModeMiddleware")
const viewPath = "pages/lines/";

class LineController extends require("./Controller") {
    constructor() {
        super();
        this.prefix = "/lines";
        this.routes = [
            { path: "/", method: this.METHOD.GET, middleware : ModeMiddleware, handler: this.index },
            { path: "/:id", method: this.METHOD.GET, middleware : ModeMiddleware, handler: this.show },
        ];
    }

    index(req, res) {
        GameService.getAll("lines", (err, lines) => {
            res.render(viewPath + 'index', {
                title : "Lines",
                lines : lines
            });
        })
    }

    show(req, res) {
        GameService.getById(req.params.id, (err, line) => {
            res.render(viewPath + 'single', {
                title : line.title,
                scripts : line.devScripts
            });
        });
    }
}

module.exports = new LineController();
