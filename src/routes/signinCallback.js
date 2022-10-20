const express = require("express");
const request = require("request");
const db = require("../modules/database.js");

let router = express.Router();

router
    .get("/github", async (req, res) => {
        let code = req.query.code;
        let requestURL = process.env.GITHUB_OAUTH_DATA_REQUEST_URL
                            .replace("<%clientId%>", process.env.GITHUB_OAUTH_CLIENT_ID)
                            .replace("<%clientSecret%>", process.env.GITHUB_OAUTH_CLIENT_SECRET)
                            .replace("<%code%>", code);

        request.post(requestURL, { json: true }, async (err, response, body) => {
            let options = {
                headers: {
                    Authorization: `token ${body.access_token}`,
                    "User-Agent": "Pexel"
                }
            };

            request.get("https://api.github.com/user", options, async (err_, response_, body_) => {
                //TODO: TEST CODE

                if (body_.email === null) {
                    res.send("You need to set email address as public.");
                }

                res.json(body_);
            });
        });
    })

module.exports = router;