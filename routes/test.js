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
    .get("/mailTest/:email", (req, res) => {
    const mailOptions = {
        from: "magicplugin.noreply@gmail.com",
        to: req.params.email,
        subject: "Test Mail",
        html: `<h1>Test Mail.</h1>`,
        text: "테스트 메일입니다."
    }

    mail.sendMail(mailOptions)
    mail.sendVerifyCode(req.params.email, "http://feather-s.kr/verifymail?token=" + req.params.email)

    const info = "Mail Sent to " + mailOptions.to

    console.log(info)
    res.send(info)
    })
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