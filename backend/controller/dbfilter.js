const Item = require('../models/item');

const filter = async (req, res) => {
    try {
        const { category } = req.body;

        let items;
        if (category === "All") {
            items = await Item.find();
        } else {
            items = await Item.find({ category });
        }

        return res.status(200).json({
            message: "Filtered successfully",
            items,
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

module.exports = { filter };
