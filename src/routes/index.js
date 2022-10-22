const express = require("express");
const db = require("../modules/database.js");
const accountChecker = require("../modules/accountChecker.js");
const queryString = require('node:querystring');

const admin_r = require("./admin.js");
const api_r = require("./api/api.js");
const redirect_r = require("./redirect.js");
const signinCallback_r = require("./signinCallback.js");
const store_r = require("./store.js");
const test_r = require("./test.js");

let router = express.Router();

router
    .use("/admin", admin_r)
    .use("/api", api_r)
    .use("/r", redirect_r)
    .use("/signin/callback", signinCallback_r)
    .use("/store", store_r)
    .use("/test", test_r)

    .get("/", (req, res) => {
        res.render("index.ejs");
    })
    .get("/signin", (req, res) => {
        let context = { signup: undefined, verify: undefined, githubOAuthUrl: undefined, redirect: undefined};
        let signup = req.query.signup;
        let verify = req.query.verify;
        let redirect = req.query.redirect;
        context.githubOAuthUrl = process.env.GITHUB_OAUTH_URL.replace("<%clientId%>", process.env.GITHUB_OAUTH_CLIENT_ID);

        if (signup === undefined || signup === null) context.signup = false;
        else {
            signup = JSON.parse(signup);
            if (signup) context["signup"] = true;
        }

        if (verify === undefined || verify === null) context.verify = false;
        else {
            verify = JSON.parse(verify);
            if (verify) context["verify"] = true;
        }

        if (redirect === undefined || redirect === null) context.redirect = null;
        else {
            context.redirect = (JSON.stringify(queryString.decode(redirect)));
            context.redirect = context.redirect.substring(2, context.redirect.length - 5);
        }

        if (context.signup && context.verify) {
            res.redirect("/err/403");
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
    .get("/wiki", (req, res) => {
        res.render("wiki/index.ejs");
    })
    .get("/dashboard", (req, res) => {
        res.render("dashboard/index.ejs");
    })
    .get("/mypage", async (req, res) => {
        if (!await accountChecker.isLoggedIn(req, res)) {
            return;
        }

        let userId = req.signedCookies["userId"];
        let context = {
            user: await db.getUserByUserId(userId),
            payments: await db.getPaymentsByUserId(userId)
        };

        res.render("mypage/index.ejs", context);
    })
    .get("/company", (req, res) => {
        res.render("company.ejs");
    })

    .get("/err/:code", async (req, res) => {
        let code = req.params.code;

        code *= 1;

        if (isNaN(code)) {
            res.redirect("/err/403");
            return;
        }

        res.render("err.ejs", {code: code});
    })

module.exports = router