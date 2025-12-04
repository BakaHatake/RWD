const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    username: String,
    items: [
        {
            name: String,
            price: Number,
            imageUrl: String,
            available: Boolean,
            quantity: Number
        }
    ]
});

module.exports = mongoose.model("Cart", cartSchema);
