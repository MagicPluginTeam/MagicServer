const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const accountChecker = require("../../modules/accountChecker");
const upload = multer({ dest: "serverfile/images/" });

let router = express.Router();

router
    .post("/", upload.single("file"), async (req, res) => {
        if (!await accountChecker.isAdmin(req, res)) {
            return;
        }

        fs.rename(path.join(__dirname, "/../../serverfile/images/", req.file.filename), path.join(__dirname, "/../../serverfile/images/", req.file.filename + ".png"), () => {
            res.send("https://magicplugin.net/images/" + req.file.filename + ".png");
        })
    })
    .get("/delete/:filename", async (req, res) => {
        if (!await accountChecker.isAdmin(req, res)) {
            return;
        }

        fs.unlinkSync(path.join(__dirname, "/../../serverfile/images/" + req.params.filename));
        res.status(200).redirect("/admin/image/list");
    })

module.exports = router