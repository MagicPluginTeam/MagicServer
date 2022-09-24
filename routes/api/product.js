const crypto = require("crypto");
const express = require("express");
const db = require("../../modules/db.js");

let router = express.Router()

router
    .post("/", async (req, res) => {
        let cookie = req.cookies;
        let userId = cookie.["userId"];

        if (userId == null) {
            res.status(403).redirect("/signin");
        }
        let user = await db.getUserByUserId("userId");
        let isAdmin = JSON.parse(JSON.stringify(user))["isAdmin"];

        if (!isAdmin) {
            res.status(403).redirect("/err/" + res.statusCode);
        }

        await db.generateProductModel(crypto.randomUUID(), req.body.title, req.body.short_description, req.body.description, req.body.tag, req.body.price, req.body.thumbnailImageURL, req.body.productImageURL).save();

        res.status(200).redirect("/store/admin/create");
    })
    .get("/delete/:id", async (req, res) => {
        let cookie = req.cookies;
        let userId = cookie.["userId"];

        if (userId == null) {
            res.status(403).redirect("/signin");
        }
        let user = await db.getUserByUserId("userId");
        let isAdmin = JSON.parse(JSON.stringify(user))["isAdmin"];

        if (!isAdmin) {
            res.status(403).redirect("/err/" + res.statusCode);
        }

        await db.deleteProductByProductId(req.params.id);

        res.status(200).redirect("/store/admin/list");
    })

module.exports = router