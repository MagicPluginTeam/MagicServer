//REQUIRES
const bodyparser = require("body-parser")
const express = require("express")
const http = require("http")
const logger = require("morgan")

//ROUTES
const index_r = require("./routes")
const test_r = require("./routes/test.js")
const store_r = require("./routes/store.js")

//SETTINGS
const httpPort = 80

//SETUP
const app = express()

app
    .use(bodyparser.json())
    .use(bodyparser.urlencoded({extended:true}))

    .use(express.static(__dirname))
    .use(express.static(__dirname + "/views"))

    .use(logger("dev"))

    .set("view engine", "ejs")

    .use("/", index_r)
    .use("/test", test_r)
    .use("/store", store_r)

    .use((req, res) => {
        res.status(404).redirect("/err/404")
    })

const server = http.createServer(app)

server.listen(httpPort, () => {
    console.log("Server Started! HTTP Listening on port: " + httpPort)
})