const express = require("express")
const app = express()

require('dotenv').config()

app.use(express.json())

const authRouter = require('./routes/auth')
app.use(authRouter)

const userRouter = require('./routes/user')
app.use(userRouter)

app.listen(process.env.PORT, () => {
    console.log(`server running on port ${process.env.PORT}`)
})