require("dotenv").config()
const nodemailer = require("nodemailer")
const ejs = require("ejs")
const crypt = require("./crypt.js")

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
})

async function sendVerifyCode(mailAddr, userId) {
    const code = crypt.randomVerifyCode();
    let mailOptions = {
        from: "MagicPluginTeam",
        to: mailAddr,
        subject: "MagicPluginTeam - Verify Code",
        html: await ejs.render("verify_mail.ejs", { code: code, userId: userId }, (err, html) => {
            if(err) { return `<h1>Something went wrong</h1>`} return html })
    };

    transporter.sendMail(mailOptions).catch((err) => {
        console.log(err);
    });

    return code;
}

module.exports = {
    sendVerifyCode
}