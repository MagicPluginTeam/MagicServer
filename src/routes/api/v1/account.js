const express = require("express");
const db = require("../../../modules/database");

let router = express.Router();

router
    /**
     * @api {get} /api/v1/:queryType/:query/:dataType Request user information.
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