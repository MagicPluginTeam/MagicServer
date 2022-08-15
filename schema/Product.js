const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    productId: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    tag: { type: String, required: true },
    Price: { type: Number, required: true },
    createdAt: { type: Date, required: true, default: Date.now },
    lastUpdatedAt: { type: Date, required: true, default: Date.now },
    isSoldOut: { type: Boolean, required: true, default: false },
    thumbnailImage: { type: String, required: true }, //TODO (IMAGE)
    productImages: [{ type: String, required: true }], //TODO (IMAGE)
    qna: [
        {
            qnaId: { type: String, required: true, unique: true },
            userId: { type: String, required: true },
            title: { type: String, required: true },
            content: { type: String, required: true },
            createdAt: { type: Date, required: true, default: Date.now },
            lastUpdatedAt: { type: Date, required: true, default: Date.now },
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
            createdAt: { type: Date, required: true, default: Date.now },
            lastUpdatedAt: { type: Date, required: true, default: Date.now },
            rating: { type: Number, required: true, min: 1, max: 5 }
        }
    ]
})

module.exports = productSchema