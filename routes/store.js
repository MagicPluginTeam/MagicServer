const express = require("express");
const db = require("../modules/database.js");

let router = express.Router()

router
    .get("/", (req, res) => {
        res.redirect("/store/list")
    })
    .get("/list", async (req, res) => {
        const context = {
            products: await db.getProducts()
        };

        res.render("store/list.ejs", context, (err, html) => {
            if (err) {
                res.status(500).redirect("/err/" + res.statusCode);
            }

            res.send(html);
        });
    })
    .get("/detail/:title", async (req, res) => {
        const title = req.params.title;
        let data = await db.getProductByTitle(title);

        if (data == null) {
            res.status(404).redirect("/err/" + res.statusCode);
            return;
        }

        data = await JSON.parse(JSON.stringify(data));

        const context = {
            product_title: data["title"],
            tag: data["tag"],
            short_description: data["shortDescription"],
            description: data["description"],
            price: data["price"] + "\\",
            product_image_URL: data["productImageURL"]
        };

        res.render("store/detail.ejs", context, (err, html) => {
            res.send(html)
        });
    })

module.exports = router