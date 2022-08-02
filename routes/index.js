const express = require("express")

let router = express.Router()


router
    .get("/", (req, res) => {
        res.redirect("/main")
    })
    .get("/err/:code", (req, res) => {
        res.render("err.ejs", { code: req.params.code })
    })
    .get("/signin", (req, res) => {
        res.render("signin.ejs")
    })
    .get("/signup", (req, res) => {
        res.render("signup.ejs")
    })


module.exports = router