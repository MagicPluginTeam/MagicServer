const bodyParser = require("body-parser")
const express = require("express")

const app = express()
const port = app.listen(5050)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
client.connect()

app.post("/postTest", function(req, res) {
    console.log(req.body.p1)
})

app.listen(port, function() {
    console.log("LicenseServer Started!")
})