const db = require("../modules/database.js");

async function isAdmin(req, res) {
    let cookie = req.cookies;
    let userId = cookie["userId"];

    if (userId == null) {
        res.status(403).redirect("/signin");
        return;
    }
    let user = await db.getUserByUserId(userId);
    user = JSON.parse(JSON.stringify(user));

    if (!user["isAdmin"]) {
        res.status(403).redirect("/err/" + res.statusCode);
    }

    return user["isAdmin"];
}

module.exports = {
    isAdmin
};