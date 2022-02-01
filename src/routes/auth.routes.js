const { Router } = require('express');
const validInfo = require('../middleware/validInfo');
const authorization = require("../middleware/authorization");

const {
    registryLogic,
    signinLogic,
    verificationLogic,
    dashboard
} = require('../controllers/auth.controllers.js');

const router = Router();

router.post("/register", validInfo, registryLogic);

router.post("/signin", validInfo, signinLogic);

router.get("/is-verify", authorization, verificationLogic);

router.get('/dashboard', authorization,  dashboard);

module.exports = router;