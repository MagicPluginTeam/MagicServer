const express = require("express")

let router = express.Router()

router
    .get("/", (req, res) => {
        res.sendFile("index.html")
    })
    .get("/err/:code", (req, res) => {
        res.render("err.ejs", { code: req.params.code })
    })
    .get("/signin", (req, res) => {
        return res.sendFile("signin.html");
    })
    .get("/signup", (req, res) => {
        res.sendFile("signup.html")
    })


module.exports = router