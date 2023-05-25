const router = require('express').Router()

const jwt = require('jsonwebtoken')
const verifyToken = require('../middleware/auth')

const userController = require('../controllers/UserController')

router.get('/', verifyToken, userController.checkUserLoggedIn)
router.post('/register', userController.register)
router.post('/login', userController.login)

module.exports = router