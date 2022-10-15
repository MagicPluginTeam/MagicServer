function randomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomVerifyCode() {
    return randomInt(100000, 999999);
}

module.exports = {
    randomInt,
    randomVerifyCode
}