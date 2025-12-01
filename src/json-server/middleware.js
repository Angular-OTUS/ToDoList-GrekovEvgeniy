module.exports = (req, res, next) => {
    if (req.method === 'GET') {
        const delay = 1000;
        return setTimeout(next, delay);
    }
    next();
};