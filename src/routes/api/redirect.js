const express = require("express");
const db = require("../../modules/database");

let router = express.Router();

router
    .post("/create", async (req, res) => {
        if (await db.getRedirectByDirectCode(req.body.directCode) !== null) {
            res.json({
                status: "ERROR",
                msg: "DIRECT_CODE_ALREADY_TAKEN"
            });
            return;
        }

        await db.generateRedirectModel(req.body.directCode, req.body.url).save();

        res.json({
            status: "DONE",
            msg: "SUCCESS"
        });
    })
    .get("/delete/:directCode", async (req, res) => {
        let directCode = req.params.directCode;

        if (await db.getRedirectByDirectCode(req.body.directCode) === null) {
            res.json({
                status: "ERROR",
                msg: "INVALID_DIRECT_CODE"
            });
            return;
        }

        await db.deleteRedirectByDirectCode(directCode);

        res.json({
            status: "DONE",
            msg: "SUCCESS"
        });
    })

module.exports = router;