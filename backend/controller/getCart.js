const Cart = require('../models/cart');

const getCart = async (req, res) => {
    try {
        const { username } = req.body;

        if (!username) {
            return res.status(400).json({
                message: "Username required",
                success: false
            });
        }

        const userCart = await Cart.findOne({ username });

        if (!userCart) {
            return res.status(200).json({
                message: "Cart is empty",
                items: [],
                success: true
            });
        }

        return res.status(200).json({
            message: "Cart fetched",
            items: userCart.items,
            success: true
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
};

module.exports = getCart;
