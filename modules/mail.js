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

function sendVerifyCode(mailAddr) {
    const code = crypt.randomVerifyCode()

    const mailOptions = {
        from: "MagicPluginTeam",
        to: mailAddr,
        subject: "MagicPluginTeam - Verify Code",
        html: ejs.render("verify_mail.ejs", { code: code }, (err, html) => {
            if(err) { return `<h1>Something went wrong</h1>`} return html })
    }

    transporter.sendMail(mailOptions)

    return code
}

module.exports = {
    sendVerifyCode
}