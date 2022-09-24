const express = require("express");
const cookie-parser = require("cookie-parser");
const db = require("../modules/db.js");

let router = express.Router()

router
    .get("/create", async (req, res) => {
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

        res.render("store/admin/create.ejs");
    })
    .get("/list", async (req, res) => {
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

        const context = {
            products: await db.getProducts()
        };

        res.render("store/admin/list.ejs", context, (err, html) => {
            if (err) {
                res.status(500).redirect("/err/" + res.statusCode);
            }

            res.send(html)
        });
    })

module.exports = router