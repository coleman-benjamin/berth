const Exception = require("./Exception");

class ExceptionResponse {
    constructor() {}

    serverError(error, req, res, next) {
        if (error instanceof Exception.ResourceNotFoundException) {
            res.status = 404;
            res.json({
                message : error.message
            });
        } else {
            res.status = 500;
            res.json({
                message : "Server error",
                error : error
            })
        }
    }
}

module.exports = new ExceptionResponse();
