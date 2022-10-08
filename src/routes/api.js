const express = require("express");

const account_r = require("./api/account.js");
const file_r = require("./api/file.js");
const payment_r = require("./api/payment.js");
const product_r = require("./api/product.js");

let router = express.Router();

router
    .get("/", (req, res) => {
        res.json({
            online: true
        });
    })

    .use("/account", account_r)
    .use("/file", file_r)
    .use("/payment", payment_r)
    .use("/product", product_r)

module.exports = router