/*
    Attach mode flag to render data
 */
const cookieName = "devMode";

module.exports = function(req, res, next) {
    res.locals.devMode = false;
    if (req.query.mode && req.query.mode === "dev") {
        res.locals.devMode = true;
    }
    console.log(res.locals.devMode);

    next();
};
