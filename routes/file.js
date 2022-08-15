const Grid = require("gridfs-stream")
const { mongoose } = require("mongoose")
const express = require("express")
let router = express.Router()

const conn = mongoose.connection
let gfs

conn.once("open", () => {
    gfs = Grid(conn.db, mongoose.mongo)
    gfs.collection("images")
})

router.get("/:filename", async (req, res) => {
    try {
        const file = await gfs.files.findOne({ filename: req.params.filename })
        const readStream = gfs.createReadStream(file.filename)

        readStream.pipe(res)
    } catch(err) {
        res.status(404).redirect("/err/404")
    }
})

module.exports = router