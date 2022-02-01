const pool = require("../db.js");
const bcrypt = require('bcrypt-nodejs');
const jwtGenerator = require('../utils/jwtGenerator');

const registryLogic = async (req, res, next) => {
    const {username, password} = req.body;
    const hashedPassword = bcrypt.hashSync(password);

    try{
        const newUser = await pool.query(
            "INSERT INTO users (username, hash) VALUES ($1, $2) RETURNING *",
            [username, hashedPassword]
        );
        
        const token = jwtGenerator(newUser.rows[0].id);

        res.json({token});
    } catch (e){
        next(e);
    }
}

const signinLogic = async (req, res, next) => {
    const {username, password} = req.body;
    
    try{
        const user = await pool.query(
            "SELECT * FROM users WHERE username = $1",
            [username]
        );

        if (user.rows.length > 0){
            const isValid = bcrypt.compareSync(password, user.rows[0].hash);
            if (isValid){
                const token = jwtGenerator(user.rows[0].id);
                res.json({token})
            } else {
                res.status(401).json('Invalid password');
            }
        } else {
            res.status(401).json('Check the username');
        }
    } catch (e){
        next(e);
    }
}

const verificationLogic = async (req, res, next) => {
    try {
        res.json({isTokenValid: true});
    } catch (error) {
        console.error(error.message);
        return res.status(403).json('Not authorize');
    }
}

const dashboard = async (req, res) => {
    const userId = req.user;
    try {
        const user = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);

        if(user.rows.length === 0){
            res.status(404).json({message: 'User not found'});
        }

        res.json(user.rows[0]);
    } catch (error) {
        console.error(error.message);
        return res.status(403).json('Not authorize');
    }
}

module.exports = {
    registryLogic,
    signinLogic,
    verificationLogic,
    dashboard
}