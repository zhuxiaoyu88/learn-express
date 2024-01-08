const express = require("express")

const userController = require('../controllers/user')
const authMiddleware = require('../middleware/auth')

const user = express.Router()

user.get('/see-profile', authMiddleware.verifyToken, userController.getUsername)

module.exports = user
