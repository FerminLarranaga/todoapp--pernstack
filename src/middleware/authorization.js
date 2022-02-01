const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');

module.exports = async (req, res, next) => {
    try {
        const jwtToken = req.header('token');

        if (!jwtToken) return res.status(403).json({message: 'No token'});

        const payload = jwt.verify(jwtToken, jwtSecret);
        req.user = payload.user;
        next();
    } catch (error) {
        console.error(error.message);
        return res.status(403).json({message: 'Not authorize: ' + error.message});
    }
}