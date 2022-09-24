const loginService = require("./loginService.js");

exports.SignIn = async (req, res) => {
    let result = await loginService.SignIn(req);

    if (result.code === 0) {
        res.cookie("userId", result.data["userId"]);
        res.cookie("username", result.data["username"], {
            maxAge: 60*60*100,
            path: "/"
        });
    }

    return result;
};

exports.SignUp = async (req, res) => {
    let result = await loginService.SignUp(req);
    let msg = "Successfully Signed Up!";

    if (result === 100) {
        msg = "This email is already taken.";
    }

    return { code: result, msg: msg };
}