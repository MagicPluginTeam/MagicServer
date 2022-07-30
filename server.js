//REQUIRES
const bodyparser = require("body-parser")
const express = require("express")
const session = require("express-session")
const http = require("http")
const logger = require("morgan")

//ROUTES
const index_r = require("./routes")
const test_r = require("./routes/test.js")

//SETTINGS
const httpPort = 80

//SETUP
const app = express()

app
    .use(bodyparser.json())
    .use(bodyparser.urlencoded({extended:true}))
    .use(session({
        secret: "MagicSecretKey",
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: true,
            maxAge: 1000*60*60 //세션 유효기간 (ms)
        }
    }))

    .use(express.static(__dirname))
    .use(express.static(__dirname + "/views"))

    .use(logger("dev"))

    .set("view engine", "ejs")

    .use("/", index_r)
    .use("/test", test_r)

    .use(function(req, res) { res.status(404).render("404") })

const server = http.createServer(app).listen(httpPort, () => {
    console.log("Server Started! HTTP Listening on port: " + httpPort)
})