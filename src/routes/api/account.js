const express = require("express");
const crypto = require("crypto");
const pbkdf2Password = require("pbkdf2-password");
const hasher = pbkdf2Password();
const mail = require("../../modules/mail.js");
const loginController = require("../../controllers/loginController.js");
const db = require("../../modules/database");
const accountChecker = require("../../modules/accountChecker");

let router = express.Router();

router
    .post("/signin", async (req, res) => {
        let result = await loginController.SignIn(req, res);
        let redirect = req.query.redirect;

        if (result.code !== 100) {
            if (redirect !== undefined) {
                res.redirect(redirect);
            } else {
                res.redirect("/");
            }
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
                res.redirect("/err/500");
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

        if (user["isMailVerified"] === true) {
            res.status(400).send("Already verified.");
            return;
        }

        if (code === user["verifyCode"]) {
            await db.updateUserByUserId(userId, { isMailVerified: true });
            await db.updateUserByUserId(userId, { verifyCode: null });
            res.status(200).redirect("/signin?verify=true");
            return;
        }

        res.status(400).send("Verify code is incorrect.");
    })

    .post("/delete", async (req, res) => {
        let userId;

        if (req.body.userId === undefined) {
            userId = req.signedCookies["userId"];
        } else {
            userId = req.body.userId;
        }

        if (userId === null) {
            res.status(403).redirect("/signin");
            return;
        }

        let user = await db.getUserByUserId(userId);
        if (user === null) {
            res.status(403).send("account not found.");
            return;
        }

        hasher({ password: req.body.password, salt: user["salt"] }, async (err, pass, salt, hash) => {
            if (hash !== user["passwordHash"]) {
                res.status(403).send("password is incorrect.");
                return;
            }

            await db.deleteUserByUserId(userId);
            res.status(200).redirect("/");
        });
    })
    .get("/delete/:userId", async (req, res) => {
        if (!(await accountChecker.isAdmin(req, res))) {
            return;
        }

        res.render("admin/account/delete-confirm.ejs", { userId: req.params.userId });
    })
    .get("/delete/:userId/confirm", async (req, res) => {
        if (!(await accountChecker.isAdmin(req, res))) {
            return;
        }

        let userId = req.params.userId;
        let user = await db.getUserByUserId(userId);
        if (user === null) {
            res.status(403).send("account not found.");
            return;
        }

        await db.deleteUserByUserId(userId);

        res.status(200).redirect("/admin/account/list");
    })

module.exports = router;