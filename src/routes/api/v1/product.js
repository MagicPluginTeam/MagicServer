const express = require("express");
const db = require("../../../modules/database");

let router = express.Router();

router
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