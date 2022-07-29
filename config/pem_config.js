const fs = require("fs");
const keys_dir = "config/secure/";
const key = fs.readFileSync(keys_dir + "rootca.key");
const cert = fs.readFileSync(keys_dir + "rootca.crt");

module.exports.options = {
    key,
    cert
};