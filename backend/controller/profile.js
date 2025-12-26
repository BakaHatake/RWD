const User = require("../models/user");
const Wallet = require("../models/wallet");

const profile = async (req, res) => {
    const { key } = req.query;

    if (!key) {
        return res.status(400).json({
            success: false,
            message: "Key is required"
        });
    }

    try {
        const user = await User.findOne({ key });
        const wallet = await Wallet.findOne({ userKey: key });

        if (!user && !wallet) {
            return res.status(400).json({
                success: false,
                message: "User and wallet not found"
            });
        }

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            });
        }

        if (!wallet) {
            return res.status(400).json({
                success: false,
                message: "Wallet not found"
            });
        }

        const body = {
            name: user.name,
            phone: user.phone,
            email: user.email,
            key: user.key,
            balance: wallet.balance
        };

        return res.status(200).json({
            success: true,
            body
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

module.exports = { profile };
