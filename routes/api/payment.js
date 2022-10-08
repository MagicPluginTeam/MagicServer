const express = require("express");
const request = require("request");
const uuid = require("uuid");
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
        let product = await db.getProductByProductId(productId);
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

        await request.get("https://api.frankfurter.app/latest?from=USD&to=KRW", { json: true }, async (err_, response_, body_) => {
            let options = {
                headers: {
                    Authorization: "Basic " + Buffer.from(process.env.TOSS_SECRET_KEY + ":").toString("base64"),
                    "Content-Type": "application/json"
                },
                body: {
                    amount: product["price"] * body_.rates.KRW,
                    orderId: uuid.v4(),
                    orderName: product["title"],
                    customerName: req.body.customerName,
                    cardNumber: req.body.cardNumber,
                    cardExpirationYear: req.body.cardExpirationYear,
                    cardExpirationMonth: req.body.cardExpirationMonth,
                    customerIdentityNumber: req.body.customerIdentityNumber
                },
                json: true
            };

            await request.post("https://api.tosspayments.com/v1/payments/key-in", options, async (err, response, body) => {
                if (err) {
                    res.json({
                        status: "ERROR",
                        msg: "API_REQUEST_ERROR",
                        returnData: null
                    });
                    return;
                }

                if (JSON.parse(JSON.stringify(body))["message"] !== undefined) {
                    res.json({
                        status: "ERROR",
                        msg: JSON.parse(JSON.stringify(body))["message"],
                        returnData: null
                    });
                    return;
                }

                await db.generatePaymentModel(options.body.orderId, userId, productId).save();
                await db.updateProductByProductId(productId, { buys: product["buys"] + 1 });

                res.json({
                    status: "DONE",
                    msg: "SUCCESS",
                    returnData: response
                });
            });
        });
    })

module.exports = router