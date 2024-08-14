module.exports = (applicationName) => {
    return function log(req, res, next) {
        res.on("finish", () => {
        })
        next();
    }
};