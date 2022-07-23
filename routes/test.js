const express = require("express")
const crypto = require("crypto");
const fs = require("fs");
const mail = require("../modules/mail.js");
let router = express.Router()

// TEST FEATURES.
router
    .post("/postTest", (req) => {
    console.log(req.body)
})

router
    .get("/mailTest/:email", (req, res) => {
    const mailOptions = {
        from: "magicplugin.noreply@gmail.com",
        to: req.params.email,
        subject: "Verification Mail",
        html: `<h1>Verification Mail.</h1>
                Click below button for verification.`,
        text: "인증 메일입니다."
    }

    mail.sendMail(mailOptions)

    const info = "Mail Sent to " + mailOptions.to

    console.log(info)
    res.send(info)
})

router
    .get("/uuidTest", (req, res) => {
    var uuid = crypto.randomUUID()
    var filename = uuid + ".uid"
    var filepath = __dirname + "/../serverfile/tmp/" + filename
    var stream = fs.createWriteStream(filepath)

    stream.once('open', function() {
        stream.write(uuid)
        stream.end()

        res.download(filepath, "UUID.uid", (err) => {
            if (err) console.log(err)

            fs.unlinkSync(filepath)
        })
    })
})

module.exports = router