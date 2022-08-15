const mongoose = require("mongoose");

const LicenseSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    items: [
        {
            productId: { type: String, required: true, unique: true },
            licenseUuid: { type: String, required: true, unique: true },
            allowedUser: [
                {
                    ipAddress: { type: String, required: true, unique: true },
                    macAddress: { type: String, required: true, unique: true }
                }
            ],
            blockedUser: [
                {
                    ipAddress: { type: String, required: true, unique: true },
                    macAddress: { type: String, required: true, unique: true }
                }
            ],
            maxIpSlotSize: { type: Number, required: true, min: 1, default: 1 },
            isUuidLocked: { type: Boolean, required: true, default: false },
            buyedAt: { type: Date, required: true, default: Date.now }
        }
    ]
})

module.exports = LicenseSchema