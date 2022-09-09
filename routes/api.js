const express = require("express")

const file_r = require("./api/file.js")
const product_r = require("./api/product.js")

let router = express.Router()

router
    .use("/file", file_r)
    .use("/product", product_r)

module.exports = router