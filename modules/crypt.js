const crypto = require("crypto");

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function randomVerifyCode() {
    return randomInt(100000, 999999)
}

//TODO - is this work?
function randomRSAKeyPair() {
    return crypto.generateKeyPair("rsa", {
        modulusLength: 4096,
        publicKeyEncoding: {
            type: "spki",
            format: "pem"
        },
        privateKeyEncoding: {
            type: "pkcs8",
            format: "pem",
            cipher: "aes-256-cbc",
            passphrase: "HoYeJun&Bruce0203=Genius"
        }
    }, (err, publicKey, privateKey) => {
        if (err) {
            console.log(err)
        }

        console.log(publicKey)
        console.log(privateKey)
    })
}

module.exports = {
    randomInt,
    randomVerifyCode,
    randomRSAKeyPair
}