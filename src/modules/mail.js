require("dotenv").config();
const nodemailer = require("nodemailer");
const path = require("path");
const ejs = require("ejs");
const crypt = require("./crypt.js");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
})

async function sendVerifyCode(mailAddr, userId) {
    const code = crypt.randomVerifyCode();
    let HTML;

    await ejs.renderFile(path.join(__dirname + "/../views/verify_mail.ejs"), { code: code, userId: userId }, (err, html) => {
        if(err) {
            HTML = "<h1>Something went wrong</h1>";
        } else {
            HTML = html;
        }
    })

    let mailOptions = {
        from: "Pexel Team",
        to: mailAddr,
        subject: "Pexel - Verify",
        html: HTML
    };

    transporter.sendMail(mailOptions).catch((err) => {
        console.log(err);
        console.log(mailOptions);
    });

    return code;
}

module.exports = {
    sendVerifyCode
}