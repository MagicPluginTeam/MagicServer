const Grid = require("gridfs-stream")
const { mongoose } = require("mongoose")
const express = require("express")
const upload = require("../../middleware/upload.js");
let router = express.Router()

const conn = mongoose.connection
let gfs, gridfsBucket

conn.once("open", () => {
    gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: "images"
    })

    gfs = Grid(conn.db, mongoose.mongo)
    gfs.collection("images")
})


router
    .get("/", (req, res) => {
        res.status(403).redirect("/err/403");
    })
    .get("/:filename", async (req, res) => {
        try {
            const file = await gfs.files.findOne({ filename: req.params.filename })
            const readStream = gridfsBucket.openDownloadStream(file._id);

            readStream.pipe(res)
        } catch(err) {
            res.status(404).json({success: false})
        }
    })

    .post("/upload", upload.single("file"), (req, res) => {
        if (req.file === undefined)
            return res.status(400).json({success: false})
        const imgUrl = `https://magicplugin.net/file/${req.file.filename}`

        return res.json({success: true, img: imgUrl})
    })

    .delete("/:filename", async (req, res) => {
        try {
            await gfs.files.deleteOne({ filename: req.params.filename })

            res.json({success: true})
        } catch (err) {
            res.status(404).json({success: false})
        }
})

module.exports = router