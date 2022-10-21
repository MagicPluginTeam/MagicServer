const express = require("express");
const path = require("path");
const fs = require("fs");
const db = require("../modules/database.js");
const accountChecker = require("../modules/accountChecker.js");

let router = express.Router();

router
    .use(async (req, res, next) => {
        if (await accountChecker.isAdmin(req, res)) {
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

    //ACCOUNT
    .get("/account/list", async (req, res) => {
        res.render("admin/account/list.ejs", { accounts: await db.getUsers() });
    })
    .get("/account/detail/:userId", async (req, res) => {
        res.render("admin/account/detail.ejs", { user: await db.getUserByUserId(req.params.userId) });
    })

    //SHORT LINK
    .get("/r/create", async (req, res) => {
        res.render("admin/redirect/create.ejs");
    })
    .post("/r/create", async (req, res) => {
        if (await db.getRedirectByDirectCode(req.body.directCode) !== null) {
            res.json({
                status: "ERROR",
                msg: "DIRECT_CODE_ALREADY_TAKEN"
            });
            return;
        }

        await db.generateRedirectModel(req.body.directCode, req.body.url).save();

        res.send(200).redirect("/admin/r/create");
    })

    //PLUGIN
    .get("/plugin/list", async (req, res) => {

    })
    .get("/plugin/create",  (req, res) => {

    })

module.exports = router;