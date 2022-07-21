const bodyParser = require("body-parser")
const express = require("express")
const {Client} = require("pg");
const nodemailer = require("nodemailer")

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

app.post("/postTest", function(req, res) {
    console.log(req.body.p1)
})

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/web/main/index.html")
})

app.listen(port, function() {
    console.log("LicenseServer Started!")
})