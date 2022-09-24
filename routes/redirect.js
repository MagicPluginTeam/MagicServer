const express = require("express");
const path = require("path");
const db = require("../modules/db.js");

let router = express.Router();

router
    .get("/admin", (req, res) => {
        let cookie = req.cookies;
        let userId = cookie.["userId"];

        if (userId == null) {
            res.status(403).redirect("/signin");
        }
        let user = await db.getUserByUserId("userId");
        let isAdmin = JSON.parse(JSON.stringify(user))["isAdmin"];

        if (!isAdmin) {
            res.status(403).redirect("/err/" + res.statusCode);
        }

        res.render(path.join(__dirname + "/../views/redirect.ejs"));
    })
    .post("/admin", (req, res) => {
        let cookie = req.cookies;
        let userId = cookie.["userId"];

        if (userId == null) {
            res.status(403).redirect("/signin");
        }
        let user = await db.getUserByUserId("userId");
        let isAdmin = JSON.parse(JSON.stringify(user))["isAdmin"];

        if (!isAdmin) {
            res.status(403).redirect("/err/" + res.statusCode);
        }

        db.generateRedirectModel(req.body.directCode, req.body.url).save().catch((err) => {
            res.status(404).redirect("/err/" + res.statusCode);
        });

        res.send(200).redirect("/r/admin");
    })

    .get("/:directCode", async (req, res) => {
        const data = await db.getRedirectByDirectCode(req.params.directCode);

        if (data == null) res.send("failed");
        else res.redirect(JSON.parse(JSON.stringify(data))["url"]);
    })

module.exports = router;