const mongoose = require("mongoose");

const pluginSchema = new mongoose.Schema({
    pluginName: { type: String, required: true, unique: true },
    pluginId: { type: Number, required: true, unique: true },
    firstReleaseAt: { type: Date },
    lastReleaseAt: { type: Date },
    latestVersion: { type: String, required: true },
    latestConfigVersion: { type: String, required: true }
});

module.exports = pluginSchema;