const express = require("express")

let router = express.Router()

router
    .get("/", (req, res) => {
        res.status(403).redirect("/err/403");
    })

    .post("/:product_id", (req, res) => {
        var pid = req.params.product_id;
    })
    .delete("/:product_id", (req, res) => {
        var pid = req.params.product_id;
    })
    .patch("/:product_id", (req, res) => {
        var pid = req.params.product_id;
    })

module.exports = router