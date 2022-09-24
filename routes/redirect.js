const express = require("express");
const path = require("path");
const db = require("../modules/db.js");

let router = express.Router();

router
    .get("/admin", async (req, res) => {
        let cookie = req.cookies;
        let userId = cookie["userId"];

        if (userId == null) {
            res.status(403).redirect("/signin");
            return;
        }
        let user = await db.getUserByUserId(userId);
        user = JSON.parse(JSON.stringify(user));

        let isAdmin = user["isAdmin"];

        if (!isAdmin) {
            res.status(403).redirect("/err/" + res.statusCode);
            return;
        }

        res.render(path.join(__dirname + "/../views/redirect.ejs"));
    })
    .post("/admin", async (req, res) => {
        let cookie = req.cookies;
        let userId = cookie["userId"];

        if (userId == null) {
            res.status(403).redirect("/signin");
            return;
        }
        let user = await db.getUserByUserId(userId);
        user = JSON.parse(JSON.stringify(user));

        let isAdmin = user["isAdmin"];

        if (!isAdmin) {
            res.status(403).redirect("/err/" + res.statusCode);
            return;
        }

        db.generateRedirectModel(req.body.directCode, req.body.url).save().catch((err) => {
            res.status(404).redirect("/err/" + res.statusCode);
            return;
        });

        res.send(200).redirect("/r/admin");
    })

    .get("/:directCode", async (req, res) => {
        const data = await db.getRedirectByDirectCode(req.params.directCode);

        if (data == null) {
            res.send("failed");
            return;
        }

        res.redirect(JSON.parse(JSON.stringify(data))["url"]);
    })

module.exports = router;