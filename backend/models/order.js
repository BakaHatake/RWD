const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: { type: String, required: true },

  items: [
    {
      itemname: String,
      itemsrc: String,
      itemprice: Number,
      quantity: { type: Number, default: 1 }
    }
  ],

  totalItems: {
    type: Number,
    required: true
  },

  totalAmount: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("Order", orderSchema);
