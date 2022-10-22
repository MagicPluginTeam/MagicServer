const express = require("express");
const db = require("../../../modules/database");

let router = express.Router();

router
    .get("/version/:pluginId/:currentVersion/:versionType", async (req, res) => {
        let pluginId = req.params.pluginId;
        let currentVersion = (req.params.currentVersion);
        let versionType = (req.params.versionType);
        let err_, latestVersion;

        let data = await db.getPluginByPluginId(pluginId).catch(err => {
            res.status(400).json({
                status: "ERROR",
                msg: "INVALID_PLUGIN_ID",
                data: null
            });

            err_ = err;
        });

        if (err_) {
            return;
        }
        if (data === null) {
            res.status(400).json({
                status: "ERROR",
                msg: "INVALID_PLUGIN_ID",
                data: null
            });
            return;
        }

        if (versionType.toLowerCase() === "plugin") {
            latestVersion = data.latestVersion;
        } else if (versionType.toLowerCase() === "config") {
            latestVersion = data.latestConfigVersion;
        } else {
            res.status(400).json({
                status: "ERROR",
                msg: "INVALID_VERSION_TYPE",
                data: null
            });
            return;
        }

        if (latestVersion.toLowerCase() === currentVersion.toLowerCase()) {
            res.status(200).json({
                status: "DONE",
                msg: "SUCCESS",
                data: "UP_TO_DATE"
            });
        } else {
            res.status(200).json({
                status: "DONE",
                msg: "SUCCESS",
                data: "OUT_OF_DATE"
            });
        }
    })

module.exports = router;