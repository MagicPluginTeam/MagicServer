const express = require("express");
const request = require("request");
const crypto = require("crypto");
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
                    orderId: crypto.randomUUID(),
                    orderName: product["title"],
                    customerName: req.body.customerName,
                    cardNumber: req.body.cardNumber,
                    cardExpirationYear: req.body.cardExpirationYear,
                    cardExpirationMonth: req.body.cardExpirationMonth,
                    customerIdentityNumber: req.body.customerIdentityNumber
                },
                json: true
            };
            let orderId = options.body.orderId;

            await request.post("https://api.tosspayments.com/v1/payments/key-in", options, async (err, response, body) => {
                if (err) {
                    res.status(403).json({
                        status: "ERROR",
                        msg: "API_REQUEST_ERROR",
                        orderId: null
                    });
                    return;
                }

                if (JSON.parse(JSON.stringify(body))["message"] !== undefined) {
                    res.status(403).json({
                        status: "ERROR",
                        msg: body.message,
                        orderId: null
                    });
                    return;
                }

                await db.generatePaymentModel(orderId, userId, productId, JSON.stringify(body)).save();
                await db.updateProductByProductId(productId, { buys: product.buys + 1 });

                res.status(200).json({
                    status: "DONE",
                    msg: "SUCCESS",
                    orderId: orderId
                });
            });
        });
    })

module.exports = router