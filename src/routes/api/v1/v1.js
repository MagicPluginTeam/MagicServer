const express = require("express");
const product_r = require("./product.js");
const plugin_r = require("./plugin.js");
const account_r = require("./account.js");

let router = express.Router();

router
    .use("/product", product_r)
    .use("/plugin", plugin_r)
    .use("/account", account_r)

module.exports = router;