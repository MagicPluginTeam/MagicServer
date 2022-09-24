 //REQUIRES
require("dotenv").config();
const bodyparser = require("body-parser");
const express = require("express");
const logger = require("morgan");
const ip = require("./modules/ip.js")

//MODULES
const db = require("./modules/db.js");

//ROUTES
const index_r = require("./routes/index.js");
const api_r = require("./routes/api.js");
const store_r = require("./routes/store.js");
const test_r = require("./routes/test.js");
const redirect_r = require("./routes/redirect.js");

//SETTINGS
const httpPort = process.env.HTTP_PORT || 80

//SETUP
const app = express()
db.connect().then()
app
    //SET BODY-PARSER
    .use(bodyparser.json())
    .use(bodyparser.urlencoded({extended:true}))

    //SET STATIC PATH
    .use("/images", express.static(__dirname + "/serverfile/images"))
    .use("/public", express.static(__dirname + "/public"))
    .use(express.static(__dirname + "/serverfile/web"))

    //SET LOGGER
    .use(logger(":method :url :status - (:response-time ms | :remote-addr)"))

    //SET VIEW ENGINE
    .set("view engine", "ejs")

    //SET ROUTES
    .use("/", index_r)
    .use("/api", api_r)
    .use("/store", store_r)
    .use("/test", test_r)
    .use("/r", redirect_r)

    //SET ERROR PAGES
    .use((req, res) => {
        res.status(404).redirect("/err/404")
    })

    //SET HTTPS PROTOCOL IS REQUIRED
    .use((req, res, next) => {
        if (req.secure) {
            next()
        } else {
            res.redirect(`https://${req.hostname}/${req.url}`)
        }
    })

//STARTING SERVER
app.listen(httpPort, () => {
    console.log("HTTP Server Started! HTTP Listening On Port: " + httpPort)
})