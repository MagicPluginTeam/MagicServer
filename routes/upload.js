const upload = require("../middleware/upload.js")
const express = require("express")
let router = express.Router()

router.post("/", upload.single("thumbnailImage"), (req, res) => {
    if (req.file === undefined)
        return res.status(400).send("You must select a file.")
    const imgUrl = `https://magicplugin.net/file/${req.file.filename}`

    return res.send(imgUrl)
})

module.exports = router