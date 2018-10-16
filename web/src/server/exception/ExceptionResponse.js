const Exception = require("./Exception");

function render404(req, res) {
    res.render("404", {
        title : "Page Not Found",
    });
}

function render500(error, req, res, next) {
    res.render("500", {
        title : "Server Error",
        error : error
    })
}
class ExceptionResponse {
    constructor() {}

    notFound(req, res) {
        render404(req, res);
    }

    serverError(error, req, res, next) {
        if (error instanceof Exception.ResourceNotFoundException) {
            render404(req, res);
        } else {
            render500(error, req, res, next);
        }
    }
}

module.exports = new ExceptionResponse();