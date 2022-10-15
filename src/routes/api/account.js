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
            console.log(hash);
            console.log(user["passwordHash"]);
            console.log({ password: req.body.password, salt: user["salt"] });

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

    //API
    /**
     * @api {get} /public/:queryType/:query/:dataType Request user information.
     *
     * @apiVersion 1.0.0
     * @apiName getUserInformation
     * @apiGroup user
     *
     * @apiParam {String} queryType QueryType. ["id", "email"]
     * @apiParam {String} query Query string.
     * @apiParam {String} dataType DataType. ["all", "userId", "email", "lastLoginAt", "registerAt", "isAdmin", "isMailVerified"]
     *
     * @apiSuccessExample {json} SuccessExample
     *     HTTP/1.1 200 OK
     *     {
     *         "status": "DONE",
     *         "msg": "SUCCESS",
     *         "data": "1f6a6f0a-d2a2-499b-bba5-8492c9d3210d"
     *     }
     * @apiSuccess {String} status Response status. ["DONE", "ERROR"]
     * @apiSuccess {String} msg Response status msg. ["SUCCESS", "INVALID_QUERY_TYPE", "INVALID_QUERY", "INVALID_DATA_TYPE", "NO_PERMISSION"]
     * @apiSuccess {Any} data Requested data.
     *
     * @apiErrorExample {json} ErrorExample
     *     HTTP/1.1 403 ERROR
     *     {
     *         "status": "ERROR",
     *         "msg": "NO_PERMISSION",
     *         "data": null
     *     }
     * @apiError {String} status Response status. ["DONE", "ERROR"]
     * @apiError {String} msg Response status msg. ["SUCCESS", "INVALID_QUERY_TYPE", "INVALID_QUERY", "INVALID_DATA_TYPE", "NO_PERMISSION"]
     * @apiError {Any} data Always null.
     */
    .get("/public/:queryType/:query/:dataType", async (req, res) => {
        let user;
        let queryType = req.params.queryType;
        let query = req.params.query;
        let dataType = req.params.dataType;

        if (queryType === "id") {
            user = await db.getUserByUserId(query);
        } else if (queryType === "email") {
            user = await db.getUserByEmail(query);
        } else {
            res.status(403).json({
                status: "ERROR",
                msg: "INVALID_QUERY_TYPE",
                data: null
            });
            return;
        }

        if (user === null) {
            res.status(403).json({
                status: "ERROR",
                msg: "INVALID_QUERY",
                data: null
            });
            return;
        }

        if (dataType === "all") {
            user["passwordHash"] = null;
            user["salt"] = null;
            user["verifyCode"] = null;

            res.status(200).json({
                status: "DONE",
                msg: "SUCCESS",
                data: user
            });
        } else {
            if (dataType === "passwordHash"
                || dataType === "salt"
                || dataType === "verifyCode") {
                res.status(403).json({
                    status: "ERROR",
                    msg: "NO_PERMISSION",
                    data: null
                });
                return;
            }

            let data = user[dataType];
            if (data === undefined) {
                res.status(403).json({
                    status: "ERROR",
                    msg: "INVALID_DATA_TYPE",
                    data: null
                });
                return;
            }

            res.status(200).json({
                status: "DONE",
                msg: "SUCCESS",
                data: data
            });
        }
    })

module.exports = router;