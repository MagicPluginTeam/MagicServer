const crypto = require("crypto");
const express = require("express");
const db = require("../../modules/db.js");

let router = express.Router()

router
    .get("/", (req, res) => {
        res.status(403).redirect("/err/403");
    })

    .post("/", async (req, res) => {
        await db.generateProductModel(crypto.randomUUID(), req.body.title, req.body.short_description, req.body.description, req.body.tag, req.body.price, req.body.thumbnailImageURL, req.body.productImageURL).save();

        res.send("success");
    })
    .get("/delete/:id", async (req, res) => {
        await db.deleteProductByProductId(req.params.id);

        res.send("success");
    })

module.exports = router