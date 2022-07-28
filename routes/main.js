const express = require("express")

let router = express.Router()


router
    .get("/", (req, res) => {
        res.sendFile(__dirname + "/../main/index.html")
    })
    .get("/cs", function(req, res) {
        res.redirect("/cs/index.html")
    })
    .get("/devteam", function(req, res) {
        res.sendFile(__dirname + "/../devteam/index.html")
    })
    .get("/store", function(req, res) {
        res.sendFile(__dirname + "/../store/index.html")
    })
    .get("/dashboard", function(req, res) {
        res.sendFile(__dirname + "/../dashboard/index.html")
    })

module.exports = router