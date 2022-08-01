const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    passwordHash: { type: String, required: true },
    lastLoginAt: { type: Date, required: true, default: Date.now },
    registeredAt: { type: Date, required: true, default: Date.now },
    isAdmin: { type: Boolean, required: true, default: false }
})

module.exports = mongoose.model("User", userSchema)