const db = require("../modules/database.js");
const queryString = require('node:querystring');

async function isAdmin(req, res) {
    let userId = req.signedCookies["userId"];

    if (userId === undefined) {
        res.redirect(`/signin?${queryString.stringify({
            redirect: "https://" + req.get("host") + req.originalUrl
        })}`);
        return false;
    }

    let user = await db.getUserByUserId(userId);

    if (user === null) {
        return false;
    }
    user = JSON.parse(JSON.stringify(user));

    if (!user["isAdmin"]) {
        res.redirect("/err/403");
        return false;
    }

    return true;
}

async function isLoggedIn(req, res) {
    let userId = req.signedCookies["userId"];

    if (userId === undefined) {
        res.redirect(`/signin?${queryString.stringify({
            redirect: "https://" + req.get("host") + req.originalUrl
        })}`);
        return false;
    }

    let user = await db.getUserByUserId(userId);
    user = JSON.parse(JSON.stringify(user));
    if (user === null) {
        res.redirect("/api/account/logout");
        return false;
    }

    return true;
}

module.exports = {
    isAdmin,
    isLoggedIn
};