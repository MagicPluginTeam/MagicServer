const crypto = require("crypto");
const express = require("express");
const request = require("request");
const db = require("../../modules/database.js");
const accountChecker = require("../../modules/accountChecker.js");

let router = express.Router()

router
    .post("/", async (req, res) => {
        if (!await accountChecker.isAdmin(req)) {
            res.redirect("/err/403");
            return;
        }

        await db.generateProductModel(crypto.randomUUID(), req.body.title, req.body.shortDescription, req.body.description, req.body.tag, req.body.price, req.body.thumbnailImageURL, req.body.productImageURL).save();

        res.status(200).redirect("/admin/store/create");
    })
    .get("/delete/:productId", async (req, res) => {
        if (!await accountChecker.isAdmin(req)) {
            res.redirect("/err/403");
            return;
        }

        await db.deleteProductByProductId(req.params.productId);

        res.status(200).redirect("/admin/store/list");
    })

    .post("/buy/:productId", async (req, res) => {
        if (!(await accountChecker.isLoggedIn(req, res))) {
            return;
        }

        let body = req.body;

        let userId = req.signedCookies["userId"];
        let productId = req.params.productId;
        let options = {
            headers: {
                "Content-Type": "application/json"
            },
            body: {
                userId: userId,
                productId: productId,
                customerName: body.customerName,
                cardNumber: body.cardNumber,
                cardExpirationYear: body.cardExpirationYear,
                cardExpirationMonth: body.cardExpirationMonth,
                customerIdentityNumber: body.customerIdentityNumber
            },
            json: true
        };

        request.post("https://magicplugin.net/api/payment", options, async (err, response, body) => {
            if (body.status === "DONE") {
                res.status(200).redirect("/store/pay/success/" + body.orderId);
            } else if (body.status === "ERROR") {
                res.status(403).redirect(`/store/pay/fail?err=${body.msg}&productId=${productId}`);
            } else {
                res.redirect("/err/500");
            }
        });
    })

module.exports = router