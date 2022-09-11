const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const upload = multer({ dest: "serverfile/images/" });
let router = express.Router()

router
    .post("/", upload.single("file"), (req, res) => {
        fs.rename(path.join(__dirname, "/../../serverfile/images/", req.file.filename), path.join(__dirname, "/../../serverfile/images/", req.file.filename + ".png"), () => {
            res.send("https://magicplugin.net/images/" + req.file.filename + ".png");
        })
    })
    .delete("/:filename", (req, res) => {
        fs.unlink(path.join(__dirname, "/../../serverfile/images/", req.params.filename));
    })

module.exports = router