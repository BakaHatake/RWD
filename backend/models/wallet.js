const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    enum: ["credit", "debit"],
    required: true
  },
  utr: {
    type: String,
    default: ""
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const walletSchema = new mongoose.Schema(
  {
    userEmail: {
      type: String,
      required: true,
      unique: true
    },
    userKey: {
      type: String,
      required: true,
      unique: true
    },
    balance: {
      type: Number,
      default: 0
    },
    transactions: [transactionSchema]
  },
  {
    timestamps: true 
  }
);

module.exports = mongoose.model("Wallet", walletSchema);
