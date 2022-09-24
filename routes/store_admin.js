const express = require("express");
const cookieParser = require("cookie-parser");
const db = require("../modules/db.js");

let router = express.Router()

router
    .get("/create", async (req, res) => {
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

        res.render("store/admin/create.ejs");
    })
    .get("/list", async (req, res) => {
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