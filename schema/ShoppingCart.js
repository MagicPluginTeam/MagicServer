const mongoose = require("mongoose");

const ShoppingCartSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    items: [
        {
            productId: { type: String, required: true, unique: true },
            count: { type: Number, required: true, default: 1 },
            addedAt: { type: Date, required: true, default: Date.now }
        }
    ]
})

module.exports = ShoppingCartSchema