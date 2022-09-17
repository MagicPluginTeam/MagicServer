const express = require("express");
const db = require("../modules/db.js");

let router = express.Router()

router
    .get("/create", (req, res) => {
        res.render("store/admin/create.ejs");
    })
    .get("/list", async (req, res) => {
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