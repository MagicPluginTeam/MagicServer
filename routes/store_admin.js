const express = require("express");

let router = express.Router()

router
    .get("/create", (req, res) => {
        res.render("store/create_product.ejs");
    })

module.exports = router