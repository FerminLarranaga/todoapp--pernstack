const jwt = require('jsonwebtoken');
const {jwtSecret} = require('../config');

const jwtGenerator = (user_id) => {
    const payload = {
        user: user_id
    }

    return jwt.sign(payload, jwtSecret, {expiresIn: '1hr'});
}

module.exports = jwtGenerator;