//REQUIRES
require("dotenv").config()
const bodyparser = require("body-parser")
const express = require("express")
const http = require("http")
const logger = require("morgan")
const db = require("./modules/db.js")

//ROUTES
const index_r = require("./routes/index.js")
const store_r = require("./routes/store.js")
const test_r = require("./routes/test.js")

//SETTINGS
const httpPort = process.env.HTTP_PORT || 8083

//SETUP
const app = express()
await db.connect()

app
    .use(bodyparser.json())
    .use(bodyparser.urlencoded({extended:true}))

    .use(express.static(__dirname))
    .use(express.static(__dirname + "/views"))

    .use(logger(":method :url :status - (:response-time ms | :remote-addr)"))

    .set("view engine", "ejs")

    .use("/", index_r)
    .use("/test", test_r)
    .use("/store", store_r)

    .use((req, res, err) => {
        if (err) { res.status(404).redirect("/err/404") }
    })

const server = http.createServer(app)

server.listen(httpPort, () => {
    console.log("Server Started! HTTP Listening on port: " + httpPort)
})