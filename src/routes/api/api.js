const express = require("express");

const account_r = require("./account.js");
const file_r = require("./file.js");
const payment_r = require("./payment.js");
const plugin_r = require("./plugin.js");
const product_r = require("./product.js");
const redirect_r = require("./redirect.js");

const v1_r = require("./v1/v1.js");

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
    .use("/plugin", plugin_r)
    .use("/product", product_r)
    .use("/redirect", redirect_r)

    .use("/v1", v1_r)

module.exports = router