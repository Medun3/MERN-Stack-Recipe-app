const express = require('express')     
const mongoose = require('mongoose')
const cors = require('cors')
const useRouter = require('./Routes/auth')
const cookieParser = require('cookie-parser')
const recipeRouter = require('./Routes/reciper')

const app = express()

app.use(cors({
    origin:["http://localhost:5173"],
    methods: ["GET", "POST", "PUT","DELETE"],
    credentials: true
}))

app.use(cookieParser())
app.use(express.json())
app.use('/auth', useRouter)
app.use('/recipe', recipeRouter)

//MongoDB Database
mongoose.connect('mongodb://127.0.0.1:27017/recipeapp')
console.log('connected database')

//Port Number
app.listen(3001, () => {
    console.log("Server Started")
})
