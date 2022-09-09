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
        mail.sendVerifyCode(req.params.email)

        const info = "Mail Sent to " + req.params.email + "!"

        console.log(info)
        res.send(info)
    })

module.exports = router