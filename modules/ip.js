require("dotenv").config();
const request = require("request");

async function isProxy(ip) {
    const ipURL = process.env.IPAPI_URL.replaceAll(/<%ip%>/g, ip);
    let data;

    await request(ipURL, (err, res, body) => {
        if (body == "{}") {
            data = null;
        }

        data = JSON.parse(body);
    });

    return data;
}

module.exports = {
    isProxy
}