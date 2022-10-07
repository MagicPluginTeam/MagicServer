const crypto = require("crypto");
const express = require("express");
const request = require("request");
const db = require("../../modules/database.js");
const adminChecker = require("../../modules/accountChecker");
const accountChecker = require("../../modules/accountChecker");

let router = express.Router()

router
    .post("/", async (req, res) => {
        if (!await adminChecker.isAdmin(req)) {
            res.status(403).redirect("/err/" + res.statusCode);
            return;
        }

        await db.generateProductModel(crypto.randomUUID(), req.body.title, req.body.short_description, req.body.description, req.body.tag, req.body.price, req.body.thumbnailImageURL, req.body.productImageURL).save();

        res.status(200).redirect("/admin/store/create");
    })
    .get("/delete/:id", async (req, res) => {
        if (!await adminChecker.isAdmin(req)) {
            res.status(403).redirect("/err/" + res.statusCode);
            return;
        }

        await db.deleteProductByProductId(req.params.id);

        res.status(200).redirect("/admin/store/list");
    })

    .post("/buy/:productId", async (req, res) => {
        if (!(await accountChecker.isLoggedIn(req, res))) {
            return;
        }

        let body = req.body;

        let userId = req.cookies["userId"];
        let productId = req.params.productId;
        let options = {
            headers: {
                "Content-Type": "application/json"
            },
            body: {
                userId: userId,
                productId: productId,
                customerName: body.customerName,
                cardNumber1: body.cardNumber1,
                cardNumber2: body.cardNumber2,
                cardNumber3: body.cardNumber3,
                cardNumber4: body.cardNumber4,
                cardExpirationYear: body.cardExpirationYear,
                cardExpirationMonth: body.cardExpirationMonth,
                customerIdentityNumber: body.customerIdentityNumber
            },
            json: true
        }

        request.post("https://magicplugin.net/api/payment", options, (req, res) => {

        })
    })

module.exports = router