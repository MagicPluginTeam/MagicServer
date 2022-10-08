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

        res.render("store/buy.ejs", { product:
                await db.getProductByProductId(req.params.productId) });
    })

module.exports = router