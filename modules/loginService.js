const crypto = require("crypto");
const pbkdf2Password = require("pbkdf2-password");

const hasher = pbkdf2Password();
const db = require("./database.js");

exports.SignIn = async (req) => {
    let json = {};
    json.code = 0;

    let email = req.body.email;
    let password = req.body.password;
    let data = JSON.parse(JSON.stringify(await db.getUserByEmail(email)));

    if (data == null) {
        json.code = 100;
        json.msg = "account not found.";
        json.data = {};

        return json;
    } else {
        let userSalt = data["salt"];
        let userPasswordHash = data["passwordHash"];

        return new Promise((resolve, reject) => {
            hasher({ password: password, salt: userSalt }, (err, pass, salt, hash) => {
                if (userPasswordHash == hash) {
                    json.data = data;
                } else {
                    json.code = 100;
                    json.msg = "email or password is incorrect.";
                    json.data = {};
                }

                resolve(json);
            });
        })
    }
};

exports.SignUp = async (req, res) => {
    let resultCode = 0;

    let password = req.body.password;
    let username = req.body.username;
    let email = req.body.email;

    if (JSON.parse(JSON.stringify(await db.getUserByEmail(email) == null))) {
        hasher({ password: password }, async (err, pass, salt, hash) => {
            await db.generateUserModel(crypto.randomUUID(), username, email, hash, salt, Date.now(), Date.now(), false).save();
        });
    } else {
        resultCode = 100;
    }

    return resultCode;
};