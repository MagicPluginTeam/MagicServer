const express = require("express")
const crypto = require("crypto");
const fs = require("fs");
const mail = require("../modules/mail.js");
const db = require("../modules/db.js");

let router = express.Router()

// TEST FEATURES.
router
    .post("/postTest", (req) => {
        console.log(req.body)
    })
    .get("/mailTest/:email", (req, res) => {
        mail.sendVerifyCode(req.params.email)

        const info = "Mail Sent to " + req.params.email + "!"

        console.log(info)
        res.send(info)
    })
    .get("/uuidTest", (req, res) => {
        const uuid = crypto.randomUUID();
        const filename = uuid + ".uid";
        const filepath = __dirname + "/serverfile/tmp/" + filename;
        const stream = fs.createWriteStream(filepath);

        stream.once('open', function() {
            stream.write(uuid)
            stream.end()

            res.download(filepath, "UUID.uid", (err) => {
                if (err) console.log(err)

                fs.unlinkSync(filepath)
            })
        })
    })
    .get("/licenseCreationTest", async (req, res) => {
        const ownerUserId = "test"
        const productId = "test"
        const licenseUuid = "test"
        const allowedUser = [{ allow_ipAddress: "test", allow_macAddress: "test" }]
        const blockedUser = [{ block_ipAddress: "test", block_macAddress: "test" }]
        const maxIpSlotSize = 1
        const isUuidLocked = false
        const buyedAt = Date.now()
        const items = [{ productId, licenseUuid, allowedUser, blockedUser, maxIpSlotSize, isUuidLocked, buyedAt }]

        const data = await db.generateLicense(ownerUserId, [{
                ownerUserId,
                items
            }]).save()

        res.send(data)
    })

module.exports = router