const crypto = require("crypto");

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomVerifyCode() {
    return randomInt(100000, 999999)
}

module.exports = {
    randomInt,
    randomVerifyCode
}