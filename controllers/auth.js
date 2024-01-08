const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const userModel = require("../models/users")

const secret_key = process.env.JWT_TOKEN
const saltRounds = 10

const register = (req, res) => {
    const username = req.body.username
    const password = req.body.password

    const hashedPassword = bcrypt.hashSync(password, saltRounds)

    const user = {
        username,
        password: hashedPassword
    }

    userModel.push(user)

    res.status(201).send('Success add data')
}

const login = (req, res) => {
    const username = req.body.username
    const password = req.body.password

    const userInDB = userModel.find((user) => user.username == username)

    if(!userInDB) {
        return res.status(401).send('Username not found')
    }

    if(bcrypt.compareSync(password, userInDB.password)) {
        // Create a JWT token with user information
        const token = jwt.sign(username, secret_key)
    
        // Send the token to the user
        res.json({ token })
    } else {
        return res.status(401).send('Wrong password')
    }
}

module.exports = {
    login,
    register
}