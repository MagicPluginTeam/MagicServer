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

        res.redirect("/signin");
    })
    .post("/signup", async (req, res) => {
        let result = await loginController.SignUp(req, res);

        res.send(result);
    })

module.exports = router;