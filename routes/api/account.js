const express = require("express");
const bcrypt = require("bcrypt");
const userSchema = require("../../schema/User.js");

const saltRounds = 10;

let router = express.Router()

router
    .get("/", (req, res) => {
        res.status(403).redirect("/err/403");
    })
    .post("/signin", (req, res) => {
        //TODO
    })
    .post("/signup", (req, res) => {
        //TODO
    })

module.exports = router