const express = require("express");
const path = require("path");
const db = require("../modules/db.js");

let routes = express.Router();

routes
    .get("/admin", (req, res) => {
        res.sendFile(path.join(__dirname + "/../views/redirect.html"));
    })
    .post("/admin", (req, res) => {
        db.generateRedirectModel(req.body.directCode, req.body.url).save().catch((err) => {
            res.send("failed");
        });

        res.send("success");
    })

    .get("/:directCode", async (req, res) => {
        const data = await db.getRedirectByDirectCode(req.params.directCode);

        res.redirect(JSON.parse(JSON.stringify(data))["url"]);
    })

module.exports = routes;