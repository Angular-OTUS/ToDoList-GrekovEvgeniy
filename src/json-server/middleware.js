module.exports = (req, res, next) => {
    if (req.method === 'GET') {
        const delay = 300;
        return setTimeout(next, delay);
    }
    next();
};