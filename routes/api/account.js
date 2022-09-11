const express = require("express");
const bcrypt = require("bcrypt");

const saltRounds = 10;

let router = express.Router()

router
    .get("/", (req, res) => {
        res.status(403).redirect("/err/403");
    })

    .get("/signin", (req, res) => {
        //TODO
    })
    .post("/signup", (req, res) => {
        //TODO
    })

module.exports = router