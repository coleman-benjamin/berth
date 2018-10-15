class PageController extends require("./Controller") {
    constructor() {
        super();
        this.routes = [
            { path: "/", method: this.METHOD.GET, handler: this.index },
            { path: "/welcome", method: this.METHOD.GET, handler: this.welcome },
            { path: "/about", method: this.METHOD.GET, handler: this.about }
        ];
    }

    index(req, res) {
        res.render('pages/index', {
            title : 'Index'
        })
    }

    welcome(req, res) {
        res.render('pages/welcome', {
            title : "Welcome"
        });
    }

    about(req, res) {
        res.render('pages/about', {
            title : "About"
        });
    }
}

module.exports = new PageController();