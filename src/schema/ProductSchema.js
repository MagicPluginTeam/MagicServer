const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    productId: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    shortDescription: { type: String, required: true },
    description: { type: String, required: true },
    tag: { type: String, required: true },
    price: { type: Number, required: true },
    createAt: { type: Date, required: true, default: Date.now() },
    lastUpdateAt: { type: Date, required: true, default: Date.now() },
    thumbnailImageURL: { type: String, required: true },
    productImageURL: { type: String, required: true },
    buys: { type: Number, required: true, default: 0 }
});

module.exports = productSchema;