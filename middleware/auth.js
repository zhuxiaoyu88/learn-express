const express = require("express")
const app = express()

const jwt = require("jsonwebtoken")

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization

    if(!token){
        return res.status(401).send('Unauthorized: Missing token')
    }

    jwt.verify(token, process.env.JWT_TOKEN, (err, user) => {
        if(err) {
            return res.status(403).send('Forbidden: invalid token')
        }

        req.user = user
        next()
    })
}

module.exports = {
    verifyToken
}