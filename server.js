const bodyParser = require("body-parser")
const express = require("express")
const {Client} = require("pg");
const crypto = require("crypto")
const fs = require("fs")
// const nodemailer = require("nodemailer")

const app = express()
const port = app.listen(5050)
const client = new Client({
    user: 'yejunho10',
    host: 'localhost',
    database: 'license',
    password: '6033',
    port: 5432
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static(__dirname + "/web"))
client.connect()

app.post("/postTest", function(req) {
    console.log(req.body.p1)
})

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/web/main/index.html")
})

app.get("/downloadUUID", function(req, res) {
    var uuid = crypto.randomUUID()
    var filename = uuid + ".uid"
    var filepath = __dirname + "/tmp/" + filename
    var stream = fs.createWriteStream(filepath)

    stream.once('open', function() {
        stream.write(uuid)
        stream.end()

        res.download(filepath, "UUID.uid", function(err) {
            if (err) console.log(err)

            fs.unlinkSync(filepath)
            console.log("successfully deleted tmp file..")
        })
        console.log("successfully sent file to client..")
    })
})

app.listen(port, function() {
    console.log("LicenseServer Started!")
})