const Wrapper = (fn) => {
    return async (req, res, next) => {
        try {
            await fn(req, res, next);
        } catch (err) {
            return next(err);
        }
    }
}
module.exports = Wrapper;