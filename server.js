//REQUIRES
const bodyparser = require("body-parser")
const express = require("express")
const logger = require("morgan")
const main_r = require("./routes/main.js")
const test_r = require("./routes/test.js")

const port = 5050
const app = express()


//SETUP
app
    .use(bodyparser.json())
    .use(bodyparser.urlencoded({extended:true}))
    .use(express.static(__dirname))
    .use(express.static(__dirname + "/views"))
    .set("view engine", "ejs")
    .use(logger("dev"))

    .use("/main", main_r)
    .use("/test", test_r)
    .get("/", function(req, res) { res.redirect("/main") })

    .use(function(req, res) { res.status(404).render("404") })
    .use(function(req, res) { res.status(403).render("403") })

app.listen(port, () => {
    console.log("Server Started!")
})