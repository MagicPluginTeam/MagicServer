const express = require("express");

let router = express.Router()

router
    .get("/err/:code", (req, res) => {
        res.render("err.ejs", { code: req.params.code });
    })

    .get("/", (req, res) => {
        res.render("index.ejs");
    })
    .get("/signin", (req, res) => {
        res.render("signin.ejs");
    })
    .get("/signup", (req, res) => {
        res.render("signup.ejs");
    })
    .get("/developers", (req, res) => {
        res.render("developers.ejs");
    })
    .get("/wiki", (req ,res) => {
        res.render("wiki/wiki.ejs");
    })
    .get("/dashboard", (req, res) => {
        res.render("dashboard/index.ejs");
    })
    .get("/mypage", (req, res) => {
        res.render("mypage/index.ejs")
    })
    .get("/company", (req, res) => {
        res.render("company.ejs");
    })
    .get("/us", (req, res) => {
        res.render("about-us.ejs");
    })

module.exports = router