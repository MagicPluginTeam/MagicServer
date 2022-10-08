const crypto = require("crypto");
const express = require("express");
const request = require("request");
const db = require("../../modules/database.js");
const accountChecker = require("../../modules/accountChecker.js");

let router = express.Router()

router
    .post("/", async (req, res) => {
        if (!await accountChecker.isAdmin(req)) {
            res.status(403).redirect("/err/" + res.statusCode);
            return;
        }

        await db.generateProductModel(crypto.randomUUID(), req.body.title, req.body.shortDescription, req.body.description, req.body.tag, req.body.price, req.body.thumbnailImageURL, req.body.productImageURL).save();

        res.status(200).redirect("/admin/store/create");
    })
    .get("/delete/:productId", async (req, res) => {
        if (!await accountChecker.isAdmin(req)) {
            res.status(403).redirect("/err/" + res.statusCode);
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
                cardNumber: body.cardNumber,
                cardExpirationYear: body.cardExpirationYear,
                cardExpirationMonth: body.cardExpirationMonth,
                customerIdentityNumber: body.customerIdentityNumber
            },
            json: true
        };

        request.post("https://magicplugin.net/api/payment", options, (err, response, body) => {
            res.json({
                receiptUrl: body.returnData.body.card.receiptUrl,
                price: body.returnData.body.totalAmount + " " + body.returnData.body.currency,
                status: body.returnData.body.status,
            });
        })
    })

    //API
    .get("/public/:queryType/:query/:dataType", async (req, res) => {
        let product;
        let queryType = req.params.queryType;
        let query = req.params.query;
        let dataType = req.params.dataType;

        if (queryType === "id") {
            product = await db.getProductByProductId(query);
        } else if (queryType === "title") {
            product = await db.getProductByTitle(query);
        } else {
            res.status(403).json({
                status: "ERROR",
                msg: "INVALID_QUERY_TYPE",
                data: null
            });
            return;
        }

        if (product === null) {
            res.status(403).json({
                status: "ERROR",
                msg: "INVALID_QUERY",
                data: null
            });
            return;
        }

        if (dataType === "all") {
            res.status(200).json({
                status: "DONE",
                msg: "SUCCESS",
                data: product
            });
        } else {
            let data = product[dataType];
            if (data === undefined) {
                res.status(403).json({
                    status: "ERROR",
                    msg: "INVALID_DATA_TYPE",
                    data: null
                });
                return;
            }

            res.status(200).json({
                status: "DONE",
                msg: "SUCCESS",
                data: data
            });
        }
    })

module.exports = router