const Grid = require("gridfs-stream")
const { mongoose } = require("mongoose")
const express = require("express")
const upload = require("../middleware/upload");
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
    .get("/:filename", async (req, res) => {
        try {
            const file = await gfs.files.findOne({ filename: req.params.filename })
            //const readStream = gfs.createReadStream(file.filename)
            const readStream = gridfsBucket.openDownloadStream(file._id);

            readStream.pipe(res)
        } catch(err) {
            res.status(404).send("failed" + err)
        }
    })

    .get("/info/:filename", async (req, res) => {
        try {
            const file = await gfs.files.findOne({ filename: req.params.filename })
            res.json({
                success: "1",
                fileName: file.filename,
                contentType: file.contentType,
                fileLength: file.length,
                fileChunkSize: file.chunkSize,
                fileUploadDate: file.uploadDate
            })
        } catch(err) {
            res.status(404).json({
                success: "0"
            })
        }
    })

    .post("/upload", upload.single("file"), (req, res) => {
        if (req.file === undefined)
            return res.status(400).send("failed.")
        const imgUrl = `https://magicplugin.net/file/${req.file.filename}`

        return res.send(imgUrl)
    })

    .delete("/:filename", async (req, res) => {
        try {
            await gfs.files.deleteOne({ filename: req.params.filename })

            res.send("success")
        } catch (err) {
            res.status(404).send("failed")
        }
})

module.exports = router