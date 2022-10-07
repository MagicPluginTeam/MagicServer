const express = require("express");
const request = require("request");
const accountChecker = require("../../modules/accountChecker");
const db = require("../../modules/database");

let router = express.Router();

router
    .get("/success", async (req, res) => {
        res.send("success, temp");
    })
    .get("/fail", async (req, res) => {
        res.send("fail, temp");
    })

    .post("/", async (req, res) => {
        /*
        if (!(await accountChecker.isLoggedIn(req, res))) {
            return;
        }
        */

        let userId = /* req.cookies["userId"] */ req.body.userId;
        let productId = req.body.productId;
        if (productId === undefined) {
            res.status(403).redirect("/err/" + res.statusCode);
            return;
        }

        let user = await db.getUserByUserId(userId);
        let product = await db.getProductByproductId(productId);
        if (user === null) {
            res.status(403).redirect("/err/" + res.statusCode);
            return;
        }
        if (product === null) {
            res.status(403).redirect("/err/" + res.statusCode);
            return;
        }

        user = JSON.parse(JSON.stringify(user));
        product = JSON.parse(JSON.stringify(product));

        let options = {
            headers: {
                Authorization: "Basic " + Buffer.from(process.env.TOSS_SECRET_KEY + ":").toString("base64"),
                "Content-Type": "application/json"
            },
            data: {
                "amount": product["price"],
                "orderId": "TEMP_ORDER_ID", //TODO
                "orderName": product["title"],
                "cardNumber": req.body.card1 + req.body.card2 + req.body.card3 + req.body.card4,
                "cardExpirationYear": req.body.exp_year,
                "cardExpirationMonth": req.body.exp_month,
                "customerIdentityNumber": req.body.identity_num,
                "successUrl": "https://magicplugin.net/api/payment/success",
                "failUrl": "https://magicplugin.net/api/payment/fail"
            }
        }

        let data, code;

        request.post("https://api.tosspayments.com/v1/payments/key-in", options, (err, response, body) => {
            if (err) {
                console.log("Error while calling TossPayments API");
                return;
            }

            data = JSON.parse(JSON.stringify(response));

            res.json({
                "statusCode": code,
                "returnData": data
            });
        });
    })

module.exports = router