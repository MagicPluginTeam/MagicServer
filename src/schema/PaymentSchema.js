const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
    orderId: { type: String, required: true, unique: true },
    userId: { type: String, required: true },
    productId: { type: String, required: true },
    buyAt: { type: Date, required: true, default: Date.now }
})

module.exports = paymentSchema