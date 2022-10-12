const express = require("express");
const db = require("../modules/database.js");
const accountChecker = require("../modules/accountChecker.js");

let router = express.Router()

router
    .get("/", (req, res) => {
        res.redirect("/store/list")
    })
    .get("/list", async (req, res) => {
        res.render("store/list.ejs", { products: await db.getProducts() });
    })
    .get("/detail/:title", async (req, res) => {
        const title = req.params.title;

        const product = await db.getProductByTitle(title);
        if (product == null) {
            res.status(404).redirect("/err/" + res.statusCode);
            return;
        }

        res.render("store/detail.ejs", { product: product });
    })
    .get("/buy/:productId", async(req, res) => {
        if (!await accountChecker.isLoggedIn(req, res)) {
            return;
        }

        let product = await db.getProductByProductId(req.params.productId);

        if (product === null) {
            res.status(403).redirect("/err/" + res.statusCode);
            return;
        }

        res.render("store/buy.ejs", { product: product });
    })

    .get("/pay/success/:orderId", async (req, res) => {
        if (!await accountChecker.isLoggedIn(req, res)) {
            return;
        }

        let userId = req.signedCookies["userId"];
        if (userId === null) {
            res.status(403).redirect("/err/" + res.statusCode);
            return;
        }

        let user = await db.getUserByUserId(userId);
        if (user === null) {
            res.status(403).redirect("/err/" + res.statusCode);
            return;
        }

        let payment = await db.getPaymentByOrderId(req.params.orderId);

        if (payment === null) {
            res.status(403).redirect("/err/" + res.statusCode);
            return;
        }

        if (payment.userId !== userId) {
            res.status(403).redirect("/err/" + res.statusCode);
            return;
        }

        let product = await db.getProductByProductId(payment.productId);
        let response = JSON.parse(payment.response);

        res.render("store/pay-success.ejs", { payment: payment, user: user, product: product, response: response });
    })
    .get("/pay/fail", async (req, res) => {
        if (!await accountChecker.isLoggedIn(req, res)) {
            return;
        }

        let userId = req.signedCookies["userId"];
        if (userId === null) {
            res.status(403).redirect("/err/" + res.statusCode);
            return;
        }

        let user = await db.getUserByUserId(userId);
        if (user === null) {
            res.status(403).redirect("/err/" + res.statusCode);
            return;
        }

        let payment = await db.getProductByProductId(req.query.productId);
        if (payment === null) {
            res.status(403).redirect("/err/" + res.statusCode);
            return;
        }

        res.render("store/pay-fail.ejs", { user: user, product: product, msg: req.query.err });
    })

module.exports = router