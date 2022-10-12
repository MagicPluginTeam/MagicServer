const express = require("express")
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const mail = require("../modules/mail.js");
const db = require("../modules/database.js");

let router = express.Router()

// TEST THINGS
router
    .get("/mailTest/:email", (req, res) => {
        mail.sendVerifyCode(req.params.email);

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

    .get("/pay/success/:orderId", async (req, res) => {
        let payment = await db.getPaymentByOrderId(req.params.orderId);

        if (payment === null) {
            res.status(403).redirect("/err/" + res.statusCode);
            return;
        }

        let user = await db.getUserByUserId(payment["userId"]);
        let product = await db.getProductByProductId(payment["productId"]);

        if (user === null
            || product === null) {
            res.status(500).redirect("/err/" + res.statusCode);
            return;
        }

        let context = {
            payment: payment,
            user: user,
            product: product
        };

        res.render("store/pay-success.ejs", context);
    })

module.exports = router