const Wallet = require("../models/wallet");
const User = require("../models/user");

const getwallet = async (req, res) => {
  try {
    const { key } = req.body;

    if (!key) {
      return res.status(400).json({
        success: false,
        message: "Key is required"
      });
    }

    const foundUser = await User.findOne({ key });
    if (!foundUser) {
      return res.status(404).json({
        success: false,
        message: "Invalid key"
      });
    }

    let userwallet = await Wallet.findOne({ userKey: key });

    if (!userwallet) {
      userwallet = new Wallet({
        userEmail: foundUser.email,
        userKey: key,
        balance: 0,
        transactions: []
      });
      await userwallet.save();
    }

    return res.status(200).json({
      success: true,
      balance: userwallet.balance,
      transactions: userwallet.transactions
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

const updatewallet = async (req, res) => {
  try {
    const { key, amount,utr } = req.body;

    if (!key || typeof amount !== "number" || amount === 0) {
      return res.status(400).json({
        success: false,
        message: "Valid key and non-zero amount required"
      });
    }

    const foundUser = await User.findOne({ key });
    if (!foundUser) {
      return res.status(404).json({
        success: false,
        message: "Invalid key"
      });
    }

    let userwallet = await Wallet.findOne({ userKey: key });

    if (!userwallet) {
      userwallet = new Wallet({
        userEmail: foundUser.email,
        userKey: key,
        balance: 0,
        transactions: []
      });
    }

    userwallet.balance += amount;
    userwallet.transactions.push({
      amount: Math.abs(amount),
      type: amount > 0 ? "credit" : "debit",
      utr:utr
    });

    await userwallet.save();

    return res.status(200).json({
      success: true,
      balance: userwallet.balance
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

module.exports = { getwallet, updatewallet };
