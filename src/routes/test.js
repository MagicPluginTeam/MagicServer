const express = require("express")
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const mail = require("../modules/mail.js");
const db = require("../modules/database.js");

let router = express.Router();

// TEST THINGS
router
    .get("/mailTest/:email", (req, res) => {
        mail.sendVerifyCode(req.params.email, undefined).then(r => {
            res.send(`Mail Sent to ${req.params.email}! | The code is ${r}`);
        });
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
            res.redirect("/err/403");
            return;
        }

        let user = await db.getUserByUserId(payment["userId"]);
        let product = await db.getProductByProductId(payment["productId"]);

        if (user === null
            || product === null) {
            res.redirect("/err/500");
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