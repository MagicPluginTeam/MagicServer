const express = require("express");
const path = require("path");
const fs = require("fs");
const db = require("../modules/database.js");
const adminChecker = require("../modules/accountChecker.js");

let router = express.Router();

router
    .use(async (req, res, next) => {
        if (await adminChecker.isAdmin(req, res)) {
            next();
        }
    })

    .get("/", async (req, res) => {
        res.render("admin/index.ejs");
    })

    //STORE
    .get("/store/create", async (req, res) => {
        res.render("admin/store/create.ejs");
    })
    .get("/store/list", async (req, res) => {
        res.render("admin/store/list.ejs", { products: await db.getProducts() });
    })

    //IMAGE
    .get("/image/upload", async (req, res) => {
        res.render("admin/image/upload.ejs");
    })
    .get("/image/list", async (req, res) => {
        res.render("admin/image/list.ejs", { images: fs.readdirSync(path.join(__dirname + "/../serverfile/images")) });
    })

    .get("/r/make", async (req, res) => {
        res.render("admin/redirect/make.ejs");
    })
    .post("/r/make", async (req, res) => {
        db.generateRedirectModel(req.body.directCode, req.body.url).save();

        res.send(200).redirect("/admin/r/make");
    })

module.exports = router;