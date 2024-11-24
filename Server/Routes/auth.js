const express = require ('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const UserModel = require('../models/User')
// const validPassword = require('validator')
const router = express.Router()

router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "All fields must be filled" });
    }
    if (username.length < 8 || password.length < 8) {
        return res.status(400).json({ message: "Username and password must be at least 8 characters long" });
    }
    
    try {
        const user = await UserModel.findOne({ username });
        if (user) {
            return res.status(409).json({ message: "User already exists" });
        }
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(password, salt);
        const newUser = new UserModel({ username, password: hashPassword });
        await newUser.save();
        return res.status(201).json({ message: "Record saved" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.json({ message: "All fields must be filled" });
    }
     
    console.log("message")

    try {
        const user = await UserModel.findOne({ username });
        if (!user) {
            return res.json({ message: "Wrong credentials" });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.json({ message: "Wrong credentials" });
        }
        const token = jwt.sign({ id: user._id }, "secret", { expiresIn: '1h' });
        res.cookie("token", token);
        return res.json({ message: "Successfully logged in", id: user._id });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});


router.get('/logout', (req, res) => {
   res.clearCookie("token")
   res.json({message: "Success"})
})

module.exports = router