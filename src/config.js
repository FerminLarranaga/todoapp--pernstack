const { config } = require("dotenv");
config();

const devConfig = {
    connectionString: `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`
};

const proConfig = {
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
};

module.exports = {
    db: process.env.NODE_ENV? proConfig : devConfig,

    jwtSecret: process.env.JWTSECRET
}