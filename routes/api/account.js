const express = require("express");
const crypto = require("crypto");
const pbkdf2Password = require("pbkdf2-password");
const hasher = pbkdf2Password();
const mail = require("../../modules/mail.js");
const loginController = require("../../modules/loginController.js");
const db = require("../../modules/database");

let router = express.Router();

router
    .get("/", (req, res) => {
        res.status(403).redirect("/err/403");
    })

    .post("/signin", async (req, res) => {
        let result = await loginController.SignIn(req, res);

        if (result.code !== 100) {
            res.status(200).redirect("/");
        } else {
            res.status(400).send(result.msg);
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
            let data = result.data;
            let verifyCode = await mail.sendVerifyCode(data["email"], data["userId"]);

            await db.updateUserByUserId(result.data["userId"], { verifyCode: verifyCode });

            res.status(200).redirect("/signin?signup=true");
        }
    })
    .get("/verify/:userId/:code", async (req, res) => {
        let userId = req.params.userId;
        let code = req.params.code;
        let user = await db.getUserByUserId(userId);

        if (user === null) {
            res.status(400).send("User not found.");
            return;
        }

        let data = JSON.parse(JSON.stringify(user));
        if (data["isMailVerified"] === true) {
            res.status(400).send("Already verified.");
            return;
        }

        if (code === data["verifyCode"]) {
            await db.updateUserByUserId(userId, { isMailVerified: true });
            await db.updateUserByUserId(userId, { verifyCode: null });
            res.status(200).redirect("/signin?verify=true");
            return;
        }

        res.status(400).send("Verify code is incorrect.");
    })

    .post("/delete", async (req, res) => {
        let cookie = req.cookies;
        let userId = cookie["userId"];

        if (userId === null) {
            res.status(403).redirect("/signin");
            return;
        }
        let user = await db.getUserByUserId(userId);

        if (user === null) {
            res.status(403).send("account not found.");
            return;
        }
        user = JSON.parse(JSON.stringify(user));

        let password = req.body.password;
        let salt = user["salt"];
        let passwordStatus;

        if (user["isAdmin"]) {
            passwordStatus = 0;
        } else {
            await hasher({ password: password, salt: salt }, async (err, pass, salt, hash) => {
                if (hash === user["passwordHash"]) {
                    passwordStatus = 0;
                } else {
                    passwordStatus = 100;
                }
            });
        }

        if (passwordStatus === 100) {
            res.status(403).send("password is incorrect.");
            return;
        }

        await db.deleteUserByUserId(userId);

        if (user["isAdmin"]) {
            res.status(200).redirect("/admin/account/list");
        } else {
            res.status(200).redirect("/mypage");
        }
    })

module.exports = router;