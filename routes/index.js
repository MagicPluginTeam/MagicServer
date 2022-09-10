const express = require("express");
const path = require("path");

let router = express.Router()

router
    .get("/", (req, res) => {
        res.sendFile("index.html");
    })
    .get("/err/:code", (req, res) => {
        res.render("err.ejs", { code: req.params.code });
    })
    .get("/signin", (req, res) => {
        return res.sendFile(path.join(__dirname, "../views/signin.html"));
    })
    .get("/signup", (req, res) => {
        res.sendFile(path.join(__dirname, "../views/signup.html"));
    })


module.exports = router