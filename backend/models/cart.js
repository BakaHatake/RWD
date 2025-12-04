const Cart = require('../models/cart');

const add2cart = async (req, res) => {
    try {
        const { username, name, price, imageUrl, available } = req.body;

        let userCart = await Cart.findOne({ username });

        if (!userCart) {
            userCart = new Cart({
                username,
                items: [{
                    name,
                    price,
                    imageUrl,
                    available,
                    quantity: 1
                }]
            });

            await userCart.save();

            return res.status(201).json({
                message: "Item added to new cart",
                success: true
            });
        }

        const itemIndex = userCart.items.findIndex(item => item.name === name);

        if (itemIndex === -1) {
            userCart.items.push({
                name,
                price,
                imageUrl,
                available,
                quantity: 1
            });
        } else {
            userCart.items[itemIndex].quantity += 1;
            userCart.items[itemIndex].price = price * userCart.items[itemIndex].quantity;
        }

        await userCart.save();

        return res.status(200).json({
            message: "Cart updated",
            success: true
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Error",
            success: false
        });
    }
};

module.exports = add2cart;
