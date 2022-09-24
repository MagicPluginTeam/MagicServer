const express = require("express")
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const mail = require("../modules/mail.js");

let router = express.Router()

// TEST FEATURES
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
        const filepath = path.join(__dirname, "/../serverfile/tmp/", filename);
        const stream = fs.createWriteStream(filepath);

        stream.once('open', () => {
            stream.write(uuid)
            stream.end()

            res.download(filepath, "UUID.uid", (err) => {
                if (err) console.log(err)
    
                fs.unlinkSync(filepath)
            })
        });
    })

module.exports = router