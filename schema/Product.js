const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    productId: { type: String, required: true, unique: true },
    Title: { type: String, required: true },
    Description: { type: String, required: true },
    Tag: { type: String, required: true },
    Price: { type: Number, required: true },
    createdDate: { type: Date, required: true, default: Date.now },
    lastUpdatedDate: { type: Date, required: true, default: Date.now },
    isSoldOut: { type: Boolean, required: true, default: false },
    thumbnail: { type: Image, required: true },
    productImages: [{ type: Image, required: true }],
    qna: [
        {
            qnaId: { type: String, required: true, unique: true },
            userId: { type: String, required: true },
            title: { type: String, required: true },
            content: { type: String, required: true },
            createdDate: { type: Date, required: true, default: Date.now },
            lastUpdatedDate: { type: Date, required: true, default: Date.now },
            isSecret: { type: Boolean, required: true, default: false },
            isSolved: { type: Boolean, required: true, default: false }
        }
    ],
    review: [
        {
            reviewId: { type: String, required: true, unique: true },
            userId: { type: String, required: true },
            title: { type: String, required: true },
            content: { type: String, required: true },
            createdDate: { type: Date, required: true, default: Date.now },
            lastUpdatedDate: { type: Date, required: true, default: Date.now },
            rating: { type: Number, required: true, min: 1, max: 5 }
        }
    ]
})

module.exports = mongoose.model("Product", productSchema);