/*
    Attach mode flag to render data
 */
module.exports = function(req, res, next) {
    if (req.query && req.query.mode && req.query.mode === "dev") {
        res.locals.devMode = true;
    } else {
        res.locals.devMode = false;
    }
    next();
};
