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
        res.render("signin.ejs")
    })
    .post("/signin", (req, res) => {
        //TODO
    })

    .get("/signup", (req, res) => {
        res.render("signup.ejs")
    })
    .post("/signup", (req, res) => {
        //TODO
    })


module.exports = router