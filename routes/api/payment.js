const express = require("express");
const request = require("request");
const uuid = require("uuid");
const accountChecker = require("../../modules/accountChecker");
const db = require("../../modules/database");

let router = express.Router();

router
    .post("/", async (req, res) => {
        let userId = req.body.userId;
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
            body: {
                amount: product["price"],
                orderId: uuid.v4(),
                orderName: product["title"],
                customerName: req.body.customerName,
                cardNumber: req.body.cardNumber1 + req.body.cardNumber2 + req.body.cardNumber3 + req.body.cardNumber4,
                cardExpirationYear: req.body.cardExpirationYear,
                cardExpirationMonth: req.body.cardExpirationMonth,
                customerIdentityNumber: req.body.customerIdentityNumber
            },
            json: true
        }

        let data;
        request.post("https://api.tosspayments.com/v1/payments/key-in", options, async (err, response, body) => {
            if (err) {
                console.log("Error while calling TossPayments API");
                return;
            }

            data = JSON.parse(JSON.stringify(response));

            await db.generatePaymentModel(options.body.orderId, userId, productId).save();

            res.json({
                returnData: data
            });
        });
    })

module.exports = router