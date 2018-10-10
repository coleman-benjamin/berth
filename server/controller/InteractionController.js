const Interaction = require(__root + "/model/Interaction");

class InteractionController extends require("./Controller") {
    constructor() {
        super();
        this.prefix = "/interactions";
        this.routes =[
            { path : "/", method : this.METHOD.GET, handler : this.index },
            { path : "/:name", method : this.METHOD.GET, handler : this.show }
        ]
    }

    index(req, res) {
        res.render('pages/interactions/index', {
            title : "Interactions",
            interactions : Interaction.all()
        });
    }

    show(req, res) {
        let interaction = Interaction.findBy('name', req.params.name);
        res.render('pages/interactions/single', {
            title : interaction.name,
            script : interaction.path
        });
    }
}

module.exports = new InteractionController();
