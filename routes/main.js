const express = require("express")
const path = require("path")

let router = express.Router()


router.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname + "/../views/main/index.html"))
})

module.exports = router