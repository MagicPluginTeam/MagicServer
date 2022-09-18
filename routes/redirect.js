const express = require("express");
const path = require("path");
const db = require("../modules/db.js");

let router = express.Router();

router
    .get("/admin", (req, res) => {
        res.render(path.join(__dirname + "/../views/redirect.ejs"));
    })
    .post("/admin", (req, res) => {
        db.generateRedirectModel(req.body.directCode, req.body.url).save().catch((err) => {
            res.send("failed");
        });

        res.send("success");
    })

    .get("/:directCode", async (req, res) => {
        const data = await db.getRedirectByDirectCode(req.params.directCode);

        if (data == null) res.send("failed");
        else res.redirect(JSON.parse(JSON.stringify(data))["url"]);
    })

module.exports = router;