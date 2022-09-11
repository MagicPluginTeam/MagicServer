const express = require("express");

const file_r = require("./api/file.js");
const product_r = require("./api/product.js");
const account_r = require("./api/account.js");

let router = express.Router()

router
    .get("/", (req, res) => {
        res.status(403).redirect("/err/403");
    })
    .get("/status", (req, res) => {
        res.send("online");
    })

    .use("/file", file_r)
    .use("/product", product_r)
    .use("/account", account_r)

module.exports = router