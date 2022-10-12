const db = require("../modules/database.js");

async function isAdmin(req, res) {
    let userId = req.signedCookies["userId"];

    if (userId === undefined) {
        res.status(403).redirect("/signin");
        return;
    }

    let user = await db.getUserByUserId(userId);

    if (user === null) {
        return false;
    }
    user = JSON.parse(JSON.stringify(user));

    if (!user["isAdmin"]) {
        res.status(403).redirect("/err/" + res.statusCode);
        return false;
    }

    return true;
}

async function isLoggedIn(req, res) {
    let userId = req.signedCookies["userId"];

    if (userId === undefined) {
        res.redirect("/signin")
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