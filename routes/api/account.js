const express = require("express");
const loginController = require("../../modules/loginController.js")

let router = express.Router()

router
    .get("/", (req, res) => {
        res.status(403).redirect("/err/403");
    })

    .post("/signin", async (req, res) => {
        let result = await loginController.SignIn(req, res);

        if (result.data != null) {
            res.status(200).redirect("/");
        } else {
            res.status(400).redirect("/err/" + res.statusCode);
        }
    })
    .get("/logout", async (req, res) => {
        res.clearCookie("userId");
        res.clearCookie("username");

        res.redirect("/");
    })
    .post("/signup", async (req, res) => {
        let result = await loginController.SignUp(req, res);

        if (result.code === 100) {
            if (result.msg === "This email is already taken.") {
                res.send("This email is already taken.");
            } else {
                res.status(500).redirect("/err/" + res.statusCode);
            }
        } else {
            res.status(200).redirect("/signin");
        }
    })

module.exports = router;