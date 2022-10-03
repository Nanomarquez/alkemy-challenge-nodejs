const { Router } = require("express");
const { authLogin, authRegister } = require('../controllers/auth.controllers.js')

const router = Router();

router.post('/login',authLogin)

router.post('/register',authRegister)

module.exports = router;