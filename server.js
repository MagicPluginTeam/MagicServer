//REQUIRES
const bodyparser = require("body-parser")
const express = require("express")
const https = require("https")

const logger = require("morgan")

const index_r = require("./routes")
const test_r = require("./routes/test.js")

const httpPort = 5050
const httpsPort = 5051
const app = express()
const options = require("./config/pem_config").options


//SETUP
app
    .use(bodyparser.json())
    .use(bodyparser.urlencoded({extended:true}))

    .use(express.static(__dirname))
    .use(express.static(__dirname + "/views"))

    .use(logger("dev"))

    .set("view engine", "ejs")

    .use("/", index_r)
    .use("/test", test_r)

    .use(function(req, res) { res.status(404).render("404") })


app.listen(httpPort, () => {
    console.log("Server Started! HTTP Listening on port: " + httpPort)
})

https.createServer(options, app).listen(httpsPort, () => {
    console.log("Server Started! HTTPS Listening on port: " + httpsPort)
})