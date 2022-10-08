 //REQUIRES
require("dotenv").config();
const bodyParser = require("body-parser");
const express = require("express");
const logger = require("morgan");
const cookieParser = require("cookie-parser");

//MODULES
const db = require("./modules/database.js");

//ROUTES
const admin_r = require("./routes/admin.js");
const api_r = require("./routes/api.js");
const index_r = require("./routes/index.js");
const redirect_r = require("./routes/redirect.js");
const store_r = require("./routes/store.js");
const test_r = require("./routes/test.js");

//SETTINGS
const httpPort = 80

//SETUP
const app = express()
db.connect().then()
app
    //SET BODY-PARSER
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({extended:true}))

    //SET COOKIE-PARSER
    .use(cookieParser())

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
    .use("/admin", admin_r)
    .use("/api", api_r)
    .use("/r", redirect_r)
    .use("/store", store_r)
    .use("/test", test_r)

    //SET ERROR PAGES
    .use((req, res) => {
        res.status(404).redirect("/err/404")
    })

//STARTING SERVER
app.listen(httpPort, () => {
    console.log("HTTP Server Started! HTTP Listening On Port: " + httpPort)
})