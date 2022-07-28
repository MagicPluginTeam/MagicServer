const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "magicplugin.noreply@gmail.com",
        pass: "ivtduqyifmahtxmm"
    }
})

function sendMail(mailOptions) {
    transporter.sendMail(mailOptions)
}

module.exports = sendMail