 //REQUIRES
require("dotenv").config();
const bodyParser = require("body-parser");
const express = require("express");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
 const index_r = require("./routes/index.js");

//MODULES
const db = require("./modules/database.js");

//SETTINGS
const httpPort = 80

//SETUP
const app = express()
db.connect().then();
app
    //SET BODY-PARSER
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }))

    //SET COOKIE-PARSER
    .use(cookieParser(process.env.COOKIE_SECRET))

    //SET STATIC PATH
    .use("/images", express.static(__dirname + "/serverfile/images"))
    .use("/public", express.static(__dirname + "/public"))
    .use(express.static(__dirname + "/serverfile/web"))

    //SET LOGGER
    .use(logger(":method :url :status - (:response-time ms | :remote-addr)"))

    //SET ROUTERS
    .use("/", index_r)

    //SET VIEW ENGINE
    .set("view engine", "ejs")

    //SET ERROR PAGES
    .use((req, res) => {
        res.redirect("/err/404");
    })

//STARTING SERVER
app.listen(httpPort, () => {
    console.log("HTTP Server Started! HTTP Listening On Port: " + httpPort);
})