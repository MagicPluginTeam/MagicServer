const crypto = require("crypto");
const express = require("express");
const db = require("../../modules/database.js");
const adminChecker = require("../../modules/accountChecker");

let router = express.Router()

router
    .post("/", async (req, res) => {
        if (!await adminChecker.isAdmin(req)) {
            res.status(403).redirect("/err/" + res.statusCode);
            return;
        }

        await db.generateProductModel(crypto.randomUUID(), req.body.title, req.body.short_description, req.body.description, req.body.tag, req.body.price, req.body.thumbnailImageURL, req.body.productImageURL).save();

        res.status(200).redirect("/admin/store/create");
    })
    .get("/delete/:id", async (req, res) => {
        if (!await adminChecker.isAdmin(req)) {
            res.status(403).redirect("/err/" + res.statusCode);
            return;
        }

        await db.deleteProductByProductId(req.params.id);

        res.status(200).redirect("/admin/store/list");
    })

module.exports = router