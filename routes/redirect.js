const express = require("express");
const path = require("path");
const db = require("../modules/database.js");

let router = express.Router();

router
    .get("/:directCode", async (req, res) => {
        const data = await db.getRedirectByDirectCode(req.params.directCode);

        if (data == null) {
            res.send("failed");
            return;
        }

        res.redirect(JSON.parse(JSON.stringify(data))["url"]);
    })

module.exports = router;