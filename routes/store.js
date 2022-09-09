const express = require("express")

let router = express.Router()

router
    .get("/", (req, res) => {
        res.redirect("/store/list")
    })
    .get("/list", (req, res) => {
        const context = {
            products: [
                { product_id: "test1", title: "test1", thumbnail_path: "../../public/assets/img/logo-transparent.png", tag: "test1", price: "1" } //TODO: delete test products.
            ]
        } //TODO: get products list from database.

        res.render("store/product_list.ejs", context, (err, html) => {
            if (err) {
                res.status(404).redirect("/err/" + res.statusCode)
            }

            res.send(html)
        })
    })
    .get("/detail", (req, res) => {
        const id = req.query.id
        const context = {
            product_title: "1", //TODO: delete test product data.
            tag: "2",
            short_description: "3",
            description: "ASDFASDFASDFASDFAS DFASSDFASDFASDFASDFAS DFASDFASDFASDFASDFASDFA SDFASDF DFASDFASDFASDFASDFASDFA SDFASDF DFASDFASDFASDFASDFASDFA SDFASDF !! :)",
            price: "4",
            img_1_path: "../../public/assets/img/logo-transparent.png"
        } //TODO: get product detail data from database.

        res.render("store/product_detail.ejs", context, (err, html) => {

            res.send(html)
        })
    })

module.exports = router