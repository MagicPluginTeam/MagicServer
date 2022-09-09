const express = require("express");

let routes = express.Router()

routes
    .get("/", (req, res) => {
        res.status(403).redirect("/err/403");
    })
    .get("/download", (req, res) => {
        const uuid = crypto.randomUUID();
        const filename = uuid + ".uid";
        const filepath = __dirname + "/serverfile/tmp/" + filename;
        const stream = fs.createWriteStream(filepath);

        stream.once('open', function() {
            stream.write(uuid)
            stream.end()

            res.download(filepath, "UUID.uid", (err) => {
                if (err) console.log(err)

                fs.unlinkSync(filepath)
            })
        });
    })

module.exports = routes;