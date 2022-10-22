const express = require("express");
const db = require("../../modules/database");
const accountChecker = require("../../modules/accountChecker");

let router = express.Router();

router
    .post("/", async (req, res) => {
        if (!await accountChecker.isAdmin(req)) {
            res.redirect("/err/403");
            return;
        }

        let body = req.body;

        await db.generatePluginModel(body.pluginName, body.pluginId).save();

        res.status(200).json({
            status: "DONE",
            msg: "SUCCESS"
        });
    })
    .post("/:pluginId", async (req, res) => {
        if (!await accountChecker.isAdmin(req)) {
            res.redirect("/err/403");
            return;
        }

        let pluginId = req.params.pluginId;

        let data = await db.getPluginByPluginId(pluginId);
        if (data === null) {
            res.status(400).json({
                status: "ERROR",
                msg: "INVALID_PLUGIN_ID"
            });
            return;
        }

        await db.updatePluginByPluginId(pluginId, req.body);

        res.status(200).json({
            status: "DONE",
            msg: "SUCCESS"
        })
    })
    .get("/delete/:pluginId", async (req, res) => {
        if (!await accountChecker.isAdmin(req)) {
            res.redirect("/err/403");
            return;
        }

        let pluginId = req.params.pluginId;

        if (await db.getPluginByPluginId(pluginId) === null) {
            res.status(400).json({
                status: "ERROR",
                msg: "INVALID_PLUGIN_ID"
            });
            return;
        }

        await db.deletePluginByPluginId(pluginId);

        res.status(200).json({
            status: "DONE",
            msg: "SUCCESS"
        });
    })

module.exports = router;