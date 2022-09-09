const mongoose = require("mongoose");

const PublicBannedUserSchema = new mongoose.Schema({
    userId: { type: String, required: false, unique: true },
    addAt: { type: Date, required: true, default: Date.now },
    macAddress: { type: String, required: false, unique: true },
    ipAddress: { type: String, required: true, unique: true },
})

module.exports = PublicBannedUserSchema