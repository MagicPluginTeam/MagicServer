//REQUIRES
require("dotenv").config()
const bodyparser = require("body-parser")
const express = require("express")
const logger = require("morgan")

const db = require("./modules/db.ts")

//ROUTES
const index_r = require("./routes/index.js")
const api_r = require("./routes/api.js")
const store_r = require("./routes/store.js")
const test_r = require("./routes/test.js")

//SETTINGS
const httpPort = process.env.HTTP_PORT || 80

//SETUP
const app = express()
db.connect().then()
app
    .use(bodyparser.json())
    .use(bodyparser.urlencoded({extended:true}))

    .use(express.static(__dirname))
    .use(express.static(__dirname + "/views"))
    .use(express.static(__dirname + "/serverfile/web"))

    .use(logger(":method :url :status - (:response-time ms | :remote-addr)"))

    .set("view engine", "ejs")

    .use("/", index_r)
    .use("/api", api_r)
    .use("/store", store_r)
    .use("/test", test_r)

    .use((req, res, next) => {
        if (req.secure) {
            next()
        } else {
            res.redirect(`https://${req.hostname}/${req.url}`)
        }
    })

    .use((req, res, err) => {
        if (err) { res.status(404).redirect("/err/404") }
    })

//START SERVER
app.listen(httpPort, () => {
    console.log("HTTP Server Started! HTTP Listening On Port: " + httpPort)
})
