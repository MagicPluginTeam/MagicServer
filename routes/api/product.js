const crypto = require("crypto");
const express = require("express");
const db = require("../../modules/database.js");

let router = express.Router()

router
    .post("/", async (req, res) => {
        let cookie = req.cookies;
        let userId = cookie["userId"];

        if (userId == null) {
            res.status(403).redirect("/signin");
            return;
        }
        let user = await db.getUserByUserId(userId);
        user = JSON.parse(JSON.stringify(user));

        let isAdmin = user["isAdmin"];

        if (!isAdmin) {
            res.status(403).redirect("/err/" + res.statusCode);
            return;
        }

        await db.generateProductModel(crypto.randomUUID(), req.body.title, req.body.short_description, req.body.description, req.body.tag, req.body.price, req.body.thumbnailImageURL, req.body.productImageURL).save();

        res.status(200).redirect("/store/admin/create");
    })
    .get("/delete/:id", async (req, res) => {
        let cookie = req.cookies;
        let userId = cookie["userId"];

        if (userId == null) {
            res.status(403).redirect("/signin");
            return;
        }
        let user = await db.getUserByUserId(userId);
        user = JSON.parse(JSON.stringify(user));

        let isAdmin = user["isAdmin"];

        if (!isAdmin) {
            res.status(403).redirect("/err/" + res.statusCode);
            return;
        }

        await db.deleteProductByProductId(req.params.id);

        res.status(200).redirect("/store/admin/list");
    })

module.exports = router