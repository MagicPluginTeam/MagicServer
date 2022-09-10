const mongoose = require("mongoose");

const publicBannedUserSchema = new mongoose.Schema({
    addAt: { type: Date, required: true, default: Date.now },
    macAddress: { type: String, required: false, unique: true },
    ipAddress: { type: String, required: true, unique: true },
})

module.exports = publicBannedUserSchema