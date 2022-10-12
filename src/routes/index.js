const express = require("express");
const db = require("../modules/database.js");
const accountChecker = require("../modules/accountChecker.js");

let router = express.Router()

router
    .get("/err/:code", (req, res) => {
        res.render("err.ejs", { code: req.params.code });
    })

    .get("/", (req, res) => {
        res.render("index.ejs");
    })
    .get("/signin", (req, res) => {
        let context = { signup: undefined, verify: undefined };
        let signup = req.query.signup;
        let verify = req.query.verify;

        if (signup === undefined || signup === null) context["signup"] = false;
        else {
            signup = JSON.parse(signup);
            if (signup) context["signup"] = true;
        }

        if (verify === undefined || verify === null) context["verify"] = false;
        else {
            verify = JSON.parse(verify);
            if (verify) context["verify"] = true;
        }

        if (context["signup"] && context["verify"]) {
            res.status(400).redirect("/err/" + res.statusCode);
            return;
        }

        res.render("signin.ejs", context);
    })
    .get("/signup", (req, res) => {
        res.render("signup.ejs");
    })
    .get("/developers", (req, res) => {
        res.render("developers.ejs");
    })
    .get("/wiki", (req ,res) => {
        res.render("wiki/index.ejs");
    })
    .get("/dashboard", (req, res) => {
        res.render("dashboard/index.ejs");
    })
    .get("/mypage", async (req, res) => {
        if (!await accountChecker.isLoggedIn(req, res)) {
            return;
        }

        let userId = req.cookies["userId"];
        let context = {
            user: await db.getUserByUserId(userId),
            payments: await db.getPaymentsByUserId(userId)
        };

        res.render("mypage/index.ejs", context);
    })
    .get("/company", (req, res) => {
        res.render("company.ejs");
    })

module.exports = router