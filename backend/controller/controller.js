const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt=require('jsonwebtoken')
const signup2 = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                message: "User already exists",
                success: false
            });
        }

        const newUser = new User({ name, email, password });

        newUser.password = await bcrypt.hash(password, 10);

        await newUser.save();

        return res.status(201).json({
            message: "Signup successful",
            success: true
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Signup failed",
            success: false
        });
    }
};

const login2 = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(409).json({
                message: "Invalid email",
                success: false
            });
        }

        const passMatch = await bcrypt.compare(password, user.password);
        if (!passMatch) {
            return res.status(409).json({
                message: "Invalid password",
                success: false
            });
        }
        return res.status(200).json({
            message: "Login successful",
            success: true
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
};

module.exports = {
    signup2,
    login2
};
