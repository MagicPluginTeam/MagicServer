const db = require("../modules/database.js");
const loginService = require("./loginService.js");

exports.SignIn = async (req, res) => {
    let result = await loginService.SignIn(req);

    if (result.code === 0) {
        res.cookie("userId", result.data["userId"]);
        res.cookie("username", result.data["username"], {
            maxAge: 60*60*100,
            path: "/"
        });

        await db.updateUserByUserId(result.data["userId"], {lastLoginAt: Date.now()});
    }

    return result;
};

exports.SignUp = async (req, res) => {
    let result = await loginService.SignUp(req);
    let msg = "Successfully Signed Up!";
    let user = await db.getUserByEmail(result.email);
    while(user === null) {
        user = await db.getUserByEmail(result.email);
    }
    let data = JSON.parse(JSON.stringify(user));

    if (result.code === 100) {
        msg = "This email is already taken.";
    }

    return { code: result.code, msg: msg, data: data };
}