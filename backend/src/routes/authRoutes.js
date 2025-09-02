const express = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const router = express.Router();
const auth = require("../middleware/auth");
require("dotenv").config();


// register matlab signin 
router.post("/register", async (req, res) => {
    try {
        const { email, username, password } = req.body;

        // First we will check ki koi existing user with same email hai kya
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists!" });

        const newUser = new User({ email: email, username: username, password: password });
        await newUser.save();

        // Generate JWT
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });

        // Send JWT in cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // use true in production
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        // Send response
        res.status(201).json({
            message: "User registered and logged in",
            user: { name: user.name, email: user.email },
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        // If the user does not exists(means email is only not there)
        if (!user) return res.status(400).json({ message: "Invalid credentials." });

        //once user with this email is there only then go for checking password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid password, try again!" });

        // Once everything is passed only then go for token generation
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "Strict",
            maxAge: 24 * 60 * 60 * 1000,
        }).json({ success: true, user: { id: user._id, username: user.username }, message: "login successful" });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get("/verify", auth, (req, res) => {
    res.json({
        success: true,
        user: req.user,
    });
});


router.post("/logout", (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
    });
    res.json({ message: "Logged out successfully" });
    console.log("logout successful");
});

module.exports = router;