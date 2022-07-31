const express = require("express")

let router = express.Router()


router
    .get("/", (req, res) => {
        res.redirect("/main")
    })
    .get("/err/:code", (req, res) => {
        res.render("err.ejs", { code: req.params.code })
    })

module.exports = router