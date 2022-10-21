const mongoose = require("mongoose");

const redirectSchema  = new mongoose.Schema({
    directCode: { type: String, required: true, unique: true },
    url: { type: String, required: true, unique: false }
});

module.exports = redirectSchema;