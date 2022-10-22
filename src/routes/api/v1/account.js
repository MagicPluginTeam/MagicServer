const express = require("express");
const db = require("../../../modules/database");

let router = express.Router();

router
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
            res.status(400).json({
                status: "ERROR",
                msg: "INVALID_QUERY_TYPE",
                data: null
            });
            return;
        }

        if (user === null) {
            res.status(400).json({
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