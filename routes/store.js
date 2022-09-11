const express = require("express");
const db = require("../modules/db.js");
const admin_r = require("./store_admin.js");

let router = express.Router()

router
    .use("/admin", admin_r)

    .get("/", (req, res) => {
        res.redirect("/store/list")
    })
    .get("/list", async (req, res) => {
        const context = {
            products: await db.getProducts()
        }

        res.render("store/product_list.ejs", context, (err, html) => {
            if (err) {
                res.status(404).redirect("/err/" + res.statusCode)
            }

            res.send(html)
        })
    })
    .get("/detail/:title", async (req, res) => {
        var title = req.params.title;
        var data = await db.getProductByTitle(title);

        if (data == null) {
            res.send("failed");
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
        }

        res.render("store/product_detail.ejs", context, (err, html) => {
            res.send(html)
        })
    })

module.exports = router