const express = require("express");
const db = require("../../../modules/database");

let router = express.Router();

router
    /**
     * @api {get} /api/v1/:queryType/:query/:dataType Request product information.
     *
     * @apiVersion 1.0.0
     * @apiName getProductInformation
     * @apiGroup product
     *
     * @apiParam {String} queryType QueryType. ["id", "title"]
     * @apiParam {String} query Query string.
     * @apiParam {String} dataType DataType. ["all", "productId", "title", "shortDescription", "description", "tag", "price", "createAt", "lastUpdateAt", "thumbnailImageURL", "productImageURL", "buys"]
     *
     * @apiSuccessExample {json} SuccessExample
     *     HTTP/1.1 200 OK
     *     {
     *         "status": "DONE",
     *         "msg": "SUCCESS",
     *         "data": "29604aef-c6fc-4669-b069-903a555f05b9"
     *     }
     * @apiSuccess {String} status Response status. ["DONE", "ERROR"]
     * @apiSuccess {String} msg Response status msg. ["SUCCESS", "INVALID_QUERY_TYPE", "INVALID_QUERY", "INVALID_DATA_TYPE"]
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
     * @apiError {String} msg Response status msg. ["SUCCESS", "INVALID_QUERY_TYPE", "INVALID_QUERY", "INVALID_DATA_TYPE"]
     * @apiError {Any} data Always null.
     */
    .get("/:queryType/:query/:dataType", async (req, res) => {
        let product;
        let queryType = req.params.queryType;
        let query = req.params.query;
        let dataType = req.params.dataType;

        if (queryType === "id") {
            product = await db.getProductByProductId(query);
        } else if (queryType === "title") {
            product = await db.getProductByTitle(query);
        } else {
            res.status(400).json({
                status: "ERROR",
                msg: "INVALID_QUERY_TYPE",
                data: null
            });
            return;
        }

        if (product === null) {
            res.status(400).json({
                status: "ERROR",
                msg: "INVALID_QUERY",
                data: null
            });
            return;
        }

        if (dataType === "all") {
            res.status(200).json({
                status: "DONE",
                msg: "SUCCESS",
                data: product
            });
        } else {
            let data = product[dataType];
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