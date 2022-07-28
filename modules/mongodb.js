const db = require("mongoose")
const MONGODB_URL = "mongodb+srv://localhost:27017/"

db.connect(MONGODB_URL, { useNewUrlParser: true}, (err) => {
    if (err) {
        console.log("Error while connecting to mongodb!")
        console.log(err)
    } else {
        console.log("Successfully connected to mongodb!")
    }
})